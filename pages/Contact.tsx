import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
  const { config } = useSite();
  const submittedState = useState(false);
  const [submitted, setSubmitted] = submittedState;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gray-50 py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-secondary mb-4">Get in Touch</h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg">Have questions about our projects or want to partner with us? We'd love to hear from you.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto">
          
          {/* Contact Info */}
          <div className="order-2 md:order-1">
            <h2 className="text-2xl font-bold text-secondary mb-6">Contact Information</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-blue-50 p-3 rounded-full text-primary flex-shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Email Us</h3>
                  <p className="text-gray-600 break-all">{config.contact.email}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-blue-50 p-3 rounded-full text-primary flex-shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Call Us</h3>
                  <p className="text-gray-600">{config.contact.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-blue-50 p-3 rounded-full text-primary flex-shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Visit Us</h3>
                  <p className="text-gray-600">{config.contact.address}</p>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="mt-8 bg-gray-200 w-full h-64 rounded-xl flex items-center justify-center text-gray-500">
               Interactive Map Placeholder
            </div>
          </div>

          {/* Form */}
          <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-100 order-1 md:order-2">
            {submitted ? (
              <div className="text-center h-full flex flex-col justify-center items-center py-8">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                  <Send size={32} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Message Sent!</h3>
                <p className="text-gray-600 mt-2">Thank you for reaching out. We will get back to you shortly.</p>
                <button onClick={() => setSubmitted(false)} className="mt-6 text-primary hover:underline">Send another message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <h2 className="text-2xl font-bold text-secondary">Send a Message</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <input required type="text" className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-primary/20 outline-none transition-shadow" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <input required type="text" className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-primary/20 outline-none transition-shadow" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input required type="email" className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-primary/20 outline-none transition-shadow" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <select className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-primary/20 outline-none bg-white">
                    <option>General Inquiry</option>
                    <option>Volunteering</option>
                    <option>Donations</option>
                    <option>Partnership</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea required rows={5} className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-primary/20 outline-none transition-shadow"></textarea>
                </div>

                <button type="submit" className="w-full bg-secondary text-white font-bold py-3 rounded-lg hover:bg-black transition-colors flex items-center justify-center gap-2">
                  <Send size={18} /> Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;