"use client";

import { useRecordAndSTTForContinuous } from "@avatara/avatar-stream";
import React, { forwardRef, useImperativeHandle } from "react";

import { IconPlayerStop } from "@tabler/icons-react";

// interface Props {
//   isLoading: boolean;
//   isSessionActive: boolean;
//   initPlayer: () => Promise<void>;
//   startSession: () => Promise<void>;
//   endSession: () => Promise<void>;
//   uploadAudioFn: (audioBlob: Blob) => Promise<string>;
//   onTranscription?: (text: string) => void;
//   onError?: (error: Error) => void;
// }

// export interface ContinuousSessionButtonRef {
//   pauseListening: () => void;
//   resumeListening: () => void;
// }

const ContinuousSessionButton = ({
  isLoading,
  isSessionActive,
  startSession,
  endSession,
  uploadAudioFn,
  // onTranscription,
  onError,
  initPlayer,
}) =>
  // ref
  {
    const { amplitude, start, stop, pauseListening, resumeListening, isReady } =
      useRecordAndSTTForContinuous({
        uploadAudioFn,
        // onTranscription,
        onError,
        initPlayer,
        startOnLoad: false,
      });

    // useImperativeHandle(ref, () => ({
    //   pauseListening,
    //   resumeListening,
    // }));

    const handleStartSession = async () => {
      await startSession();
      start();
    };

    const handleEndSession = async () => {
      await endSession();
      stop();
    };

    return (
      <div className="absolute bottom-0 z-30 flex w-full items-center justify-center bg-black/40 p-4">
        {!isSessionActive ? (
          <button
            aria-label="Start Session"
            className="relative z-20 flex items-center justify-center rounded-full border border-orange-600 bg-gradient-to-r from-orange-600 to-orange-400 text-white shadow-xl focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            disabled={isLoading || isSessionActive || !isReady}
            style={{
              width: "60px",
              height: "60px",
              transition: "width 0.2s ease, height 0.2s ease",
            }}
            onClick={handleStartSession}
          >
            {isLoading || !isReady ? (
              <span className="h-4 w-4 animate-spin">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <circle
                    cx="12"
                    cy="12"
                    fill="none"
                    opacity="0.25"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    d="M4 12a8 8 0 0116 0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                </svg>
              </span>
            ) : (
              <span className="text-sm font-semibold">START</span>
            )}
          </button>
        ) : (
          <div className="relative">
            <div
              className="pointer-events-none absolute -inset-3 flex items-center justify-center rounded-full transition-all duration-100 ease-in-out"
              style={{
                background: `linear-gradient(to right, rgba(234, 88, 12, ${Math.min(
                  amplitude * 5,
                  1
                )}), rgba(251, 146, 60, ${Math.min(amplitude * 5, 1)}))`,
                padding: `${Math.max(amplitude * 5, 2)}px`,
                zIndex: 10,
              }}
            >
              <div
                className="h-full w-full rounded-full"
                style={{
                  background: "transparent",
                }}
              />
            </div>

            <button
              aria-label="Stop Session"
              className="relative z-20 flex h-12 w-12 items-center justify-center rounded-full border border-red-600 bg-gradient-to-r from-red-600 to-red-400 text-white shadow-xl focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              disabled={isLoading}
              onClick={handleEndSession}
            >
              {isLoading ? (
                /* Loading Spinner */
                <span className="h-4 w-4 animate-spin">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <circle
                      cx="12"
                      cy="12"
                      fill="none"
                      opacity="0.25"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      d="M4 12a8 8 0 0116 0"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                  </svg>
                </span>
              ) : (
                <IconPlayerStop className="w-6" />
              )}
            </button>
          </div>
        )}
      </div>
    );
  };

ContinuousSessionButton.displayName = "ContinuousSessionButton";

export default ContinuousSessionButton;
