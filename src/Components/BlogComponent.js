import {db} from '../firebase';
import { useState, useRef, useEffect, useReducer } from "react";
import {collection, addDoc, getDocs} from "firebase/firestore";

function blogsReducer(state,action){
  switch(action.type){
    case "ADD":
      return [action.blog, ...state];

      case "REMOVE":
        return state.filter((blog,index)=> index!==action.index);

      default :
       return[];
      
  }

}

export default function Blog() {
  const [formData, setFormData] = useState({ title: "", content: "" });
  // const [blogs, setBlogs] = useState([]);[]
  const[blogs, dispatch] = useReducer(blogsReducer,[] )

  const titleRef = useRef(null);

  useEffect(()=>{
    titleRef.current.focus();
    titleRef.current.style.width = "20vw"

  },[]);

  useEffect(()=>{
    if(blogs.length && blogs[0].title){
      document.title = blogs[0].title
    }else{
      document.title = "No blogs"
    }
  },[blogs]);

  // useEffect(() => {
  //   getDocs(collection(db, 'blogs'))
  //     .then((snapshot) => {
  //       snapshot.docs.forEach((doc) => dispatch({
  //         type: 'Add',
  //         data: {
  //           ...(doc.data()),
  //           uid: doc.id
  //         }
  //       }))
  //     }).catch((err) => { console.error("Error getting documents:", err) })
  // }, [])

  useEffect(() => {

    async function fetchData() {
      try {
        const snapshot = await getDocs(collection(db, 'blogs'));
        console.log(snapshot);
        const blogs = snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data()
          }
        });
        dispatch({
          type: 'ADD',
          blog: blogs
        })
      }
      catch {
        alert('Failed To Fetch Data');
      }

    }
    fetchData();
  }, [])



  async function handleSubmit(e) {
    e.preventDefault();

    // Create a new blog object with the current title and content
    // const newBlog = { title: formData.title, content: formData.content };

    // Use spread operator to add the new blog to the beginning of the array
    // setBlogs([newBlog, ...blogs]);
    // dispatch({
    //   type:"Add",
    //   blog: { title: formData.title, content: formData.content }
    // })
    const docRef = await addDoc(collection(db, 'blogs'),{
      title :formData.title,
      content: formData.content,
      createdAt: new Date()
    })
    console.log(blogs);

    // Clear the input fields after submitting the blog
    setFormData({ title: "", content: "" });

    titleRef.current.focus()
  }

  function handleRemove(index) {
    // Create a copy of the blogs array and remove the blog at the specified index
    const updatedBlogs = [...blogs];
    updatedBlogs.splice(index, 1);
    // setBlogs(updatedBlogs);
    dispatch({
      type:'REMOVE',
      index: index
    })
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
              ref = {titleRef}
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
          <button className="btn remove" onClick={() => handleRemove(index)}>X</button>
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
