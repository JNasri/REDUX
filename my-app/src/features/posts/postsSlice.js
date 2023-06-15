// this code is for handling the posts slice

// importing createSlice
import { createSlice, nanoid } from "@reduxjs/toolkit";
// import the date package to register the date of making a post
import { sub } from "date-fns";

// defining the initial state of the posts (hard coding two posts)
const initialState = [
  {
    id: "1",
    title: "Redux, is it good?",
    content: "I do not know, yet",
    userId: "0",
    // generate dummy date to show it
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    reactions: {
      like: 0,
      wow: 0,
      cool: 0,
      heart: 0,
      coffee: 0,
    },
  },
  {
    id: "2",
    title: "Redux, is it bad?",
    content: "I do not know, yet",
    // generate dummy date to show it
    date: sub(new Date(), { minutes: 5 }).toISOString(),
    reactions: {
      like: 0,
      wow: 0,
      cool: 0,
      heart: 0,
      coffee: 0,
    },
  },
];

// then we create a post slice
const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    // adding a post reducer
    postAdded: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            userId,
            // save the date of current time
            date: new Date().toISOString(),
            reactions: {
              like: 0,
              wow: 0,
              cool: 0,
              heart: 0,
              coffee: 0,
            },
          },
        };
      },
    },
    // adding a react to a post reducer
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload;
      const existingPost = state.find((post) => post.id === postId);
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
  },
});

// exporting all the posts as a variable to import it in the component
export const selectAllPosts = (state) => state.posts;

// exporting the add post reducer functoin
export const { postAdded, reactionAdded } = postsSlice.actions;

// finally we export the postSlice reducer to import it in the store.js
export default postsSlice.reducer;
