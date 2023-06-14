// this is the component that will be used in the application
// to show a form for the user to add a new post

// importing useState
import { useState } from "react";
// import useDispach to dispatch new data to the state
import { useDispatch } from "react-redux";
// get the postAdded reducer to use it here
import { postAdded } from "./postsSlice";

const AddPostForm = () => {
  // create hooks for title and content (id is incremental no need)
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  // two functoins used down there in the form to listen for changes in the title
  // input or the content input
  const onTitleChange = (e) => setTitle(e.target.value);
  const onContentChange = (e) => setContent(e.target.value);

  // create the dispatch using the useDispatch hook
  const dispatch = useDispatch();

  // add a function to save the data entered in the form
  const onSavePostClicked = () => {
    // if both are not empty
    if (title && content) {
      // dispatch (send/link) the data submitted to the state
      dispatch(
        // using the reducer created in the slice to send title and content
        postAdded(title, content)
      );

      // after dispatching, clear the inputs
      setTitle("");
      setContent("");
    }
  };

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
        <label htmlFor="postContent">Content of Post:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChange}
        />
        <button type="button" onClick={onSavePostClicked}>
          Save Post
        </button>
      </form>
    </section>
  );
};

export default AddPostForm;
