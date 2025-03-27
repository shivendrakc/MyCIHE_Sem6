// Navbar.jsx
import '../../index.css';
const Navbar = () => {
    return (
      <header className="bg-(--background) py-5 border-b-2 border-sky-200">
        <div className="container mx-auto px-4">
          <nav className="flex justify-between items-center">
            <div className="text-2xl font-bold text-blue-600">LEARN 2 DRIVE</div>
            <div className="space-x-4">
              <a href="#" className="text-gray-800 hover:bg-sky-200 py-2 px-3 rounded-md">Home</a>
              <a href="#" className="text-gray-800 hover:bg-sky-200 py-2 px-3 rounded-md">About us</a>
              <a href="#" className="text-gray-800 hover:bg-sky-200 py-2 px-3 rounded-md">Contact</a>
              <a href="#" className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">Login</a>
            </div>
          </nav>
        </div>
      </header>
    );
  }

  export default Navbar; // Export the component