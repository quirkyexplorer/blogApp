
import BlogView from "./BlogView.jsx";

export default function BlogList({sortedBlogs, deleteBlog, currentUser}) {
  return (
    <div>
      <div className=''>
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
  )
}
