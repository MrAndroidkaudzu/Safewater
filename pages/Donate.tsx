import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';
import { Check, Heart, Shield, Lock, AlertCircle } from 'lucide-react';

const Donate = () => {
  const { config } = useSite();
  const presets = [10, 25, 50, 100, 250];
  const [amount, setAmount] = useState<number | string>(50);
  const [isCustom, setIsCustom] = useState(false);
  const [status, setStatus] = useState<'idle' | 'processing' | 'success'>('idle');

  const handlePreset = (val: number) => {
    setAmount(val);
    setIsCustom(false);
  };

  const handleCustomFocus = () => {
    setIsCustom(true);
    setAmount('');
  };

  const handleDonate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || Number(amount) <= 0) return;
    
    setStatus('processing');
    // Mock API call
    setTimeout(() => {
      setStatus('success');
    }, 2000);
  };

  if (status === 'success') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-10 rounded-2xl shadow-xl max-w-lg w-full text-center">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check size={40} />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Thank You!</h2>
          <p className="text-gray-600 text-lg mb-8">Your donation of <span className="font-bold text-primary">${Number(amount).toFixed(2)}</span> will help us continue our vital work in Malawi.</p>
          <button 
            onClick={() => setStatus('idle')}
            className="text-primary font-semibold hover:underline"
          >
            Donate Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="bg-secondary text-white py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Support Our Mission</h1>
        <p className="text-xl opacity-90">Your contribution directly helps families in rural Malawi.</p>
      </div>

      <div className="container mx-auto px-4 -mt-10 mb-20 relative z-10">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
          
          {/* Left Side: Info */}
          <div className="w-full md:w-5/12 bg-gray-50 p-8 border-r border-gray-100">
            <h3 className="font-bold text-lg mb-4 text-gray-800">Why We Need You</h3>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 text-sm text-yellow-800 flex gap-3">
              <AlertCircle className="flex-shrink-0" size={20} />
              <p>We are currently struggling to extend our vision due to lack of funds. Every dollar counts.</p>
            </div>

            <ul className="space-y-4 mb-8">
              <li className="flex gap-3">
                <div className="bg-blue-100 p-2 rounded text-primary h-fit"><Heart size={20}/></div>
                <div className="text-sm text-gray-600"><strong className="text-gray-900 block">Life-Saving Water</strong> Help us build boreholes in drought-prone villages.</div>
              </li>
              <li className="flex gap-3">
                <div className="bg-blue-100 p-2 rounded text-primary h-fit"><Shield size={20}/></div>
                <div className="text-sm text-gray-600"><strong className="text-gray-900 block">HIV/AIDS Support</strong> Provide food and care for affected families.</div>
              </li>
            </ul>
            <div className="bg-white p-4 rounded border border-gray-200">
              <h4 className="font-bold text-sm text-gray-700 mb-2">Secure Donation</h4>
              <p className="text-xs text-gray-500 flex items-center gap-1">
                <Lock size={12} /> 256-bit SSL Encrypted payment processing.
              </p>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="w-full md:w-7/12 p-8">
            <form onSubmit={handleDonate}>
              <label className="block text-gray-700 font-bold mb-4">Choose Amount</label>
              
              <div className="grid grid-cols-3 gap-3 mb-6">
                {presets.map(val => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => handlePreset(val)}
                    className={`py-3 rounded-lg font-bold border transition-all ${
                      !isCustom && amount === val 
                        ? 'bg-primary border-primary text-white shadow-md' 
                        : 'bg-white border-gray-200 text-gray-600 hover:border-primary'
                    }`}
                  >
                    ${val}
                  </button>
                ))}
                <div className="relative col-span-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    placeholder="Other"
                    value={isCustom ? amount : ''}
                    onFocus={handleCustomFocus}
                    onChange={(e) => setAmount(e.target.value)}
                    className={`w-full h-full pl-6 pr-2 rounded-lg border font-bold outline-none transition-all ${
                      isCustom 
                        ? 'border-primary ring-1 ring-primary' 
                        : 'border-gray-200'
                    }`}
                  />
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                   <input required type="text" className="w-full border border-gray-300 rounded p-3 focus:ring-2 focus:ring-primary/20 outline-none" />
                </div>
                <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                   <input required type="email" className="w-full border border-gray-300 rounded p-3 focus:ring-2 focus:ring-primary/20 outline-none" />
                </div>
                 {/* Mock Card Input */}
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">Card Details</label>
                   <div className="w-full border border-gray-300 rounded p-3 bg-gray-50 text-gray-400 flex justify-between items-center cursor-not-allowed">
                      <span>•••• •••• •••• 4242</span>
                      <Lock size={16} />
                   </div>
                </div>
              </div>

              <button 
                type="submit"
                disabled={status === 'processing'}
                className="w-full bg-primary text-white font-bold py-4 rounded-lg shadow-lg hover:opacity-90 transition-all transform active:scale-95 disabled:opacity-70 disabled:cursor-wait"
              >
                {status === 'processing' ? 'Processing...' : `Donate ${amount ? '$'+amount : ''}`}
              </button>
              
              <div className="mt-4 flex justify-center space-x-2 grayscale opacity-50">
                 {/* Payment Logos Placeholder */}
                 <div className="h-6 w-10 bg-gray-300 rounded"></div>
                 <div className="h-6 w-10 bg-gray-300 rounded"></div>
                 <div className="h-6 w-10 bg-gray-300 rounded"></div>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donate;