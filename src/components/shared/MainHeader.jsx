import { IconPlus } from "@tabler/icons-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import LoginModal from "../Modal/LoginModal";
import moment from "moment";

const MainHeader = ({ openSidebar, setOpenSidebar }) => {
    const [username, setUsername] = useState("");
    const [remainingTime, setRemainingTime] = useState(0);
    const { openLoginModal } = LoginModal();

    const handleLogin = async () => {
        await openLoginModal();
        getUserData();
    };


    const getUserData = () => {
        const storedUsername = localStorage.getItem("username");
        const storedTime = localStorage.getItem("remainingTime");

        if (storedUsername) {
            setUsername(storedUsername);
        }

        if (storedTime) {
            const remainingTime = parseInt(storedTime);
            const remainingTimeInMinutes = moment(remainingTime).minute();
            console.log("remainingTimeInMinutes", remainingTimeInMinutes);

            setRemainingTime(remainingTimeInMinutes);
        }
    };


    useEffect(() => {
        getUserData();

        // Sinkronisasi data setiap 1 detik
        const interval = setInterval(() => {
            getUserData();
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div
            className={`flex justify-between items-center p-4 ${username ? "bg-transparent" : "bg-[#FFFFFFBF] bg-opacity-75"}`}
        >
            <div className="flex items-center gap-4">
                {username && (
                    <Image
                        onClick={() => setOpenSidebar(!openSidebar)}
                        src="/icons/toglePay.png"
                        alt="logo"
                        className="object-cover"
                        width={20}
                        height={14}
                    />
                )}
                <Image
                    src={username ? "/img/logo.png" : "/img/logoLogin.png"}
                    alt="logo"
                    className="object-cover"
                    width={90}
                    height={25}
                />
            </div>

            {username ? (
                <button className="flex items-center justify-center bg-[#001A41] text-white px-3 py-1 rounded-full">
                    <p className="font-semibold text-[14px] mr-2">
                        Tersisa: {remainingTime > 0 ? `${remainingTime} Menit` : "Waktu Habis"}
                    </p>
                    <IconPlus size={24} />
                </button>
            ) : (
                <button
                    onClick={handleLogin}
                    className="flex items-center justify-center bg-white w-[133px] h-[32px] rounded-full"
                >
                    <p className="text-[#FF0025] font-semibold text-[14px]">
                        Coba Gratis
                    </p>
                </button>
            )}
        </div>
    );
};

export default MainHeader;
