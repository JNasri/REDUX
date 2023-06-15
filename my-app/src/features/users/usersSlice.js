// this code is for handling the users slice

// importing createSlice
import { createSlice } from "@reduxjs/toolkit";

// defining the initial state of the users (hard coding 3 users)
const initialState = [
  { id: "0", name: "Santa Claus" },
  { id: "1", name: "Kevin Spacy" },
  { id: "2", name: "Morgan Freeman" },
];

// then we create a user slice
const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
});

// exporting all the users as a variable to import it in the component
export const selectAllUsers = (state) => state.users;

// finally we export the userSlice reducer to import it in the store.js
export default usersSlice.reducer;
