// this is a component that shows author of the post

// importing selector to access store and selectAllUsers to get the users
import { useSelector } from "react-redux";
import { selectAllUsers } from "../users/usersSlice";

const PostAuthor = ({ userId }) => {
  // get all the users from the store
  const users = useSelector(selectAllUsers);

  // get the author from the users
  const author = users.find((user) => user.id === userId);

  // if found, show name, else show unknown
  return <span>by {author ? author.name : "UnKnown Author"}</span>;
};

export default PostAuthor;
