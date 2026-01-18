
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { generatePostFromTitle, fetchLatestJobsFromWeb } from '../../services/gemini';
import { CATEGORIES } from '../../constants';
import { Zap, Loader2, Search, Wand2, Plus, RefreshCw } from 'lucide-react';
import { Post } from '../../types';

const PostGenerator: React.FC = () => {
  const { setPosts, posts } = useApp();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [loading, setLoading] = useState(false);
  const [fetchingWeb, setFetchingWeb] = useState(false);
  const [error, setError] = useState('');
  const [webDrafts, setWebDrafts] = useState<Partial<Post>[]>([]);

  const handleGenerate = async () => {
    if (!title.trim()) return;
    setLoading(true);
    setError('');
    try {
      const newPost = await generatePostFromTitle(title, category);
      setPosts(prev => [...prev, newPost as Post]);
      setTitle('');
      alert('Post generated and saved to Drafts!');
    } catch (err: any) {
      setError(err.message || 'Failed to generate post');
    } finally {
      setLoading(false);
    }
  };

  const handleFetchDrafts = async () => {
    setFetchingWeb(true);
    try {
      const results = await fetchLatestJobsFromWeb();
      setWebDrafts(results);
    } catch (err) {
      setError('Failed to fetch web drafts');
    } finally {
      setFetchingWeb(false);
    }
  };

  const handleConvertDraft = async (draft: Partial<Post>) => {
    setLoading(true);
    try {
      const fullPost = await generatePostFromTitle(draft.title!, draft.category as any);
      setPosts(prev => [...prev, fullPost as Post]);
      setWebDrafts(prev => prev.filter(d => d.title !== draft.title));
      alert('Draft converted to full post!');
    } catch (err) {
      alert('Failed to generate full post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 flex items-center gap-3">
        <Wand2 className="text-purple-600" /> AI Content Engine
      </h1>
      <p className="text-gray-500 mb-8">Generate official government recruitment notifications using advanced AI grounding.</p>

      {/* Manual AI Generator */}
      <div className="bg-white p-6 rounded-xl border shadow-sm mb-12">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5 text-yellow-500" /> Generate by Title
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Exam/Post Title</label>
            <input 
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. SSC GD Constable 2025" 
              className="w-full px-4 py-2 border rounded-lg focus:ring-2"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Category</label>
            <select 
              value={category}
              onChange={(e) => setCategory(e.target.value as any)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2"
            >
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>
        <button 
          onClick={handleGenerate}
          disabled={loading || !title}
          className="w-full md:w-auto px-8 py-3 bg-purple-600 text-white rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-purple-700 disabled:opacity-50 transition"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Zap className="w-5 h-5" />}
          Generate Full Official Post
        </button>
        {error && <p className="mt-4 text-red-500 text-sm">{error}</p>}
      </div>

      {/* Web Scout Drafts */}
      <div className="bg-white p-6 rounded-xl border shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Search className="w-5 h-5 text-blue-500" /> Web Scout Drafts (Latest from Web)
          </h2>
          <button 
            onClick={handleFetchDrafts}
            disabled={fetchingWeb}
            className="text-sm font-bold text-blue-600 flex items-center gap-1 hover:underline"
          >
            <RefreshCw className={`w-4 h-4 ${fetchingWeb ? 'animate-spin' : ''}`} /> Sync with Google
          </button>
        </div>
        
        {webDrafts.length > 0 ? (
          <div className="space-y-3">
            {webDrafts.map((draft, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 border rounded-lg bg-gray-50">
                <div>
                  <p className="font-bold text-gray-800">{draft.title}</p>
                  <p className="text-xs text-blue-600 font-medium uppercase">{draft.category}</p>
                </div>
                <button 
                  onClick={() => handleConvertDraft(draft)}
                  className="bg-white border border-blue-600 text-blue-600 px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-blue-50 transition flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" /> Create Post
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 border-2 border-dashed rounded-lg bg-gray-50 text-gray-400">
            {fetchingWeb ? 'Scouting for new vacancies...' : 'Click "Sync with Google" to find new vacancy ideas automatically.'}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostGenerator;
