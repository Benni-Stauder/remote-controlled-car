import Layout from "@theme/Layout";
import {default as Svg} from "@site/static/img/undraw_pic_profile_male.svg"
import Translate from "@docusaurus/Translate";


export default function About () {
    return (
        <Layout
            title={`About`}
            description="Description">
            {/*<HomepageHeader />*/}
            <main style={{
                width: '100%',
                textAlign: "center",
                height: "auto",
                justifyContent: "center",
                paddingTop: "2rem"
            }}>
                <h1><Translate id="about.mission_header">Unsere Mission</Translate></h1>
                <Translate id="about.mission">Unsere Mission ist es, das Erlebnis ferngesteuerter Autos durch eine flexible Steuerung und Live-Kameras zu revolutionieren.</Translate>

                <h1 style={{marginTop: "25px"}}><Translate id="about.our_team">Unser Team</Translate></h1>
                <div style={{display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "20px", overflowX: "auto", rowGap: "20px"}}>
                    {/* First Row */}
                    <div className="person" style={{gridColumn: "span 2", display: "flex", flexDirection: "column", alignItems: "center"}}>
                        <p style={{fontWeight: "bold"}}>Project Lead </p>
                        <Svg style={{maxWidth: "100%", height: "150px", display: "block", margin: "20 auto"}}/>
                        <p style={{maxWidth: "80%", textAlign: "center", display: "flex"}}><Translate id="project_lead">Marcel Rommel</Translate></p>
                    </div>

                    <div className="person" style={{gridColumn: "span 2", display: "flex", flexDirection: "column", alignItems: "center"}}>
                        <p style={{fontWeight: "bold"}}>Technical Project Lead </p>
                        <Svg style={{maxWidth: "100%", height: "150px", display: "block", margin: "20 auto"}}/>
                        <p style={{maxWidth: "80%"}}><Translate id="tech_lead">Benni Stauder</Translate></p>
                    </div>

                    <div className="person" style={{gridColumn: "span 2", display: "flex", flexDirection: "column", alignItems: "center"}}>
                        <p style={{fontWeight: "bold"}}>Scrum Master</p>
                        <Svg style={{maxWidth: "100%", height: "150px", display: "block", margin: "20 auto"}}/>
                        <p style={{maxWidth: "80%"}}><Translate id="scrum_master">Robin Steiner</Translate></p>
                    </div>

                    {/* Second Row with 2 Columns */}
                    <div className="person" style={{gridColumn: "span 3", display: "flex", flexDirection: "column", alignItems: "center"}}>
                        <p style={{fontWeight: "bold"}}>Frontend Developer</p>
                        <Svg style={{maxWidth: "100%", height: "150px", display: "block", margin: "20 auto"}}/>
                        <p style={{maxWidth: "80%"}}><Translate id="frontend-dev">Annika Jung</Translate></p>
                    </div>
                    <div className="person" style={{gridColumn: "span 3", display: "flex", flexDirection: "column", alignItems: "center"}}>
                        <p style={{fontWeight: "bold"}}>Backend Developer </p>
                        <Svg style={{maxWidth: "100%", height: "150px", display: "block", margin: "20 auto"}}/>
                        <p style={{maxWidth: "80%"}}><Translate id="backend-dev">Muhammed Cömert, Leonie Ottenbacher</Translate></p>
                    </div>

                </div>
            </main>
        </Layout>
    )
}