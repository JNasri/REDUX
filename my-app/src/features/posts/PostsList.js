// this is the component that will be used in the application
// to show all posts in the state as a list of posts

// importing the useSelector to access and select from the store
import { useSelector } from "react-redux";
// import the const that gets all posts from the postSlice
import { selectAllPosts } from "./postsSlice";
// import the postAuthor component
import PostAuthor from "./PostAuthor";
// import the timeAgo component
import TimeAgo from "./TimeAgo";
// import the reactoins component
import PostReactions from "./PostReactions";

// this is the component to be used
const PostsList = () => {
  // get the posts using the selectAllPosts imported from the slice
  const posts = useSelector(selectAllPosts);

  // order the posts before showing them based on the date entered
  const orderedPosts = posts
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date));

  // redner each post as an article containing title, content and username
  const renderedPost = orderedPosts.map((post) => (
    <article key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.content.substring(0, 100)}</p>
      <p className="postCredit">
        <PostAuthor userId={post.userId} />
        <TimeAgo timeStamp={post.date} />
      </p>
      <PostReactions post={post} />
    </article>
  ));

  // return the posts after being rendered into the JSX code
  return (
    <section>
      <h2>Posts</h2>
      {renderedPost}
    </section>
  );
};

export default PostsList;
