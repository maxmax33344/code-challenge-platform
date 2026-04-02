import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const ChallengeForm = ({ challenges, setChallengess, editingChallenges, setEditingChallenges }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({ title: '', description: '', deadline: '' });

  useEffect(() => {
    if (editingChallenges) {
      setFormData({
        title: editingChallenges.title,
        description: editingChallenges.description,
        deadline: editingChallenges.deadline,
      });
    } else {
      setFormData({ title: '', description: '', deadline: '' });
    }
  }, [editingChallenges]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingChallenges) {
        const response = await axiosInstance.put(`/api/challenges/${editingChallenges._id}`, formData, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setChallengess(challenges.map((task) => (task._id === response.data._id ? response.data : task)));
      } else {
        const response = await axiosInstance.post('/api/challenges', formData, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setChallengess([...challenges, response.data]);
      }
      setEditingChallenges(null);
      setFormData({ title: '', description: '', deadline: '' });
    } catch (error) {
      alert('Failed to save task.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded mb-6">
      <h1 className="text-2xl font-bold mb-4">{editingChallenges ? 'Your Form Name: Edit Operation' : 'Your Form Name: Create Operation'}</h1>
      <input
        type="text"
        placeholder="Title"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Description"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />
      <input
        type="date"
        value={formData.deadline}
        onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />
      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
        {editingChallenges ? 'Update Button' : 'Create Button'}
      </button>
    </form>
  );
};

export default ChallengeForm;
