import BlogView from "./BlogView.js";
export default function UserBlogList({ sortedBlogs, deleteBlog, currentUser, handleLogout }) {

  return (
    <div >
      <div>
        <div>
          <p>{currentUser.name} logged in</p>
          <button onClick={handleLogout}>logout</button>
        </div>
      </div>
      <div >
        {sortedBlogs.map((blog) => (
          <BlogView
            key={blog.id}
            blog={blog}
            deleteBlog={deleteBlog}
            currentUser={currentUser}
          />
        ))}
      </div>
    </div>
  );
}


 
