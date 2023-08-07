import { useState, useEffect, useRef } from 'react';
import { db } from '../firebase';
import { collection, addDoc, onSnapshot, doc, deleteDoc } from "firebase/firestore";


export default function BlogTest() {
    const [formData, setFormData] = useState({});
    const [blogs, setBlogs] = useState([]);

    const titleRef = useRef(null);

    useEffect(() => {
        titleRef.current.focus();
    }, []);

    useEffect(() => {
        if (blogs.length && blogs[0].title) {
            document.title = blogs[0].title;
        } else {
            document.title = "No blogs";
        }
    }, [blogs]);

    useEffect(() => {
        onSnapshot(collection(db, 'blogs'), (snapShot) => {
            const blogs = snapShot.docs.map((doc) => {
                return {
                    id: doc.id,
                    ...doc.data()
                };
            });
            setBlogs(blogs);
        });
         
    }, []);

    const handleSubmit = async (e) => {

        e.preventDefault();
        // setBlogs([{ title: formData.title, content: formData.content }, ...blogs]);

        try {
            const docRef = await addDoc(collection(db, "blogs"), {
                title: formData.title,
                content: formData.content,
                dateCreated: new Date()
            });
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
        setFormData({ title: '', content: '' });
        titleRef.current.focus();
    };

    const handleRemove = async (id) => {
        // const updatedBlogs = [...blogs];
        await deleteDoc(doc(db, "blogs", id));
        // setBlogs([...updatedBlogs]);
    };

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 p-8 bg-slate-200'>
            <div className='bg-white rounded-xl shadow-md p-6 h-auto md:min-h-screen'>
                <h1 className='text-2xl md:text-4xl font-bold text-center mb-6 text-[#161336]'>Add a Blog</h1>

                <form onSubmit={handleSubmit} className='space-y-4'>
                    <Inputs label="Title">
                        <input
                            className='w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                            type="text"
                            ref={titleRef}
                            placeholder='Enter title here'
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        />
                    </Inputs>
                    <Inputs label="Content">
                        <textarea
                            className='w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                            type='text'
                            placeholder='Write your content here'
                            value={formData.content}
                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        />
                    </Inputs>
                    <button className='bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600'>
                        Add
                    </button>
                </form>
            </div>

            <div className='space-y-4'>
                <h1 className='text-2xl md:text-4xl font-bold text-center mb-6 text-[#161336]'>Blogs</h1>
                {blogs.length > 0 ? (
                    blogs.map((blog, index) => (
                        <div key={index} className='bg-white rounded-lg shadow-md p-4'>
                            <h2 className='text-lg font-semibold text-gray-800'>{blog.title}</h2>
                            <p className='mt-2 text-gray-600'>{blog.content}</p>
                            <button onClick={() => handleRemove(blog.id)} className='mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600'>
                                Delete
                            </button>
                        </div>
                    ))
                ) : (
                    <div className='bg-white rounded-lg shadow-md p-4 text-center'>
                        <p className='text-l font-semibold text-gray-800'>No blogs yet. Add blogs to see here.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

function Inputs(props) {
    const { label } = props;
    return (
        <div className='mb-4'>
            <label className='block text-lg font-semibold text-gray-700'>{label}</label>
            {props.children}
        </div>
    );
}
