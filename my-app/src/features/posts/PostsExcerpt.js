// 'Excerpt' means an optional text associated to a Post
// this component is for information after the post itself

// import the postAuthor component
import PostAuthor from "./PostAuthor";
// import the timeAgo component
import TimeAgo from "./TimeAgo";
// import the reactoins component
import PostReactions from "./PostReactions";

const PostsExcerpt = ({ post }) => {
  return (
    <article>
      <h3>{post.title}</h3>
      <p>{post.body.substring(0, 100)}</p>
      <p className="postCredit">
        <PostAuthor userId={post.userId} />
        <TimeAgo timeStamp={post.date} />
      </p>
      <PostReactions post={post} />
    </article>
  );
};

export default PostsExcerpt;
