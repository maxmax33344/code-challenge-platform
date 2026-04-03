import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosConfig';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/api/auth/login', formData);
      login(response.data);
      navigate('/challenges');
    } catch (error) {
      //alert('Login failed. Please try again.');
      alert(error.response.data.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20">
      <form onSubmit={handleSubmit} className="bg-[#03346E] text-[#E2E2B6] p-6 shadow-lg rounded-xl">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full mb-4 px-4 py-2 bg-[#021526] border border-[#6EACDA] text-[#E2E2B6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6EACDA]"
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          className="w-full mb-4 px-4 py-2 bg-[#021526] border border-[#6EACDA] text-[#E2E2B6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6EACDA]"
        />
        <button type="submit" className="w-full bg-[#6EACDA] text-[#021526] font-semibold p-2 rounded-lg hover:bg-[#E2E2B6] transition">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
