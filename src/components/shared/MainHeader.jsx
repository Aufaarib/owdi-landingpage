import { IconPlus } from "@tabler/icons-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import LoginModal from "../Modal/LoginModal";
import moment from "moment";
import TopupModal from "../Modal/TopupModal";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/router";

const MainHeader = ({ openSidebar, setOpenSidebar }) => {
  const params = useRouter();
  const [username, setUsername] = useState("");
  const [remainingTime, setRemainingTime] = useState("");
  const { openLoginModal } = LoginModal();
  const { openTopupModal } = TopupModal();

  const isHomePage = (params.pathname = "/home");

  const handleLogin = async () => {
    await openLoginModal();
    getUserData();
  };

  const getUserData = () => {
    const storedUsername = localStorage.getItem("nomor");
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
  }, [username, remainingTime]);

  return (
    <div
      className={`flex justify-between items-center p-4 md:px-14 ${
        username
          ? "bg-transparent md:bg-[#FFFFFFBF] bg-opacity-75"
          : "bg-[#FFFFFFBF] bg-opacity-75"
      }`}
    >
      <div className="flex items-center gap-4">
        {username && isHomePage && (
          <Image
            onClick={() => setOpenSidebar(!openSidebar)}
            src="/icons/hamburger.png"
            alt="logo"
            className="object-cover cursor-pointer md:hidden"
            width={20}
            height={14}
          />
        )}

        <Image
          src={username ? "/img/owdi-white.png" : "/img/owdi-colors 1.png"}
          alt="logo"
          className="object-cover md:hidden"
          width={90}
          height={25}
        />

        <Image
          src={"/img/owdi-colors 1.png"}
          alt="logo"
          className="object-cover hidden sm:block"
          width={90}
          height={25}
        />
      </div>

      <Image
        src={"/img/Own Digital Companion.png"}
        alt="logo"
        className="object-cover hidden sm:block"
        width={250}
        height={35}
      />

      {username ? (
        <button
          onClick={() => openTopupModal()}
          className="flex items-center gap-2 justify-center bg-[#001A41] text-white px-7 py-1 rounded-full"
        >
          <Image
            src={"/icons/icon-coin.png"}
            alt="logo"
            className="object-cover sm:block"
            width={20}
            height={20}
          />
          <p className="font-semibold text-[18px] mb-0.5">
            {remainingTime !== "00:00" ? `1 Koin` : "0 Koin"}
          </p>
          <IconPlus size={24} />
        </button>
      ) : (
        <button
          onClick={handleLogin}
          className="flex items-center justify-center bg-white w-[133px] h-[32px] rounded-full"
        >
          <p className="text-[#FF0025] font-bold text-[14px]">Coba Gratis</p>
        </button>
      )}
    </div>
  );
};

export default MainHeader;
