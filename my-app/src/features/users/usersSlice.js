// this code is for handling the users slice

// importing createSlice (and createAsyncThunk after adding URL fetch)
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios to fetch users from the URL
import axios from "axios";
// the URL of our api (the users only)
const USERS_URL = "https://jsonplaceholder.typicode.com/users";

// defining the initial state of the users (delete hardcode and provide fetch of)
const initialState = [];

// fetch the users from the URL using axios
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  // get the data from the url using axios.get
  const response = await axios.get(USERS_URL);
  return response.data;
});

// then we create a user slice
const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  // add a reducer for the URL fetching case, takes builder as parameter
  extraReducers(builder) {
    // builder.addcase() is to add cases (we only need one here)
    builder
      // if URL fetching is fulfilled, return the payload
      .addCase(fetchUsers.fulfilled, (state, action) => {
        return action.payload;
      });
  },
});

// exporting all the users as a variable to import it in the component
export const selectAllUsers = (state) => state.users;

// finally we export the userSlice reducer to import it in the store.js
export default usersSlice.reducer;
