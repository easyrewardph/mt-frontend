import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import './App.css';

function App() {
  const ADMIN_EMAIL = "kc7enriquez@gmail.com"; // Change this to update admin email
  const ADMIN_BCC_EMAIL = "kiefer@kooryr.com"; // BCC email (note: EmailJS doesn't support true BCC, this will be added as additional recipient)
  
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [heroIndex, setHeroIndex] = useState(0);
  const [toast, setToast] = useState({ show: false, message: '' });

  const carouselConcepts = [
    "Filipino food, culture, and community in one vibrant precinct.",
    "All-day dining, groceries, and experiences curated for Western Sydney.",
    "Gather for fiestas, markets, and live events built by kababayans.",
    "Opening 2027 with spaces for local entrepreneurs and creatives.",
    "Where the spirit of the Philippines thrives every day."
  ];

  const heroSlides = [
    '/ManilaTown_Slide1.jpg',
    '/ManilaTown_Slide2.png',
    '/ManilaTown_Slide3.png'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % carouselConcepts.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [carouselConcepts.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  const handleFormSubmit = async (event, successMsg) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    
    let message = '';
    if (data.message) { // Survey form
      message = `FORM TYPE: Community Survey\n\nWhat is your dream Filipino shop: ${data.message}\nName: ${data.name}\nEmail: ${data.email}`;
    } else if (data.business_name && data.concept_description) { // EOI form
      message = `FORM TYPE: Business Expression of Interest\n\nName: ${data.name}\nBusiness Name: ${data.business_name}\nEmail: ${data.email}\nMobile: ${data.mobile}\nCategory: ${data.category}\nConcept Description: ${data.concept_description}`;
    } else if (data.business_name) { // Network form
      message = `FORM TYPE: Business Network Registration\n\nName: ${data.name}\nBusiness Name: ${data.business_name}\nEmail: ${data.email}\nMobile: ${data.mobile}`;
    }
    
    const params = {
      name: "Manila Town Admin",
      email: ADMIN_EMAIL + "," + ADMIN_BCC_EMAIL,
      message: message
    };
    
    try {
      await emailjs.send('service_m7tvpaq', 'template_60ic84a', params, 'OwbJj1E4Vvtx3TtCD');
      setToast({ show: true, message: successMsg });
    } catch (error) {
      console.error('EmailJS Error:', error);
      setToast({ show: true, message: 'Error sending email. Please try again.' });
    }
    setTimeout(() => setToast({ show: false, message: '' }), 3000);
    event.target.reset();
  };

  const scrollToSection = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
  };

  const heroStyle = {
    backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${heroSlides[heroIndex]})`
  };

  return (
    <div className="text-gray-800 antialiased">
      {/* TOP NAVIGATION BAR (Fixed) */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-md p-4 flex justify-between items-center transition-all duration-300">
        {/* Logo */}
        <div className="flex items-center pl-2 lg:pl-8">
          <img
            src="/ManilaTown_Logo.png"
            alt="Manila Town Logo"
            className="w-20 h-20 object-contain"
          />
        </div>
        {/* Call to Action Button */}
        <div className="pr-2 lg:pr-8">
          <button 
            onClick={() => scrollToSection('eoi')}
            className="bg-secondary-600 hover:bg-secondary-700 text-white font-bold py-2 px-6 rounded-full shadow-md transition duration-300 transform hover:-translate-y-0.5"
          >
            Register Business
          </button>
        </div>
      </nav>

      {/* 1. HERO SECTION (Banner + Carousel) */}
      <header className="hero-section flex items-center justify-center text-center shadow-2xl relative" style={heroStyle}>
        <div className="px-4 py-16 max-w-5xl mx-auto z-10 flex flex-col items-center text-center">
          <p className="text-3xl md:text-4xl font-semibold text-white uppercase tracking-[0.3em] mb-4">Mabuhay!</p>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight drop-shadow-lg">
            Welcome to <span className="text-accent">Manila Town</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-100 mb-10 font-light drop-shadow-md">
            A Filipino cultural and commercial hub in the heart of Doonside
          </p>
          
          {/* Carousel Text Display */}
          <div className="p-0 rounded-lg inline-block w-full">
            <p className="carousel-text text-2xl md:text-3xl font-semibold text-white transition-opacity duration-1000 ease-in-out opacity-100 drop-shadow-md">
              {carouselConcepts[carouselIndex]}
            </p>
          </div>

          <div className="hero-indicators flex items-center justify-center gap-3 mt-8">
            {heroSlides.map((slide, index) => (
              <button
                key={slide}
                aria-label={`Show slide ${index + 1}`}
                className={`indicator-dot ${index === heroIndex ? 'active' : ''}`}
                onClick={() => setHeroIndex(index)}
              />
            ))}
          </div>
          
          <div className="mt-12">
            <button onClick={() => scrollToSection('intro')} className="animate-bounce bg-white text-primary-600 p-3 rounded-full shadow-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
            </button>
          </div>
        </div>
      </header>

      <main>
        {/* 2. INTRODUCTION – TWO COLUMN LAYOUT */}
        <section id="intro" className="w-full bg-white mb-0">
          <div className="max-w-6xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="w-full h-full min-h-[28rem] overflow-hidden">
              <img src="/FiloGathering.png" alt="Filipino gatherings at Manila Town" className="w-full h-full object-cover" />
            </div>
            <div className="text-left">
              <h2 className="text-4xl font-bold text-primary-700 mb-8">A New Filipino Home in Sydney</h2>
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p>
                  Manila Town will be Australia's first dedicated Filipino precinct, located right next to Doonside Station.
                </p>
                <p>
                  It is designed to feel like home—a place where Filipino families meet, eat, celebrate, and share stories. A place where everybody is welcome, Filipino or not.
                </p>
                <p className="font-bold text-primary-600 text-xl mt-4">
                  More than a shopping precinct. A cultural heart.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. COMMUNITY INVITATION (Survey) */}
        <section id="survey" className="w-full bg-slate-50 border-t border-gray-200">
          <div className="w-full h-72 bg-gray-200 relative">
            <img src="https://placehold.co/1920x500/f1f5f9/64748b?text=Community+Lifestyle+%26+Food" alt="Community Food" className="w-full h-full object-cover" />
          </div>
          <div className="max-w-3xl mx-auto px-6 py-20 text-center">
            <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl -mt-32 relative z-20 border border-gray-100">
              <div className="flex justify-center mb-6">
                <svg className="w-12 h-12 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-4">Help Us Build Manila Town</h3>
              <p className="text-gray-600 mb-8">
                We want Manila Town to reflect what the community truly wants. Tell us what food, shops, and experiences you dream of.
              </p>
              <form onSubmit={(e) => handleFormSubmit(e, 'Suggestion Sent! Salamat!')} className="space-y-4 text-left">
                <div>
                  <textarea rows="3" name="message" className="block w-full border-gray-300 rounded-lg bg-gray-50 border p-4 text-gray-900" placeholder="What is your dream Filipino shop or food?" required></textarea>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="text" name="name" className="block w-full border-gray-300 rounded-lg bg-gray-50 border p-3" placeholder="Your Name" required />
                  <input type="email" name="email" className="block w-full border-gray-300 rounded-lg bg-gray-50 border p-3" placeholder="Email Address" required />
                </div>
                <button type="submit" className="w-full bg-secondary-600 hover:bg-secondary-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition duration-300 transform hover:scale-[1.01]">
                  Send Suggestion
                </button>
              </form>
            </div>
          </div>
        </section>
        
        {/* 4. BUSINESS EOI */}
        <section id="eoi" className="w-full bg-white">
          <div className="w-full h-80 bg-gray-800 relative">
            <img src="/bakery-filipino-doonside.png" alt="Filipino bakery storefront in Doonside" className="w-full h-full object-cover opacity-80" />
            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
              <h2 className="text-4xl md:text-5xl font-bold text-white text-center px-4">Open Your Business Here</h2>
            </div>
          </div>
          <div className="max-w-4xl mx-auto px-6 py-20">
            <div className="text-center mb-12">
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                We're accepting Expressions of Interest. Whether you're running a restaurant, café, bakery, salon, or grocery, we want to hear from you.
              </p>
            </div>
            <form onSubmit={(e) => handleFormSubmit(e, 'Expression of Interest Received!')} className="space-y-6 bg-slate-50 p-8 md:p-10 rounded-2xl border border-gray-200 shadow-sm text-center">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Your Name</label>
                  <input type="text" name="name" className="w-full border border-gray-300 rounded-lg p-3" placeholder="Full Name" required />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Business Name</label>
                  <input type="text" name="business_name" className="w-full border border-gray-300 rounded-lg p-3" placeholder="E.g. Lola's Kitchen" required />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                  <input type="email" name="email" className="w-full border border-gray-300 rounded-lg p-3" placeholder="name@example.com" required />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Mobile</label>
                  <input type="tel" name="mobile" className="w-full border border-gray-300 rounded-lg p-3" placeholder="04XX XXX XXX" required />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
                  <select name="category" className="w-full border border-gray-300 rounded-lg p-3 bg-white" required>
                    <option value="" disabled selected>Select Category</option>
                    <option value="Restaurant">Restaurant</option>
                    <option value="Retail">Retail</option>
                    <option value="Service">Service</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <div className="text-left">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Concept Description</label>
                <textarea rows="4" name="concept_description" className="w-full border border-gray-300 rounded-lg p-3" placeholder="Tell us about your business idea..." required></textarea>
              </div>
              <div className="pt-4">
                <button type="submit" className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 px-12 rounded-lg shadow-lg transition duration-300 transform hover:scale-[1.02] w-full md:w-auto">
                  Submit Expression of Interest
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* 5. WHAT MANILA TOWN OFFERS (ICONS) */}
        <section className="w-full bg-slate-50 py-20">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-16">What You'll Find</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md mb-6 text-primary-600">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
                </div>
                <h4 className="text-xl font-bold mb-2">Authentic Dining</h4>
                <p className="text-gray-600 max-w-xs">Classic adobo, lechon, and regional specialties.</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md mb-6 text-primary-600">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                </div>
                <h4 className="text-xl font-bold mb-2">Filipino Grocery</h4>
                <p className="text-gray-600 max-w-xs">Ingredients, snacks, and imported goods.</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md mb-6 text-primary-600">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path></svg>
                </div>
                <h4 className="text-xl font-bold mb-2">Events Centre</h4>
                <p className="text-gray-600 max-w-xs">A venue for family and community celebrations.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 6. BUSINESS NETWORK (Updated with Fields) */}
        <section id="network" className="w-full bg-primary-700 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          <div className="max-w-4xl mx-auto px-6 py-24 relative z-10 text-center text-white">
            <div className="mb-10">
              <h3 className="text-3xl font-bold mb-4">Join the Manila Town Business Network</h3>
              <p className="text-blue-100 text-lg max-w-2xl mx-auto">
                Connect with other Filipino businesses in Western Sydney for marketing support and events.
              </p>
            </div>
            <form onSubmit={(e) => handleFormSubmit(e, 'Welcome! One of our team member will be in touch shortly.')} className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 shadow-2xl max-w-2xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left mb-4">
                <div>
                  <label className="block text-xs uppercase tracking-wide text-blue-200 mb-1 font-bold">Your Name</label>
                  <input type="text" name="name" className="block w-full border-none rounded bg-white/90 text-gray-900 p-3" placeholder="Full Name" required />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wide text-blue-200 mb-1 font-bold">Business Name</label>
                  <input type="text" name="business_name" className="block w-full border-none rounded bg-white/90 text-gray-900 p-3" placeholder="Business Name" required />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left mb-8">
                <div>
                  <label className="block text-xs uppercase tracking-wide text-blue-200 mb-1 font-bold">Email</label>
                  <input type="email" name="email" className="block w-full border-none rounded bg-white/90 text-gray-900 p-3" placeholder="email@address.com" required />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wide text-blue-200 mb-1 font-bold">Mobile</label>
                  <input type="tel" name="mobile" className="block w-full border-none rounded bg-white/90 text-gray-900 p-3" placeholder="Mobile Number" required />
                </div>
              </div>
              <button type="submit" className="w-full bg-accent hover:bg-yellow-300 text-gray-900 font-bold py-4 px-8 rounded-lg shadow-lg transition duration-300">
                Join Network
              </button>
              <p className="mt-4 text-sm text-blue-200">
                Looking to lease a space instead? <span onClick={() => scrollToSection('eoi')} className="underline hover:text-white font-bold cursor-pointer">Register your business interest here.</span>
              </p>
            </form>
          </div>
        </section>

        {/* 7. FOOTER */}
        <footer className="bg-gray-900 text-white py-16 text-center border-t-8 border-secondary-600">
          <div className="max-w-4xl mx-auto px-6">
            <h3 className="text-4xl font-extrabold text-accent mb-6">
              Manila Town
            </h3>
            <p className="text-2xl font-light mb-2">
              Opening 2027
            </p>
            <p className="text-lg text-gray-400">
              Doonside, NSW
            </p>
            <div className="mt-12 text-sm text-gray-600">
              &copy; 2025 Manila Town Project. All rights reserved.
            </div>
          </div>
        </footer>

        {/* Toast Notification */}
        {toast.show && (
          <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-6 py-3 rounded-full shadow-2xl transition-all duration-500 z-50 flex items-center space-x-2">
            <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
            <span>{toast.message}</span>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
