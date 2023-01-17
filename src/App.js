import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { useState, useEffect } from "react";

import "./App.css";
import Post from "./components/Post";
import { db } from "./firebase";
import ImageUpload from "./components/ImageUpload";
import NavBar from "./components/NavBar";

function App() {
  // Hooks
  const [posts, setPosts] = useState([]);  
  const [user, setUser] = useState(null);

  // This runs every single time posts get updated
  useEffect(() => {
    fetchPosts();
  }, [posts]);

  // Custom functions
  const fetchPosts = () => {
    const docRef = query(collection(db, "posts"), orderBy("timestamp", "desc"));
    const unsub = onSnapshot(docRef, (docsSnap) => {
      const data = docsSnap.docs.map((doc) => {
        return {
          id: doc.id,
          post: doc.data(),
        };
      });
      setPosts(data);
    });

    return () => {
      unsub();
    };
  };

  return (
    <div className="app">
      <NavBar user={user} setUser={setUser}/>
      <div className="app__posts">
        <div className="app__postsLeft">
          {posts.map(({ id, post }) => {
            return (
              <Post
                key={id}
                postId={id}
                userName={post.username}
                imgURL={post.imageURL}
                avatarURL={post.avatarURL}
                caption={post.caption}
                user={user}
              />
            );
          })}
        </div>
      </div>

      {user?.displayName ? (
        <ImageUpload username={user.displayName} />
      ) : (
        <h3 className="app__imageUpload">Login to upload Posts!</h3>
      )}
    </div>
  );
}

export default App;
