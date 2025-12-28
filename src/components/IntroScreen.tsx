import React from 'react';

interface IntroScreenProps {
  onStart: () => void;
}

export const IntroScreen: React.FC<IntroScreenProps> = ({ onStart }) => {
  return (
    <div className="absolute inset-0 z-50 bg-sky-100 flex flex-col items-center justify-center p-8 text-center">
      <h1 className="text-4xl font-bold text-sky-700 mb-8">Bridge Magic</h1>
      
      <div className="bg-white p-6 rounded-2xl shadow-xl max-w-sm w-full space-y-8">
        <div className="flex items-center space-x-4 text-left">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center text-3xl shadow-sm border-2 border-yellow-300">
            👇
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">Child's Job</h3>
            <p className="text-gray-600">Tap the <span className="text-yellow-600 font-bold">big colorful buttons</span> at the bottom to get parts!</p>
          </div>
        </div>

        <div className="flex items-center space-x-4 text-left">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-3xl shadow-sm border-2 border-blue-300">
            👆
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">Parent's Job</h3>
            <p className="text-gray-600">Drag the parts to <span className="text-blue-600 font-bold">build the bridge</span> at the top!</p>
          </div>
        </div>

        <div className="pt-4">
           <p className="text-lg font-medium text-green-700 mb-4">Work together to finish the bridge!</p>
           <button 
             onClick={onStart}
             className="w-full bg-green-500 hover:bg-green-600 text-white text-2xl font-bold py-4 px-8 rounded-full shadow-lg transform transition active:scale-95"
           >
             Start Playing! 🚀
           </button>
        </div>
      </div>
    </div>
  );
};
