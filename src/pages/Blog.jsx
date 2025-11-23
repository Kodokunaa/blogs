import React from 'react'
import Layout from '../components/Layout'
import { Link, useParams } from 'react-router-dom'
import timeAgo from '../utilis/timeAgo';

export default function Blog() {
    const { id } = useParams();
    const blogs = JSON.parse(localStorage.getItem('blogs')) || []
    const blog = blogs.find(blog => blog.id == id)
    const users = JSON.parse(localStorage.getItem('users')) || []
    const user = users.find(user => user.isLogin);

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this post?')) {
            const index = blogs.findIndex(blog => blog.id == id);
            blogs.splice(index, 1);
            localStorage.setItem('blogs', JSON.stringify(blogs));
            window.location.href = '/profile';
        }
    }

    if (!blog) {
        return (
            <Layout>
                <div className="flex justify-center py-10">
                    <p className="text-xl text-gray-700">Blog not found</p>
                </div>
            </Layout>
        )
    }

    return (
        <Layout>
            <div className="flex justify-center">
                <div className="w-10/12 p-6">
                    {/* Main blog image */}
                    <img
                        loading="lazy"
                        src={blog.image}
                        alt="blog image"
                        style={{
                            width: '80vw',
                            maxWidth: '100%',
                            minWidth: '80vw',
                            height: '45vh',
                            maxHeight: '45vh',
                            minHeight: '45vh',
                            objectFit: 'cover',
                            borderRadius: '0.5rem'
                        }}
                    />

                    {/* Author and timestamp */}
                    <div className="flex justify-between items-center mt-4">
                        <div className="flex items-center">
                            <div
                                className="bg-cover bg-center w-10 h-10 rounded-full mr-3"
                                style={{ backgroundImage: `url(${blog.profile})` }}
                            ></div>
                            <div>
                                <p className="font-semibold text-gray-700 text-sm capitalize">
                                    By <span className="font-bold">{blog.name}</span>
                                </p>
                            </div>
                        </div>
                        <span className="font-light text-gray-600">{timeAgo(blog.id)}</span>
                    </div>

                    {/* Blog title & description */}
                    <div className="mt-4">
                        <h1 className="text-2xl text-gray-700 font-bold hover:underline capitalize">{blog.title}</h1>
                        <p className="mt-2 text-gray-600">{blog.description}</p>
                    </div>

                    {/* Edit/Delete buttons */}
                    {user && user.username === blog.name && (
                        <div className="text-right mt-4 space-x-2">
                            <Link
                                to={`/edit/${blog.id}`}
                                className="text-xl font-medium text-indigo-500 capitalize"
                            >
                                Edit
                            </Link>
                            <button
                                onClick={handleDelete}
                                className="text-xl font-medium text-red-500"
                            >
                                Delete
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    )
}
