// this is the component that will be used in the application
// to show a form for the user to add a new post

// importing useState
import { useState } from "react";
// import useDispatch to dispatch new data to the state
import { useDispatch, useSelector } from "react-redux";
// get the postAdded reducer to use it here
import { addNewPost } from "./postsSlice";
// import the const that gets all users from the userSlice
import { selectAllUsers } from "../users/usersSlice";

const AddPostForm = () => {
  // create hooks for title, content and userId (id is incremental no need)
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");
  // create hook for the statue of adding a new post (idle is default)
  const [addRequestStatus, setAddRequestStatus] = useState("idle");
  // tree functoins used down there in the form to listen for changes in the title
  // input or the content input or the author input
  const onTitleChange = (e) => setTitle(e.target.value);
  const onContentChange = (e) => setContent(e.target.value);
  const onAuthorChange = (e) => setUserId(e.target.value);

  // create the dispatch using the useDispatch hook
  const dispatch = useDispatch();

  // get all users using the selector
  const users = useSelector(selectAllUsers);

  // a boolean to make the submit button disabled when one or more fields are missing
  const canSubmit =
    [title, content, userId].every(Boolean) && addRequestStatus === "idle";

  // a function to save the data entered in the form
  const onSavePostClicked = () => {
    // if canSubmit is true (all is good and we can add a new post)
    if (canSubmit) {
      try {
        // set it to pending (to prevent adding while the add function is running)
        setAddRequestStatus("pending");
        // add a new post and dispatch it
        dispatch(addNewPost({ title, body: content, userId })).unwrap();

        setTitle("");
        setContent("");
        setUserId("");
      } catch (err) {
        console.error("Failed to save the post", err);
      } finally {
        setAddRequestStatus("idle");
      }
    }
  };

  // a function to to map through the users and when the author choose one of
  // the options, we will grab the id using the onAuthorChange. it is used down there
  const userOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  return (
    <section>
      <h2>Add a New Post</h2>
      <form>
        <label htmlFor="postTitle">Title of Post:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChange}
        />
        <label htmlFor="postAuthor">Author of Post:</label>
        <select id="postAuthor" value={userId} onChange={onAuthorChange}>
          <option value=""></option>
          {userOptions}
        </select>
        <label htmlFor="postContent">Content of Post:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChange}
        />
        <button type="button" onClick={onSavePostClicked} disabled={!canSubmit}>
          Save Post
        </button>
      </form>
    </section>
  );
};

export default AddPostForm;
