import { useEffect, useState } from "react";

export default function Blog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  function handleSubmit(e){
    e.preventDefault();
    
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
      <h3>{title}</h3>
      <p>{content}</p>
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
