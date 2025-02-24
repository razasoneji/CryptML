import { useState } from 'react';
import { HistoryListItem } from './HistoryListItem';

interface AlgorithmIdentificationHistory {
  id: string;
  data: string;
  timestamp: string;
  correctData: boolean;
  predictedAlgorithm: string;
}

// Static mock data for demo purposes
const mockHistory: AlgorithmIdentificationHistory[] = [
  {
    id: '1',
    data: 'AES-256 encryption pattern with block size 128 bits and key length 256AES-256 encryption pattern with block size 128 bits and key length 25AES-256 encryption pattern with block size 128 bits and key length 25AES-256 encryption pattern with block size 128 bits and key length 25AES-256 encryption pattern with block size 128 bits and key length 25',
    timestamp: '2024-03-15T10:30:00Z',
    correctData: true,
    predictedAlgorithm: 'AES-256'
  },
  {
    id: '2',
    data: 'Stream cipher pattern with continuous keystream generation and linear feedback',
    timestamp: '2024-03-15T09:30:00Z',
    correctData: false,
    predictedAlgorithm: 'RC4'
  },
  {
    id: '3',
    data: 'Public key cryptography pattern with prime factorization characteristics',
    timestamp: '2024-03-14T15:45:00Z',
    correctData: true,
    predictedAlgorithm: 'RSA'
  }
];

export default function HistoryPage() {
  const [history, setHistory] = useState<AlgorithmIdentificationHistory[]>(mockHistory);
  const [loading] = useState(false);
  const [error] = useState<string | null>(null);

  const handleStatusChange = (id: string, correctData: boolean) => {
    setHistory((prevHistory) =>
      prevHistory.map((item) =>
        item.id === id ? { ...item, correctData } : item
      )
    );
  };

  if (loading) return <div className="flex justify-center items-center min-h-screen text-white">Loading...</div>;
  if (error) return <div className="flex justify-center items-center min-h-screen text-red-500">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-black text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-bold text-2xl text-purple-400 mb-8">
          Algorithm Identification History
        </h2>
        
        <div className="space-y-4">
          {history.map((item) => (
            <HistoryListItem
              key={item.id}
              item={item}
              onStatusChange={handleStatusChange}
            />
          ))}
        </div>
      </div>
    </div>
  );
}