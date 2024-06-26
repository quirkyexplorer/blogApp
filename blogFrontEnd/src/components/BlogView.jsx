import { useState, useEffect } from "react";
import likeService from "../services/likes.js";



export default function Blog({ blog, deleteBlog, currentUser }) {
  const [visible, setVisible] = useState(false);
  const [likes, setLikes] = useState(blog.likes);
  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };
  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useEffect(() => {
    // This effect will run whenever the 'likes' state changes
    likeService.getById(blog.id).then((temp) => {
      setLikes(temp.likes);
    });
    // You can perform any additional actions here if needed
  }, [likes]);

  const handleLikes = async () => {
    let newLikes = 1;
    await likeService.updateLikes(blog.id, { likes: newLikes });
    setLikes((prevLikes) => prevLikes + newLikes);
  };

  //  conditionally renders the remove button
  const removeButton = () => {
    
    const handleClick = () => {
      deleteBlog(blog.id, blog.title);
    };

    return (
      <div>
        {/* {console.log('user username',user.username, 'blog username', blog.user.username)} */}
        {currentUser.username === blog.user.username ? (
          <button className="remove bg-white w-20 rounded-md" onClick={handleClick}>
            remove
          </button>
        ) : null}
      </div>
    );
  };

  return (
    <div className="bg-button-gradient rounded-md p-4 w-fit" >
      <div className="text-black gap-4">
        <div>
            {blog.title} by {blog.author}
        </div>

      
        <button
          className="viewHidden text-lg font-bold"
          onClick={toggleVisibility}
          style={hideWhenVisible}
        >
          view
        </button>

        <button
          className="hide text-lg font-bold"
          onClick={toggleVisibility}
          style={showWhenVisible}
        >
          hide
        </button>
        
      </div>
      <div className="info" style={showWhenVisible}>
        <p className="url">{blog.url}</p>
        <div className="flex gap-4">
          {likes}
          
          <button className="likesButton" onClick={handleLikes}>
          <p className="likes bg-white w-12 rounded-md">
            Like
          </p>
            
          </button>
         
        </div>
        
        <p className="username">
          {/* fix me, call the latest user */}
          {blog.user.username}
        </p>
        {removeButton()}
      </div>
    </div>
  );
}

