"use client";

import { useRecordAndSTTForContinuous } from "@avatara/avatar-stream";
import { IconLoader, IconPlayerStop } from "@tabler/icons-react";
import Image from "next/image";

const ContinuousSessionButton = ({
  isLoading,
  isSessionActive,
  startSession,
  endSession,
  uploadAudioFn,
  onTranscription,
  onError,
  initPlayer,
}) => {
  const {
    userSpeaking,
    transcript,
    amplitude,
    start,
    pause,
    stop,
    resetTranscript,
    pauseAmplitude,
    resumeAmplitude,
    pauseListening,
    resumeListening,
    isReady,
  } = useRecordAndSTTForContinuous({
    uploadAudioFn,
    onTranscription,
    onError: (err) => {
      alert(err);
    },
    initPlayer,
    startOnLoad: false,
  });

  const handleStartSession = async () => {
    await startSession();
    start();
  };

  const handleEndSession = async () => {
    await endSession();
    pause();
    // stop();
  };

  return (
    <div className="absolute bottom-0 z-30 flex w-full items-center justify-center bg-black/40 p-4">
      {!isSessionActive ? (
        <div
          className={`absolute bottom-0 w-full bg-white flex flex-col justify-center p-4 pt-7 gap-2 py-7 rounded-t-2xl z-50`}
        >
          <button
            onClick={() => handleStartSession()}
            style={{
              background: "linear-gradient(45deg, #EF2328 0%, #FB942B 100%)",
            }}
            className={`w-full flex flex-row items-center h-[40px] justify-center px-6 text-white text-[14px] gap-3 font-bold rounded-full`}
          >
            {!isReady || isLoading ? (
              <IconLoader className="animate-spin" />
            ) : (
              <>
                <p>Bicara</p>
                <Image
                  src={"/icons/icon-microphone.png"}
                  alt="logo"
                  className={`object-cover sm:block`}
                  width={15}
                  height={15}
                />
              </>
            )}
          </button>
          {isReady ? (
            <p className="text-center text-xs text-[#718290]">
              Microfon sudah siap dipakai
            </p>
          ) : (
            <p className="text-center text-xs text-[#718290]">
              Memuat data karakter
            </p>
          )}
        </div>
      ) : (
        <div className="absolute bottom-0 w-full bg-white flex flex-col justify-center p-4 pt-7 gap-2 py-7 rounded-t-2xl z-50 ">
          <button
            onClick={() => handleEndSession()}
            style={{
              background: "linear-gradient(45deg, #EF2328 0%, #FB942B 100%)",
              boxShadow: `0 0 10px 3px rgba(239, 35, 40, ${Math.min(
                amplitude * 5,
                1
              )}), 0 0 20px 6px rgba(251, 146, 43, ${Math.min(
                amplitude * 5,
                1
              )})`,
            }}
            className={`w-full flex flex-row items-center h-[40px] justify-center px-6 text-white text-[14px] gap-3 font-bold rounded-full`}
          >
            <p>Kamu Sedang Bicara</p>
            <img src="/icons/IconR.png" className="w-6 h-6" alt="icon" />
          </button>
          <p className="text-center text-xs text-[#718290]">
            Microfon sudah siap dipakai
          </p>
        </div>
      )}
    </div>
  );
};

export default ContinuousSessionButton;
