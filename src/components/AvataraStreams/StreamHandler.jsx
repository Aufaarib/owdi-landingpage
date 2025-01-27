"use client";

import { StreamPlayer, useAvatarStream } from "@avatara/avatar-stream";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import ContinuousSessionButton from "./Buttons/ContinuousSessionButton";

// import { ContinuousSessionButtonRef } from "./buttons/ContinuousButton";
const StreamHandler = ({
  // interaction,
  // enableInterrupt,
  // enableText = true,
  // onStart,
  star,
  // onStreamStatusUpdate,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isTranscriptHidden, setIsTranscriptHidden] = useState(false);
  const messagesEndRef = useRef(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const {
    streamRefs,
    isSpeakLoading,
    // isSpeechPaused,
    isAvatarTalking,
    pause,
    onError,
    resume,
    speak,
    initPlayer,
  } = useAvatarStream({
    star,
    onPlaying: () => {
      console.log("Playing");
    },
    onSpeechEnd: () => {
      console.log("Ended");
    },
    onError: (err) => {
      alert("Microphone not found!. please check your device, and try again.");
    },
  });

  const uploadAudioFn = async (audioBlob) => {
    setIsLoading(true);
    try {
      const conversation_uid = localStorage.getItem("conversation_uid");

      if (!conversation_uid) {
        throw new Error("Conversation UID not found");
      }
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Token not found");
      }

      const formData = new FormData();

      formData.append("conversation_uid", conversation_uid || "");
      formData.append("audio", audioBlob);

      // console.log(audioBlob);
      // console.log(formData.get("audio"));
      // console.log(formData.get("conversation_uid"));

      // if (formData) {
      const response = await fetch("/api/avatara-apis/post-sts", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to upload audio");
      }

      // console.log(response);

      await speak(response, (texStream) => {
        setMessages((prev) => [...prev, texStream]);
      });
      return "";
    } catch (error) {
      throw new Error("Failed to get transcription");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEndSession = async () => {
    pause();
    setIsSessionActive(false);
  };

  const handleStartSession = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post("/api/avatara-apis/get-access-token", {
        remote_id: "maz-playground-remote-id",
      });

      const data = await response.data;

      // console.log(response.data);

      if (!data.stream_token || !data.token) {
        throw new Error("Invalid token response");
      }

      // localStorage.setItem("stream_token", data.stream_token);
      // localStorage.setItem("token", data.token);

      const conversationResponse = await axios.get(
        `/api/avatara-apis/get-conversation?star_uid=${star.uid}`,
        {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        }
      );

      // if (!conversationResponse.ok) {
      //   throw new Error(
      //     `Error: ${conversationResponse.status} ${conversationResponse.statusText}`
      //   );
      // }

      const conversationData = await conversationResponse.data;

      if (!conversationData || !conversationData.uid) {
        throw new Error("Invalid conversation data");
      }

      localStorage.setItem("conversation_uid", conversationData.uid);

      setIsSessionActive(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // const disabled = useMemo(() => {
  //   const _disabled = isLoading;

  //   return enableInterrupt ? _disabled : _disabled || isSpeakLoading;
  // }, [enableInterrupt, isLoading, isSpeakLoading]);

  // useEffect(() => {
  //   handleEndSession();
  // }, [enableInterrupt, interaction]);

  // useEffect(() => {
  //   handleEndSession();
  // }, []);

  return (
    <>
      <StreamPlayer
        containerStyle={{
          width: "100%",
          height: "100%",
          backgroundColor: "black",
          display: "flex",
          alignItems: "center",
          justifyItems: "center",
        }}
        isTalking={isAvatarTalking}
        streamRefs={streamRefs}
        onLoadStart={() => console.log("load")}
        onLoadedData={() => console.log("done")}
      />
      {messages?.length > 0 && (
        <div className="absolute bottom-[100px] z-30 w-full">
          <button
            onClick={() => setIsTranscriptHidden(!isTranscriptHidden)}
            className="flex flex-row w-full items-end justify-end text-white"
          >
            <span>
              {isTranscriptHidden ? "Tampilkan Transkrip" : "Tutup Transkrip"}
            </span>
            {isTranscriptHidden ? <IconChevronUp /> : <IconChevronDown />}
          </button>
          <div className="bg-opacity-40 p-4 backdrop-blur-sm backdrop-filter w-full max-h-48 overflow-y-auto">
            {!isTranscriptHidden &&
              messages?.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.role === "ai" ? "justify-start" : "justify-end"
                  } mb-2`}
                >
                  <div className="flex flex-col gap-3">
                    <p
                      className={`text-xs text-white font-bold ${
                        message.role === "ai" ? "text-left" : "text-right"
                      }`}
                    >
                      {message.role === "ai" ? star.name : "You"}
                    </p>
                    <p
                      className={`text-xs bg-slate-200 border-2 border-white p-3 text-[#001A41] rounded-b-2xl ${
                        message.role === "ai"
                          ? "rounded-tr-2xl"
                          : "rounded-tl-2xl"
                      }`}
                    >
                      {message.value}
                    </p>
                  </div>
                </div>
              ))}
            {/* Scroll Anchor */}
            <div ref={messagesEndRef}></div>
          </div>
        </div>
      )}
      <ContinuousSessionButton
        isLoading={isLoading}
        isSessionActive={isSessionActive}
        initPlayer={initPlayer}
        uploadAudioFn={uploadAudioFn}
        startSession={handleStartSession}
        endSession={handleEndSession}
        // onError={handleError}
        isAvatarTalking={isAvatarTalking}
      />
    </>
  );
};

export default StreamHandler;
