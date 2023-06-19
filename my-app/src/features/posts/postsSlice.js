// this code is for handling the posts slice

// importing createSlice (added createAsyncThunk for getting data from db)
import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
// import the date package to register the date of making a post
import { sub } from "date-fns";
// import axios to fetch data from the URL
import axios from "axios";
// the URL of our api (the posts only)
const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

// defining the initial state of the posts (delete hardcode and provide fetch of)
const initialState = {
  posts: [],
  status: "idle", // idle, loading, succeeded, failed (4 status)
  error: null,
};

// fetch the posts from the URL using axios
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  // get the data from the url using axios.get
  const response = await axios.get(POSTS_URL);
  return response.data;
});

// async function to add a post to the postslist
export const addNewPost = createAsyncThunk(
  "posts/addNewPost",
  async (initialPost) => {
    // get the data from the url using axios.get
    const response = await axios.post(POSTS_URL, initialPost);
    return response.data;
  }
);

// then we create a post slice
const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    // adding a post reducer
    postAdded: {
      reducer(state, action) {
        state.posts.push(action.payload);
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
      const existingPost = state.posts.find((post) => post.id === postId);
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
  },
  // add a reducer for the URL fetching cases, takes builder as parameter
  extraReducers(builder) {
    // builder.addcase() is to add cases one by one
    builder
      // if URL fetching is pending, make statue 'loading'
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = "loading";
      })
      // if URL fetching is fulfilled, make statue 'succeeded'
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        // adding date and reactions if we fecth from URL (they are not provided in the API URL)
        let min = 1;
        const loadedPosts = action.payload.map((post) => {
          post.date = sub(new Date(), { minutes: min++ }).toISOString();
          post.reactions = {
            like: 0,
            wow: 0,
            cool: 0,
            heart: 0,
            coffee: 0,
          };
          return post;
        });
        // Add any fetched posts to the array
        state.posts = state.posts.concat(loadedPosts);
      })
      // if URL fetching is rejected, make statue 'failed' and set the error message
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // if addNewPost() function is fulfilled
      .addCase(addNewPost.fulfilled, (state, action) => {
        // add the extra data on top of the API data (some data like date is not there)
        action.payload.userId = Number(action.payload.userId);
        action.payload.date = new Date().toISOString();
        action.payload.reactions = {
          like: 0,
          wow: 0,
          cool: 0,
          heart: 0,
          coffee: 0,
        };
        // push the extra data to the posts
        state.posts.push(action.payload);
      });
  },
});

// exporting all the posts as a variable to import it in the component
export const selectAllPosts = (state) => state.posts.posts;
// exporting post status to know if fetch is pending, fulfilled or rejected
export const getPostStatus = (state) => state.posts.status;
// exporting post error if needed to show the error
export const getPostError = (state) => state.posts.error;

// exporting the add post reducer functoin
export const { postAdded, reactionAdded } = postsSlice.actions;

// finally we export the postSlice reducer to import it in the store.js
export default postsSlice.reducer;
