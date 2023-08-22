import styles from "./Author.module.scss";

type Author = {
  username: string;
  karma: number;
};

export default function Author({ username, karma }: Author) {
  return (
    <div className={styles.container}>
      <h3 className={styles.author}>Author: {username}</h3>
      <h3 className={styles.karma}>Karma: {karma}</h3>
    </div>
  );
}
