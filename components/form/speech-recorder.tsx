import React, { useState, useRef } from 'react';
import { Mic, Square, AlertCircle } from 'lucide-react';

interface SpeechRecorderProps {
  onTranscriptionComplete: (transcription: string) => void;
  apiKey: string;
  onStateChange: (isRecording: boolean, isProcessing: boolean) => void;
}

export const SpeechRecorder: React.FC<SpeechRecorderProps> = ({
  onTranscriptionComplete,
  apiKey,
  onStateChange,
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string>('');
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);
      audioChunks.current = [];

      mediaRecorder.current.ondataavailable = (event) => {
        audioChunks.current.push(event.data);
      };

      mediaRecorder.current.onstop = async () => {
        const audioBlob = new Blob(audioChunks.current, { type: 'audio/wav' });
        onStateChange(false, true); // Set processing to true when recording stops
        await sendToDeepgram(audioBlob);
      };

      mediaRecorder.current.start();
      setIsRecording(true);
      setError(null);
      setStatus('Recording...');
      onStateChange(true, false); // Notify parent of recording state
    } catch (err) {
      setError('Error accessing microphone. Please ensure you have granted permission.');
      console.error('Error starting recording:', err);
      onStateChange(false, false);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current && isRecording) {
      mediaRecorder.current.stop();
      setIsRecording(false);
      setStatus('Processing audio...');
      
      // Stop all audio tracks
      mediaRecorder.current.stream.getTracks().forEach(track => track.stop());
    }
  };

  const sendToDeepgram = async (audioBlob: Blob) => {
    try {
      setStatus('Transcribing audio...');
      
      const response = await fetch('https://api.deepgram.com/v1/listen', {
        method: 'POST',
        headers: {
          'Authorization': `Token ${apiKey}`,
          'Content-Type': 'audio/wav',
        },
        body: audioBlob,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const transcription = data.results?.channels[0]?.alternatives[0]?.transcript;
      
      if (transcription) {
        console.log(transcription);
        onTranscriptionComplete(transcription);
        setStatus('Transcription complete!');
      } else {
        throw new Error('No transcription received');
      }
    } catch (err) {
      setError('Error processing audio. Please try again.');
      setStatus('');
      console.error('Error transcribing audio:', err);
    } finally {
      onStateChange(false, false); // Reset both states when done
    }
  };

  return (
    <div className="w-full max-w-3xl">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
          Describe the Incident
        </h2>
        
        <div className="text-center mb-6">
          <p className="text-gray-600 dark:text-gray-400">
            Please speak clearly into your microphone to describe what happened.
            We'll use this information to help fill out the incident report.
          </p>
        </div>

        <div className="flex flex-col items-center gap-4">
          <button
            onClick={isRecording ? stopRecording : startRecording}
            className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors ${
              isRecording
                ? 'bg-red-500 hover:bg-red-600'
                : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            {isRecording ? (
              <Square className="w-6 h-6 text-white" />
            ) : (
              <Mic className="w-6 h-6 text-white" />
            )}
          </button>

          <div className="text-sm font-medium">
            {status && (
              <span className="text-blue-600 dark:text-blue-400">{status}</span>
            )}
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-500 dark:text-red-400">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm">{error}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpeechRecorder; 