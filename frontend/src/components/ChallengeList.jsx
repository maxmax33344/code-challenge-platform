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
        <div key={challenge._id} className="bg-[#03346E] text-[#E2E2B6] p-5 mb-4 rounded-xl shadow-md">
          <h2 className="font-bold text-xl mb-1">{challenge.name}</h2>
          <p className="text-sm mb-2 text-[#E2E2B6]/80">{challenge.description}</p>
          {user?.role === 'admin' && (
            <>
              <p className="text-xs text-[#6EACDA] mb-3">ReleaseDate: {" "} {new Date(challenge.releaseDate).toLocaleDateString()}</p>
            </>          
          )}
          <p className="mb-3">
          Difficulty:{" "}
          <span
            className={`font-semibold ${
              challenge.difficulty === "Easy"
                ? "text-[#6EE7B7]"
                : challenge.difficulty === "Medium"
                ? "text-[#FACC15]"
                : "text-[#FCA5A5]" //Hard
            }`}
          >
            {challenge.difficulty}
          </span>
        </p>
          <div className="mt-2 flex gap-3">
            <button
              onClick={() => handleView(challenge._id)}
              className="bg-[#6EACDA] text-[#021526] px-4 py-2 rounded-lg hover:opacity-90"
            >
              View
            </button>
            {user?.role === 'admin' && (  
              <>
                <button
                  onClick={() => setEditingChallenge(challenge)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-lg"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(challenge._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleHide(challenge._id)}
                  className="bg-[#021526] border border-[#6EACDA] text-[#6EACDA] px-4 py-2 rounded-lg"
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
