
import React from 'react';
import { useApp } from '../context/AppContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Marquee from '../components/Marquee';
import { Link } from 'react-router-dom';
import { CATEGORIES } from '../constants';
import { ExternalLink, Clock, User } from 'lucide-react';

const HomePage: React.FC = () => {
  const { posts, settings, blogs } = useApp();
  const livePosts = posts.filter(p => p.status === 'live');

  const getPostsByCategory = (category: string) => 
    livePosts.filter(p => p.category === category).slice(0, 15);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Marquee />

      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Top Featured Area */}
        <section className="mb-12">
          <h2 className="text-xl font-bold border-l-4 border-red-600 pl-3 mb-6">Top Highlights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {livePosts.slice(0, 4).map(post => (
              <Link 
                key={post.id}
                to={`/post/${post.id}`}
                className="bg-white p-4 border rounded shadow-sm hover:shadow-md transition-all group"
              >
                <div className="text-[10px] font-bold text-blue-600 uppercase mb-2">{post.category}</div>
                <h3 className="font-bold text-gray-800 group-hover:text-red-600 transition">
                  {post.hindiTitle || post.title}
                </h3>
              </Link>
            ))}
          </div>
        </section>

        {/* The 6 Column Layout */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {CATEGORIES.map(category => (
            <div key={category} className="bg-white border rounded shadow-sm overflow-hidden flex flex-col">
              <div 
                className="px-4 py-2 text-white font-bold flex justify-between items-center"
                style={{ backgroundColor: settings.primaryColor }}
              >
                <span>{category}</span>
                <Link to="/" className="text-[10px] hover:underline">View All</Link>
              </div>
              <div className="flex-1 p-2">
                <ul className="divide-y text-sm">
                  {getPostsByCategory(category).map(post => (
                    <li key={post.id} className="py-2">
                      <Link 
                        to={`/post/${post.id}`} 
                        className="text-blue-800 hover:text-red-600 hover:underline block"
                      >
                        {post.hindiTitle || post.title}
                        {new Date(post.createdAt).getTime() > Date.now() - 86400000 && (
                           <span className="ml-2 bg-red-500 text-white text-[9px] px-1 rounded animate-pulse">NEW</span>
                        )}
                      </Link>
                    </li>
                  ))}
                  {getPostsByCategory(category).length === 0 && (
                    <li className="py-4 text-center text-gray-400 italic">No updates available</li>
                  )}
                </ul>
              </div>
            </div>
          ))}
        </section>

        {/* Large Blog Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold border-l-4 border-blue-800 pl-4 mb-8">Latest Career Blogs & Guidance</h2>
          <div className="space-y-8">
            {blogs.slice(0, 5).map(blog => (
              <article key={blog.id} className="bg-white p-6 rounded-xl border shadow-sm flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-1/4 h-48 bg-gray-100 rounded-lg overflow-hidden">
                   <img src={`https://picsum.photos/seed/${blog.id}/400/300`} className="w-full h-full object-cover" alt="blog" />
                </div>
                <div className="flex-1 flex flex-col">
                   <div className="flex items-center gap-4 text-xs text-gray-500 mb-2">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3"/> {new Date(blog.createdAt).toLocaleDateString()}</span>
                      <span className="flex items-center gap-1"><User className="w-3 h-3"/> Admin</span>
                   </div>
                   <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-blue-700 cursor-pointer">{blog.title}</h3>
                   <div className="text-gray-600 text-sm line-clamp-3 mb-4" dangerouslySetInnerHTML={{ __html: blog.content }} />
                   <button className="mt-auto self-start text-blue-700 font-bold text-sm hover:underline">Read Detailed Article →</button>
                </div>
              </article>
            ))}
            {blogs.length === 0 && (
              <div className="text-center py-12 bg-white rounded border">
                <p className="text-gray-400">Our team is working on some amazing guidance articles. Check back soon!</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;
