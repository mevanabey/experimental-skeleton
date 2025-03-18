// @ts-nocheck

import { useState, useEffect } from "react";
import { createClient, LiveTranscriptionEvents, DeepgramClient } from "@deepgram/sdk";
import { MicVAD } from "@ricky0123/vad-web";

interface TranscriptEvent {
  channel: {
    alternatives: Array<{ transcript: string }>;
  };
  is_final: boolean;
}

interface UseTranscriptionReturn {
  isListening: boolean;
  isSpeaking: boolean; // Added for visual feedback
  transcript: string;
  startListening: () => void;
  stopListening: () => void;
  clearTranscript: () => void;
  error: Error | null;
}

export const useTranscription = (options?: {
  language?: string;
  model?: string;
  apiKey?: string;
}): UseTranscriptionReturn => {
  const [isListening, setIsListening] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false); // Tracks VAD speech detection
  const [transcript, setTranscript] = useState<string>("");
  const [error, setError] = useState<Error | null>(null);
  const [vadInstance, setVadInstance] = useState<MicVAD | null>(null);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);

  useEffect(() => {
    let deepgramConnection: ReturnType<DeepgramClient["listen"]["live"]> | undefined;
    let mediaRecorder: MediaRecorder | undefined;
    let audioStream: MediaStream | undefined;

    const startTranscription = async () => {
      console.log("[Combined] Starting...");
      try {
        audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        console.log("[Combined] Audio stream acquired:", audioStream);

        const deepgram = createClient(options?.apiKey || "your-deepgram-api-key");
        deepgramConnection = deepgram.listen.live({
          model: options?.model || "nova-2",
          language: options?.language || "en-US",
          smart_format: true,
          interim_results: true,
          utterance_end_ms: 1000,
        });

        const vad = await MicVAD.new({
          onSpeechStart: () => {
            console.log("[Combined] Speech started");
            setIsSpeaking(true);
            if (mediaRecorder && mediaRecorder.state === "inactive") {
              mediaRecorder.start(1000); // Start recording only on speech
            }
          },
          onSpeechEnd: (audio: Float32Array) => {
            console.log("[Combined] Speech ended, audio length:", audio.length);
            setIsSpeaking(false);
            if (mediaRecorder && mediaRecorder.state === "recording") {
              mediaRecorder.stop(); // Stop recording, triggering data send
            }
            const blob = new Blob([audio.buffer], { type: "audio/wav" });
            const url = URL.createObjectURL(blob);
            console.log("[Combined] Speech segment URL:", url);
          },
          positiveSpeechThreshold: 0.7, // Slightly higher for stricter detection
          negativeSpeechThreshold: 0.3,
          redemptionFrames: 5, // More frames to avoid false stops
          minSpeechFrames: 5, // Ensure longer speech segments
        });
        setVadInstance(vad);
        console.log("[Combined] VAD initialized:", vad);

        deepgramConnection.on(LiveTranscriptionEvents.Open, () => {
          console.log("[Combined] Deepgram connection opened");
          mediaRecorder = new MediaRecorder(audioStream!, { mimeType: "audio/webm" });

          mediaRecorder.ondataavailable = (event: BlobEvent) => {
            console.log("[Combined] MediaRecorder data available:", event.data.size);
            setAudioChunks((prev) => [...prev, event.data]);
            if (event.data.size > 0 && deepgramConnection) {
              deepgramConnection.send(event.data); // Send only when speech detected
            }
          };

          mediaRecorder.onstop = () => {
            console.log("[Combined] MediaRecorder stopped (speech ended or manual stop)");
            const audioBlob = new Blob(audioChunks, { type: "audio/webm" });
            const audioUrl = URL.createObjectURL(audioBlob);
            console.log("[Combined] Recording chunk URL:", audioUrl);
            setAudioChunks([]);
          };

          mediaRecorder.onerror = (e) => console.error("[Combined] MediaRecorder error:", e);

          deepgramConnection.on(LiveTranscriptionEvents.Transcript, (data: TranscriptEvent) => {
            const newTranscript = data.channel.alternatives[0].transcript;
            console.log("[Combined] Transcript received:", { text: newTranscript, is_final: data.is_final });
            if (newTranscript && data.is_final) {
              setTranscript((prev) => `${prev} ${newTranscript}`.trim());
            }
          });

          deepgramConnection.on(LiveTranscriptionEvents.Error, (err: unknown) => {
            console.error("[Combined] Deepgram error:", err);
          });

          deepgramConnection.on(LiveTranscriptionEvents.Close, () => {
            console.log("[Combined] Deepgram connection closed");
          });

          vad.start(); // Start VAD, MediaRecorder waits for speech
          console.log("[Combined] VAD started, awaiting speech...");
        });
      } catch (err) {
        console.error("[Combined] Start failed:", err);
        setError(err instanceof Error ? err : new Error("Failed to start"));
        setIsListening(false);
      }
    };

    const stopTranscription = () => {
      console.log("[Combined] Stopping...");
      if (deepgramConnection) deepgramConnection.finish();
      if (mediaRecorder && mediaRecorder.state !== "inactive") mediaRecorder.stop();
      if (audioStream) audioStream.getTracks().forEach((track) => track.stop());
      if (vadInstance) vadInstance.destroy();
      setIsSpeaking(false);
      console.log("[Combined] Stopped");
    };

    if (isListening) {
      startTranscription();
    }

    return () => {
      stopTranscription();
    };
  }, [isListening, options?.apiKey, options?.language, options?.model]);

  const startListening = () => {
    console.log("[Combined] Start triggered");
    setIsListening(true);
  };
  const stopListening = () => {
    console.log("[Combined] Stop triggered");
    setIsListening(false);
  };
  const clearTranscript = () => setTranscript("");

  return {
    isListening,
    isSpeaking, // Exposed for visual feedback
    transcript,
    startListening,
    stopListening,
    clearTranscript,
    error,
  };
};