import React from 'react';
import { useSite } from '../context/SiteContext';
import { Link } from 'react-router-dom';

const Projects = () => {
  const { projects } = useSite();

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-secondary text-white py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Our Projects</h1>
        <p className="text-xl opacity-80 max-w-2xl mx-auto">See where your donations go and the impact we are creating together.</p>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map(project => (
            <div key={project.id} className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 flex flex-col h-full">
              <div className="h-56 relative overflow-hidden">
                <img 
                  src={project.imageUrl} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" 
                />
              </div>
              <div className="p-8 flex-grow flex flex-col">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{project.title}</h3>
                <p className="text-gray-600 mb-6 flex-grow">{project.description}</p>
                
                <div className="mb-6">
                  <div className="flex justify-between text-sm font-semibold mb-2">
                    <span className="text-primary">${project.raised.toLocaleString()} raised</span>
                    <span className="text-gray-400">Goal: ${project.goal.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-3">
                    <div 
                      className="bg-primary h-3 rounded-full" 
                      style={{ width: `${Math.min(100, (project.raised / project.goal) * 100)}%` }}
                    ></div>
                  </div>
                </div>

                <Link 
                  to="/donate" 
                  className="block w-full text-center bg-gray-900 text-white font-bold py-3 rounded-lg hover:bg-primary transition-colors"
                >
                  Donate to this Project
                </Link>
              </div>
            </div>
          ))}

          {/* Placeholder for 'More Projects' */}
          <div className="bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center p-8 text-center min-h-[300px]">
            <h3 className="text-xl font-bold text-gray-500 mb-2">More Projects Coming Soon</h3>
            <p className="text-gray-400">We are constantly assessing needs in new regions.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
