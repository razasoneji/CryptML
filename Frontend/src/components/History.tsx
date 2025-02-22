import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Clock, X, CheckCircle, XCircle, Edit } from 'lucide-react';
import type { AlgorithmIdentificationHistory, PopupProps } from '../types';

// Static mock data for demo purposes
const mockHistory: AlgorithmIdentificationHistory[] = [
  {
    id: '1',
    data: 'AES-256 encryption pattern with block size 128 bits and key length thhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhjbgjhvhgcgfcgfxfhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh',
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

const formatTimeAgo = (timestamp: string): string => {
  const now = new Date();
  const date = new Date(timestamp);
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return 'just now';
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
  } else if (diffInSeconds < 604800) {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} ${days === 1 ? 'day' : 'days'} ago`;
  } else {
    return date.toLocaleDateString('en-US', { 
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    });
  }
};

const Popup: React.FC<PopupProps> = ({ item, onClose, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [correctData, setCorrectData] = useState(item?.correctData);

  if (!item) return null;

  const handleSave = () => {
    setIsEditing(false);
    if (onEdit) {
      onEdit(item.id, correctData || false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      <div 
        className="fixed inset-0 bg-black/20 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-800">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Algorithm Details</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 space-y-6">
          <div>
            <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Data</label>
            <p className="mt-2 text-gray-900 dark:text-gray-100 break-words">{item.data}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Created At</label>
            <p className="mt-2 text-gray-900 dark:text-gray-100">
              {new Date(item.timestamp).toLocaleString('en-US', {
                dateStyle: 'medium',
                timeStyle: 'short'
              })}
            </p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Prediction Status</label>
            <div className="mt-2 flex items-center">
              {isEditing ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCorrectData(true)}
                    className={`px-2 py-1 rounded-md text-sm font-medium ${
                      correctData
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200'
                    }`}
                  >
                    Correct
                  </button>
                  <button
                    onClick={() => setCorrectData(false)}
                    className={`px-2 py-1 rounded-md text-sm font-medium ${
                      !correctData
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200'
                    }`}
                  >
                    Incorrect
                  </button>
                </div>
              ) : (
                <>
                  {correctData ? (
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-500 mr-2" />
                  )}
                  <span className={`font-medium ${correctData ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'}`}>
                    {correctData ? 'Correct' : 'Incorrect'}
                  </span>
                </>
              )}
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="ml-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 p-1"
                >
                  <Edit className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Predicted Algorithm</label>
            <p className="mt-2 text-gray-900 dark:text-gray-100">{item.predictedAlgorithm}</p>
          </div>
          {isEditing && (
            <div className="flex justify-end">
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                Save
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default function HistoryPage() {
  const [selectedItem, setSelectedItem] = useState<AlgorithmIdentificationHistory | null>(null);
  const [history, setHistory] = useState<AlgorithmIdentificationHistory[]>(mockHistory);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Uncomment the following useEffect block to fetch data from an API
  /*
  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get<AlgorithmIdentificationHistory[]>('https://api.example.com/history');
        setHistory(response.data);
      } catch (error) {
        setError('Failed to fetch history data');
        console.error("Error fetching history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);
  */

  const handleEdit = async (id: string, correctData: boolean) => {
    try {
      // Update in the backend when API is ready
      // await axios.patch(`https://api.example.com/history/${id}`, { correctData });
      
      // Update local state
      setHistory((prevHistory) =>
        prevHistory.map((item) =>
          item.id === id ? { ...item, correctData } : item
        )
      );
    } catch (error) {
      console.error("Error updating history item:", error);
      // Handle error appropriately
    }
  };

  if (loading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  if (error) return <div className="flex justify-center items-center min-h-screen text-red-500">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-bold text-2xl text-gray-900 dark:text-gray-100 mb-8">
          Algorithm Identification History
        </h2>
        
        <div className="space-y-4">
          {history.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-2 flex-1 min-w-0">
                  <p className="text-base font-medium text-gray-900 dark:text-gray-100 truncate">
                    {item.data}
                  </p>
                  <div className="flex items-center space-x-2">
                    {item.correctData ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-500" />
                    )}
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {item.predictedAlgorithm}
                    </span>
                  </div>
                </div>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <Clock className="w-4 h-4 mr-1 flex-shrink-0" />
                  {formatTimeAgo(item.timestamp)}
                </div>
              </div>
            </div>
          ))}
        </div>

        <Popup 
          item={selectedItem} 
          onClose={() => setSelectedItem(null)} 
          onEdit={handleEdit}
        />
      </div>
    </div>
  );
}