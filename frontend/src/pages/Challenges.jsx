import { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';
import ChallengeForm from '../components/ChallengeForm';
import ChallengeList from '../components/ChallengeList';
import { useAuth } from '../context/AuthContext';

const Challenges = () => {
  const { user } = useAuth();
  const [challenges, setChallenges] = useState([]);
  const [editingChallenge, setEditingChallenge] = useState(null);

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const response = await axiosInstance.get('/api/challenges', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setChallenges(response.data);
      } catch (error) {
        alert('Failed to fetch challenges.');
      }
    };

    fetchChallenges();
  }, [user]);

  return (
    <div className="container mx-auto p-6">
      {user?.role === 'admin' && (
        <ChallengeForm
        challenges={challenges}
        setChallenges={setChallenges}
        editingChallenge={editingChallenge}
        setEditingChallenge={setEditingChallenge}
      />
      )}
      <ChallengeList challenges={challenges} setChallenges={setChallenges} setEditingChallenge={setEditingChallenge} />
    </div>
  );
};

export default Challenges;
