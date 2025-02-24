import React, { useState } from 'react';
import {
    Terminal, Clipboard, Search, Zap, Shield, Lock,
    AlertCircle, Hourglass, Key, Cpu, History
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { BackgroundBeams } from './ui/background-beams';
import { TypewriterEffect } from './ui/typewriter-effect';
import { toast } from 'react-hot-toast';

const algorithmDetails = {
    aes: {
        name: 'AES',
        description: 'Advanced Encryption Standard (AES) is a symmetric encryption algorithm using block cipher methodology',
        useCases: ['Data-at-rest encryption', 'SSL/TLS', 'Wireless security'],
        strengths: ['High performance', 'Hardware acceleration', 'NIST certified'],
        weaknesses: ['Key management complexity', 'IV misuse vulnerabilities'],
        keySizes: [128, 192, 256],
        type: 'Symmetric Block Cipher'
    },
    des: {
        name: 'DES',
        description: 'Data Encryption Standard (DES) is a legacy symmetric-key algorithm using Feistel network structure',
        useCases: ['Legacy systems', 'ATM PIN validation', 'Retrocompatibility'],
        strengths: ['Simple implementation', 'Historical significance'],
        weaknesses: ['56-bit key vulnerability', 'Brute-force susceptible'],
        keySizes: [56],
        type: 'Symmetric Block Cipher'
    },
    blowfish: {
        name: "Blowfish",
        type: "Symmetric Block Cipher",
        useCases: [
            "Password hashing",
            "File and disk encryption",
            "Embedded systems"
        ],
        strengths: [
            "Variable key length up to 448 bits",
            "Fast implementation on 32-bit CPUs",
            "No known practical attacks",
            "Public domain algorithm"
        ],
        weaknesses: [
            "Small block size (64 bits)",
            "Slow key schedule generation",
            "Not recommended for modern applications"
        ],
        description: "Blowfish is a symmetric block cipher designed by Bruce Schneier. While still secure, it's largely been superseded by newer algorithms like AES."
    },

    rc4: {
        name: "RC4 (Rivest Cipher 4)",
        type: "Stream Cipher",
        useCases: [
            "Legacy SSL/TLS protocols",
            "WEP encryption (historical)",
            "Real-time streaming encryption"
        ],
        strengths: [
            "Very fast and simple implementation",
            "Variable key size",
            "Stream cipher (no block size limitations)"
        ],
        weaknesses: [
            "Multiple known vulnerabilities",
            "Weak initialization vectors",
            "Not recommended for new applications"
        ],
        description: "RC4 is a stream cipher that was once widely used in protocols like SSL/TLS and WEP. Due to various vulnerabilities, it's no longer recommended for secure communications."
    },

    chacha20: {
        name: "ChaCha20",
        type: "Stream Cipher",
        useCases: [
            "TLS connections",
            "Mobile device encryption",
            "High-performance applications"
        ],
        strengths: [
            "Excellent performance in software",
            "No specialized hardware required",
            "Strong security margin",
            "Resistance to timing attacks"
        ],
        weaknesses: [
            "Less hardware support than AES",
            "Relatively new compared to other algorithms",
            "Limited adoption in legacy systems"
        ],
        description: "ChaCha20 is a modern stream cipher designed as an alternative to AES, offering excellent performance in software implementations."
    },

    rsa: {
        name: "RSA (Rivest-Shamir-Adleman)",
        type: "Asymmetric Cipher",
        useCases: [
            "Digital signatures",
            "Key exchange",
            "Secure communications",
            "Certificate authorities"
        ],
        strengths: [
            "Well-studied and widely deployed",
            "Suitable for both encryption and signatures",
            "Mathematical foundation based on factoring",
            "Public key infrastructure support"
        ],
        weaknesses: [
            "Slow compared to symmetric algorithms",
            "Large key sizes required",
            "Vulnerable to quantum computing attacks",
            "Complex implementation requirements"
        ],
        description: "RSA is one of the first practical public-key cryptosystems, widely used for secure data transmission and digital signatures."
    },

    dsa: {
        name: "Digital Signature Algorithm (DSA)",
        type: "Digital Signature",
        useCases: [
            "Digital document signing",
            "Certificate signing",
            "Authentication systems"
        ],
        strengths: [
            "Smaller signatures than RSA",
            "Fast signature generation",
            "FIPS standardized",
            "No encryption patent issues"
        ],
        weaknesses: [
            "Slower signature verification than RSA",
            "Random number generation critical",
            "Only useful for signatures, not encryption"
        ],
        description: "DSA is a Federal Information Processing Standard for digital signatures, specifically designed for signature operations."
    },

    ecdsa: {
        name: "Elliptic Curve Digital Signature Algorithm (ECDSA)",
        type: "Digital Signature",
        useCases: [
            "Blockchain transactions",
            "Mobile security",
            "IoT device authentication",
            "Smart cards"
        ],
        strengths: [
            "Shorter key lengths than RSA/DSA",
            "Fast operations",
            "Low computational overhead",
            "Ideal for constrained devices"
        ],
        weaknesses: [
            "Complex implementation",
            "Requires quality random numbers",
            "Some curves potentially weak",
            "Quantum computer vulnerable"
        ],
        description: "ECDSA provides the security of DSA while using much shorter keys through elliptic curve cryptography."
    },

    diffie_hellman_key_exchange: {
        name: "Diffie-Hellman Key Exchange",
        type: "Key Exchange Protocol",
        useCases: [
            "Secure key establishment",
            "VPN tunneling",
            "Session key generation",
            "Forward secrecy in TLS"
        ],
        strengths: [
            "No pre-shared secrets needed",
            "Perfect forward secrecy",
            "Fundamental to many protocols",
            "Mathematically proven security"
        ],
        weaknesses: [
            "Vulnerable to man-in-the-middle attacks without authentication",
            "Computationally intensive",
            "Requires careful parameter selection"
        ],
        description: "The Diffie-Hellman key exchange protocol allows two parties to establish a shared secret over an insecure channel."
    },

    ecdh_key_exchange: {
        name: "Elliptic Curve Diffie-Hellman (ECDH)",
        type: "Key Exchange Protocol",
        useCases: [
            "TLS handshakes",
            "Secure messaging apps",
            "IoT communication",
            "Mobile applications"
        ],
        strengths: [
            "More efficient than classical DH",
            "Smaller key sizes",
            "Strong security guarantees",
            "Ideal for mobile/embedded systems"
        ],
        weaknesses: [
            "Implementation complexity",
            "Specific curve selection important",
            "Potential quantum computing threats"
        ],
        description: "ECDH is a variant of the Diffie-Hellman key exchange protocol using elliptic curve cryptography for key agreement."
    },
};

const PredictionPage = () => {
    const [inputHex, setInputHex] = useState('');
    const [prediction, setPrediction] = useState<keyof typeof algorithmDetails | null>("blowfish");
    const [loading, setLoading] = useState(false);
    const [history, setHistory] = useState<{ input: string, result: string }[]>([]);
    const [showDetails, setShowDetails] = useState(true);

    interface AlgorithmDetails {
        name: string;
        description: string;
        useCases: string[];
        strengths: string[];
        weaknesses: string[];
        keySizes: number[];
        type: string;
    }


    const mockPredict = async (hex: string): Promise<string> => {
        // Replace with actual API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        const detected = hex.length % 2 === 0 ? 'aes' : 'des'; // Simple mock logic
        return detected;
    };

    const handlePredict = async () => {
        if (!inputHex.match(/^[0-9a-fA-F]+$/)) {
            toast.error('Invalid HEX format');
            return;
        }

        setLoading(true);
        try {
            const result = await mockPredict(inputHex);
            setPrediction(result as keyof typeof algorithmDetails);
            setHistory(prev => [{ input: inputHex, result }, ...prev.slice(0, 5)]);
            setShowDetails(true);
            toast.success('Analysis complete!');
        } catch (error) {
            toast.error('Prediction failed');
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = (text: string): void => {
        navigator.clipboard.writeText(text);
        toast.success('Copied to clipboard!');
    };

    const DetailSection: React.FC<{ title: string; icon: React.ComponentType<any>; items: string[] }> = ({ title, icon: Icon, items }) => (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-gray-900 rounded-lg"
        >
            <div className="flex items-center gap-2 mb-3">
                <Icon className="w-5 h-5 text-purple-400" />
                <h3 className="font-semibold text-purple-300">{title}</h3>
            </div>
            <ul className="space-y-2">
                {items.map((item, idx) => (
                    <li key={idx} className="flex items-start text-gray-400">
                        <span className="text-purple-400 mr-2">▹</span>
                        {item}
                    </li>
                ))}
            </ul>
        </motion.div>
    );

    return (
        <div className="relative min-h-screen bg-black text-white">
            <BackgroundBeams className="absolute top-0 left-0 w-full h-full pointer-events-none z-0" />

            <div className="container mx-auto px-4 py-12 relative z-10">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
                        Cryptographic Analysis
                    </h1>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Identify cryptographic algorithms using AI-powered pattern recognition and statistical analysis
                    </p>
                </div>

                {/* Main Content */}
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Input Section */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="rounded-xl border border-gray-800 bg-black/50 backdrop-blur-md p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-semibold flex items-center gap-2">
                                    <Search className="w-6 h-6 text-purple-400" />
                                    Analyze HEX Input
                                </h2>
                                <button
                                    onClick={() => copyToClipboard(inputHex)}
                                    className="flex items-center gap-2 text-sm text-gray-400 hover:text-white"
                                >
                                    <Clipboard className="w-5 h-5" />
                                    Copy
                                </button>
                            </div>

                            <textarea
                                value={inputHex}
                                onChange={(e) => setInputHex(e.target.value)}
                                className="w-full h-32 bg-gray-900 rounded-lg p-4 border border-gray-800 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 resize-none font-mono text-sm"
                                placeholder="Paste or enter HEX encoded data..."
                            />

                            <button
                                onClick={handlePredict}
                                disabled={loading}
                                className="w-full mt-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-6 py-4 rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <Hourglass className="w-5 h-5 animate-spin" />
                                        Analyzing...
                                    </>
                                ) : (
                                    <>
                                        <Terminal className="w-5 h-5" />
                                        Detect Algorithm
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Prediction Result */}
                        <AnimatePresence>
                            {prediction && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    className="rounded-xl border border-purple-800 bg-purple-900/20 backdrop-blur-md p-6"
                                >
                                    <div className="flex items-center gap-3 mb-4">
                                        <Shield className="w-8 h-8 text-purple-400" />
                                        <TypewriterEffect
                                            text={[{
                                                text: `Detected: ${algorithmDetails[prediction].name}`,
                                                className: "text-2xl font-bold bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent"
                                            }]}
                                            cursorClassName="bg-purple-400"
                                        />
                                    </div>

                                    {showDetails && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="grid md:grid-cols-2 gap-4"
                                        >
                                            <DetailSection
                                                title="Use Cases"
                                                icon={Zap}
                                                items={algorithmDetails[prediction].useCases}
                                            />
                                            <DetailSection
                                                title="Strengths"
                                                icon={Lock}
                                                items={algorithmDetails[prediction].strengths}
                                            />
                                            <DetailSection
                                                title="Weaknesses"
                                                icon={AlertCircle}
                                                items={algorithmDetails[prediction].weaknesses}
                                            />
                                            <DetailSection
                                                title="Technical Specs"
                                                icon={Cpu}
                                                items={[
                                                    `Type: ${algorithmDetails[prediction].type}`,
                                                    `Key Sizes: ${'keySizes' in (algorithmDetails[prediction] as AlgorithmDetails) ? (algorithmDetails[prediction] as AlgorithmDetails).keySizes.join('bit, ') + 'bit' : 'N/A'}`
                                                ]}
                                            />
                                        </motion.div>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* History Panel */}
                    <div className="space-y-6">
                        <div className="rounded-xl border border-gray-800 bg-black/50 backdrop-blur-md p-6">
                            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                <History className="w-6 h-6 text-purple-400" />
                                Analysis History
                            </h3>
                            <div className="space-y-3">
                                {history.map((entry, idx) => (
                                    <div
                                        key={idx}
                                        className="p-3 bg-gray-900 rounded-lg border border-gray-800 hover:border-purple-500 transition-colors cursor-pointer"
                                        onClick={() => {
                                            setInputHex(entry.input);
                                            setPrediction(entry.result as keyof typeof algorithmDetails);
                                        }}
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-mono text-gray-400">{entry.input.slice(0, 15)}...</span>
                                            <span className="text-purple-400 text-sm">{algorithmDetails[entry.result as keyof typeof algorithmDetails].name}</span>
                                        </div>
                                    </div>
                                ))}
                                {history.length === 0 && (
                                    <p className="text-center text-gray-500 py-4">No history yet</p>
                                )}
                            </div>
                        </div>

                        {/* Algorithm Quick Guide */}
                        <div className="rounded-xl border border-gray-800 bg-black/50 backdrop-blur-md p-6">
                            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                <Key className="w-6 h-6 text-purple-400" />
                                Supported Algorithms
                            </h3>
                            <div className="grid grid-cols-2 gap-2">
                                {Object.keys(algorithmDetails).map((algo) => (
                                    <div
                                        key={algo}
                                        className="p-2 text-sm bg-gray-900 rounded border border-gray-800 hover:border-purple-500 transition-colors"
                                    >
                                        {algorithmDetails[algo as keyof typeof algorithmDetails].name}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PredictionPage;