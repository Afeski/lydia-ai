
import React from 'react';
import { Mic } from 'lucide-react';

interface MicrophoneWithWavesProps {
  isRecording: boolean;
  isSpeaking: boolean;
  size?: "small" | "medium" | "large";
}

const MicrophoneWithWaves: React.FC<MicrophoneWithWavesProps> = ({ 
  isRecording, 
  isSpeaking, 
  size = "medium" 
}) => {
  const activeColor = isRecording ? '#CB48B7' : isSpeaking ? '#301A4B' : '#64748b';
  
  // Define sizes based on the size prop
  const getSizes = () => {
    switch(size) {
      case "small":
        return { icon: 17, container: "h-5 w-5", wave: { base: 1.2, second: 1.4, third: 1.6 }};
      case "medium":
        return { icon: 24, container: "h-8 w-8", wave: { base: 1.3, second: 1.6, third: 1.9 }};
      case "large":
        return { icon: 42, container: "h-14 w-14", wave: { base: 1.3, second: 1.6, third: 1.9 }};
      default:
        return { icon: 24, container: "h-8 w-8", wave: { base: 1.3, second: 1.6, third: 1.9 }};
    }
  };
  
  const sizes = getSizes();
  
  return (
    <div className={`relative ${sizes.container} flex items-center justify-center`}>
      {/* Microphone icon */}
      <Mic 
        size={sizes.icon} 
        className="absolute z-10" 
        color={activeColor} 
      />
      
      {/* Sound waves - only show when active */}
      {(isRecording || isSpeaking) && (
        <>
          {/* First wave */}
          <div 
            className={`absolute w-full h-full rounded-full animate-ping-slow opacity-30 border-2`}
            style={{ 
              borderColor: activeColor, 
              animationDuration: '1.5s',
              transform: `scale(${sizes.wave.base})`,
              animationDelay: '0s'
            }} 
          />
          
          {/* Second wave */}
          <div 
            className={`absolute w-full h-full rounded-full animate-ping-slow opacity-30 border-2`}
            style={{ 
              borderColor: activeColor, 
              animationDuration: '1.5s',
              transform: `scale(${sizes.wave.second})`,
              animationDelay: '0.5s'
            }} 
          />
          
          {/* Third wave */}
          <div 
            className={`absolute w-full h-full rounded-full animate-ping-slow opacity-30 border-2`}
            style={{ 
              borderColor: activeColor, 
              animationDuration: '1.5s',
              transform: `scale(${sizes.wave.third})`,
              animationDelay: '1s'
            }} 
          />
        </>
      )}
    </div>
  );
};

export default MicrophoneWithWaves;
