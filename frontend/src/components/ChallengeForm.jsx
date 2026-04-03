import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const ChallengeForm = ({ challenges, setChallenges, editingChallenge, setEditingChallenge }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({ name: '', description: '', example: '', sampleInputSet: '', sampleOutputSet: '', constraints: '', unitTestSet: '', difficulty: '', category: '', releaseDate: ''});

  useEffect(() => {
    if (editingChallenge) {
      setFormData({
        name: editingChallenge.name,
        description: editingChallenge.description,
        example: editingChallenge.example,
        sampleInputSet: editingChallenge.sampleInputSet,
        sampleOutputSet: editingChallenge.sampleOutputSet,
        constraints: editingChallenge.constraints,
        unitTestSet: editingChallenge.unitTestSet,
        difficulty: editingChallenge.difficulty,
        category: editingChallenge.category,
        releaseDate: editingChallenge.releaseDate?.split('T')[0]
      });
    } else {
      setFormData({ name: '', description: '', example: '', sampleInputSet: '', sampleOutputSet: '', constraints: '', unitTestSet: '', difficulty: '', category: '', releaseDate: '' });
    }
  }, [editingChallenge]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingChallenge) {
        const response = await axiosInstance.put(`/api/challenges/${editingChallenge._id}`, formData, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setChallenges(challenges.map((challenge) => (challenge._id === response.data._id ? response.data : challenge)));
      } else {
        const response = await axiosInstance.post('/api/challenges', formData, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setChallenges([...challenges, response.data]);
      }
      setEditingChallenge(null);
      setFormData({ name: '', description: '', example: '', sampleInputSet: '', sampleOutputSet: '', constraints: '', unitTestSet: '', difficulty: '', category: '', releaseDate: '' });
    } catch (error) {
      console.log(error);
      alert('Failed to save challenge.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[#03346E] text-[#E2E2B6] p-6 shadow-lg rounded-xl mb-6">
      <h1 className="text-2xl font-bold mb-4">{editingChallenge ? 'Edit Existing Challenge' : 'Create New Challenge'}</h1>
      <input
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        className="w-full mb-4 px-4 py-3 bg-[#021526] border border-[#6EACDA] text-[#E2E2B6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6EACDA]"
      />
      <textarea
        placeholder="Enter challenge description"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        className="w-full mb-4 px-4 py-3 bg-[#021526] border border-[#6EACDA] text-[#E2E2B6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6EACDA]"
      />
      <textarea
        placeholder="Enter example"
        value={formData.example}
        onChange={(e) => setFormData({ ...formData, example: e.target.value })}
        className="w-full mb-4 px-4 py-3 bg-[#021526] border border-[#6EACDA] text-[#E2E2B6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6EACDA]"
      />
      <textarea
        placeholder="Enter sample input set"
        value={formData.sampleInputSet}
        onChange={(e) => setFormData({ ...formData, sampleInputSet: e.target.value })}
        className="w-full mb-4 px-4 py-3 bg-[#021526] border border-[#6EACDA] text-[#E2E2B6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6EACDA]"
      />
      <textarea
        placeholder="Enter sample output set"
        value={formData.sampleOutputSet}
        onChange={(e) => setFormData({ ...formData, sampleOutputSet: e.target.value })}
        className="w-full mb-4 px-4 py-3 bg-[#021526] border border-[#6EACDA] text-[#E2E2B6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6EACDA]"
      />
      <textarea
        placeholder="Enter constraints"
        value={formData.constraints}
        onChange={(e) => setFormData({ ...formData, constraints: e.target.value })}
        className="w-full mb-4 px-4 py-3 bg-[#021526] border border-[#6EACDA] text-[#E2E2B6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6EACDA]"
      />
      <textarea
        placeholder="Enter unit test"
        value={formData.unitTestSet}
        onChange={(e) => setFormData({ ...formData, unitTestSet: e.target.value })}
        className="w-full mb-4 px-4 py-3 bg-[#021526] border border-[#6EACDA] text-[#E2E2B6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6EACDA]"
      />
      <select
        value={formData.difficulty}
        onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
        className="w-full mb-4 p-2 bg-[#021526] border border-[#6EACDA] text-[#E2E2B6] rounded focus:outline-none"
      >
        <option value="">Select Difficulty</option>
        <option value="Easy">Easy</option>
        <option value="Medium">Medium</option>
        <option value="Hard">Hard</option>
      </select>
      <select
        value={formData.category}
        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
        className="w-full mb-4 p-2 bg-[#021526] border border-[#6EACDA] text-[#E2E2B6] rounded focus:outline-none"
      >
        <option value="">Select Category</option>
        <option value="Data structure">Data structure</option>
        <option value="Algorithm">Algorithm</option>
      </select>
      <input
        type="date"
        value={formData.releaseDate}
        onChange={(e) => setFormData({ ...formData, releaseDate: e.target.value })}
        className="w-full mb-4 p-2 bg-[#021526] border border-[#6EACDA] text-[#E2E2B6] rounded"
      />      
      
      <button type="submit" className="w-full bg-[#6EACDA] text-[#021526] font-semibold p-2 rounded-lg hover:opacity-90 transition">
        {editingChallenge ? 'Update' : 'Create'}
      </button>
    </form>
  );
};

export default ChallengeForm;
