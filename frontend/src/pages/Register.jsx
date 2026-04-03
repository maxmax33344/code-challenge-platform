import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosConfig';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post('/api/auth/register', formData);
      alert('Registration successful. Please log in.');
      navigate('/login');
    } catch (error) {
      //alert('Registration failed. Please try again.');      
      alert(error.response.data.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20">
      <form onSubmit={handleSubmit} className="bg-[#03346E] text-[#E2E2B6] p-6 shadow-lg rounded-xl">
        <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full mb-4 px-4 py-2 bg-[#021526] border border-[#6EACDA] text-[#E2E2B6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6EACDA] placeholder:text-[#6EACDA]/60"
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full mb-4 px-4 py-2 bg-[#021526] border border-[#6EACDA] text-[#E2E2B6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6EACDA] placeholder:text-[#6EACDA]/60"
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          className="w-full mb-4 px-4 py-2 bg-[#021526] border border-[#6EACDA] text-[#E2E2B6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6EACDA] placeholder:text-[#6EACDA]/60"
        />
        <button type="submit" className="w-full mb-4 px-4 py-2 bg-[#021526] border border-[#6EACDA] text-[#E2E2B6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6EACDA] placeholder:text-[#6EACDA]/60">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
