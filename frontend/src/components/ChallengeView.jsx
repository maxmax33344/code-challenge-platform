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
      return 'bg-green-100 text-green-700';
    case 'Medium':
      return 'bg-yellow-100 text-yellow-700';
    case 'Hard':
      return 'bg-red-100 text-red-700';
    default:
      return 'bg-gray-300 text-black';
  }
};

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
      <h1 className="text-3xl font-bold mb-4">{challenge.name}</h1>

      <p className="text-gray-500 mb-2">
        Difficulty: {''} <span className={`font-semibold ${getDifficultyColor(challenge.difficulty)}`}>{challenge.difficulty}</span>
      </p>

      <p className="text-gray-500 mb-2">
        Category: <span className="font-semibold">{challenge.category}</span>
      </p>
      <p className="text-sm text-gray-400 mb-6">
        Release Date: {new Date(challenge.releaseDate).toLocaleDateString()}
      </p>
      <p className="mb-4">{challenge.description}</p>

      <div className="mb-4">
        <h2 className="font-bold">Example</h2>
        <pre className="bg-gray-100 p-3 rounded">{challenge.example}</pre>
      </div>

      <div className="mb-4">
        <h2 className="font-bold">Sample Input</h2>
        <pre className="bg-gray-100 p-3 rounded">{challenge.sampleInputSet}</pre>
      </div>

      <div className="mb-4">
        <h2 className="font-bold">Sample Output</h2>
        <pre className="bg-gray-100 p-3 rounded">{challenge.sampleOutputSet}</pre>
      </div>

      <div className="mb-4">
        <h2 className="font-bold">Constraints</h2>
        <pre className="bg-gray-100 p-3 rounded">{challenge.constraints}</pre>
      </div>
    </div>
  );
};

export default ChallengeView;