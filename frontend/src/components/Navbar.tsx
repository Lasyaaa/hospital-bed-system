import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-blue-700 text-white px-6 py-4 flex items-center justify-between shadow-md">
      <Link to="/" className="text-xl font-bold tracking-wide">
        🏥 HospitalBeds
      </Link>

      <div className="flex items-center gap-6">
        <Link to="/" className="hover:text-blue-200 transition">
          Search
        </Link>

        {isAuthenticated && user?.role === 'ADMIN' && (
          <Link to="/admin" className="hover:text-blue-200 transition">
            Dashboard
          </Link>
        )}

        {isAuthenticated ? (
          <div className="flex items-center gap-4">
            <span className="text-sm text-blue-200">
              {user?.name} ({user?.role})
            </span>
            <button
              onClick={handleLogout}
              className="bg-white text-blue-700 px-4 py-1.5 rounded-md text-sm font-medium hover:bg-blue-100 transition"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            className="bg-white text-blue-700 px-4 py-1.5 rounded-md text-sm font-medium hover:bg-blue-100 transition"
          >
            Admin Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;