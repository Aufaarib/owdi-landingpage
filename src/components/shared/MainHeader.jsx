import { IconPlus } from "@tabler/icons-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import LoginModal from "../Modal/LoginModal";
import moment from "moment";
import TopupModal from "../Modal/TopupModal";

const MainHeader = ({ openSidebar, setOpenSidebar }) => {
  const [username, setUsername] = useState("");
  const [remainingTime, setRemainingTime] = useState("");
  const { openLoginModal } = LoginModal();
  const { openTopupModal } = TopupModal();

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
      // const remainingTime = parseInt(storedTime);
      // const remainingTimeInMinutes = moment(remainingTime).minute();
      // console.log("remainingTimeInMinutes", remainingTimeInMinutes);

      setRemainingTime(storedTime);
    }
  };

  useEffect(() => {
    getUserData();

    // Sinkronisasi data setiap 1 detik
    const interval = setInterval(() => {
      setRemainingTime(localStorage.getItem("remainingTime"));
    }, 1000);

    return () => clearInterval(interval);
  }, [remainingTime]);

  return (
    <div
      className={`flex justify-between items-center p-4 ${
        username ? "bg-transparent" : "bg-[#FFFFFFBF] bg-opacity-75"
      }`}
    >
      <div className="flex items-center gap-4">
        {username && (
          <Image
            onClick={() => setOpenSidebar(!openSidebar)}
            src="/icons/toglePay.png"
            alt="logo"
            className="object-cover cursor-pointer"
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
        <button
          onClick={() => openTopupModal()}
          className="flex items-center justify-center bg-[#001A41] text-white px-3 py-1 rounded-full"
        >
          <p className="font-semibold text-[14px] mr-2">
            {remainingTime !== "00:00"
              ? `Tersisa: ${remainingTime} Menit`
              : "Waktu Habis"}
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
