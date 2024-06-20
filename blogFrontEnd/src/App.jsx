import { useState, useEffect, useRef } from "react";
import blogService from "./services/blogs.js";
import loginService from "./services/login.js";
import BlogForm from "./components/BlogForm.jsx";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import LoginView from "./components/LoginView.jsx";
import BlogList from "./components/BlogList";

const titleStyle = {
  fontWeight: 'bold',
  fontSize: '2.5em',
  color: 'hsl(0, 0%, 100%)',
  textShadow: '0 0 10px hsl(0, 0%, 25%), 0 0 15px hsl(0, 0%, 100%), 0 0 30px hsl(0, 0%, 100%)',
};

function App() {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  // const navigate = useNavigate();
  const [message, setMessage] = useState({
    text: "",
    isError: false,
  });
  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((initialBlogs) => {
      setBlogs(initialBlogs);
    });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }

    // // Function to remove the item from localStorage
    // const handleBeforeUnload = () => {
    //   window.localStorage.removeItem("loggedBlogappUser");
    // };

    // // Add the event listener
    // window.addEventListener("beforeunload", handleBeforeUnload);

    // // Cleanup function to remove the event listener
    // return () => {
    //   window.removeEventListener("beforeunload", handleBeforeUnload);
    // };
  }, []);

  const handleLogin = async (userObject) => {
    const { username, password } = userObject;
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      // navigate("/");
    } catch (exception) {
      // exception.response.data.error
      console.log(exception);
      setMessage({
        text: `${exception.response.data.error}`,
        isError: true,
      });
      setTimeout(() => {
        setMessage({
          text: "",
          isError: false,
        });
      }, 5000);
    }
  };

  const handleLogout = async () => {
    window.localStorage.clear();
    window.location.reload();
    // navigate("/login");
  };

  const createBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility();
    try {
      const createdBlog = await blogService.create(blogObject);
      createdBlog.user = user;
      setBlogs(blogs.concat(createdBlog));
      setMessage({
        text: `a new blog ${createdBlog.title} by ${createdBlog.author} added`,
        isError: false,
      });
      setTimeout(() => {
        setMessage({
          text: "",
          isError: false,
        });
      }, 5000);
    } catch (error) {
      setMessage({
        text: `${error.response.data.error}`,
        isError: true,
      });
      setTimeout(() => {
        setMessage({
          text: "",
          isError: false,
        });
      }, 4000);
    }
  };

  const deleteBlog = async (id, title) => {
    try {
      // console.log('blog to be deleted', id);
      if (window.confirm(`Please comfirm you want to delete ${title}`)) {
        blogService.blogDelete(id);
        setBlogs(blogs.filter((blog) => blog.id !== id));
        setMessage({
          text: "blog deleted",
          isError: false,
        });
        setTimeout(() => {
          setMessage({
            text: "",
            isError: false,
          });
        }, 5000);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const formatName = (str) => {
    return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);

  return (
    <div className="bg-custom-gradient bg-full bg-custom-pos  h-fit px-16">
      <div>
        <div className="flex justify-between">
          <h1 className="text-white" style={titleStyle}>DevBlogs</h1>
        </div>
      </div>
      
      {message.text ? (
        <Notification message={message.text} isError={message.isError} />
      ) : undefined}
      {user === null ? (
        <LoginView
          handleLogin={handleLogin}
          handleLogout={handleLogout}
          user={user}
        ></LoginView>
      ) : (
        <div className="flex flex-col gap-8">
          <p className="text-white"> Hello {formatName(user.name)}</p>
          <div>
            <button className="text-white font-semibold px-8 py-2 bg-purple-600 rounded-md" onClick={handleLogout}>logout</button>
          </div>

          <Togglable buttonLabel="New Blog" ref={blogFormRef}>
            <BlogForm createBlog={createBlog} />
          </Togglable>
          <div>
            <h2>Blogs</h2>
            <BlogList
              sortedBlogs={sortedBlogs}
              deleteBlog={deleteBlog}
              currentUser={user}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
