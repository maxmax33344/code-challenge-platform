import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';
import { useNavigate } from 'react-router-dom';

const ChallengeList = ({ challenges, setChallenges, setEditingChallenge }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleDelete = async (challengeId) => {
    try {
      await axiosInstance.delete(`/api/challenges/${challengeId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setChallenges(challenges.filter((challenge) => challenge._id !== challengeId));
    } catch (error) {
      alert('Failed to delete challenge.');
    }
  };

  const handleHide = async (challengeId) => {
    try {
      console.log(challengeId);
      const res = await axiosInstance.put(`/api/challenges/${challengeId}/hide`, {}, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setChallenges(challenges.map((challenge) => (challenge._id === challengeId ? res.data : challenge)));
    } catch (error) {
      console.log(error);
      alert('Failed to hide challenge.');
    }
  }; 

  const handleView = async (challengeId) => {
    try {
      console.log(challengeId);
      const challenge = challenges.find(c => c._id === challengeId);
      if (!challenge) return;
      if (!challenge.released && user.role !== 'admin'){
        alert('This challenge is not released yet.');
        return;
      }
      navigate(`/challenges/${challengeId}`);
    } catch (error) {
      console.log(error);
    }
  }; 

  return (
    <div>
      {challenges.map((challenge) => (
        <div key={challenge._id} className="bg-gray-100 p-4 mb-4 rounded shadow">
          <h2 className="font-bold">{challenge.name}</h2>
          <p>{challenge.description}</p>
          <p className="text-sm text-gray-500">ReleaseDate: {new Date(challenge.releaseDate).toLocaleDateString()}</p>
          <div className="mt-2 flex gap-3">
            <button
              onClick={() => handleView(challenge._id)}
              className="bg-orange-500 text-white px-4 py-2 rounded"
            >
              View
            </button>
            {user?.role === 'admin' && (  
              <>
                <button
                  onClick={() => setEditingChallenge(challenge)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(challenge._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleHide(challenge._id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Hide
                </button>
              </>
            )}          
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChallengeList;
