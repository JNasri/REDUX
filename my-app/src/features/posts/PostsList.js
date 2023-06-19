// this is the component that will be used in the application
// to show all posts in the state as a list of posts

// importing useSelector and dispatch to select from the store
import { useSelector, useDispatch } from "react-redux";
// importing useEffect from react to load the data once its fetch from the URL
import { useEffect } from "react";
// import the consts needed to get the state from the slice
import {
  selectAllPosts,
  getPostStatus,
  getPostError,
  fetchPosts,
} from "./postsSlice";
// import the post excerpt component
import PostsExcerpt from "./PostsExcerpt";

// this is the component to be used
const PostsList = () => {
  // defining a dispatch
  const dispatch = useDispatch();
  // get the posts, status and error message using the selectAllPosts
  const posts = useSelector(selectAllPosts);
  const postStatus = useSelector(getPostStatus);
  const postError = useSelector(getPostError);

  // use the useEffect react hook to get data when page is loaded
  useEffect(() => {
    if (postStatus === "idle") {
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch]);

  // check postStatus and assign the variable 'content' accordingly
  let content;
  if (postStatus === "loading") {
    content = <p>"Loading..."</p>;
  } else if (postStatus === "succeeded") {
    // order posts based on the date
    const orderedPosts = posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date));
    // get all posts based on the key and assign it to content
    content = orderedPosts.map((post) => (
      <PostsExcerpt key={post.id} post={post} />
    ));
  } else if (postStatus === "failed") {
    content = <p>{postError}</p>;
  }

  // return the posts after being rendered into the JSX code
  return (
    <section>
      <h2>Posts</h2>
      {content}
    </section>
  );
};

export default PostsList;
