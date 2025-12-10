import React from 'react';
import { useSite } from '../context/SiteContext';
import { EditableText, EditableImage } from '../components/Editable';
import { Link } from 'react-router-dom';
import { ArrowRight, Droplets, Users, CheckCircle } from 'lucide-react';

const Home = () => {
  const { projects } = useSite();
  const featuredProjects = projects.slice(0, 3);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative min-h-[500px] md:min-h-[600px] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <EditableImage contentKey="heroImage" alt="Hero Background" className="w-full h-full" />
          {/* Overlay set to 85% opacity as requested */}
          <div className="absolute inset-0 bg-[#0f172a]/85"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center py-16 md:py-24">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-4 md:mb-6 drop-shadow-lg leading-tight">
            <EditableText contentKey="heroTitle" />
          </h1>
          <p className="text-lg md:text-xl text-gray-100 mb-8 md:mb-10 max-w-2xl mx-auto leading-relaxed px-2 drop-shadow-md">
            <EditableText contentKey="heroSubtitle" multiline />
          </p>
          <Link to="/donate" className="inline-block bg-primary text-white font-bold py-3 px-6 md:py-4 md:px-8 rounded-full shadow-lg hover:bg-opacity-90 transition-all hover:scale-105 text-sm md:text-base">
            <EditableText contentKey="heroButtonText" />
          </Link>
        </div>
      </section>

      {/* Mission / Impact Stats */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 lg:gap-16 items-center">
             <div className="w-full md:w-1/2">
                <h2 className="text-primary font-bold tracking-wide uppercase mb-2 text-sm md:text-base">Our Mission</h2>
                <h3 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6 text-gray-900 leading-tight">
                  <EditableText contentKey="missionTitle" />
                </h3>
                <div className="text-base md:text-lg text-gray-600 leading-relaxed">
                  <EditableText contentKey="missionText" multiline />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mt-8 md:mt-10">
                   <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <Droplets className="mx-auto text-primary mb-2" size={28} />
                      <div className="font-bold text-xl md:text-2xl text-secondary">50+</div>
                      <div className="text-xs md:text-sm text-gray-500">Wells Built</div>
                   </div>
                   <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <Users className="mx-auto text-primary mb-2" size={28} />
                      <div className="font-bold text-xl md:text-2xl text-secondary">12k</div>
                      <div className="text-xs md:text-sm text-gray-500">People Served</div>
                   </div>
                   <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <CheckCircle className="mx-auto text-primary mb-2" size={28} />
                      <div className="font-bold text-xl md:text-2xl text-secondary">100%</div>
                      <div className="text-xs md:text-sm text-gray-500">Transparency</div>
                   </div>
                </div>
             </div>
             <div className="w-full md:w-1/2 relative mt-8 md:mt-0">
                <img src="https://images.unsplash.com/photo-1573062363102-14eb58c67923?auto=format&fit=crop&q=80&w=800" alt="Mission" className="rounded-xl shadow-2xl w-full object-cover" />
                <div className="absolute -bottom-6 -left-6 bg-primary p-6 md:p-8 rounded-lg text-white hidden md:block max-w-xs shadow-xl">
                   <p className="font-bold text-base md:text-lg italic">"Water is the driving force of all nature."</p>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-12 md:py-20 bg-gray-50">
         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 md:mb-12 gap-4">
               <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-secondary">Current Projects</h2>
                  <p className="text-gray-500 mt-2 text-sm md:text-base">Help us reach our goals for these communities.</p>
               </div>
               <Link to="/projects" className="text-primary font-semibold flex items-center gap-2 hover:gap-3 transition-all text-sm md:text-base">View All <ArrowRight size={18} /></Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
               {featuredProjects.map(project => (
                  <div key={project.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow flex flex-col">
                     <div className="h-48 overflow-hidden relative flex-shrink-0">
                        <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-secondary">
                           Active
                        </div>
                     </div>
                     <div className="p-5 md:p-6 flex flex-col flex-grow">
                        <h3 className="text-lg md:text-xl font-bold mb-2 text-secondary">{project.title}</h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">{project.description}</p>
                        
                        <div className="mb-4 mt-auto">
                           <div className="flex justify-between text-sm mb-1">
                              <span className="font-semibold text-primary">${project.raised.toLocaleString()}</span>
                              <span className="text-gray-500">of ${project.goal.toLocaleString()}</span>
                           </div>
                           <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                 className="bg-primary h-2 rounded-full transition-all duration-1000" 
                                 style={{ width: `${Math.min(100, (project.raised / project.goal) * 100)}%` }}
                              ></div>
                           </div>
                        </div>
                        
                        <Link to="/donate" className="block w-full text-center border-2 border-primary text-primary font-bold py-2 rounded-lg hover:bg-primary hover:text-white transition-colors">
                           Donate Support
                        </Link>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>
    </div>
  );
};

export default Home;