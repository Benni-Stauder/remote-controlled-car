// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::fs;
use warp::Filter;

fn main() {
    let rt = tokio::runtime::Runtime::new().expect("Failed to create Tokio runtime");

    rt.block_on(async {
        tauri::Builder::default()
            .setup(|app| {
                // comment this line in for random test stream :)
                //  tokio::spawn(run_ffmpeg("rtsp://807e9439d5ca.entrypoint.cloud.wowza.com:1935/app-rC94792j/068b9c9a_stream2"));

                // comment this line out if u are using the test stream :)
                tokio::spawn(run_ffmpeg("rtsp://10.3.141.1:8554/stream"));
                tokio::spawn(run_warp_server());
                Ok(())
            })
            .run(tauri::generate_context!())
            .expect("error while running tauri application");
    });
}

async fn run_warp_server() {
    let output_path = tauri::api::path::cache_dir().expect("unable to get cache dir");
    if !output_path.exists() {
        fs::create_dir_all(&output_path).expect("failed to create dirs");
    }
    let output_path = output_path.join("swe_car");
    let routes = warp::fs::dir(output_path); // Serve files from the public directory
    let cors = warp::cors().allow_any_origin().build();
    warp::serve(routes.with(cors))
        .run(([127, 0, 0, 1], 3030))
        .await;
}

async fn run_ffmpeg(source: &str) {
    let output_path = tauri::api::path::cache_dir().expect("unable to get cache dir");
    let output_path = output_path.join("swe_car");
    if !output_path.exists() {
        fs::create_dir_all(&output_path).expect("failed to create dirs");
    }
    println!("{:?}", output_path.to_str().unwrap());
    let output_path = output_path.join("stream.m3u8");

    let output = tokio::process::Command::new("ffmpeg")
        .args([
            "-rtsp_transport",
            "udp",
            "-i",
            source,
            "-c:v",
            "h264",
            "-preset",
            "ultrafast",
            "-b:v",
            "2000k",
            "-g",
            "48",
            "-hls_time",
            "1",
            "-hls_list_size",
            "6",
            "-start_number",
            "1",
            "-hls_flags",
            "delete_segments",
            output_path.as_os_str().to_str().unwrap(),
        ])
        .output()
        .await
        .expect("failed to execute process");

    println!("FFmpeg process finished with output: {:?}", output);
}

#[cfg(test)]
mod tests {
    use super::*;
    use tauri::api::path::cache_dir;
    use warp::hyper::StatusCode;
    use warp::test::request;

    #[tokio::test]
    async fn http_server_is_reachable() {
        let output_path = cache_dir()
            .expect("unable to get cache dir")
            .join("swe_car");
        if !output_path.exists() {
            fs::create_dir_all(&output_path).expect("failed to create dirs");
        }

        let routes = warp::fs::dir(output_path.clone());
        let cors = warp::cors().allow_any_origin().build();
        let server = warp::serve(routes.with(cors)).run(([127, 0, 0, 1], 3030));

        tokio::spawn(server);

        let resp = request()
            .method("GET")
            .path("/stream.m3u8")
            .reply(&warp::fs::dir(output_path.clone()))
            .await;

        assert_eq!(resp.status(), StatusCode::OK);
    }
}
