
import React from 'react';
import { useApp } from '../context/AppContext';

const Marquee: React.FC = () => {
  const { posts, settings } = useApp();
  const livePosts = posts.filter(p => p.status === 'live').slice(0, 5);

  if (livePosts.length === 0) return null;

  return (
    <div className="bg-red-700 text-white overflow-hidden py-2 border-y border-white/20">
      <div className="flex whitespace-nowrap animate-marquee">
        {[...livePosts, ...livePosts].map((post, idx) => (
          <span key={idx} className="mx-8 font-bold text-sm uppercase flex items-center gap-2">
            <span className="bg-yellow-400 text-red-800 px-2 py-0.5 rounded text-[10px]">NEW</span>
            {post.hindiTitle || post.title}
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Marquee;
