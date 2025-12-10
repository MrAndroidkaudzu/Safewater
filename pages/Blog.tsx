import React from 'react';
import { useSite } from '../context/SiteContext';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Blog = () => {
  const { posts, isAdmin } = useSite();

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        
        <div className="flex justify-between items-center mb-10">
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold text-secondary mb-2">Our Stories</h1>
            <p className="text-gray-600">Updates from the field and stories of change.</p>
          </div>
          
          {isAdmin && (
            <Link 
              to="/admin"
              className="bg-secondary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-black shadow-md transition-all text-sm font-bold"
            >
              Manage Posts
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map(post => (
            <article key={post.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-gray-100 flex flex-col">
              <div className="h-64 overflow-hidden relative group">
                <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                  <span className="flex items-center gap-1"><Calendar size={14} /> {new Date(post.date).toLocaleDateString()}</span>
                  <span className="flex items-center gap-1"><User size={14} /> {post.author}</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-3">{post.title}</h2>
                <p className="text-gray-600 mb-4 flex-grow">{post.excerpt}</p>
                
                {/* Expandable content simulation */}
                <details className="mt-4 group">
                  <summary className="cursor-pointer text-primary font-semibold list-none focus:outline-none flex items-center gap-1">
                    Read Full Story <span className="inline-block transition-transform group-open:rotate-90"><ArrowRight size={14}/></span>
                  </summary>
                  <div className="mt-4 pt-4 border-t border-gray-100 text-gray-700 whitespace-pre-wrap leading-relaxed">
                    {post.content}
                  </div>
                </details>
              </div>
            </article>
          ))}

          {posts.length === 0 && (
            <div className="col-span-full text-center py-20 text-gray-500">
              No stories available at the moment.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blog;