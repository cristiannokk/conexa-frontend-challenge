import Image from 'next/image';
import { Character } from '@/store/useCharacterStore';

export interface CharacterCardProps {
  character: Character;
  isSelected?: boolean;
  onClick?: () => void;
}

export const CharacterCard = ({
  character,
  isSelected = false,
  onClick,
}: CharacterCardProps) => {
  return (
    <div
      onClick={onClick}
      className={`rounded-lg p-3 cursor-pointer transition-all duration-200 ${
        isSelected
          ? 'bg-[#192a48] border border-conexa-neon shadow-[0_0_8px_rgba(57,255,20,0.3)]'
          : 'bg-[#0e1f3d] border border-slate-700/40 hover:border-slate-500 opacity-75 hover:opacity-100'
      }`}
    >
      <div className="flex flex-col items-center">
        <div
          className={`w-20 h-20 rounded-full overflow-hidden mb-2 relative bg-slate-900 shrink-0 ${
            isSelected
              ? 'border-2 border-conexa-neon'
              : 'border border-slate-700/60'
          }`}
        >
          <Image
            src={character.image}
            alt={character.name}
            fill
            sizes="80px"
            className="object-cover"
          />
        </div>
        <h3 className="font-semibold text-sm text-white text-center truncate w-full">
          {character.name}
        </h3>
        <span className="text-xs text-slate-400 text-center truncate w-full mt-0.5">
          {character.status} - {character.species}
        </span>
      </div>
    </div>
  );
};

export default CharacterCard;
