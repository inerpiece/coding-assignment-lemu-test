import styles from "./page.module.css";
import TopStories from "@/components/TopStories";
import DynamicTopStories from "../../src/app/dynamic-stories/DynamicTopStories";

export default function Home() {
  return (
    <main className={styles.main}>
      <DynamicTopStories />
    </main>
  );
}
