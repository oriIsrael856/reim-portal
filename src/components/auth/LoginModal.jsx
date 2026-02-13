import React, { useState } from 'react';
import { Lock, X } from 'lucide-react';

const LoginModal = ({ onClose, onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onLogin(email, password);
      onClose();
    } catch (error) {
      alert(`שגיאת התחברות: ${error.code}`);
    }
  };

  return (
    <div className="fixed inset-0 z-[10000] bg-black/60 flex items-center justify-center backdrop-blur-md px-4">
      <div className="bg-white p-10 rounded-[32px] shadow-2xl w-full max-w-sm relative border-4 border-[#F3F0FF]">
        <button onClick={onClose} className="absolute top-6 left-6 text-gray-400 hover:text-black"><X /></button>
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#F3F0FF] rounded-2xl flex items-center justify-center mx-auto mb-4 text-[#5E3BEE]">
            <Lock size={32} />
          </div>
          <h2 className="text-2xl font-black text-[#2D2D44]">כניסת מנהל</h2>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input type="email" placeholder="אימייל" className="p-4 bg-gray-50 border-2 border-transparent focus:border-[#5E3BEE] rounded-2xl outline-none transition-all" value={email} onChange={e => setEmail(e.target.value)} />
          <input type="password" placeholder="סיסמה" className="p-4 bg-gray-50 border-2 border-transparent focus:border-[#5E3BEE] rounded-2xl outline-none transition-all" value={password} onChange={e => setPassword(e.target.value)} />
          <button type="submit" className="bg-[#5E3BEE] text-white py-4 rounded-2xl font-black shadow-lg shadow-[#5E3BEE]/30 hover:bg-[#4a2ec6] transition-all mt-2">
            התחברות למערכת
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
