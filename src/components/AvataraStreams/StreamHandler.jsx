"use client";

import {
  StreamPlayer,
  useAvatarStream,
  useRecordAndSTTForContinuous,
} from "@avatara/avatar-stream";
import axios from "axios";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import ContinuousSessionButton from "./Buttons/ContinuousSessionButton";

// import { ContinuousSessionButtonRef } from "./buttons/ContinuousButton";
const StreamHandler = ({
  interaction,
  enableInterrupt,
  // enableText = true,
  onStart,
  star,
  onStreamStatusUpdate,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [messages, setMessages] = useState([]);

  const {
    streamRefs,
    isSpeakLoading,
    // isSpeechPaused,
    isAvatarTalking,
    pause,
    // resume,
    speak,
    initPlayer,
  } = useAvatarStream({
    star,
    onSpeechEnd: () => {
      console.log("dsada");
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

      console.log(audioBlob);
      console.log(formData.get("audio"));
      console.log(formData.get("conversation_uid"));

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

      console.log(response);

      await speak(response, (texStream) => {
        setMessages((prev) => [...prev, texStream]);
      });
      return "";
    } catch (error) {
      // console.error("Error during STS request:", error);
      throw new Error("Failed to get transcription");
    } finally {
      setIsLoading(false);
      // only resume listening if enableInterrupt is true
      // otherwise, the button will be disabled until finish talking
      // if (enableInterrupt) {
      //   sessionButtonRef.current?.resumeListening();
      // }
    }
  };

  const handleError = () => {
    console.log("EROOOORRR");
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

      console.log(response.data);

      if (!data.stream_token || !data.token) {
        throw new Error("Invalid token response");
      }

      localStorage.setItem("stream_token", data.stream_token);
      localStorage.setItem("token", data.token);

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
  //   handleStartSession();
  // }, []);

  return (
    <>
      <StreamPlayer
        // containerClassName="w-full h-full"
        containerStyle={{
          width: "100%",
          height: "100%",
          backgroundColor: "black",
          display: "flex",
          alignItems: "center",
          justifyItems: "center",
          // marginLeft: "0.2px",
        }}
        isTalking={isAvatarTalking}
        streamRefs={streamRefs}
        onLoadStart={() => console.log("load")}
        onLoadedData={() => console.log("done")}
      />
      {messages.length > 0 && (
        <div className="absolute bottom-[100px] left-0 z-30 max-h-40 w-80 overflow-y-auto rounded-lg bg-black bg-opacity-40 p-4 backdrop-blur-lg backdrop-filter">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === "ai" ? "justify-start" : "justify-end"
              } mb-2`}
            >
              <p className="text-xs">
                {message.role === "ai" ? "Owdi" : "You"}: {message.value}
              </p>
            </div>
          ))}
        </div>
      )}
      <ContinuousSessionButton
        isLoading={isLoading}
        isSessionActive={isSessionActive}
        initPlayer={initPlayer}
        uploadAudioFn={uploadAudioFn}
        startSession={handleStartSession}
        endSession={handleEndSession}
        onError={handleError}
      />
    </>
  );
};

export default StreamHandler;
