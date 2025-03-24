
import React, { useEffect, useRef } from 'react';

interface AudioWaveformProps {
  isRecording: boolean;
  isSpeaking: boolean;
}

const AudioWaveform: React.FC<AudioWaveformProps> = ({ isRecording, isSpeaking }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const activeStateRef = useRef<boolean>(false);

  // Generate random waveform data
  const generateWaveformData = () => {
    const isActive = isRecording || isSpeaking;
    activeStateRef.current = isActive;
    
    // Only run animation when active
    if (!isActive) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const width = canvas.width;
    const height = canvas.height;
    const centerY = height / 2;
    
    // Clear the canvas
    ctx.clearRect(0, 0, width, height);
    
    // Set color based on state
    ctx.strokeStyle = isRecording ? '#CB48B7' : '#301A4B';
    ctx.lineWidth = 2;
    
    // Generate waveform
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    
    for (let x = 0; x < width; x += 3) {
      // Amplitude varies based on whether recording or speaking
      const amplitude = isActive ? Math.random() * 10 + 5 : 2;
      const y = centerY + Math.sin(x * 0.05) * amplitude;
      ctx.lineTo(x, y);
    }
    
    ctx.stroke();
    
    // Continue animation loop
    animationFrameRef.current = requestAnimationFrame(generateWaveformData);
  };

  useEffect(() => {
    // Set canvas size
    if (canvasRef.current) {
      canvasRef.current.width = 40;
      canvasRef.current.height = 20;
    }
    
    // Start or stop the animation based on state
    if ((isRecording || isSpeaking) && !activeStateRef.current) {
      generateWaveformData();
    }
    
    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isRecording, isSpeaking]);

  return (
    <canvas 
      ref={canvasRef} 
      className="audio-waveform" 
      aria-label={isRecording ? "Recording in progress" : isSpeaking ? "Lydia is speaking" : "Click to start conversation"}
    />
  );
};

export default AudioWaveform;
