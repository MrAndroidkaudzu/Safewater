import React from 'react';
import { EditableText, EditableImage } from '../components/Editable';

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gray-50 py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-secondary mb-4 md:mb-6">
            <EditableText contentKey="aboutTitle" />
          </h1>
          <div className="max-w-3xl mx-auto text-base md:text-lg text-gray-600 leading-relaxed px-2">
            <EditableText contentKey="aboutText" multiline />
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          
          {/* Sidebar / Leadership */}
          <div className="w-full lg:w-1/3 space-y-6 md:space-y-8 order-2 lg:order-1">
            <div>
              <EditableImage contentKey="aboutImage" alt="Our Team" className="rounded-xl shadow-xl mb-6 w-full h-64 md:h-80 lg:h-64 object-cover" />
            </div>

            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 shadow-sm">
              <h3 className="font-bold text-lg md:text-xl mb-4 text-primary border-b border-blue-200 pb-2">Administration</h3>
              <ul className="space-y-4">
                <li className="flex flex-col">
                  <span className="font-bold text-gray-900">Patrick Chimphamba</span>
                  <span className="text-sm text-primary font-medium">President & Founder</span>
                  <span className="text-xs text-gray-500">Clinician Cert. in Medical Assistance</span>
                </li>
                <li className="flex flex-col">
                  <span className="font-bold text-gray-900">Eunice Thunga</span>
                  <span className="text-sm text-primary font-medium">Vice President</span>
                  <span className="text-xs text-gray-500">Businesswoman, MSCE, Cert. in Evangelism</span>
                </li>
                <li className="flex flex-col">
                  <span className="font-bold text-gray-900">Simkhalitsa Manda</span>
                  <span className="text-sm text-primary font-medium">Accountant</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
              <h3 className="font-bold text-lg mb-3 text-secondary">A Note on Funding</h3>
              <p className="text-sm text-gray-600 italic leading-relaxed">
                "Since 2021, our operations have been limited due to lack of funds. The organization relies heavily on the dedication of its founder to support our students and projects. We are grateful for any support."
              </p>
            </div>
          </div>

          {/* Main Text Content */}
          <div className="w-full lg:w-2/3 order-1 lg:order-2">
            <h2 className="text-2xl md:text-3xl font-bold text-secondary mb-4 md:mb-6">Our Story</h2>
            <div className="prose prose-blue text-gray-700 leading-relaxed space-y-4 md:space-y-6 text-sm md:text-base">
              <p>
                The Safe Water Organisation was originally founded by <strong>Larry Siegel</strong> in 2004. Under his initial guidance as the Executive Director of Safe Water International, the organization established its roots in alleviating suffering through humanitarian aid.
              </p>
              <p>
                For nearly two decades, the organization worked tirelessly to support communities. In <strong>2022</strong>, the leadership and vision were officially handed over to <strong>Mr. Patrick Chimphamba</strong>. Patrick is a native of Malawi, born and raised in one of the poorest nations in Africa.
              </p>
              <p>
                Patrick's dedication to this cause is personal. Having witnessed firsthand the hardship of drinking unsafe water during his own childhood, and seeing the struggles of those living with HIV/AIDS in rural areas, he developed a deep burden in his heart to help.
              </p>
              <p>
                Driven by this passion, Patrick worked hard to become someone who could uplift his society. He believes that every human being has the potential to become independent and reliable if exposed to safe water and good health. Today, he leads the organization with the same humanitarian principles that sparked its creation.
              </p>

              <h3 className="text-xl md:text-2xl font-bold text-secondary pt-4">Our Aims</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Providing safe water in rural areas and places of need.</li>
                <li>Providing relief aid and food support to people living with HIV/AIDS.</li>
                <li>Providing health care and HIV/AIDS counseling.</li>
                <li>Conducting awareness campaigns on how to live with HIV/AIDS and access safe water.</li>
              </ul>

              <h3 className="text-xl md:text-2xl font-bold text-secondary pt-4">Our Future Plans</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Rehabilitation Centers:</strong> Training people with skills to become independent.</li>
                <li><strong>Hospitals:</strong> Building medical facilities in villages lacking care.</li>
                <li><strong>Fighting HIV/AIDS:</strong> Taking an active part in the fight against the epidemic.</li>
                <li><strong>Food Security:</strong> Providing food for the poor.</li>
              </ul>

              <div className="mt-8 pt-8 border-t border-gray-100">
                 <p className="text-sm text-gray-500">
                   <strong>Acknowledgement:</strong> Many thanks to Deacon Larry Siegel, founder of Safe Water International, for his historical and continued support of our work.
                 </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;