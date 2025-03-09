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

export default Footer
