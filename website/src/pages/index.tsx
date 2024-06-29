import Link from "@docusaurus/Link"
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from "@site/src/components/HomepageFeatures";
import "./index.module.css"
import Translate, {translate} from '@docusaurus/Translate';


export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Description">
      {/*<HomepageHeader />*/}
      <main style={{width: '100%', textAlign: "center", height: "auto", justifyContent: "center", paddingTop: "5rem"}}>
          <h1>Remote Controlled Car</h1>
        <HomepageFeatures />
          <Link to="/docs/getting-started" style={{fontWeight: "bold", fontSize: "22px"}} ><Translate id="index.read_docs">Lies die Dokumentation!</Translate></Link>
      </main>
    </Layout>
  );
}
