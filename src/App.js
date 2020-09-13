import React, { useState } from "react";
import "./App.css";
import Post from "./Post";

function App() {
	const [posts, setPosts] = useState([
      {
         username: "Ibby",
         caption: "Component caption",
         imageUrl:
            "https://blog.addthiscdn.com/wp-content/uploads/2014/11/addthis-react-flux-javascript-scaling.png",
      },
      {
         username: "Josh",
         caption: "Josh caption",
         imageUrl:
            "https://blog.addthiscdn.com/wp-content/uploads/2014/11/addthis-react-flux-javascript-scaling.png",
      },
   ]);
   
   return (
      <div className="app">
         <div className="app__header">
            <img
               className="app__headerImage"
               src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
               alt=""
            />
         </div>
         {posts.map((post) => (
            <Post
               username={post.username}
               caption={post.caption}
               imageUrl={post.imageUrl}
            />
         ))}
      </div>
   );
}

export default App;
