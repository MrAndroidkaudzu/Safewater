import React from 'react';
import { useSite } from '../context/SiteContext';

interface EditableTextProps {
  contentKey: keyof import('../types').SiteConfig['content'];
  className?: string;
  multiline?: boolean;
  as?: any;
}

export const EditableText: React.FC<EditableTextProps> = ({ contentKey, className = '', as: Component = 'div' }) => {
  const { config } = useSite();
  return (
    <Component className={className}>
      {config.content[contentKey]}
    </Component>
  );
};

interface EditableImageProps {
  contentKey: keyof import('../types').SiteConfig['content'];
  alt: string;
  className?: string;
}

export const EditableImage: React.FC<EditableImageProps> = ({ contentKey, alt, className = '' }) => {
  const { config } = useSite();
  return (
    <div className={`relative group ${className}`}>
      <img 
        src={config.content[contentKey]} 
        alt={alt} 
        className="w-full h-full object-cover"
      />
    </div>
  );
};