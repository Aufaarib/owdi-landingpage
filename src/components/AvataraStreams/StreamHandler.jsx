"use client";

import {
  StreamPlayer,
  useAvatarStream,
  useRecordAndSTTForContinuous,
} from "@avatara/avatar-stream";
import Cookies from "js-cookie";
import { useEffect, useMemo, useState } from "react";
import ContinuousSessionButton from "./ContinuousSessionButton";
import axios from "axios";
import Image from "next/image";

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

      const response = await fetch("/api/avatara-apis/test-sts", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });


      await speak(response);

      return "";
    } catch (error) {
      throw new Error("Failed to get transcription");
    } finally {
      setIsLoading(false);

    }
  };

  const { amplitude, start, stop, pauseListening, resumeListening, isReady } =
    useRecordAndSTTForContinuous({
      uploadAudioFn,
      // onTranscription,
      // onError,
      initPlayer,
      startOnLoad: false,
    });

  const handleEndSession = async () => {
    pause();
    stop();
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
      start();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const disabled = useMemo(() => {
    const _disabled = isLoading;

    return enableInterrupt ? _disabled : _disabled || isSpeakLoading;
  }, [enableInterrupt, isLoading, isSpeakLoading]);

  useEffect(() => {
    handleEndSession();
  }, [enableInterrupt, interaction]);

  // useEffect(() => {
  //   handleStartSession();
  // }, []);

  return (
    <>
      <StreamPlayer
        // containerClassName="w-[640px] h-[360px]" // default
        containerStyle={{ width: "100%", height: "100%" }}
        isTalking={isAvatarTalking}
        streamRefs={streamRefs}
        onLoadStart={() => console.log("load")}
        onLoadedData={() => console.log("done")}
      />
      <div className="absolute bottom-0 w-full bg-white flex flex-col justify-center p-4 pt-7 gap-2 py-7 rounded-t-2xl z-50">
        <button
          onClick={() => handleStartSession()}
          style={{
            background: "linear-gradient(45deg, #EF2328 0%, #FB942B 100%)",
          }}
          className="w-full flex flex-row items-center h-[40px] justify-center px-6 text-white text-[14px] gap-3 font-bold rounded-full"
        >
          <p>Bicara</p>
          <Image
            src={"/icons/icon-microphone.png"}
            alt="logo"
            className="object-cover sm:block"
            width={15}
            height={15}
          />
        </button>
        <p className="text-center text-xs text-[#718290]">
          Microfon sudah siap dipakai
        </p>
        {/* <p className="text-center text-sm text-[#FF0025] font-semibold mt-2">
          Sisa Waktu: {countdownTime}
        </p> */}
      </div>
      {/* {interaction === 'continuous' ? (
        <ContinuousSessionButton
          ref={sessionButtonRef}
          endSession={handleEndSession}
          initPlayer={initPlayer}
          isLoading={isLoading || isSpeakLoading}
          isSessionActive={isSessionActive}
          startSession={handleStartSession}
          uploadAudioFn={uploadAudioFn}
          // onTranscription={speak}
        />
      ) : (
        <HoldSpeakButton
          disabled={disabled}
          endSession={handleEndSession}
          initPlayer={initPlayer}
          isLoading={isLoading || isSpeakLoading}
          isSessionActive={isSessionActive}
          startSession={handleStartSession}
          uploadAudioFn={uploadAudioFn}
          // onTranscription={speak}
        />
      )} */}
    </>
  );
};

export default StreamHandler;
