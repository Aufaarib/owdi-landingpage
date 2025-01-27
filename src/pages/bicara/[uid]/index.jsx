import EndChatModal from "@/components/Modal/EndChatModal";
import { IconProgress, IconX } from "@tabler/icons-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useParams, useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Bicara = () => {
  const params = useParams();
  const router = useRouter();
  const [countdownTime, setCountdownTime] = useState("15:00");
  const char_uid = params?.uid;
  const [isStreamReady, setIsStreamReady] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const { openEndChatModal } = EndChatModal();

  const buttonClose = () => {
    // Simpan waktu yang tersisa saat buttonClose dipanggil
    // localStorage.setItem("remainingTime", Date.now() + remainingTime);
    // router.back();
    openEndChatModal();
  };

  const AvatarStreamer = dynamic(
    () => import("@/components/AvataraStreams/StreamHandler"),
    {
      ssr: false,
    }
  );

  const [star, setStar] = useState();

  useEffect(() => {
    const fetchStar = async (uid) => {
      const response = await fetch(
        `/api/avatara-apis/get-characters?id=2ppiObWYvS3sZScI7uLitb1LtHj`
      );
      const data = await response.json();

      setStar(data);
    };

    // if (!char_uid) return;

    fetchStar(char_uid);
  }, []);

  // console.log(star);
  // console.log(char_uid);
  // console.log(countdownTime);

  return (
    <div className={isFullScreen && "absolute top-0 w-full h-screen"}>
      <div className="absolute w-full flex items-center z-50 mt-4 h-[45px] bg-transparent">
        <button
          onClick={() => setIsFullScreen(!isFullScreen)}
          className="absolute left-4 bg-gray-400 px-3 py-1 rounded-full text-white"
        >
          <img
            src="/icons/fullscreen-icon.png"
            className="w-6 h-6"
            alt="icon"
          />
        </button>

        <div className="absolute left-1/2 transform -translate-x-1/2 top-2 gap-2 flex flex-col">
          <div className="flex justify-center items-center w-[185px] px-2 py-1 bg-gray-400 rounded-full">
            <p className="text-[14px] mr-1 text-white">Sedang Bicara</p>
            <img src="/icons/IconR.png" className="w-6 h-6" alt="icon" />
          </div>

          <div className="flex justify-center items-center w-[185px] px-2 py-1">
            <p
              className="text-[18px] mr-1 text-white font-[600] text-shadow-xl bg-transparent"
              // style={{ textShadow: "0px 1px 15px 0px #020202" }}
            >
              02:04
            </p>
          </div>
        </div>

        <button
          onClick={() => buttonClose()}
          className="absolute right-4 bg-gray-400 px-3 py-1 rounded-full text-white"
        >
          <IconX size={24} />
        </button>
      </div>
      {star && (
        <div className={`w-full ${isFullScreen ? "h-[100vh]" : "h-[85vh]"}`}>
          <AvatarStreamer
            enableInterrupt={false}
            // enableInterrupt={settings.interrupt === 'enabled'}
            // enableText={settings.text === 'enabled'}
            interaction={"hold_to_speak"}
            star={star}
          />
        </div>
      )}
    </div>
  );
};

export default Bicara;
