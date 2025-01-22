"use client";
import { StreamPlayer, useAvatarStream } from "@avatara/avatar-stream";

export default function AvatarStreamPlayer({
  messages,
  mediaStream,
  isTyping,
  star,
}) {
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
      // sessionButtonRef.current?.resumeListening();
    },
  });
  return (
    // <div className="absolute inset-0 flex items-center justify-center">
    //   <div
    //     className="relative flex h-[70vh] w-auto overflow-hidden rounded-sm"
    //     style={{ aspectRatio: 16 / 9 }}
    //   >
    //     <video
    //       ref={mediaStream}
    //       autoPlay
    //       playsInline
    //       className="h-full w-full object-cover"
    //       controls={false}
    //     >
    //       <track kind="captions" />
    //     </video>
    //     {enableText ? (
    //       <div
    //         className="no-scrollbar absolute bottom-0 right-0 flex h-1/3 w-full overflow-auto overflow-x-hidden"
    //         style={{
    //           background:
    //             "linear-gradient(180deg, rgba(18, 18, 18, 0.00) 0%, #121212 100%)",
    //         }}
    //       >
    //         {/* <TextChat
    //           chatWidthClass="w-full"
    //           isTyping={isTyping}
    //           newestMessageId={messages[messages.length - 1]?.id}
    //           results={messages}
    //         /> */}
    //       </div>
    //     ) : null}
    //   </div>
    // </div>

    <StreamPlayer
      // containerClassName="w-full h-full" // default
      // containerStyle={{ <= example of containerStyle
      //   height: '640px',
      //   width: '360px',
      //   backgroundColor: 'white',
      // }}
      isTalking={isAvatarTalking}
      streamRefs={streamRefs}
      // onLoadStart={() => onStreamStatusUpdate(false)}
      // onLoadedData={() => onStreamStatusUpdate(true)}
    />
  );
}
