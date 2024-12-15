import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import formatRupiah from "@/utils/formatRupiah";

const PaymentConfirmModal = () => {
  const [remainingTime, setRemainingTime] = useState(null);

  useEffect(() => {
    const storedTime = localStorage.getItem("remainingTime");
    setRemainingTime(storedTime);
  }, []);

  const openPaymentConfirmModal = async (id) => {
    console.log('remainingTime', remainingTime);

    try {
      const response = await axios.get(`/api/session?id=${id}`);
      const sessionData = response.data;

      if (!sessionData) {
        Swal.fire({
          title: "Error",
          text: "Session not found!",
          icon: "error",
        });
        return;
      }

      Swal.fire({
        title: "",
        html: `
          <div class="w-full p-0 rounded-2xl z-50 h-full justify-between flex flex-col py-2">
            <div class="flex w-full flex-col justify-start items-start mb-4 gap-4">
              <img src="/img/logoLogin.png" class="w-[90px] h-[25px] mr-2" alt="logo" />
              <p class="text-[15px] text-black text-start">Anda akan membeli layanan OWDI. Tarif ${formatRupiah(sessionData.price || 0)}</p>
              <div class="bg-[#4F607780] p-4 w-full rounded-2xl flex flex-col items-start justify-start gap-3">
                <div class="flex flex-col gap-4 w-full">
                  <p class="text-black font-bold text-[15px] text-start">1. Masukan Nomor Ponsel</p>
                  <input 
                      placeholder="Nomor Ponsel"
                      class="bg-white rounded-xl outline-none p-3 text-sm w-full"
                  />
                </div>
                <button class="bg-red-600 text-white font-bold text-[12px] w-full rounded-xl py-1.5">
                    Kirim Kode Verifikasi Via SMS
                </button>
                <div class="flex flex-col gap-4 w-full">
                  <p class="text-black font-bold text-[15px] text-start">2. Masukan Kode Verifikasi</p>
                  <input 
                      placeholder="Kode Verifikasi"
                      class="bg-white rounded-xl outline-none p-3 text-sm w-full"
                  />
                </div>
                <div class="flex flex-row gap-1">
                  <p class="text-xs text-white">Tidak dapat kode verifikasi?</p>
                  <a class="text-xs text-[#f0a647] underline cursor-pointer">Kirim Ulang</a>
                </div>
              </div>
            </div>
            <button 
                id="myButton"
                type="submit" 
                class="w-full bg-gradient-to-t from-[#EF2328] to-[#FB942B] text-white py-2 rounded-[100px] hover:bg-blue-700 focus:outline-none"
            >
                Konfirmasi Pembelian
            </button>
          </div>
        `,
        showConfirmButton: false,
        customClass: {
          popup: "bg-white w-[328px] h-[600px] rounded-3xl shadow-lg",
        },
        didOpen: () => {


          document.getElementById("myButton").addEventListener("click", () => {
            const time = sessionData.time;
            console.log("Original time:", time);

            const { minutes, seconds } = parseTime(time);

            const remainingTime = localStorage.getItem("remainingTime");
            const remaining = remainingTime ? parseTime(remainingTime) : { minutes: 0, seconds: 0 };
            const totalSeconds = remaining.minutes * 60 + remaining.seconds + minutes * 60 + seconds;

            const newTime = formatTimeToMMSS(totalSeconds);

            localStorage.setItem("remainingTime", newTime);
            console.log("New remaining time:", newTime);

            Swal.fire({
              title: "Success",
              text: "Remaining time has been successfully updated.",
              icon: "success",
              timer: 3000,
              showConfirmButton: false,
            }).then(() => {
              Swal.close();

            });

          });
        },

      });
    } catch (error) {
      console.error("Error fetching session data:", error);
      Swal.fire({
        title: "Error",
        text: "Something went wrong while fetching the session data.",
        icon: "error",
      });
    }
  };

  const parseTime = (time) => {
    const timeParts = time.split(" ");
    const minutes = parseInt(timeParts[0], 10) || 0;
    const seconds = parseInt(timeParts[2], 10) || 0;
    return { minutes, seconds };
  };

  const formatTimeToMMSS = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

    return `${formattedMinutes}:${formattedSeconds}`;
  };

  return { openPaymentConfirmModal };
};

export default PaymentConfirmModal;
