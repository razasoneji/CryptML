import { useState } from 'react';
import { 
  Lock, Key, Hash, Clipboard, 
  RefreshCw, Settings, Shield, Zap, Rocket 
} from 'lucide-react';
import { BackgroundBeams } from './ui/background-beams';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';

const algorithms = [
  { name: 'AES', type: 'Symmetric', keySize: 256, icon: Lock },
  { name: 'DES', type: 'Symmetric', keySize: 56, icon: Lock },
  { name: '3DES', type: 'Symmetric', keySize: 168, icon: Lock },
  { name: 'Blowfish', type: 'Symmetric', keySize: 448, icon: Lock },
  { name: 'RC4', type: 'Stream', keySize: 2048, icon: Zap },
  { name: 'ChaCha20', type: 'Stream', keySize: 256, icon: Zap },
  { name: 'RSA', type: 'Asymmetric', keySize: 4096, icon: Key },
  { name: 'DSA', type: 'Signature', keySize: 3072, icon: Shield },
  { name: 'ECDSA', type: 'Signature', keySize: 384, icon: Shield },
  { name: 'Diffie-Hellman', type: 'Key Exchange', keySize: 4096, icon: Rocket },
  { name: 'ECDH', type: 'Key Exchange', keySize: 384, icon: Rocket },
  { name: 'MD5', type: 'Hash', keySize: 128, icon: Hash },
  { name: 'SHA-1', type: 'Hash', keySize: 160, icon: Hash },
  { name: 'SHA-256', type: 'Hash', keySize: 256, icon: Hash },
  { name: 'SHA3-256', type: 'Hash', keySize: 256, icon: Hash },
];

const EncryptionPage = () => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(algorithms[0]);
  const [inputText, setInputText] = useState('');
  const [encryptedText, setEncryptedText] = useState('Danish');
  const [hexValue, setHexValue] = useState('Vahora');
  const [key, setKey] = useState('');
  const [iv, setIV] = useState('');
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<{ algorithm: string; input: string; result: string }[]>([]);

  // Mock backend call

interface EncryptionResult {
    encrypted: string;
    hex: string;
}

const encryptData = async (
    text: string
): Promise<EncryptionResult> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
        encrypted: btoa(text),
        hex: Buffer.from(text).toString('hex')
    };
};

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const randomText = Array(32)
        .fill(null)
        .map(() => Math.random().toString(36)[2])
        .join('');
      
      setInputText(randomText);
      toast.success('Random text generated!');
    } catch (error) {
      toast.error('Generation failed');
    } finally {
      setLoading(false);
    }
  };

  const handleEncrypt = async () => {
    if (!inputText) {
      toast.error('Please generate or input text first');
      return;
    }

    setLoading(true);
    try {
      const result = await encryptData(inputText);
      setEncryptedText(result.encrypted);
      setHexValue(result.hex);
      
      setHistory(prev => [
        { algorithm: selectedAlgorithm.name, input: inputText, result: result.encrypted },
        ...prev.slice(0, 4)
      ]);
      
      toast.success('Encryption successful!');
    } catch (error) {
      toast.error('Encryption failed');
    } finally {
      setLoading(false);
    }
  };

interface CopyToClipboardProps {
    text: string;
    message: string;
}

const copyToClipboard = ({ text, message }: CopyToClipboardProps): void => {
    navigator.clipboard.writeText(text);
    toast.success(message);
};

  return (
    <div className="relative min-h-screen bg-black text-white">
      <BackgroundBeams className="absolute top-0 left-0 w-full h-full pointer-events-none z-0" />
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
            Cryptographic Operations
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Secure data transformations powered by industry-standard algorithms.
            {selectedAlgorithm && ` Selected: ${selectedAlgorithm.name}-${selectedAlgorithm.keySize}`}
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Algorithm Selection */}
          <div className="lg:col-span-1 space-y-6">
            <div className="rounded-xl border border-gray-800 bg-black/50 backdrop-blur-md p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Settings className="w-6 h-6 text-purple-400" />
                Algorithm Configuration
              </h2>
              
              <div className="grid grid-cols-2 gap-3">
                {algorithms.map((algo) => (
                  <motion.button
                    key={algo.name}
                    onClick={() => setSelectedAlgorithm(algo)}
                    className={`p-4 rounded-lg border transition-all ${
                      selectedAlgorithm.name === algo.name
                        ? 'border-purple-500 bg-purple-500/10'
                        : 'border-gray-800 hover:border-purple-400'
                    }`}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center gap-2">
                      <algo.icon className="w-5 h-5 text-purple-400" />
                      <span className="text-sm">{algo.name}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Key/IV Inputs */}
            <div className="rounded-xl border border-gray-800 bg-black/50 backdrop-blur-md p-6">
              <h3 className="text-lg font-semibold mb-4">Security Parameters</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Encryption Key</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={key}
                      onChange={(e) => setKey(e.target.value)}
                      className="w-full bg-gray-900 rounded-lg px-4 py-2 border border-gray-800 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                      placeholder={`Enter ${selectedAlgorithm.keySize}-bit key`}
                    />
                    <button
                      onClick={() => copyToClipboard({ text: key, message: 'Key copied!' })}
                      className="px-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      <Clipboard className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {['AES', 'DES', '3DES', 'Blowfish'].includes(selectedAlgorithm.name) && (
                  <div>
                    <label className="text-sm text-gray-400 mb-2 block">Initialization Vector (IV)</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={iv}
                        onChange={(e) => setIV(e.target.value)}
                        className="w-full bg-gray-900 rounded-lg px-4 py-2 border border-gray-800 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                        placeholder="Enter IV"
                      />
                      <button
                        onClick={() => copyToClipboard({ text: iv, message: 'IV copied!' })}
                        className="px-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                      >
                        <Clipboard className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Encryption Workspace */}
          <div className="lg:col-span-2 space-y-6">
            {/* Input/Output Section */}
            <div className="rounded-xl border border-gray-800 bg-black/50 backdrop-blur-md p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Input Text</h3>
                    <button
                      onClick={handleGenerate}
                      disabled={loading}
                      className="flex items-center gap-2 text-sm bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg transition-colors"
                    >
                      <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                      Generate Random
                    </button>
                  </div>
                  <div className="relative">
                    <textarea
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      className="w-full h-32 bg-gray-900 rounded-lg p-4 border border-gray-800 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 resize-none"
                      placeholder="Enter text or generate random"
                    />
                    {inputText && (
                      <button
                        onClick={() => copyToClipboard({ text: inputText, message: 'Input copied!' })}
                        className="absolute top-2 right-2 p-2 hover:bg-gray-800 rounded-lg"
                      >
                        <Clipboard className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold mt-2">Encrypted Output</h3>
                  <div className="relative">
                    <textarea
                      value={encryptedText}
                      readOnly
                      className="w-full h-32 bg-gray-900 rounded-lg p-4 border border-gray-800 resize-none"
                      placeholder="Encrypted result will appear here"

                    />
                    {encryptedText && (
                      <button
                        onClick={() => copyToClipboard({ text: encryptedText, message: 'Encrypted text copied!' })}
                        className="absolute top-2 right-2 p-2 hover:bg-gray-800 rounded-lg"
                      >
                        <Clipboard className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Hex Conversion */}
              <div className="mt-6">
                <h4 className="text-sm font-semibold text-gray-400 mb-2">Hex Representation</h4>
                <div className="relative">
                  <input
                    value={hexValue}
                    readOnly
                    className="h-12 w-full bg-gray-900 rounded-lg px-4 py-2 border border-gray-800 font-mono text-sm"
                  />
                  {hexValue && (
                    <button
                      onClick={() => copyToClipboard({ text: hexValue, message: 'Hex value copied!' })}
                      className="absolute right-2 top-2 p-2 hover:bg-gray-800 rounded-lg"
                    >
                      <Clipboard className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Encrypt Button */}
              <button
                onClick={handleEncrypt}
                disabled={loading || !inputText}
                className="w-full mt-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-6 py-4 rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
              >
                <Shield className="w-5 h-5" />
                {loading ? 'Encrypting...' : 'Perform Encryption'}
              </button>
            </div>

            {/* History Section */}
            <div className="rounded-xl border border-gray-800 bg-black/50 backdrop-blur-md p-6">
              <h3 className="text-lg font-semibold mb-4">Recent Operations</h3>
              <div className="space-y-3">
                {history.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-900 rounded-lg border border-gray-800"
                  >
                    <div className="flex items-center gap-3">
                      <Lock className="w-5 h-5 text-purple-400" />
                      <span className="font-mono text-sm">{item.algorithm}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400 text-sm">{item.input.slice(0, 15)}...</span>
                      <span className="text-purple-400">→</span>
                      <span className="text-gray-400 text-sm">{item.result.slice(0, 15)}...</span>
                    </div>
                  </div>
                ))}
                {history.length === 0 && (
                  <p className="text-center text-gray-500 py-4">No recent operations</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EncryptionPage;