import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// importing the redux store we created and the Provider to make the store global
// for the whole application (like the context API and useContext hook).
import { store } from "./app/store";
import { Provider } from "react-redux";
// importing the fetchUsers to load users immediately when the app loads
import { fetchUsers } from "./features/users/usersSlice";
// load the user from the store
store.dispatch(fetchUsers());

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
