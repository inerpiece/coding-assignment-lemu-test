import styles from "./Story.module.scss";
import Author from "./Author";
import Image from "next/image";

type Story = {
  by: string;
  title: string;
  timestamp: string;
  karma: number;
  url: string;
  img: string;
  score: number;
};

export default function Story({
  by,
  title,
  timestamp,
  karma,
  url,
  img,
  score,
}: Story) {
  return (
    <section className={styles.story}>
      <div className={styles.imgContainer}>
        <Image
          alt="static image"
          src={"/placeholder-image.png"}
          layout="responsive"
          width={800}
          height={600}
        />
      </div>
      <h2 className={styles.title}>{title}</h2>
      <Author karma={karma} username={by} />
      <div className={styles.storyStats}>
        <h3 className={styles.score}>Score: {score}</h3>
        <h3 className={styles.date}>Posted: {timestamp}</h3>
      </div>
      <h3 className={styles.url}>
        <a href={url} className={styles.link}>
          view story...
        </a>
      </h3>
    </section>
  );
}
