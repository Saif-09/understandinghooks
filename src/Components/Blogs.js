import {useState, useEffect, useRef} from 'react';

export default function Blogs(){

    const [formData, setFormData] = useState({title:"", content:""});
    const [blogs, setBlogs] = useState([])

    const titleRef = useRef(null);

    useEffect(()=>{
        titleRef.current.focus();
    },[])


    const handleSubmit = (e)=>{
        e.preventDefault();

        const newBlog = {title:formData.title, content:formData.content};
        setBlogs([newBlog, ...blogs])


    }

    return(
        <div className='main'>
        <div className='container'>
            <h1 >Add a Blog</h1>
        <div className='wrapper'>
            <form onSubmit={handleSubmit}>
                <InputField label='Title'  >
                    <input 
                    className='input'
                    type="text"
                    name="title"
                    value={formData.title}
                    required
                    ref={titleRef}
                    onChange={(e)=>setFormData({...formData,title:e.target.value})}
                    placeholder='Enter title here'
                    />
                </InputField>
                <InputField label='Content'   >
                    <textarea 
                    className='input content'
                    type = 'text'
                    rows= "50px"
                    value={formData.content}
                    required
                    placeholder ='Enter your blog here...'
                    onChange={(e)=>setFormData({...formData, content:e.target.value})}
                    />
                </InputField>

                <button className='btn1'>ADD</button>

            </form>




        </div>
        </div>
            <div className='blog-container'>
                <h3 className='heading'>Blogs</h3>
                <div className='blogs'>
                    {blogs.map((blog, index) => (
                        <div className='blg' key={index}>
                            <h3>{blog.title}</h3>
                            <p>{blog.content}</p>
                        </div>
                    ))}




                </div>
            </div>
        </div>
    )
}

function InputField(props){
    const {label} = props;
    return(
        <div className='input-label'>
            <label>{label}</label>
            {props.children}
        </div>
    ) 
}