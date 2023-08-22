import styles from "./TopStories.module.scss";
import Story from "./Story";

async function getData() {
  const res = await fetch(
    "https://hacker-news.firebaseio.com/v0/topstories.json"
  );

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  const data = res.json();

  return data;
}

async function grabTen(stories: number[]) {
  // @ts-ignore
  const tenStories = [];
  try {
    let [
      story1,
      story2,
      story3,
      story4,
      story5,
      story6,
      story7,
      story8,
      story9,
      story10,
    ] = await Promise.all([
      fetch(
        `https://hacker-news.firebaseio.com/v0/item/${stories[0]}.json`
      ).then((data) => data.json()),
      fetch(
        `https://hacker-news.firebaseio.com/v0/item/${stories[1]}.json`
      ).then((data) => data.json()),
      fetch(
        `https://hacker-news.firebaseio.com/v0/item/${stories[2]}.json`
      ).then((data) => data.json()),
      fetch(
        `https://hacker-news.firebaseio.com/v0/item/${stories[3]}.json`
      ).then((data) => data.json()),
      fetch(
        `https://hacker-news.firebaseio.com/v0/item/${stories[4]}.json`
      ).then((data) => data.json()),
      fetch(
        `https://hacker-news.firebaseio.com/v0/item/${stories[5]}.json`
      ).then((data) => data.json()),
      fetch(
        `https://hacker-news.firebaseio.com/v0/item/${stories[6]}.json`
      ).then((data) => data.json()),
      fetch(
        `https://hacker-news.firebaseio.com/v0/item/${stories[7]}.json`
      ).then((data) => data.json()),
      fetch(
        `https://hacker-news.firebaseio.com/v0/item/${stories[8]}.json`
      ).then((data) => data.json()),
      fetch(
        `https://hacker-news.firebaseio.com/v0/item/${stories[9]}.json`
      ).then((data) => data.json()),
    ]);

    try {
      let [
        user1,
        user2,
        user3,
        user4,
        user5,
        user6,
        user7,
        user8,
        user9,
        user10,
      ] = await Promise.all([
        fetch(
          `https://hacker-news.firebaseio.com/v0/user/${story1.by}.json`
        ).then((data) => data.json()),
        fetch(
          `https://hacker-news.firebaseio.com/v0/user/${story2.by}.json`
        ).then((data) => data.json()),
        fetch(
          `https://hacker-news.firebaseio.com/v0/user/${story3.by}.json`
        ).then((data) => data.json()),
        fetch(
          `https://hacker-news.firebaseio.com/v0/user/${story4.by}.json`
        ).then((data) => data.json()),
        fetch(
          `https://hacker-news.firebaseio.com/v0/user/${story5.by}.json`
        ).then((data) => data.json()),
        fetch(
          `https://hacker-news.firebaseio.com/v0/user/${story6.by}.json`
        ).then((data) => data.json()),
        fetch(
          `https://hacker-news.firebaseio.com/v0/user/${story7.by}.json`
        ).then((data) => data.json()),
        fetch(
          `https://hacker-news.firebaseio.com/v0/user/${story8.by}.json`
        ).then((data) => data.json()),
        fetch(
          `https://hacker-news.firebaseio.com/v0/user/${story9.by}.json`
        ).then((data) => data.json()),
        fetch(
          `https://hacker-news.firebaseio.com/v0/user/${story10.by}.json`
        ).then((data) => data.json()),
      ]);

      const storyWithUser1 = {
        ...story1,
        username: user1.id,
        karma: user1.karma,
      };
      const storyWithUser2 = {
        ...story2,
        username: user2.id,
        karma: user2.karma,
      };
      const storyWithUser3 = {
        ...story3,
        username: user3.id,
        karma: user3.karma,
      };
      const storyWithUser4 = {
        ...story4,
        username: user4.id,
        karma: user4.karma,
      };
      const storyWithUser5 = {
        ...story5,
        username: user5.id,
        karma: user5.karma,
      };
      const storyWithUser6 = {
        ...story6,
        username: user6.id,
        karma: user6.karma,
      };
      const storyWithUser7 = {
        ...story7,
        username: user7.id,
        karma: user7.karma,
      };
      const storyWithUser8 = {
        ...story8,
        username: user8.id,
        karma: user8.karma,
      };
      const storyWithUser9 = {
        ...story9,
        username: user9.id,
        karma: user9.karma,
      };
      const storyWithUser10 = {
        ...story10,
        username: user10.id,
        karma: user10.karma,
      };

      tenStories.push(
        storyWithUser1,
        storyWithUser2,
        storyWithUser3,
        storyWithUser4,
        storyWithUser5,
        storyWithUser6,
        storyWithUser7,
        storyWithUser8,
        storyWithUser9,
        storyWithUser10
      );

      tenStories.sort((a, b) =>
        a.score > b.score ? 1 : b.score > a.score ? -1 : 0
      );
    } catch (err) {
      throw new Error("Something went wrong with fetching the users: " + err);
    }
    return tenStories;
  } catch (err) {
    throw new Error("Something went wrong with fetching the stories: " + err);
  }
}

export default async function TopStories() {
  const data = await getData();
  const randomNum = (stories: number[]) => {
    return Math.floor(Math.random() * stories.length);
  };

  const getTenRandomStories = (stories: number[]) => {
    const tenStories = [];
    for (let i = 0; i < 10; i++) {
      // prone to repeating stories
      tenStories.push(stories[randomNum(stories)]);
    }
    return tenStories;
  };
  const tenRandomStories = getTenRandomStories(data); // picks the ID's of the 10 stories
  const currentTenStories = await grabTen(tenRandomStories); // pulls the data with the IDs

  return (
    <section className={styles.section}>
      {currentTenStories.map((story) => {
        const date = new Date(Number(story.time));
        const formattedDate = `${date.getDate()}/${
          date.getMonth() + 1
        }/${date.getFullYear()}`;
        return (
          <Story
            by={story.by}
            img={story.img}
            karma={story.karma}
            score={story.score}
            timestamp={formattedDate}
            title={story.title}
            url={story.url}
            key={story.title}
          />
        );
      })}
    </section>
  );
}
