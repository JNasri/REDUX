// this code is for handling the posts slice

// importing createSlice
import { createSlice, nanoid } from "@reduxjs/toolkit";

// defining the initial state of the posts (hard coding two posts)
const initialState = [
  { id: "1", title: "Redux, is it good?", content: "I do not know, yet" },
  { id: "2", title: "Redux, is it bad?", content: "I do not know, yet" },
];

// then we create a post slice
const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(title, content) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
          },
        };
      },
    },
  },
});

// exporting all the posts as a variable to import it in the component
export const selectAllPosts = (state) => state.posts;

// exporting the add post reducer functoin
export const { postAdded } = postsSlice.actions;

// finally we export the postSlice reducer to import it in the store.js
export default postsSlice.reducer;
