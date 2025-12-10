import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';
import { BlogPost } from '../types';
import { 
  LayoutDashboard, FileText, Settings, LogOut, Plus, Trash2, Edit2, 
  Save, X, Lock, Image as ImageIcon, Briefcase, ChevronRight 
} from 'lucide-react';
import { Logo } from '../components/Logo';

const Admin = () => {
  const { isAdmin, toggleAdmin, posts, addPost, updatePost, deletePost, projects, updateProject, config, updateConfig, updateContent } = useSite();
  const [activeTab, setActiveTab] = useState<'posts' | 'projects' | 'settings'>('posts');
  
  // Login State
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Editor State
  const [editingPost, setEditingPost] = useState<Partial<BlogPost> | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin') {
      if (!isAdmin) toggleAdmin();
      setLoginError('');
    } else {
      setLoginError('Invalid credentials');
    }
  };

  const handleLogout = () => {
    if (isAdmin) toggleAdmin();
  };

  const startNewPost = () => {
    setEditingPost({
      title: '',
      excerpt: '',
      content: '',
      author: '',
      imageUrl: '',
      date: new Date().toISOString().split('T')[0]
    });
  };

  const savePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPost) return;

    const finalImage = editingPost.imageUrl || `https://images.unsplash.com/photo-1531983412531-1f49a365ffed?auto=format&fit=crop&q=80&w=800`;
    const postData = { ...editingPost, imageUrl: finalImage } as BlogPost;

    if (postData.id) {
      updatePost(postData);
    } else {
      addPost(postData);
    }
    setEditingPost(null);
  };

  // --- Login Screen ---
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-2xl max-w-md w-full">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
               <Logo className="h-20 w-20 text-primary" tone="color" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Login</h1>
            <p className="text-gray-500">Secure Area for Safe Water Management</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {loginError && (
              <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg text-center">
                {loginError}
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-primary/20 outline-none"
                placeholder="admin"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-primary/20 outline-none"
                placeholder="••••••"
              />
            </div>

            <button type="submit" className="w-full bg-secondary text-white font-bold py-3 rounded-lg hover:bg-black transition-colors">
              Access Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  // --- Dashboard View ---
  return (
    <div className="h-screen bg-gray-100 flex overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-secondary text-white flex-shrink-0 hidden md:flex flex-col h-full overflow-y-auto">
        <div className="p-6 border-b border-gray-800 flex-shrink-0">
          <div className="flex items-center gap-2 mb-2">
            <Logo className="h-6 w-6 text-primary" />
            <h2 className="text-xl font-bold tracking-tight">Admin</h2>
          </div>
          <p className="text-xs text-gray-500">Safe Water Organisation</p>
        </div>
        
        <nav className="flex-grow p-4 space-y-2">
          <button 
            onClick={() => setActiveTab('posts')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'posts' ? 'bg-primary text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}
          >
            <FileText size={20} /> Blog Posts
          </button>
          <button 
            onClick={() => setActiveTab('projects')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'projects' ? 'bg-primary text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}
          >
            <Briefcase size={20} /> Projects
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'settings' ? 'bg-primary text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}
          >
            <Settings size={20} /> Site Settings
          </button>
        </nav>

        <div className="p-4 border-t border-gray-800 flex-shrink-0">
          <button onClick={handleLogout} className="w-full flex items-center gap-2 text-gray-400 hover:text-white px-4 py-2 text-sm">
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        
        {/* Mobile Header */}
        <div className="md:hidden flex justify-between items-center p-4 bg-white border-b flex-shrink-0">
          <div className="flex items-center gap-2">
             <Logo className="h-6 w-6 text-primary" />
             <h1 className="text-xl font-bold text-gray-900">Admin</h1>
          </div>
          <div className="flex gap-2">
             <select 
               value={activeTab} 
               onChange={(e) => setActiveTab(e.target.value as any)}
               className="bg-gray-50 border p-2 rounded text-sm"
             >
               <option value="posts">Posts</option>
               <option value="projects">Projects</option>
               <option value="settings">Settings</option>
             </select>
             <button onClick={handleLogout} className="p-2 bg-gray-200 rounded hover:bg-gray-300"><LogOut size={18}/></button>
          </div>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">

          {/* --- Content: Posts Manager --- */}
          {activeTab === 'posts' && !editingPost && (
            <div className="space-y-6 max-w-6xl mx-auto">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Blog Manager</h1>
                  <p className="text-gray-500">Create, edit, and manage your news articles.</p>
                </div>
                <button onClick={startNewPost} className="bg-primary text-white px-6 py-3 rounded-lg shadow-lg hover:bg-primary/90 flex items-center gap-2">
                  <Plus size={20} /> <span className="hidden sm:inline">Create New Post</span>
                </button>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-sm font-semibold text-gray-600">Title</th>
                      <th className="hidden sm:table-cell px-6 py-4 text-sm font-semibold text-gray-600">Date</th>
                      <th className="hidden md:table-cell px-6 py-4 text-sm font-semibold text-gray-600">Author</th>
                      <th className="px-6 py-4 text-sm font-semibold text-gray-600 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {posts.map(post => (
                      <tr key={post.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <span className="font-medium text-gray-900 block">{post.title}</span>
                          <span className="text-xs text-gray-500 truncate max-w-xs block">{post.excerpt}</span>
                        </td>
                        <td className="hidden sm:table-cell px-6 py-4 text-sm text-gray-600">{new Date(post.date).toLocaleDateString()}</td>
                        <td className="hidden md:table-cell px-6 py-4 text-sm text-gray-600">{post.author}</td>
                        <td className="px-6 py-4 text-right space-x-2 whitespace-nowrap">
                          <button onClick={() => setEditingPost(post)} className="text-blue-600 hover:text-blue-800 p-2 bg-blue-50 rounded-lg transition-colors" title="Edit">
                            <Edit2 size={16} />
                          </button>
                          <button 
                            onClick={() => { if(window.confirm('Delete this post?')) deletePost(post.id); }} 
                            className="text-red-600 hover:text-red-800 p-2 bg-red-50 rounded-lg transition-colors" 
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {posts.length === 0 && (
                       <tr><td colSpan={4} className="px-6 py-8 text-center text-gray-500">No posts found. Create one to get started!</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* --- Content: Post Editor --- */}
          {editingPost && (
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-4 mb-6">
                <button onClick={() => setEditingPost(null)} className="p-2 hover:bg-white rounded-full transition-colors"><X size={24} /></button>
                <h1 className="text-2xl font-bold text-gray-900">{editingPost.id ? 'Edit Post' : 'New Post'}</h1>
              </div>

              <form onSubmit={savePost} className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                <div className="p-8 space-y-6">
                  
                  {/* Title */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Post Title</label>
                    <input 
                      required 
                      type="text" 
                      value={editingPost.title} 
                      onChange={e => setEditingPost({...editingPost, title: e.target.value})} 
                      className="w-full text-xl p-4 border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none font-bold text-gray-800 placeholder-gray-300"
                      placeholder="Enter an engaging title..."
                    />
                  </div>

                  {/* Meta Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                       <label className="block text-sm font-bold text-gray-700 mb-2">Author Name</label>
                       <input required type="text" value={editingPost.author} onChange={e => setEditingPost({...editingPost, author: e.target.value})} className="w-full p-3 border rounded-lg" placeholder="e.g. John Doe"/>
                    </div>
                    <div>
                       <label className="block text-sm font-bold text-gray-700 mb-2">Publish Date</label>
                       <input required type="date" value={editingPost.date} onChange={e => setEditingPost({...editingPost, date: e.target.value})} className="w-full p-3 border rounded-lg" />
                    </div>
                  </div>

                  {/* Image */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Cover Image URL</label>
                    <div className="flex gap-4">
                      <div className="flex-grow relative">
                        <ImageIcon className="absolute left-3 top-3.5 text-gray-400" size={20} />
                        <input 
                          type="text" 
                          value={editingPost.imageUrl} 
                          onChange={e => setEditingPost({...editingPost, imageUrl: e.target.value})} 
                          className="w-full pl-10 p-3 border rounded-lg" 
                          placeholder="https://..." 
                        />
                      </div>
                    </div>
                    {editingPost.imageUrl && (
                      <div className="mt-4 h-48 w-full rounded-lg overflow-hidden bg-gray-100 border">
                        <img src={editingPost.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>

                  {/* Excerpt */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Short Excerpt</label>
                    <p className="text-xs text-gray-500 mb-2">This text appears on the homepage cards.</p>
                    <textarea 
                      required 
                      rows={2} 
                      value={editingPost.excerpt} 
                      onChange={e => setEditingPost({...editingPost, excerpt: e.target.value})} 
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none"
                    />
                  </div>

                  {/* Content */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Full Content</label>
                    <textarea 
                      required 
                      rows={12} 
                      value={editingPost.content} 
                      onChange={e => setEditingPost({...editingPost, content: e.target.value})} 
                      className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none font-mono text-sm leading-relaxed"
                      placeholder="Write your story here..."
                    />
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="bg-gray-50 p-6 border-t border-gray-200 flex justify-end gap-4">
                  <button type="button" onClick={() => setEditingPost(null)} className="px-6 py-2 text-gray-600 hover:bg-gray-200 rounded-lg font-medium transition-colors">Cancel</button>
                  <button type="submit" className="px-8 py-2 bg-primary text-white rounded-lg font-bold shadow-lg hover:bg-primary/90 transition-colors flex items-center gap-2">
                    <Save size={18} /> Save Post
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* --- Content: Projects Manager --- */}
          {activeTab === 'projects' && (
            <div className="space-y-6 max-w-6xl mx-auto">
              <h1 className="text-3xl font-bold text-gray-900">Project Funding</h1>
              <p className="text-gray-500">Update the progress of your charitable initiatives.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map(project => (
                  <div key={project.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex gap-4 mb-4">
                      <img src={project.imageUrl} alt={project.title} className="w-20 h-20 rounded-lg object-cover" />
                      <div>
                        <h3 className="font-bold text-lg text-gray-900">{project.title}</h3>
                        <p className="text-xs text-gray-500">{project.id}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Raised Amount ($)</label>
                        <input 
                          type="number" 
                          value={project.raised}
                          onChange={(e) => updateProject({...project, raised: Number(e.target.value)})}
                          className="w-full p-2 border rounded font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Goal Amount ($)</label>
                        <input 
                          type="number" 
                          value={project.goal}
                          onChange={(e) => updateProject({...project, goal: Number(e.target.value)})}
                          className="w-full p-2 border rounded font-mono"
                        />
                      </div>
                      
                      <div className="pt-2">
                         <div className="w-full bg-gray-100 rounded-full h-2">
                            <div className="bg-primary h-2 rounded-full transition-all" style={{ width: `${Math.min(100, (project.raised / project.goal) * 100)}%` }}></div>
                         </div>
                         <div className="text-right text-xs text-primary font-bold mt-1">
                            {Math.round((project.raised / project.goal) * 100)}% Funded
                         </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* --- Content: Settings --- */}
          {activeTab === 'settings' && (
            <div className="max-w-4xl mx-auto space-y-8">
               <div>
                  <h1 className="text-3xl font-bold text-gray-900">Global Settings</h1>
                  <p className="text-gray-500">Configure your website's appearance and details.</p>
               </div>

               {/* Branding */}
               <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <h2 className="text-xl font-bold mb-4 border-b pb-2 flex items-center gap-2"><LayoutDashboard size={20} /> Branding</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">Organization Name</label>
                      <input type="text" value={config.branding.name} onChange={(e) => updateConfig('branding', { name: e.target.value })} className="w-full p-2 border rounded" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">Tagline</label>
                      <input type="text" value={config.branding.tagline} onChange={(e) => updateConfig('branding', { tagline: e.target.value })} className="w-full p-2 border rounded" />
                    </div>
                    <div className="md:col-span-2">
                       <label className="block text-sm font-bold text-gray-700 mb-1">About Page Image</label>
                       <input type="text" value={config.content.aboutImage} onChange={(e) => updateContent('aboutImage', e.target.value)} className="w-full p-2 border rounded" placeholder="https://..." />
                       {config.content.aboutImage && <p className="text-xs text-gray-500 mt-1">Preview: This image will appear on the About page.</p>}
                    </div>
                  </div>
               </section>

               {/* Colors */}
               <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <h2 className="text-xl font-bold mb-4 border-b pb-2 flex items-center gap-2"><ImageIcon size={20} /> Theme Colors</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Primary Color (Buttons/Links)</label>
                        <div className="flex gap-2">
                          <input type="color" value={config.theme.primaryColor} onChange={(e) => updateConfig('theme', { primaryColor: e.target.value })} className="h-10 w-16 p-0 border rounded" />
                          <input type="text" value={config.theme.primaryColor} onChange={(e) => updateConfig('theme', { primaryColor: e.target.value })} className="flex-grow p-2 border rounded font-mono uppercase" />
                        </div>
                     </div>
                     <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Secondary Color (Footer/Headings)</label>
                        <div className="flex gap-2">
                          <input type="color" value={config.theme.secondaryColor} onChange={(e) => updateConfig('theme', { secondaryColor: e.target.value })} className="h-10 w-16 p-0 border rounded" />
                          <input type="text" value={config.theme.secondaryColor} onChange={(e) => updateConfig('theme', { secondaryColor: e.target.value })} className="flex-grow p-2 border rounded font-mono uppercase" />
                        </div>
                     </div>
                  </div>
               </section>

               {/* Contact */}
               <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <h2 className="text-xl font-bold mb-4 border-b pb-2 flex items-center gap-2"><Briefcase size={20} /> Contact Information</h2>
                  <div className="space-y-4">
                     <div>
                       <label className="block text-sm font-bold text-gray-700 mb-1">Email Address</label>
                       <input type="text" value={config.contact.email} onChange={(e) => updateConfig('contact', { email: e.target.value })} className="w-full p-2 border rounded" />
                     </div>
                     <div>
                       <label className="block text-sm font-bold text-gray-700 mb-1">Phone Number</label>
                       <input type="text" value={config.contact.phone} onChange={(e) => updateConfig('contact', { phone: e.target.value })} className="w-full p-2 border rounded" />
                     </div>
                     <div>
                       <label className="block text-sm font-bold text-gray-700 mb-1">Physical Address</label>
                       <input type="text" value={config.contact.address} onChange={(e) => updateConfig('contact', { address: e.target.value })} className="w-full p-2 border rounded" />
                     </div>
                  </div>
               </section>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Admin;