import { db } from '../firebase';
import { useState, useRef, useEffect } from "react";
import { collection, addDoc, doc, onSnapshot, deleteDoc } from "firebase/firestore";

export default function Blog() {
  const [formData, setFormData] = useState({ title: "", content: "" });
  const [blogs, setBlogs] = useState([]);
  const titleRef = useRef(null);

  useEffect(() => {
    titleRef.current.focus();
    titleRef.current.style.width = "20vw";

  }, []);

  useEffect(() => {
    if (blogs.length && blogs[0].title) {
      document.title = blogs[0].title;
    } else {
      document.title = "No blogs";
    }
  }, [blogs]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'blogs'), (snapShot) => {
      const blogs = snapShot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data()
        };
      });
      setBlogs(blogs);
    });
    return () => unsub(); // Cleanup function to unsubscribe from the snapshot listener
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    await addDoc(collection(db, 'blogs'), {
      title: formData.title,
      content: formData.content,
      createdAt: new Date()
    });

    // Clear the input fields after submitting the blog
    setFormData({ title: "", content: "" });
    titleRef.current.focus();
  }

  async function handleRemove(id) {
    // Remove the blog from the Firestore database
    await deleteDoc(doc(db, 'blogs', id));
  }

  return (
    <div className="blog-container">
      <h1 className="font-bold text-[red]" >Write a Blog</h1>
      <div className="section">
        <form onSubmit={handleSubmit}>
          <InputField label="Title">
            <input
              className="input"
              placeholder="Enter the Title here.."
              value={formData.title}
              ref={titleRef}
              required
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </InputField>
          <InputField label="Content">
            <textarea
              className="input content"
              placeholder="Content goes here..."
              value={formData.content}
              required
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            />
          </InputField>
          <button className="btn" >Add</button>
        </form>
      </div>
      <hr />
      <h2>Blogs</h2>
      {blogs.map((blog, index) => (
        <div className="blog" key={index}>
          <h3>{blog.title}</h3>
          <p>{blog.content}</p>
          <button className="btn remove" onClick={() => handleRemove(blog.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

function InputField(props) {
  const { label } = props;
  return (
    <div className="input-field">
      <label>{label}</label>
      {props.children}
    </div>
  );
}
