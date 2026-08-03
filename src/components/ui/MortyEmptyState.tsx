'use client';

import dynamic from 'next/dynamic';
import mortyAnimationData from '../../../public/morty-cry.json';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

export const MortyEmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center p-5 rounded-2xl bg-[#091b39]/90 border border-conexa-neon/50 shadow-[0_0_20px_rgba(57,255,20,0.25)] text-center">
      <div className="w-32 h-32 mx-auto relative flex items-center justify-center">
        <Lottie animationData={mortyAnimationData} loop={true} />
      </div>
      <p className="text-sm font-extrabold text-conexa-neon mt-1">
        "Aw, geez, Rick..."
      </p>
      <p className="text-xs text-slate-300 mt-1.5 leading-relaxed max-w-[220px]">
        Estos personajes no comparten ningún episodio en esta dimensión.
      </p>
    </div>
  );
};

export default MortyEmptyState;
