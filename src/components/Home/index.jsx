import { useState, useEffect } from "react";

export const Home = () => {

  const [posts, setPosts] = useState('');

  useEffect(() => {

    fetch("http://localhost:1337/api/posts", {
      method: 'get',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response) => response.json())
    .then((response) => {setPosts(response);
    })
  },[])

  function PostsList({ posts }) {
    if (!posts || posts.length === 0) {
      return <ErrorMessage message="Vide" />;
    }
  
    return (
      <div className="posts">
      <h3>POSTS LIST</h3>
        {posts.map(post => (
          <div className="post" key={post.id}>
            <p>{post.attributes.texte}</p>
          </div>
        ))}
      </div>
    );
  } 

}