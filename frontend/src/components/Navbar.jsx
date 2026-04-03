import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-[#03346E] text-[#E2E2B6] px-6 py-4 flex justify-between items-center shadow">
      <Link to="/" className="text-2xl font-bold text-[#E2E2B6]">Coding Challenge Platform</Link>
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <Link to="/challenges" className="hover:text-[#6EACDA] transition">Challenges</Link>
            <Link to="/profile" className="hover:text-[#6EACDA] transition">Profile</Link>
            <button
              onClick={handleLogout}
              className="bg-[#6EACDA] text-[#021526] px-4 py-2 rounded hover:bg-[#E2E2B6] transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-[#6EACDA] transition">Login</Link>
            <Link
              to="/register"
              className="bg-[#6EACDA] text-[#021526] px-4 py-2 rounded hover:bg-[#E2E2B6] transition"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
