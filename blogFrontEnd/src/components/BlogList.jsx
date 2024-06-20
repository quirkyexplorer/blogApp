
import BlogView from "./BlogView.jsx";

export default function BlogList({sortedBlogs, deleteBlog, currentUser}) {
  return (
    <div className="h-full">
      <div className=' flex flex-col gap-4 flex-wrap'>
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
