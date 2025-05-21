import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

  function Login({ onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
  
    const handleLogin = async (e) => {
      e.preventDefault();
      setError('');
  
      try {
        await signInWithEmailAndPassword(auth, email, password);
        onLogin();
        navigate('/admin');
      } catch (err) {
        setError('Invalid credentials.');
      }
    };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
    <form
      onSubmit={handleLogin}
      className="bg-black border border-[#39FF14] p-6 rounded-lg shadow-[0_0_10px_#39FF14] font-mono text-[#39FF14] w-full max-w-sm"
    >
      <h2 className="text-xl mb-4 text-center">Login</h2>
      {error && <p className="text-red-500 bg-black border border-red-500 p-2 rounded text-xs mb-4">{error}</p>}
  
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full mb-4 p-2 bg-black border border-[#39FF14] text-[#39FF14] placeholder:text-[#39FF14]/50 rounded focus:outline-none focus:ring-2 focus:ring-[#39FF14]"
        autoComplete="off"
      />
  
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full mb-6 p-2 bg-black border border-[#39FF14] text-[#39FF14] placeholder:text-[#39FF14]/50 rounded focus:outline-none focus:ring-2 focus:ring-[#39FF14]"
        autoComplete="off"
      />
  
      <button
        type="submit"
        className="w-full bg-[#39FF14] text-black font-semibold py-2 rounded hover:bg-green-400 transition"
      >
        Login
      </button>
    </form>
  </div>
  );
}

export default Login;
