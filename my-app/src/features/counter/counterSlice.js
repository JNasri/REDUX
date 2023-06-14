// a slice refers to a portion of the Redux store that is responsible for managing a specific section of the application state.
// for example, the app might have a comment feature and a post feature. Each feature will have a slice that will the logic of each feature.

// this file is for the first feature and it's simply a counter

// importing the createSLice for the counter we need to implement
import { createSlice } from "@reduxjs/toolkit";

// create the initial state of the counter (0)
const initialState = {
  count: 0,
};

// after setting the defaul value, we create our slice for the counter
export const counterSlice = createSlice({
  // 1) a name for the slice
  name: "The Best Counter in the Whole World",
  // 2) initial state for the slice (we did that above)
  initialState,
  // 3) reducers, which are functions that edit and update the slice
  reducers: {
    // 1) increment counter, takes current state as parameter and ++
    increment: (state) => {
      state.count += 1;
    },
    // 2) decrement counter, takes current state as parameter and --
    decrement: (state) => {
      state.count -= 1;
    },
    // 3) reset, resets the counter value
    reset: (state) => {
      state.count = 0;
    },
    // 3) incrementByAmount, takes amount in form and increment with it
    // notice it take not just the state, but an action too
    incrementByAmount: (state, action) => {
      // we get the payload (value) from the action and add it to the counter
      state.count += action.payload;
    },
  },
});

// now we need to export the reducers to be able to import them later
export const { increment, decrement, reset, incrementByAmount } =
  counterSlice.actions;

// finally, we export the whole counterSlice to import it where we need
export default counterSlice.reducer;
