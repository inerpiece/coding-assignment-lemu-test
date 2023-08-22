import styles from "../../components/TopStories.module.scss";
import Story from "../../components/Story";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";

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

type Story = {
  by: string;
  title: string;
  timestamp: string;
  karma: number;
  url: string;
  score: number;
};

/*
The below function grabTen() takes an array of numbers (in other words stories's IDs)
and performs a fetch for each story. This could be simplified if the API supports [from, to]
props for fetching multiple stories at once.
*/
export async function getServerSideProps(stories: number[]) {
  // @ts-ignore
  const tenStories = [];

  //couldn't find a less redundant way of fetching 10 unique URLs from the API
  //only 1 at a time is supported
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
      /*
      The below functionality ensures that we pull only the users for the 10 stories we need.
      This could be further improved by checking each of the 10 stories's authors and if there
      are duplicates remove them and keep track only of the unique authors.

      This approach will require to check each of the user's [submitted] property and assign it
      to that specific story.

      TL:DR; Fetching data can be improved
      */
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

      /*
      The below code is responsible for merging the story properties with the [username] and 
      [karma] of its creator. The [username] can be used together with [story.by] to ensure 
      that the proper user has been assigned to the story object. This merge allows for a single 
      object to be carried over props etc.
      */

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

      // sorts the array by score in ascending order
      // b.score - a.score for descending
      tenStories.sort((a, b) => a.score - b.score);
    } catch (err) {
      throw new Error("Something went wrong with fetching the users: " + err);
    }
    return tenStories;
  } catch (err) {
    throw new Error("Something went wrong with fetching the stories: " + err);
  }
}

export default async function DynamicTopStories() {
  //randomNum picks a random number between 0 and the length of the provided array
  const randomNum = (stories: number[]) => {
    return Math.floor(Math.random() * stories.length);
  };

  //getTenRandomStories populates an array and returns it with the IDs of random stories
  const getTenRandomStories = (stories: number[]) => {
    const tenStories = [];
    for (let i = 0; i < 10; i++) {
      // prone to repeating stories
      tenStories.push(stories[randomNum(stories)]);
    }
    return tenStories;
  };
  //How it works:
  //1) pull IDs of topStories
  const data = await getData();
  //2) choose 10 random stories
  const tenRandomStories = getTenRandomStories(data); // picks the ID's of the 10 stories
  //3) pull the content of each of the 10 stories
  const currentTenStories = await getServerSideProps(tenRandomStories); // pulls the data with the IDs
  //4) Hydrate the page with necessary Components and Elements
  return (
    <section className={styles.section}>
      {/* The below functionality is to ensure that the user has a readable timestamp */}
      {currentTenStories.map((story) => {
        const date = new Date(Number(story.time));
        const formattedDate = `${date.getDate()}/${
          date.getMonth() + 1
        }/${date.getFullYear()}`;
        return (
          <Story
            by={story.by}
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
