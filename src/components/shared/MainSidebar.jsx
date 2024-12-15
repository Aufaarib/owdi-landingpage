import { useEffect, useState } from "react";
import Link from "next/link";
import { IconArticle, IconChevronRight, IconPlus } from "@tabler/icons-react";
import Image from "next/image";
import TopupModal from "../Modal/TopupModal";
import PaymentConfirmModal from "../Modal/PaymentConfirmModal";
import { useRouter } from "next/navigation";
import formatRupiah from "@/utils/formatRupiah";
import axios from "axios";

const MainSidebar = ({ openSidebar, setOpenSidebar }) => {
  const { openTopupModal } = TopupModal();
  const { openPaymentConfirmModal } = PaymentConfirmModal();
  const [remainingTime, setRemainingTime] = useState();
  const router = useRouter();

  const [sessionData, setSessionData] = useState([]);
  useEffect(() => {
    axios
      .get("/api/session") // Mengakses endpoint API
      .then((response) => {
        setSessionData(response.data); // Menyimpan data ke dalam state
      })
      .catch((error) => {
        console.error("Error fetching session data:", error); // Menangani error
      });
  }, []);

  useEffect(() => {
    // Sinkronisasi data setiap 1 detik
    const interval = setInterval(() => {
      setRemainingTime(localStorage.getItem("remainingTime"));
    }, 1000);

    return () => clearInterval(interval);
  }, [remainingTime]);

  return (
    <div
      className={`absolute flex flex-col h-full bg-white w-[80%] z-10 backdrop-blur-2xl ${
        openSidebar ? "block" : "hidden"
      }`}
    >
      {/* Header Section */}
      <div className="bg-[#ebdcd3]">
        <div className="flex mt-4 items-center h-[32px] w-full justify-between">
          <div className="flex flex-row">
            <Image
              src="/icons/menuSidebar.png"
              onClick={() => setOpenSidebar(!openSidebar)}
              alt="Menu"
              className="w-6 h-6 ml-5 cursor-pointer"
              width={24}
              height={24}
            />
            <Image
              src="/icons/logoSidebar.png"
              alt="Logo"
              className="w-[90px] h-6 ml-[12px] object-cover"
              width={200}
              height={200}
            />
          </div>
          <button
            onClick={openTopupModal}
            className="flex justify-center items-center ml-2 bg-gradient-to-r from-transparent to-[#001A41BF] text-white font-bold text-[14px] px-1 pl-10 py-1"
          >
            <p className="whitespace-nowrap">
              {remainingTime !== "00:00"
                ? `Tersisa: ${remainingTime} Menit`
                : "Waktu Habis"}
            </p>
            <IconPlus size={24} className="ml-2" />
          </button>
        </div>

        <div className="flex flex-col px-4">
          <p className="font-semibold text-xs mt-4">Own Digital Companion</p>
          <p className="text-xs">
            Your digital friend who is always ready to help you with your daily
            activities, making life simpler and more fun!
          </p>
          <button
            onClick={() => {
              setOpenSidebar(false);
              router.push("/bicara");
            }}
            className="relative flex justify-between items-center gap-2 my-4 bg-gradient-to-r from-[#EF2328] to-[#FB942B] px-4 py-5 rounded-xl text-white"
          >
            <p>Mulai Sesi Obrolan</p>
            <Image
              src="/img/union.png"
              alt="Union"
              width={58}
              height={48}
              className="absolute right-5 w-[57px] h-[48px]"
            />
          </button>
        </div>
      </div>

      {/* Session Data Section */}
      <div className="bg-white">
        <div className="flex flex-col px-4">
          <p className="font-semibold text-md mt-4">Top Up Sesi Waktu</p>
          <div className="h-[420px] overflow-y-auto no-scrollbar mt-2">
            {sessionData.map((session, index) => (
              <button
                onClick={() => openPaymentConfirmModal(session.id)} // Kirim session.id
                key={session.id} // Gunakan session.id sebagai key
                className="inset-0 w-full rounded-xl bg-gradient-to-r from-[#EF2328] to-[#FB942B] p-[1px] my-2"
              >
                <div className="relative flex items-center bg-[#f2dbd5] rounded-xl h-full px-4 py-5">
                  {/* Rata Kiri */}
                  <div className="w-[120px] text-xs font-semibold text-left">
                    <p>{session.time}</p>
                    {session.label && (
                      <div
                        className={`absolute top-0 text-[10px] text-white bg-gradient-to-r ${session.labelGradient} px-2 py-1 rounded-b-xl`}
                      >
                        <p>{session.label}</p>
                      </div>
                    )}
                  </div>

                  {/* Rata Tengah */}
                  <div className="flex justify-center items-center flex-1">
                    {session.promo && (
                      <Image
                        src="/icons/promo.png"
                        alt="Promo Icon"
                        width={24}
                        height={24}
                        className="mb-1 w-6 h-6"
                      />
                    )}
                    <div className="text-center">
                      <p className="m-0 text-xs">
                        {formatRupiah(session.price)}
                      </p>
                      {session.oldPrice && (
                        <span className="text-[10px] line-through text-[#9CA9B9]">
                          {formatRupiah(session.oldPrice)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Rata Kanan */}
                  <IconChevronRight size={24} className="ml-auto" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainSidebar;
