
import React from 'react';
import { useAuth } from '../context/AuthContext';

interface ProfileProps {
  onBack: () => void;
}

const ProfileScreen: React.FC<ProfileProps> = ({ onBack }) => {
  const { user, signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
    onBack(); // Go back to home (which will redirect to auth if they try to access profile again)
  };

  return (
    <div className="flex-1 bg-white overflow-y-auto pb-24">
      <header className="px-6 pt-12 pb-8 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-md z-10">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h2 className="text-xl font-serif">My Profile</h2>
        <button className="p-2 text-black">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
      </header>

      <div className="px-8 flex flex-col items-center mb-10">
        <div className="relative mb-4">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-50 shadow-lg">
            <img src={user?.user_metadata?.avatar_url || "https://picsum.photos/seed/user/200/200"} alt="avatar" />
          </div>
          <button className="absolute bottom-1 right-1 bg-black text-white p-2 rounded-full shadow-md border-2 border-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            </svg>
          </button>
        </div>
        <h3 className="text-2xl font-semibold">{user?.email || "Guest User"}</h3>
        <p className="text-gray-400 text-sm">{user?.role || "Fashion Enthusiast"}</p>
      </div>

      <div className="px-6 space-y-2">
        <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 px-2 mb-4">Studio Activity</h4>
        
        <div className="grid grid-cols-2 gap-4 mb-8">
           <div className="bg-gray-50 p-6 rounded-[2rem] border border-gray-100">
              <span className="block text-2xl font-black mb-1">0</span>
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Saved Looks</span>
           </div>
           <div className="bg-gray-50 p-6 rounded-[2rem] border border-gray-100">
              <span className="block text-2xl font-black mb-1">0</span>
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">AR Try-Ons</span>
           </div>
        </div>

        <nav className="space-y-1">
          {[
            { label: 'My Wardrobe', icon: '👗' },
            { label: 'AI Design Lab', icon: '✨' },
            { label: 'Orders & Returns', icon: '📦' },
            { label: 'Payment Methods', icon: '💳' },
            { label: 'Help & Support', icon: '💬' }
          ].map((item) => (
            <button key={item.label} className="w-full flex items-center justify-between p-5 hover:bg-gray-50 rounded-2xl transition-colors group">
              <div className="flex items-center gap-4">
                <span className="text-xl grayscale group-hover:grayscale-0 transition-all">{item.icon}</span>
                <span className="text-sm font-semibold">{item.label}</span>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ))}
        </nav>

        <div className="pt-8 px-2">
          <button 
            onClick={handleLogout}
            className="w-full py-4 text-red-500 font-bold text-xs uppercase tracking-widest border border-red-100 rounded-2xl hover:bg-red-50 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};


export default ProfileScreen;
