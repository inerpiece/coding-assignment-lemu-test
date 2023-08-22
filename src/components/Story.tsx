import styles from "./Story.module.scss";
import Author from "./Author";

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
  const date = new Date(Number(timestamp));
  const formattedDate = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}`;
  return (
    <section className={styles.story}>
      <img src={img} alt="static image" />
      <h2 className={styles.title}>{title}</h2>
      <Author karma={karma} username={by} />
      <div className={styles.storyStats}>
        <h3 className={styles.score}>Score: {score}</h3>
        <h3 className={styles.date}>Posted: {formattedDate}</h3>
      </div>
      <h3 className={styles.url}>
        <a href={url} className={styles.link}>
          view story...
        </a>
      </h3>
    </section>
  );
}
