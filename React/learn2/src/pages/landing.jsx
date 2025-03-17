// Navbar.jsx
function Navbar() {
    return (
      <nav className="bg-[#CDF3FF]">
        <div className="max-w-[80%] mx-auto flex justify-between items-center">
          <div className="text-black text-2xl font-bold">LEARN 2 DRIVE</div>
          <div className="space-x-4 text-black">
            <a href="/" className="hover:text-gray-200">Home</a>
            <a href="/about" className="hover:text-gray-200">About us</a>
            <a href="/contact" className="hover:text-gray-200">Contact</a>
            <button className="bg-[#20A3BF] p-4">
                LOGIN
            </button>
          </div>
        </div>
      </nav>
    );
  }
  
  export default Navbar; // Export the component