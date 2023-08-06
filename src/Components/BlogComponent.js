import { db } from '../firebase';
import { useState, useRef, useEffect } from "react";
import { collection, addDoc, doc, onSnapshot, deleteDoc } from "firebase/firestore";

export default function Blog() {
  const [formData, setFormData] = useState({ title: "", content: "" });
  const [blogs, setBlogs] = useState([]);
  const titleRef = useRef(null);

  useEffect(() => {
    titleRef.current.focus();
    titleRef.current.style.width = "20vw"

  }, []);

  useEffect(() => {
    if (blogs.length && blogs[0].title) {
      document.title = blogs[0].title
    } else {
      document.title = "No blogs"
    }
  }, [blogs]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'blogs'),(snapShot)=>{
      const blogs = snapShot.docs.map((doc)=>{
        return{
          id:doc.id,
          ...doc.data()
        }
      })
      console.log(blogs);
      setBlogs(blogs);
    })
  }, [])


  async function handleSubmit(e) {
    e.preventDefault();

    const docRef = await addDoc(collection(db, 'blogs'), {
      title: formData.title,
      content: formData.content,
      createdAt: new Date()
    })
    console.log(blogs);

    // Clear the input fields after submitting the blog
    setFormData({ title: "", content: "" });

    titleRef.current.focus()
  }

  async function handleRemove(id) {
    // Remove the blog from the Firestore database
    await deleteDoc(doc(db, 'blogs', id));
  }

  return (
    <>
      <h1>Write a blog</h1>
      <div className="section">
        <form onSubmit={handleSubmit}>
          <InputField label="Title">
            <input
              placeholder="Enter the Title here.."
              value={formData.title}
              ref={titleRef}
              required
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </InputField>
          <InputField label="Content">
            <input
              className="content"
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
      {/* Remember that formData is an object with title and content properties. To update just one of these properties without affecting the other, you need to use the spread operator { ...formData } to preserve the existing properties and then update the specific property you want to change. */}

      <h2>Blogs</h2>
      {blogs.map((blog, index) => (
        <div className="blog" key={index}>
          <h3>{blog.title}</h3>
          <p>{blog.content}</p>
          <hr />
          <button className="btn remove" onClick={() => handleRemove(blog.id)}>X</button>
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


