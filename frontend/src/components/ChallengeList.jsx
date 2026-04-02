import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const ChallengeList = ({ challenges, setChallenges, setEditingChallenge }) => {
  const { user } = useAuth();

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

  return (
    <div>
      {challenges.map((challenge) => (
        <div key={challenge._id} className="bg-gray-100 p-4 mb-4 rounded shadow">
          <h2 className="font-bold">{challenge.title}</h2>
          <p>{challenge.description}</p>
          <p className="text-sm text-gray-500">ReleaseDate: {new Date(challenge.releaseDate).toLocaleDateString()}</p>
          <div className="mt-2">
            <button
              onClick={() => setEditingChallenge(challenge)}
              className="mr-2 bg-yellow-500 text-white px-4 py-2 rounded"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(challenge._id)}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChallengeList;
