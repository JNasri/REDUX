// this is the component that will be used in the application
// to show all posts in the state as a list of posts

// importing the useSelector to access and select from the store
import { useSelector } from "react-redux";
// import the const that gets all posts from the postSlice
import { selectAllPosts } from "./postsSlice";

// this is the component to be used
const PostsList = () => {
  // get the posts using the selectAllPosts imported from the slice
  const posts = useSelector(selectAllPosts);

  // redner each post as an article
  const renderedPost = posts.map((post) => (
    <article key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.content.substring(0, 100)}</p>
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
