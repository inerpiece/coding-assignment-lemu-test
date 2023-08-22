import styles from "./page.module.css";
import TopStories from "@/components/TopStories";

export default function Home() {
  return (
    <main className={styles.main}>
      <TopStories />
    </main>
  );
}
