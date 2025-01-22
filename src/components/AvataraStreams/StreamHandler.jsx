"use client";

import { useAvatarStream } from "@avatara/avatar-stream";
import { useState } from "react";
import ContinuousSessionButton from "./ContinuousSessionButton";
// import { ContinuousSessionButtonRef } from "./buttons/ContinuousButton";
const StreamHandler = ({
  interaction,
  enableInterrupt,
  // enableText = true,
  star,
  onStreamStatusUpdate,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  //   const sessionButtonRef = useRef < ContinuousSessionButtonRef > null;

  const {
    streamRefs,
    isSpeakLoading,
    // isSpeechPaused,
    isAvatarTalking,
    // pause,
    // // resume,
    // speak,
    initPlayer,
  } = useAvatarStream({
    star,
    // onSpeechEnd: () => {
    //   sessionButtonRef.current?.resumeListening();
    // },
  });

  // const {
  //   isLoadingSession,
  //   isLoadingSpeak,
  //   mediaStreamRef,
  //   messages,
  //   stream,
  //   isAvatarTalking,
  //   isMuted,
  //   speak,
  //   startSession,
  //   setMessages,
  //   // muteMic,
  //   // unmuteMic,
  //   // interrupt,
  //   // debug
  //   endSession,
  // } = useAvatarStream({
  //   // interactiveConfig: star.interactive_config,
  //   enableInterrupt,
  //   eventCallbacks: {
  //     onAvatarStartTalking: () => {},
  //     onAvatarStopTalking: () => {
  //       sessionButtonRef.current?.resumeListening();
  //     },
  //     onAvatarTalkingMessage: (message) => {
  //       console.log("Avatar talking message:", message);
  //     },
  //     onError: (error) => {
  //       console.error("Error:", error);
  //     },
  //     onStreamDisconnected: () => {},
  //     onStreamReady: () => {},
  //   },
  //   quality: AvatarQuality.High,
  // });

  // const handleEndSession = async () => {
  //   setIsLoading(true);
  //   try {
  //     await endSession();
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // const handleStartSession = async () => {
  //   setIsLoading(true);
  //   try {
  //     const response = await fetch("/api/avatara-apis/get-access-token", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ remote_id: "maz-playground-remote-id" }),
  //     });
  //     // .then((res) => res.json())
  //     // .then((data) => console.log(data))
  //     // .catch((error) => console.error("Error:", error));

  //     if (!response.ok) {
  //       throw new Error(`Error: ${response.status} ${response.statusText}`);
  //     }

  //     const data = await response.json();

  //     if (!data.stream_token || !data.token) {
  //       throw new Error("Invalid token response");
  //     }

  //     localStorage.setItem("stream_token", data.stream_token);
  //     localStorage.setItem("token", data.token);

  //     const conversationResponse = await fetch(
  //       "/api/avatara-apis/get-conversation",
  //       {
  //         method: "POST",
  //         headers: {
  //           Authorization: `Bearer ${data.token}`,
  //         },
  //         body: JSON.stringify({ star_uid: star.uid }),
  //       }
  //     );

  //     if (!conversationResponse.ok) {
  //       throw new Error(
  //         `Error: ${conversationResponse.status} ${conversationResponse.statusText}`
  //       );
  //     }

  //     const conversationData = await conversationResponse.json();

  //     if (!conversationData || !conversationData.uid) {
  //       throw new Error("Invalid conversation data");
  //     }

  //     localStorage.setItem("conversation_uid", conversationData.uid);

  //     startSession(data.stream_token, data.token, star.uid);
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // const uploadAudioFn = async (audioBlob) => {
  //   setIsLoading(true);
  //   sessionButtonRef.current?.pauseListening();
  //   const token = localStorage.getItem("token");

  //   try {
  //     const formData = new FormData();

  //     formData.append("audio", audioBlob);

  //     const response = await fetch("/api/avatara-apis/stt", {
  //       method: "POST",
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //       body: formData,
  //     });

  //     if (!response.ok) {
  //       throw new Error(`Error: ${response.status} ${response.statusText}`);
  //     }

  //     const result = await response.json();

  //     const conversationUid = localStorage.getItem("conversation_uid");

  //     const chatResponse = await fetch("/api/avatara-apis/chat", {
  //       method: "POST",
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //       body: JSON.stringify({
  //         conversation_uid: conversationUid,
  //         message: result.transcript,
  //       }),
  //     });

  //     setMessages((prev) => [
  //       ...prev,
  //       {
  //         id: new Date().getTime(),
  //         role: "user",
  //         content: result.transcript,
  //       },
  //     ]);

  //     return await chatResponse.json();
  //   } catch (error) {
  //     sessionButtonRef.current?.resumeListening();
  //     console.error("Error during STT request:", error);
  //   } finally {
  //     setIsLoading(false);
  //     if (enableInterrupt) {
  //       sessionButtonRef.current?.resumeListening();
  //     }
  //   }
  // };

  // const disabled = useMemo(() => {
  //   const _disabled = isLoading || isLoadingSession || isMuted;

  //   return enableInterrupt
  //     ? _disabled
  //     : _disabled || isLoadingSpeak || isAvatarTalking;
  // }, [
  //   enableInterrupt,
  //   isAvatarTalking,
  //   isLoading,
  //   isLoadingSession,
  //   isLoadingSpeak,
  //   isMuted,
  // ]);

  // useEffect(() => {
  //   endSession();
  // }, [interaction, enableInterrupt, enableText, endSession]);

  return (
    <>
      <StreamPlayer
        // containerClassName="w-full h-full" // default
        // containerStyle={{ <= example of containerStyle
        //   height: '640px',
        //   width: '360px',
        //   backgroundColor: 'white',
        // }}
        isTalking={isAvatarTalking}
        streamRefs={streamRefs}
        onLoadStart={() => onStreamStatusUpdate(false)}
        onLoadedData={() => onStreamStatusUpdate(true)}
      />

      <ContinuousSessionButton
        // ref={sessionButtonRef}
        // endSession={handleEndSession}
        initPlayer={initPlayer}
        isLoading={isLoading || isSpeakLoading}
        // isSessionActive={isSessionActive}
        // startSession={handleStartSession}
        // uploadAudioFn={uploadAudioFn}
        // onTranscription={speak}
      />
    </>
    // <div className="relative flex h-full max-w-full flex-col items-center bg-black">
    //   {/* <h1 className="invisible font-semibold sm:visible">{star.name}</h1> */}
    //   {/* {stream ? ( */}
    //   {/* <StreamPlayer
    //     // containerClassName="w-full h-full" // default
    //     // containerStyle={{ <= example of containerStyle
    //     //   height: '640px',
    //     //   width: '360px',
    //     //   backgroundColor: 'white',
    //     // }}
    //     isTalking={isAvatarTalking}
    //     streamRefs={streamRefs}
    //     onLoadStart={() => alert("loading...")}
    //     onLoadedData={() => alert("done")}
    //   /> */}

    //   {/* <ContinuousSessionButton
    //     // ref={sessionButtonRef}
    //     // endSession={handleEndSession}
    //     initPlayer={initPlayer}
    //     isLoading={isLoading || isSpeakLoading}
    //     // isSessionActive={isSessionActive}
    //     // startSession={handleStartSession}
    //     // uploadAudioFn={uploadAudioFn}
    //     // onTranscription={speak}
    //   /> */}

    //   {/* <button
    //     className="bg-red-400 cursor-pointer z-[99999]"
    //     onClick={() => handleStartSession()}
    //   >
    //     afknfassfas
    //   </button> */}
    //   {/* ) : (
    //     <AvatarStreamPlaceholder src={star.banner_pic} />
    //   )} */}
    //   {/* {interaction === 'continuous' ? (
    //     <ContinuousSessionButton
    //       ref={sessionButtonRef}
    //       endSession={handleEndSession}
    //       isLoading={isLoading || isLoadingSession}
    //       isSessionActive={!!stream}
    //       startSession={handleStartSession}
    //       uploadAudioFn={uploadAudioFn}
    //       onTranscription={speak}
    //     />
    //   ) : (
    //     <HoldSpeakButton
    //       disabled={disabled}
    //       endSession={handleEndSession}
    //       isLoading={isLoading || isLoadingSession}
    //       isSessionActive={!!stream}
    //       startSession={handleStartSession}
    //       uploadAudioFn={uploadAudioFn}
    //       onTranscription={speak}
    //     />
    //   )} */}
    // </div>
  );
};

export default StreamHandler;
