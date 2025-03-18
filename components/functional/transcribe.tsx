import React from 'react';
import { useTranscription } from '@/hooks/useTranscription'; // Adjust path

const TranscriptionDemo: React.FC = () => {
  const {
    isListening,
    isSpeaking,
    transcript,
    startListening,
    stopListening,
    clearTranscript,
    error,
  } = useTranscription({
    apiKey: "3dd78055f2a7a46a17b2d882fee573c9448430d5",
    language: "en-US",
    model: "nova-2",
  });

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Real-time Transcription with VAD</h1>

      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={startListening}
          disabled={isListening}
          style={{
            padding: '10px 20px',
            marginRight: '10px',
            backgroundColor: isListening ? '#ccc' : '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: isListening ? 'not-allowed' : 'pointer',
          }}
        >
          Start Listening
        </button>

        <button
          onClick={stopListening}
          disabled={!isListening}
          style={{
            padding: '10px 20px',
            marginRight: '10px',
            backgroundColor: !isListening ? '#ccc' : '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: !isListening ? 'not-allowed' : 'pointer',
          }}
        >
          Stop Listening
        </button>

        <button
          onClick={clearTranscript}
          style={{
            padding: '10px 20px',
            backgroundColor: '#2196F3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Clear Transcript
        </button>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>
          Status:{' '}
          <span style={{ color: isListening ? '#4CAF50' : '#666' }}>
            {isListening ? 'Listening' : 'Stopped'}
          </span>
        </h3>
        {/* Voice Activity Indicator */}
        {isListening && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', height: '20px' }}>
            {Array(5).fill(0).map((_, i) => (
              <div
                key={i}
                style={{
                  width: '8px',
                  height: isSpeaking ? `${10 + i * 4}px` : '4px',
                  backgroundColor: isSpeaking ? '#4CAF50' : '#ccc',
                  transition: 'height 0.1s ease',
                  borderRadius: '2px',
                }}
              />
            ))}
          </div>
        )}
        <p style={{ fontSize: '14px', color: '#666' }}>
          {isListening
            ? 'Speak clearly—audio is sent only during voice activity.'
            : 'Click Start to begin transcription.'}
        </p>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>Live Transcript:</h3>
        <div
          style={{
            minHeight: '150px',
            padding: '15px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            whiteSpace: 'pre-wrap',
            wordWrap: 'break-word',
            backgroundColor: '#f9f9f9',
            overflowY: 'auto',
          }}
        >
          {transcript.trim() || 'Waiting for speech...'}
        </div>
      </div>

      {error && (
        <div
          style={{
            color: '#f44336',
            marginTop: '10px',
            padding: '10px',
            border: '1px solid #f44336',
            borderRadius: '4px',
          }}
        >
          Error: {error.message}
        </div>
      )}
    </div>
  );
};

export default TranscriptionDemo;