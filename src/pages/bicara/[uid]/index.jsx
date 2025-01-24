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

  // const [remainingTime, setRemainingTime] = useState(0);

  // useEffect(() => {
  //     if (router.pathname !== "/bicara") return; // Ensure this logic runs only on /bicara

  //     // console.log("remainingTime", remainingTime);

  //     // Ambil waktu yang tersisa dari localStorage
  //     const storedTime = localStorage.getItem("remainingTime");
  //     if (storedTime) {
  //         const endTime = parseInt(storedTime, 10);
  //         const timeLeft = Math.max(endTime - Date.now(), 0);
  //         setRemainingTime(timeLeft);

  //         // Jika waktu sudah habis, arahkan ke halaman lain
  //         if (timeLeft === 0) {
  //             localStorage.setItem("remainingTime", "0"); // Save remaining time
  //             router.push("/home");
  //         }
  //     } else {
  //         // Jika tidak ada waktu yang tersisa, arahkan langsung ke halaman lain
  //         router.push("/home");
  //     }

  //     // Kurangi waktu setiap detik
  //     const interval = setInterval(() => {
  //         setRemainingTime((prevTime) => {
  //             const updatedTime = Math.max(prevTime - 1000, 0);
  //             if (updatedTime === 0) {
  //                 localStorage.setItem("remainingTime", "0");
  //                 clearInterval(interval);
  //                 router.push("/home");
  //             }
  //             return updatedTime;
  //         });
  //     }, 1000);

  //     return () => {
  //         clearInterval(interval);
  //     };
  // }, [router.pathname, remainingTime]); // Listen for pathname changes as well

  const buttonClose = () => {
    // Simpan waktu yang tersisa saat buttonClose dipanggil
    // localStorage.setItem("remainingTime", Date.now() + remainingTime);
    router.push("/home");
  };

  // useEffect(() => {
  //   setCountdownTime("15:00");
  // }, []);

  // // Function to decrement time by one second
  // const decrementTime = (time) => {
  //   const [minutes, seconds] = time.split(":").map(Number);
  //   let totalSeconds = minutes * 60 + seconds;

  //   if (totalSeconds > 0) {
  //     totalSeconds -= 1;
  //   }

  //   const newMinutes = Math.floor(totalSeconds / 60)
  //     .toString()
  //     .padStart(2, "0");
  //   const newSeconds = (totalSeconds % 60).toString().padStart(2, "0");

  //   return `${newMinutes}:${newSeconds}`;
  // };

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setCountdownTime((prevTime) => {
  //       const newTime = decrementTime(prevTime);
  //       localStorage.setItem("remainingTime", newTime);
  //       if (newTime === "00:00") {
  //         clearInterval(timer);
  //         // Add your additional logic here (e.g., navigation or local storage)
  //         //   console.log("Countdown finished");
  //         router.push("/home");
  //       }
  //       return newTime;
  //     });
  //   }, 1000);

  //   // Cleanup the timer when the component unmounts
  //   return () => clearInterval(timer);
  // }, []);

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

  console.log(star);
  // console.log(char_uid);
  // console.log(countdownTime);

  return (
    <div>
      <div className="w-full flex items-center h-[45px] pt-5 bg-transparent">
        <button
          onClick={buttonClose}
          className="absolute left-4 bg-gray-400 px-3 py-1 rounded-full text-white"
        >
          <img
            src="/icons/fullscreen-icon.png"
            className="w-6 h-6"
            alt="icon"
          />
        </button>

        {/* Posisi di tengah */}
        <div className="absolute left-1/2 transform -translate-x-1/2 flex justify-center items-center w-[185px] px-2 py-1 bg-gray-400 rounded-full">
          <p className="text-[14px] mr-1 text-white">Sedang Bicara</p>
          <img src="/icons/IconR.png" className="w-6 h-6" alt="icon" />
        </div>

        {/* Posisi di kanan */}
        <button
          onClick={buttonClose}
          className="absolute right-4 bg-gray-400 px-3 py-1 rounded-full text-white"
        >
          <IconX size={24} />
        </button>
      </div>

      {/* {!isStreamReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
          <IconProgress className="h-12 w-12 animate-spin" />
        </div>
      )} */}

      {star && (
        <div className="bg-black h-[700px] mt-10">
          <AvatarStreamer
            enableInterrupt={true}
            // enableInterrupt={settings.interrupt === 'enabled'}
            // enableText={settings.text === 'enabled'}
            interaction={"hold_to_speak"}
            star={star}
            // onStreamStatusUpdate={setIsStreamReady}
          />
        </div>
      )}

      {/* <Image src={star?.banner_pic} alt="err" width={120} height={120} /> */}
    </div>
  );
};

export default Bicara;
