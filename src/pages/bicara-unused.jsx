// import StreamHandler from "@/components/AvataraStreams/StreamHandler";
import { IconX } from "@tabler/icons-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Bicara = () => {
  const params = useSearchParams();
  const router = useRouter();
  const [countdownTime, setCountdownTime] = useState("15:00");
  const char_uid = params.get("uid");
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
        `/api/avatara-apis/get-characters?id=${uid}`
      );
      const data = await response.json();

      setStar(data);
    };

    // const uid = pathname?.id;

    // if (!uid) return;

    fetchStar(char_uid);
    // fetchStar("2ppiObWYvS3sZScI7uLitb1LtHj");
  }, [char_uid]);

  console.log(char_uid);
  // console.log(countdownTime);

  return (
    <div>
      <div className="absolute w-full flex items-center h-[45px] pt-5 bg-transparent">
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

      {/* <div className="flex justify-center items-center bg-white">
        <div className="w-full h-[700px]">
          <iframe
            // onClick={() => }
            src="https://avatara-star-livestream.vercel.app/embed?aspect-ratio=9:16"
            // src="https://demo-maz.vercel.app/embed?aspect-ratio=9:16"
            allow="microphone"
            title="Embedded content"
            allowFullScreen
            style={{ width: "100%", height: "100%" }}
            // className="rounded-xl"
          />
        </div>
      </div> */}

      <AvatarStreamer
        enableInterrupt={false}
        enableText={false}
        interaction={"continuous"}
        star={star}
      />

      <Image src={star?.banner_pic} alt="err" width={120} height={120} />

      <div className="absolute bottom-0 w-full bg-white flex flex-col justify-center p-4 gap-2 py-7 rounded-t-2xl">
        <button
          // onClick={() => onStartSession()}
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
    </div>
  );
};

export default Bicara;
