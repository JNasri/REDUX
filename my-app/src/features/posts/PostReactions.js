// this is a component that shows reactions under each post

// dispatch to update the reactions after it is added
import { useDispatch } from "react-redux";
// import the reactionAdded from the postSlice
import { reactionAdded } from "./postsSlice";

// create our emojies to show
const Emojis = {
  like: "👍",
  wow: "😮",
  cool: "🚀",
  heart: "❤️",
  coffee: "☕",
};

const PostReactions = ({ post }) => {
  // create a dispatch
  const dispatch = useDispatch();

  //
  const postReactoins = Object.entries(Emojis).map(([name, emoji]) => {
    return (
      <button
        key={name}
        type="button"
        className="reactionButton"
        onClick={() =>
          dispatch(reactionAdded({ postId: post.id, reaction: name }))
        }
      >
        {emoji} {post.reactions[name]}
      </button>
    );
  });

  //

  return <div>{postReactoins}</div>;
};

export default PostReactions;
