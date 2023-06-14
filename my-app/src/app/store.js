// a redux store is a container for all the states in the application

// importing configureStore to create the store using it
import { configureStore } from "@reduxjs/toolkit";

// importing the counter reducer from the counter slice
import counterReducer from "../features/counter/counterSlice";

// saving the sotre in const store and exporting it
export const store = configureStore({
  // reducers are functions that handle actions and update states
  reducer: {
    // the first reducer is the counter reducer
    counter: counterReducer,
  },
});
