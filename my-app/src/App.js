// importing components used in our app
import PostsList from "./features/posts/PostsList";
// import the add post form component
import AddPostForm from "./features/posts/AddPostForm";

function App() {
  return (
    <main className="App">
      <AddPostForm />
      <PostsList />
    </main>
  );
}

export default App;
