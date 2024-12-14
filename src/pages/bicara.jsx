import { IconMicrophone, IconX } from "@tabler/icons-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Bicara = () => {
    const router = useRouter();
    const [remainingTime, setRemainingTime] = useState(0);

    useEffect(() => {
        if (router.pathname !== "/bicara") return; // Ensure this logic runs only on /bicara

        // console.log("remainingTime", remainingTime);

        // Ambil waktu yang tersisa dari localStorage
        const storedTime = localStorage.getItem("remainingTime");
        if (storedTime) {
            const endTime = parseInt(storedTime, 10);
            const timeLeft = Math.max(endTime - Date.now(), 0);
            setRemainingTime(timeLeft);

            // Jika waktu sudah habis, arahkan ke halaman lain
            if (timeLeft === 0) {
                localStorage.setItem("remainingTime", "0"); // Save remaining time
                router.push("/home");
            }
        } else {
            // Jika tidak ada waktu yang tersisa, arahkan langsung ke halaman lain
            router.push("/home");
        }

        // Kurangi waktu setiap detik
        const interval = setInterval(() => {
            setRemainingTime((prevTime) => {
                const updatedTime = Math.max(prevTime - 1000, 0);
                if (updatedTime === 0) {
                    localStorage.setItem("remainingTime", "0");
                    clearInterval(interval);
                    router.push("/home");
                }
                return updatedTime;
            });
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [router.pathname, remainingTime]); // Listen for pathname changes as well

    const buttonClose = () => {
        // Simpan waktu yang tersisa saat buttonClose dipanggil
        localStorage.setItem("remainingTime", Date.now() + remainingTime);
        router.push("/home");
    };

    return (
        <div className="relative mb-[40px]">
            <div className="relative mt-4 flex items-center h-[45px] bg-white rounded-t-xl">
                {/* Posisi di tengah */}
                <div className="absolute left-1/2 transform -translate-x-1/2 flex justify-center items-center w-[185px] px-2 py-1 bg-gradient-to-t from-[#EF2328] to-[#FB942B] rounded-tr-xl rounded-bl-xl">
                    <p className="text-[12px] mr-1 text-white">Owdi is Talking</p>
                    <img src="/icons/IconR.png" className="w-6 h-6" alt="icon" />
                </div>

                {/* Posisi di kanan */}
                <button onClick={buttonClose} className="absolute right-4 bg-gray-400 px-3 py-1 rounded-full text-white">
                    <IconX size={24} />
                </button>
            </div>

            <div className="flex justify-center items-center bg-white">
                <div className="w-full h-[700px]">
                    <iframe
                        src="https://avatara-star-livestream.vercel.app/embed?aspect-ratio=9:16"
                        allow="microphone"
                        title="Embedded content"
                        allowFullScreen
                        style={{ width: "100%", height: "100%" }}
                        className="rounded-xl"
                    />
                </div>
            </div>

            <div className="w-full bg-white flex flex-col justify-center p-4 rounded-b-xl">
                <p className="text-center text-xs text-[#718290]">
                    Microfon sudah siap dipakai
                </p>
                <p className="text-center text-sm text-[#FF0025] font-semibold mt-2">
                    Sisa Waktu: {Math.floor(remainingTime / 60000)} menit {Math.floor((remainingTime % 60000) / 1000)} detik
                </p>
            </div>
        </div>
    );
};

export default Bicara;
