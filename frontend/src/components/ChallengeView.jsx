import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../axiosConfig';
import { useAuth } from '../context/AuthContext';

const ChallengeView = () => {
  const { id } = useParams();
  const { user } = useAuth();

  const [challenge, setChallenge] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChallenge = async () => {
      try {
        const response = await axiosInstance.get(`/api/challenges/${id}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setChallenge(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchChallenge();
  }, [id, user]);

  if (loading) return <p>Loading...</p>;
  if (!challenge) return <p>Challenge not found</p>;

  const getDifficultyColor = (difficulty) => {
  switch (difficulty) {
    case 'Easy':
      return 'text-[#6EE7B7]';
    case 'Medium':
      return 'text-[#FACC15]';
    case 'Hard':
      return 'text-[#FCA5A5]';
    default:
      return 'text-black';
  }
};

  return (
  <div className="h-screen flex flex-col">

    <div className="flex-1 bg-[#03346E] text-[#E2E2B6] pt-6 px-6 pb-2 overflow-y-auto">
      
      <h1 className="text-3xl font-bold mb-4">{challenge.name}</h1>

      <p className="mb-2 text-sm">
        <span className="text-[#6EACDA]">Difficulty:</span>{" "}
        <span className={`font-semibold ${getDifficultyColor(challenge.difficulty)}`}>
          {challenge.difficulty}
        </span>
      </p>

      <p className="mb-2 text-sm">
        <span className="text-[#6EACDA]">Category:</span>{" "}
        <span className="font-semibold">{challenge.category}</span>
      </p>

      <p className="text-xs text-[#6EACDA] mb-4">
        Release Date: {new Date(challenge.releaseDate).toLocaleDateString()}
      </p>

      <p className="mb-4">{challenge.description}</p>

      <div className="mb-3">
        <h2 className="font-bold text-[#6EACDA]">Example</h2>
        <pre className="bg-[#021526] p-3 rounded font-mono text-sm">
          {challenge.example}
        </pre>
      </div>

      <div className="mb-3">
        <h2 className="font-bold text-[#6EACDA]">Sample Input</h2>
        <pre className="bg-[#021526] p-3 rounded font-mono text-sm">
          {challenge.sampleInputSet}
        </pre>
      </div>

      <div className="mb-3">
        <h2 className="font-bold text-[#6EACDA]">Sample Output</h2>
        <pre className="bg-[#021526] p-3 rounded font-mono text-sm">
          {challenge.sampleOutputSet}
        </pre>
      </div>

      <div className="mb-3">
        <h2 className="font-bold text-[#6EACDA]">Constraints</h2>
        <pre className="bg-[#021526] p-3 rounded font-mono text-sm">
          {challenge.constraints}
        </pre>
      </div>

    </div>

    <div className="h-[2px] bg-[#6EACDA]/30"></div>

    {/* For future editor area*/}
    <div className="h-1/2 bg-[#021526] p-4">
    </div>

  </div>
  );
}

export default ChallengeView;