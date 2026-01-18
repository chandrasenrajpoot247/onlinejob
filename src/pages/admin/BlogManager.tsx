
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Plus, Trash2, BookOpen } from 'lucide-react';

const BlogManager: React.FC = () => {
  const { blogs, setBlogs } = useApp();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const addBlog = () => {
    if (!title || !content) return;
    const newBlog = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      content,
      createdAt: new Date().toISOString()
    };
    setBlogs(prev => [newBlog, ...prev]);
    setTitle('');
    setContent('');
    alert('Blog article published!');
  };

  const deleteBlog = (id: string) => {
    if (window.confirm('Delete this article?')) {
      setBlogs(prev => prev.filter(b => b.id !== id));
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
        <BookOpen className="text-blue-700" /> Blog & Guidance Manager
      </h1>

      <div className="bg-white p-6 rounded-xl border shadow-sm mb-12">
        <h2 className="text-lg font-bold mb-4">Create New Article</h2>
        <div className="space-y-4">
          <input 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Article Title (e.g. How to crack UPSC in first attempt)" 
            className="w-full p-3 border rounded-lg text-lg font-bold"
          />
          <textarea 
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={8}
            placeholder="Write your content here (2000 - 10000 words supported)..." 
            className="w-full p-3 border rounded-lg"
          />
          <button 
            onClick={addBlog}
            className="w-full bg-blue-700 text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-blue-800 transition"
          >
            <Plus className="w-5 h-5" /> Publish Blog Post
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold">Manage Articles</h2>
        {blogs.map(blog => (
          <div key={blog.id} className="bg-white p-4 rounded-lg border flex items-center justify-between">
            <div>
              <p className="font-bold text-gray-800">{blog.title}</p>
              <p className="text-xs text-gray-400">{new Date(blog.createdAt).toLocaleDateString()}</p>
            </div>
            <button onClick={() => deleteBlog(blog.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))}
        {blogs.length === 0 && <p className="text-center py-8 text-gray-400 italic">No blog posts found.</p>}
      </div>
    </div>
  );
};

export default BlogManager;
