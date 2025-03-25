
import React from 'react';
import { Mic } from 'lucide-react';

interface MicrophoneWithWavesProps {
  isRecording: boolean;
  isSpeaking: boolean;
}

const MicrophoneWithWaves: React.FC<MicrophoneWithWavesProps> = ({ isRecording, isSpeaking }) => {
  const activeColor = isRecording ? '#CB48B7' : isSpeaking ? '#301A4B' : '#64748b';
  
  return (
    <div className="relative h-5 w-5 flex items-center justify-center">
      {/* Microphone icon */}
      <Mic 
        size={17} 
        className="absolute z-10" 
        color={activeColor} 
      />
      
      {/* Sound waves - only show when active */}
      {(isRecording || isSpeaking) && (
        <>
          {/* First wave */}
          <div 
            className={`absolute w-full h-full rounded-full animate-ping-slow opacity-30 border`}
            style={{ 
              borderColor: activeColor, 
              animationDuration: '1.5s',
              transform: 'scale(1.2)',
              animationDelay: '0s'
            }} 
          />
          
          {/* Second wave */}
          <div 
            className={`absolute w-full h-full rounded-full animate-ping-slow opacity-30 border`}
            style={{ 
              borderColor: activeColor, 
              animationDuration: '1.5s',
              transform: 'scale(1.4)',
              animationDelay: '0.5s'
            }} 
          />
          
          {/* Third wave */}
          <div 
            className={`absolute w-full h-full rounded-full animate-ping-slow opacity-30 border`}
            style={{ 
              borderColor: activeColor, 
              animationDuration: '1.5s',
              transform: 'scale(1.6)',
              animationDelay: '1s'
            }} 
          />
        </>
      )}
    </div>
  );
};

export default MicrophoneWithWaves;
