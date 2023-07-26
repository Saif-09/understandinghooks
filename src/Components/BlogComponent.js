import { useEffect, useState } from "react";

export default function Blog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [blogs, setBlogs] = useState([]);

  function handleSubmit(e){
    e.preventDefault();

    // Create a new blog object with the current title and content
    const newBlog = { title, content };

    // Use spread operator to add the new blog to the beginning of the array
    setBlogs([newBlog, ...blogs]);
    console.log(blogs);

     // Clear the input fields after submitting the blog
     setTitle("");
     setContent("");
  }

  return (
    <>
      <h1>Write a blog</h1>
      <div className="section">
        <form onSubmit={handleSubmit}>
        <InputField label="Title">
          <input
            placeholder="Enter the Title here.."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </InputField>
        <InputField label="Content">
          <input
            className="content"
            placeholder="Content goes here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </InputField>
        <button className="btn">Add</button>
        </form>
      </div>
      <hr />

      <h2>Blogs</h2>
      {blogs.map((blog, index) => (
        <div className="blog" key={index}>
          <h3>{blog.title}</h3>
          <p>{blog.content}</p>
          <hr />
        </div>
      ))}
    </>
  );
}

function InputField(props) {
  const { label } = props;
  return (
    <>
      <label>
        {label}
        <br />
      </label>
      {props.children}
      <hr />
    </>
  );
}
