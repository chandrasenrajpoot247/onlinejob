
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Plus, Trash2, Edit3 } from 'lucide-react';

const StaticPagesManager: React.FC = () => {
  const { pages, setPages } = useApp();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const savePage = () => {
    if (!title || !content) return;
    if (editingId) {
      setPages(prev => prev.map(p => p.id === editingId ? { ...p, title, content } : p));
      setEditingId(null);
    } else {
      const newPage = {
        id: Math.random().toString(36).substr(2, 9),
        title,
        content,
        slug: title.toLowerCase().replace(/ /g, '-')
      };
      setPages(prev => [...prev, newPage]);
    }
    setTitle('');
    setContent('');
  };

  const startEdit = (p: any) => {
    setEditingId(p.id);
    setTitle(p.title);
    setContent(p.content);
  };

  const deletePage = (id: string) => {
    if (window.confirm('Delete this page?')) {
      setPages(prev => prev.filter(p => p.id !== id));
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Static Pages Manager</h1>

      <div className="bg-white p-6 rounded-xl border shadow-sm mb-12">
        <h2 className="text-lg font-bold mb-4">{editingId ? 'Edit Page' : 'Create New Static Page'}</h2>
        <div className="space-y-4">
           <input 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Page Title (e.g. About Us)" 
            className="w-full p-2 border rounded-lg"
           />
           <textarea 
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={6}
            placeholder="Page Content..." 
            className="w-full p-2 border rounded-lg"
           />
           <div className="flex gap-2">
             <button onClick={savePage} className="flex-1 bg-blue-800 text-white py-2 rounded-lg font-bold">{editingId ? 'Update Page' : 'Add Page'}</button>
             {editingId && <button onClick={() => setEditingId(null)} className="px-6 bg-gray-100 py-2 rounded-lg">Cancel</button>}
           </div>
        </div>
      </div>

      <div className="space-y-4">
        {pages.map(page => (
          <div key={page.id} className="bg-white p-4 rounded-lg border flex items-center justify-between">
            <div>
              <p className="font-bold text-gray-800">{page.title}</p>
              <p className="text-xs text-gray-400">/page/{page.slug}</p>
            </div>
            <div className="flex gap-2">
               <button onClick={() => startEdit(page)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><Edit3 className="w-5 h-5" /></button>
               <button onClick={() => deletePage(page.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 className="w-5 h-5" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StaticPagesManager;
