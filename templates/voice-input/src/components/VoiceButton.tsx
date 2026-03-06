'use client';

import { useState, useCallback, useRef } from 'react';
import { AudioRecorder } from '@/lib/stt';

interface VoiceButtonProps {
  onTranscript: (text: string) => void;
  onError: (error: string) => void;
  disabled?: boolean;
}

type RecordingState = 'idle' | 'recording' | 'processing';

export function VoiceButton({ onTranscript, onError, disabled }: VoiceButtonProps) {
  const [state, setState] = useState<RecordingState>('idle');
  const recorderRef = useRef<AudioRecorder | null>(null);

  const startRecording = useCallback(async () => {
    try {
      recorderRef.current = new AudioRecorder();
      await recorderRef.current.start();
      setState('recording');
    } catch (err) {
      onError('Failed to access microphone. Please allow microphone access.');
      console.error(err);
    }
  }, [onError]);

  const stopRecording = useCallback(async () => {
    if (!recorderRef.current) return;

    setState('processing');

    try {
      const audioBlob = await recorderRef.current.stop();
      
      // Send to transcription API
      const formData = new FormData();
      formData.append('audio', audioBlob, 'recording.webm');

      const response = await fetch('/api/transcribe', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Transcription failed');
      }

      const data = await response.json();
      onTranscript(data.text);
    } catch (err) {
      onError('Failed to process audio. Please try again.');
      console.error(err);
    } finally {
      setState('idle');
      recorderRef.current = null;
    }
  }, [onTranscript, onError]);

  const handlePress = useCallback(() => {
    if (state === 'idle') {
      startRecording();
    } else if (state === 'recording') {
      stopRecording();
    }
  }, [state, startRecording, stopRecording]);

  // Touch handlers for press-and-hold on mobile
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    if (state === 'idle') {
      startRecording();
    }
  }, [state, startRecording]);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    if (state === 'recording') {
      stopRecording();
    }
  }, [state, stopRecording]);

  const getButtonStyles = () => {
    const base = 'w-32 h-32 rounded-full flex items-center justify-center transition-all duration-200 touch-none select-none';
    
    switch (state) {
      case 'recording':
        return `${base} bg-red-500 scale-110 animate-pulse shadow-lg shadow-red-500/50`;
      case 'processing':
        return `${base} bg-yellow-500 cursor-wait`;
      default:
        return `${base} bg-blue-500 hover:bg-blue-600 active:scale-95 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`;
    }
  };

  const getIcon = () => {
    switch (state) {
      case 'recording':
        return (
          <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
            <rect x="6" y="6" width="12" height="12" rx="2" />
          </svg>
        );
      case 'processing':
        return (
          <svg className="w-16 h-16 text-white animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        );
      default:
        return (
          <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.91-3c-.49 0-.9.36-.98.85C16.52 14.2 14.47 16 12 16s-4.52-1.8-4.93-4.15c-.08-.49-.49-.85-.98-.85-.61 0-1.09.54-1 1.14.49 3 2.89 5.35 5.91 5.78V20c0 .55.45 1 1 1s1-.45 1-1v-2.08c3.02-.43 5.42-2.78 5.91-5.78.1-.6-.39-1.14-1-1.14z" />
          </svg>
        );
    }
  };

  const getLabel = () => {
    switch (state) {
      case 'recording':
        return 'Release to send';
      case 'processing':
        return 'Processing...';
      default:
        return 'Hold to speak';
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <button
        type="button"
        className={getButtonStyles()}
        onClick={handlePress}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        disabled={disabled || state === 'processing'}
        aria-label={getLabel()}
      >
        {getIcon()}
      </button>
      <span className="text-lg font-medium text-gray-600 dark:text-gray-300">
        {getLabel()}
      </span>
    </div>
  );
}
