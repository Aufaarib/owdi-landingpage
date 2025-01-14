import { IconPlus } from "@tabler/icons-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import LoginModal from "../Modal/LoginModal";
import moment from "moment";
import TopupModal from "../Modal/TopupModal";

const MainHeader = ({ openSidebar, setOpenSidebar }) => {
  const [nomor, setnomor] = useState("");
  const [remainingCoin, setRemainingCoin] = useState(0);
  const { openLoginModal } = LoginModal();
  const { openTopupModal } = TopupModal();

  const handleLogin = async () => {
    openLoginModal();
    getUserData();
  };

  const getUserData = () => {
    const storednomor = localStorage.getItem("nomor");
    const storedCoin = localStorage.getItem("remainingCoin");
    // const storedTime = localStorage.getItem("remainingTime");

    if (storednomor) {
      setnomor(storednomor);
      setRemainingCoin(storedCoin);
    }

    // if (storedTime) {
    //   // const remainingTime = parseInt(storedTime);
    //   // const remainingTimeInMinutes = moment(remainingTime).minute();
    //   // console.log("remainingTimeInMinutes", remainingTimeInMinutes);

    //   setRemainingTime(storedTime);
    // }
  };

  useEffect(() => {
    getUserData();

    // Sinkronisasi data setiap 1 detik
    const interval = setInterval(() => {
      setRemainingCoin(localStorage.getItem("remainingTime"));
    }, 1000);

    return () => clearInterval(interval);
  }, [remainingCoin]);

  return (
    <div
      className={`flex justify-between items-center p-4 md:px-14 ${
        nomor
          ? "sm:bg-transparent md:bg-[#FFFFFFBF] md:bg-opacity-75"
          : "bg-[#FFFFFFBF] bg-opacity-75"
      }`}
    >
      <div className="flex items-center gap-4">
        {nomor && (
          <Image
            onClick={() => setOpenSidebar(!openSidebar)}
            src="/icons/toglePay.png"
            alt="logo"
            className="object-cover cursor-pointer md:hidden"
            width={20}
            height={14}
          />
        )}

        <Image
          src={nomor ? "/img/logo.png" : "/img/owdi-colors 1.png"}
          alt="logo"
          className="object-cover md:hidden"
          width={90}
          height={25}
        />

        <Image
          src={"/img/owdi-colors 1.png"}
          alt="logo"
          className="object-cover hidden md:block"
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

      {nomor ? (
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
            {remainingCoin + ` Koin`}
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
