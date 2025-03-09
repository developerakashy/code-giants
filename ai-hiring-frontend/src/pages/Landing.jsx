import React, { useEffect, useState } from 'react';
import { Menu, X, CheckCircle, Users, Briefcase, Bot, PieChart, MessageSquare, Search } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useUser } from '../context/userContext';



const Hero = () => {
  return (
    <section className="pt-24 pb-16 bg-gradient-to-r from-blue-600 to-indigo-800 text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-center md:space-x-12">
          <div className="md:w-1/2 mb-8 md:mb-0 text-center">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">Revolutionize Your Hiring Process with AI</h1>
            <p className="text-xl mb-8 opacity-90">TalentAI uses advanced artificial intelligence to match the perfect candidates with your positions, saving you time and helping you build your dream team.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="#" className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-cyan-400 hover:text-white transition-all transform hover:-translate-y-1 shadow-lg">Get Started Free</a>
              <a href="#how-it-works" className="border-2 border-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-all">Learn More</a>
            </div>
          </div>
          {/* <div className="md:w-1/2">
            <div className="rounded-lg shadow-2xl overflow-hidden">
              <img src="/api/placeholder/600/400" alt="AI-powered hiring platform dashboard" className="w-full" />
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl">
      <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-indigo-800 flex items-center justify-center text-white mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-blue-600 mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const Features = () => {
  const features = [
    {
      icon: <Bot size={32} />,
      title: "Smart Candidate Matching",
      description: "Our AI analyzes skills, experience, and culture fit to rank candidates, saving you hours of manual resume screening."
    },
    {
      icon: <Briefcase size={32} />,
      title: "Resume Parsing & Analysis",
      description: "Automatically extract and organize candidate information from resumes in any format with 99% accuracy."
    },
    {
      icon: <Bot size={32} />,
      title: "AI Interview Assistant",
      description: "Get AI-generated interview questions tailored to each role and candidate, ensuring you cover all the important bases."
    },
    {
      icon: <PieChart size={32} />,
      title: "Predictive Analytics",
      description: "Use data-driven insights to predict candidate success and improve your hiring decisions."
    },
    {
      icon: <MessageSquare size={32} />,
      title: "Intelligent Chatbots",
      description: "Engage candidates 24/7 with AI chatbots that answer questions and schedule interviews automatically."
    },
    {
      icon: <Search size={32} />,
      title: "Bias Detection",
      description: "Our AI detects and helps eliminate unconscious bias in your job descriptions and throughout the hiring process."
    }
  ];

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-4">Powered by Advanced AI</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Our platform uses cutting-edge artificial intelligence to streamline every step of your recruitment process.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

const Step = ({ number, title, description }) => {
  return (
    <div className="flex flex-col items-center text-center md:w-1/4 mb-12 md:mb-0">
      <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-600 to-indigo-800 flex items-center justify-center text-white text-2xl font-bold mb-6 shadow-lg">
        {number}
      </div>
      <h3 className="text-xl font-semibold text-blue-600 mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const HowItWorks = () => {
  const steps = [
    {
      number: 1,
      title: "Post Your Job",
      description: "Create job listings enhanced by AI for maximum visibility and qualified applicants."
    },
    {
      number: 2,
      title: "AI Screening",
      description: "Our AI analyzes resumes to match the best candidates to your position."
    },
    {
      number: 3,
      title: "Make Informed Decisions",
      description: "Use AI insights to select the ideal candidate with confidence."
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-4">How TalentAI Works</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Our AI-powered platform makes hiring simpler, faster, and more effective in just four easy steps.</p>
        </div>
        <div className="relative">
          {/* Progress line (visible on md screens and above) */}
          <div className="hidden md:block absolute top-10 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-indigo-800 z-0"></div>

          {/* Steps */}
          <div className="flex flex-col md:flex-row justify-between items-start relative z-10">
            {steps.map((step, index) => (
              <Step key={index} {...step} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const TestimonialCard = ({ quote, name, title, initials }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <p className="text-gray-700 italic mb-6">{quote}</p>
      <div className="flex items-center">
        <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold mr-4">
          {initials}
        </div>
        <div>
          <h4 className="font-semibold">{name}</h4>
          <p className="text-gray-600 text-sm">{title}</p>
        </div>
      </div>
    </div>
  );
};

const Testimonials = () => {
  const testimonials = [
    {
      quote: "TalentAI reduced our time-to-hire by 65% and improved the quality of our candidates. The AI matching is incredibly accurate.",
      name: "Sarah Matthews",
      title: "HR Director, TechGrowth Inc.",
      initials: "SM"
    },
    {
      quote: "The bias detection feature helped us create more inclusive job descriptions and attract a more diverse pool of candidates.",
      name: "Michael Johnson",
      title: "DEI Lead, Future Finance",
      initials: "MJ"
    },
    {
      quote: "As a small business owner, I couldn't afford a full HR team. TalentAI gives me enterprise-level hiring capabilities at a fraction of the cost.",
      name: "Alex Patel",
      title: "CEO, Innovate Studios",
      initials: "AP"
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-4">What Our Customers Say</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Join the thousands of companies transforming their hiring with TalentAI.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

const CTA = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-800 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Hiring?</h2>
        <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">Join over 10,000 companies using TalentAI to find their perfect candidates faster and more efficiently.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="#" className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-cyan-400 hover:text-white transition-all transform hover:-translate-y-1 shadow-lg">Start Free Trial</a>
          <a href="#" className="border-2 border-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-all">Schedule Demo</a>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company info */}
          <div>
            <div className="text-2xl font-bold mb-4">
              Talent<span className="text-cyan-400">AI</span>
            </div>
            <p className="text-gray-400 mb-6">Revolutionizing the hiring process with advanced artificial intelligence and machine learning.</p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition-colors">in</a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition-colors">f</a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition-colors">t</a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition-colors">ig</a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">Careers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">Press</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">Features</a></li>
              <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">Pricing</a></li>
              <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">Enterprise</a></li>
              <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">Case Studies</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">Help Center</a></li>
              <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">Documentation</a></li>
              <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">API</a></li>
              <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">Partners</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
          &copy; 2025 TalentAI. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

const Landing = () => {
    const navigate = useNavigate()
    const {user} = useUser()

    useEffect(() => {
        if(user?._id) navigate('/dashboard')
    }, [user])


  return (
    <div className="min-h-screen font-sans text-gray-900">

      <Hero />
      <Features />
      <HowItWorks />
      <Testimonials />
      <CTA />

    </div>
  );
};

export default Landing;
