// @ts-nocheck

import { NextRequest } from "next/server";
import { createClient, LiveTranscriptionEvents } from "@deepgram/sdk";

export const runtime = "nodejs"; // Ensure Node.js runtime
export const dynamic = "force-dynamic"; // Force dynamic execution for real-time

export async function POST(req: NextRequest) {
  const deepgram = createClient("3dd78055f2a7a46a17b2d882fee573c9448430d5");
  const connection = deepgram.listen.live({
    model: "nova-2",
    language: "en-US",
    smart_format: true,
  });

  const stream = req.body as ReadableStream;
  const reader = stream.getReader();

  connection.on(LiveTranscriptionEvents.Open, () => {
    console.log("Deepgram connection opened");
  });

  connection.on(LiveTranscriptionEvents.Transcript, (data) => {
    const transcript = data.channel.alternatives[0].transcript;
    if (transcript) {
      console.log("Server transcript:", transcript);
      // In a real app, you'd stream this back to the client (e.g., via SSE or WebSocket)
    }
  });

  connection.on(LiveTranscriptionEvents.Close, () => {
    console.log("Deepgram connection closed");
  });

  connection.on(LiveTranscriptionEvents.Error, (err) => {
    console.error("Deepgram error:", err);
  });

  // Process audio stream
  const processStream = async () => {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      connection.send(Buffer.from(value));
    }
    connection.finish();
  };

  processStream();

  // Return a streaming response (e.g., Server-Sent Events)
  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    start(controller) {
      connection.on(LiveTranscriptionEvents.Transcript, (data) => {
        const transcript = data.channel.alternatives[0].transcript;
        if (transcript) {
          controller.enqueue(encoder.encode(`data: ${transcript}\n\n`));
        }
      });
      connection.on(LiveTranscriptionEvents.Close, () => {
        controller.close();
      });
    },
  });

  return new Response(readable, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}