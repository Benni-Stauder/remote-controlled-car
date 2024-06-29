import HomepageFeatures from "@site/src/components/HomepageFeatures";
import Layout from "@theme/Layout";
import clsx from "clsx";
import styles from "@site/src/components/HomepageFeatures/styles.module.css";
import Heading from "@theme/Heading";
import Translate, {translate} from "@docusaurus/Translate";

type FeatureItem = {
    title: string;
    Svg: React.ComponentType<React.ComponentProps<'svg'>>;
    description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
    {
        title: translate({message: 'Hochauflösende Kamera', id: "feat_camer_header"}),
        Svg: require('@site/static/img/undraw_surveillance_re_8tkl.svg').default,
        description: (
            <>
                <Translate id={"feat_camera"}>Das RC-Auto ist mit einer Live-Kamera ausgestattet, die einen Echtzeit-Videostream und Aufnahmemöglichkeiten bietet.</Translate>
            </>
        ),
    },
    {
        title: translate({message: 'Moderne Steuerungssysteme', id: "feat_control_header"}),
        Svg: require('@site/static/img/undraw_server_cluster_jwwq.svg').default,
        description: (
            <>
                <Translate id={"feat_control"}>Unsere Steuerung unterstützt verschiedenen Geräten, wie Controller und Gaming-Lenkräder.</Translate>
                </>
        ),
    },
    {
        title: translate({message: 'Open Source', id: "feat_durabilty_header"}),
        Svg: require('@site/static/img/undraw_towing_re_wesa.svg').default,
        description: (
            <>
                <Translate id={"feat_durability"}>Dieses Projekt ist gänzlich Open Source und bietet für interessierte Nutzer daher die Möglichkeit, nach Belieben Änderungen vorzunehmen.</Translate></>
        ),
    },
];

function Feature({title, Svg, description}: FeatureItem) {
    return (
        <div className={clsx('col col--4')}>
            <div className="text--center">
                <Svg className={styles.featureSvg} role="img" />
            </div>
            <div className="text--center padding-horiz--md">
                <Heading as="h3">{title}</Heading>
                <p>{description}</p>
            </div>
        </div>
    );
}

function FeatureFeatures(): JSX.Element {
    return (
        <section className={styles.features}>
            <div className="container">
                <div className="row">
                    {FeatureList.map((props, idx) => (
                        <Feature key={idx} {...props} />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default function Features () {
    return (
        <Layout
            title={`Features`}
            description="Description">
            {/*<HomepageHeader />*/}
            <main style={{width: '100%', textAlign: "center", height: "auto", justifyContent: "center", paddingTop: "5rem"}}>
                <h1>Remote Controlled Car Features</h1>
                <FeatureFeatures />

            </main>
        </Layout>
    )
}