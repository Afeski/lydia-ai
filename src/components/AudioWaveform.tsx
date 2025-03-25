
import React, { useEffect, useRef } from 'react';

interface AudioWaveformProps {
  isRecording: boolean;
  isSpeaking: boolean;
}

const AudioWaveform: React.FC<AudioWaveformProps> = ({ isRecording, isSpeaking }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const activeStateRef = useRef<boolean>(false);

  // Generate dynamic waveform data
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
    
    // Generate waveform with more natural waves
    ctx.beginPath();
    
    // Create a more dynamic waveform with multiple frequency components
    for (let x = 0; x < width; x++) {
      // Create more dynamic waves with varying amplitudes
      const scale = isActive ? 1 : 0.3;
      const primaryWave = Math.sin(x * 0.05 + Date.now() * 0.005) * 6 * scale;
      const secondaryWave = Math.sin(x * 0.1 + Date.now() * 0.002) * 3 * scale;
      const tertiaryWave = Math.sin(x * 0.2 + Date.now() * 0.003) * 1.5 * scale;
      
      const y = centerY + (primaryWave + secondaryWave + tertiaryWave);
      
      if (x === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    
    ctx.stroke();
    
    // Continue animation loop
    animationFrameRef.current = requestAnimationFrame(generateWaveformData);
  };

  // Render initial state - static waveform when not active
  const renderStaticWaveform = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const width = canvas.width;
    const height = canvas.height;
    const centerY = height / 2;
    
    ctx.clearRect(0, 0, width, height);
    ctx.strokeStyle = '#301A4B';
    ctx.lineWidth = 1.5;
    
    ctx.beginPath();
    
    // Create a static waveform pattern
    for (let x = 0; x < width; x++) {
      const y = centerY + Math.sin(x * 0.2) * 2;
      if (x === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    
    ctx.stroke();
  };

  useEffect(() => {
    // Set canvas size
    if (canvasRef.current) {
      canvasRef.current.width = 24;
      canvasRef.current.height = 18;
      
      // Render initial static waveform
      renderStaticWaveform();
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
