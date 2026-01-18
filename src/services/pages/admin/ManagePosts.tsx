
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Trash2, Edit3, CheckCircle, Eye, Archive } from 'lucide-react';

const ManagePosts: React.FC = () => {
  const { posts, setPosts } = useApp();
  const [filter, setFilter] = useState<'all' | 'draft' | 'live'>('all');

  const filteredPosts = posts.filter(p => filter === 'all' ? true : p.status === filter);

  const deletePost = (id: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      setPosts(prev => prev.filter(p => p.id !== id));
    }
  };

  const toggleStatus = (id: string) => {
    setPosts(prev => prev.map(p => {
      if (p.id === id) {
        return { ...p, status: p.status === 'live' ? 'draft' : 'live' };
      }
      return p;
    }));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Content Management</h1>
        <div className="flex bg-white border rounded-lg overflow-hidden p-1 gap-1">
          {(['all', 'draft', 'live'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 text-xs font-bold rounded-md transition uppercase ${filter === f ? 'bg-blue-800 text-white' : 'text-gray-500 hover:bg-gray-100'}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-xs font-bold text-gray-500 uppercase">
            <tr>
              <th className="px-6 py-4">Post Title</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Created</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y text-sm">
            {filteredPosts.map(post => (
              <tr key={post.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 font-bold text-gray-800">{post.hindiTitle || post.title}</td>
                <td className="px-6 py-4">
                  <span className="text-[10px] font-bold bg-blue-50 text-blue-700 px-2 py-0.5 rounded uppercase">{post.category}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${post.status === 'live' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                    {post.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-500">{new Date(post.createdAt).toLocaleDateString()}</td>
                <td className="px-6 py-4 text-right">
                   <div className="flex justify-end gap-2">
                     <button 
                        onClick={() => toggleStatus(post.id)}
                        title={post.status === 'live' ? "Set to Draft" : "Make Live"}
                        className={`p-2 rounded-lg transition ${post.status === 'live' ? 'text-orange-600 hover:bg-orange-50' : 'text-green-600 hover:bg-green-50'}`}
                      >
                       {post.status === 'live' ? <Archive className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                     </button>
                     <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition">
                       <Edit3 className="w-4 h-4" />
                     </button>
                     <button 
                        onClick={() => deletePost(post.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                      >
                       <Trash2 className="w-4 h-4" />
                     </button>
                   </div>
                </td>
              </tr>
            ))}
            {filteredPosts.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-gray-400 italic">No posts found in this section.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManagePosts;
