import React, { useState, useEffect } from 'react';
import { useSite } from '../context/SiteContext';
import { Pencil, Check, X, Upload } from 'lucide-react';

interface EditableTextProps {
  contentKey: keyof import('../types').SiteConfig['content'];
  className?: string;
  multiline?: boolean;
  as?: any;
}

export const EditableText: React.FC<EditableTextProps> = ({ contentKey, className = '', multiline = false, as: Component = 'div' }) => {
  const { isAdmin, config, updateContent } = useSite();
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(config.content[contentKey]);

  useEffect(() => {
    setValue(config.content[contentKey]);
  }, [config.content, contentKey]);

  const handleSave = () => {
    updateContent(contentKey, value);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setValue(config.content[contentKey]);
    setIsEditing(false);
  };

  if (isEditing && isAdmin) {
    return (
      <div className="relative group">
        {multiline ? (
          <textarea
            className={`w-full p-2 border-2 border-primary rounded bg-white text-gray-800 ${className}`}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            rows={4}
          />
        ) : (
          <input
            className={`w-full p-1 border-b-2 border-primary bg-white text-gray-800 outline-none ${className}`}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        )}
        <div className="absolute top-0 right-0 transform -translate-y-full flex gap-1 bg-white shadow-lg p-1 rounded z-10">
          <button onClick={handleSave} className="p-1 text-green-600 hover:bg-green-50"><Check size={16} /></button>
          <button onClick={handleCancel} className="p-1 text-red-600 hover:bg-red-50"><X size={16} /></button>
        </div>
      </div>
    );
  }

  return (
    <Component 
      className={`relative ${isAdmin ? 'cursor-pointer hover:outline hover:outline-2 hover:outline-blue-400 hover:outline-dashed rounded px-1 -mx-1 transition-all' : ''} ${className}`}
      onClick={() => isAdmin && setIsEditing(true)}
      title={isAdmin ? "Click to edit" : undefined}
    >
      {value}
    </Component>
  );
};

interface EditableImageProps {
  contentKey: keyof import('../types').SiteConfig['content'];
  alt: string;
  className?: string;
}

export const EditableImage: React.FC<EditableImageProps> = ({ contentKey, alt, className = '' }) => {
  const { isAdmin, config, updateContent } = useSite();
  const [isPrompting, setIsPrompting] = useState(false);

  const handleEdit = () => {
    if (!isAdmin) return;
    setIsPrompting(true);
  };

  const handleSaveUrl = () => {
    const newUrl = prompt("Enter new image URL:", config.content[contentKey]);
    if (newUrl !== null) {
      updateContent(contentKey, newUrl);
    }
    setIsPrompting(false);
  };

  return (
    <div className={`relative group ${className}`}>
      <img 
        src={config.content[contentKey]} 
        alt={alt} 
        className={`w-full h-full object-cover ${isAdmin ? 'group-hover:opacity-75 transition-opacity' : ''}`}
      />
      {isAdmin && (
        <button
          onClick={handleSaveUrl}
          className="absolute inset-0 m-auto w-12 h-12 flex items-center justify-center bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          title="Change Image"
        >
          <Pencil size={20} />
        </button>
      )}
    </div>
  );
};

export const AdminControls = () => {
  const { isAdmin, toggleAdmin, config, updateConfig } = useSite();
  const [isOpen, setIsOpen] = useState(false);

  if (!isAdmin) return null;

  return (
    <>
      <div className="fixed bottom-4 right-4 z-50 flex gap-2">
         <button
          onClick={() => setIsOpen(true)}
          className="bg-gray-900 text-white px-4 py-2 rounded-full shadow-lg hover:bg-black transition-colors"
        >
          Global Settings
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white">
              <h2 className="text-xl font-bold">Site Configuration</h2>
              <button onClick={() => setIsOpen(false)}><X /></button>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Branding Section */}
              <section>
                <h3 className="text-lg font-semibold mb-3 pb-1 border-b">Branding</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="block">
                    <span className="text-sm font-medium text-gray-700">Site Name</span>
                    <input 
                      type="text" 
                      value={config.branding.name}
                      onChange={(e) => updateConfig('branding', { name: e.target.value })}
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm font-medium text-gray-700">Tagline</span>
                    <input 
                      type="text" 
                      value={config.branding.tagline}
                      onChange={(e) => updateConfig('branding', { tagline: e.target.value })}
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                  </label>
                </div>
              </section>

              {/* Theme Section */}
              <section>
                <h3 className="text-lg font-semibold mb-3 pb-1 border-b">Colors</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="block">
                    <span className="text-sm font-medium text-gray-700">Primary Color</span>
                    <div className="flex gap-2 items-center mt-1">
                      <input 
                        type="color" 
                        value={config.theme.primaryColor}
                        onChange={(e) => updateConfig('theme', { primaryColor: e.target.value })}
                        className="h-10 w-16 p-0 border rounded"
                      />
                      <span className="text-xs text-gray-500">{config.theme.primaryColor}</span>
                    </div>
                  </label>
                  <label className="block">
                    <span className="text-sm font-medium text-gray-700">Secondary Color</span>
                    <div className="flex gap-2 items-center mt-1">
                      <input 
                        type="color" 
                        value={config.theme.secondaryColor}
                        onChange={(e) => updateConfig('theme', { secondaryColor: e.target.value })}
                        className="h-10 w-16 p-0 border rounded"
                      />
                      <span className="text-xs text-gray-500">{config.theme.secondaryColor}</span>
                    </div>
                  </label>
                </div>
              </section>
              
               {/* Contact Section */}
               <section>
                <h3 className="text-lg font-semibold mb-3 pb-1 border-b">Contact Info</h3>
                <div className="space-y-3">
                  <label className="block">
                    <span className="text-sm font-medium text-gray-700">Email</span>
                    <input 
                      type="email" 
                      value={config.contact.email}
                      onChange={(e) => updateConfig('contact', { email: e.target.value })}
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm font-medium text-gray-700">Phone</span>
                    <input 
                      type="text" 
                      value={config.contact.phone}
                      onChange={(e) => updateConfig('contact', { phone: e.target.value })}
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                  </label>
                   <label className="block">
                    <span className="text-sm font-medium text-gray-700">Address</span>
                    <input 
                      type="text" 
                      value={config.contact.address}
                      onChange={(e) => updateConfig('contact', { address: e.target.value })}
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                  </label>
                </div>
              </section>

              {/* SEO Section */}
               <section>
                <h3 className="text-lg font-semibold mb-3 pb-1 border-b">SEO</h3>
                <div className="space-y-3">
                  <label className="block">
                    <span className="text-sm font-medium text-gray-700">Meta Title</span>
                    <input 
                      type="text" 
                      value={config.seo.metaTitle}
                      onChange={(e) => updateConfig('seo', { metaTitle: e.target.value })}
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                  </label>
                   <label className="block">
                    <span className="text-sm font-medium text-gray-700">Meta Description</span>
                    <textarea 
                      value={config.seo.metaDescription}
                      onChange={(e) => updateConfig('seo', { metaDescription: e.target.value })}
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                      rows={3}
                    />
                  </label>
                </div>
              </section>
            </div>
            
            <div className="p-6 bg-gray-50 border-t text-right">
              <button onClick={() => setIsOpen(false)} className="px-6 py-2 bg-primary text-white rounded hover:opacity-90">Close</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
