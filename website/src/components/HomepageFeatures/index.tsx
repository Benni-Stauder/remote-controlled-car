import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import Translate, {translate} from "@docusaurus/Translate";

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
      title: translate({
          id: "innovative_camera_header",
          message: "Innovative Kameraintegration"
      }),
    Svg: require('@site/static/img/undraw_video_files_fu10.svg').default,
    description: (
      <>
          <Translate id={"innovative_camera"}>Dieses Projekt ermöglicht ein immersives Erlebnis durch die Integration einer Live-Kameraübertragung in ein RC Auto.</Translate>
      </>
    ),
  },
  {
      title: translate({
          id: "advanced_control_header",
          message: "Moderne Steuerungssysteme"
      }),
    Svg: require('@site/static/img/undraw_gaming_re_cma2.svg').default,
    description: (
      <>
          <Translate id={"advanced_control"}>Das RC-Auto bietet eine flexible Steuerung - sowohl Controller als auch Gaming-Lenkräder sind unterstützt.</Translate>
      </>
    ),
  },
  {
      title: translate({
          id: "accessibility_header",
          message: "Zugänglich"
      }),
    Svg: require('@site/static/img/undraw_web_browsing_p-77-h.svg').default,
    description: (
      <>
          <Translate id={"accessibility"}>Unser Projekt ist sowohl für Enthusiasten als auch für Anfänger zugänglich. Benutzerfreundliche Schnittstellen und viele Konfigurationsmöglichkeiten unterstützen dies.</Translate>
      </>
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

export default function HomepageFeatures(): JSX.Element {
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
