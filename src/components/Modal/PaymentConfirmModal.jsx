import React from "react";
import Swal from "sweetalert2";
import axios from "axios";

const PaymentConfirmModal = () => {
  const openPaymentConfirmModal = () => {
    Swal.fire({
      title: "",
      html: `
                <div class="w-full p-0 rounded-2xl z-50 h-full justify-between flex flex-col py-2">
                    <div class="flex w-full flex-col justify-start items-start mb-4 gap-4">
                        <img src="/img/logoLogin.png" class="w-[90px] h-[25px] mr-2" alt="logo" />
                        <p class="text-[15px] text-black text-start">Anda akan membeli layanan OWDI. Tarif 15.000/SMS</p>
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
                                <a class="text-xs text-[#f0a647] underline  cursor-pointer">Kirim Ulang</a>
                            </div>
                        </div>
                    </div>
                    <button 
                        type="submit" 
                        class="w-full bg-gradient-to-t from-[#EF2328] to-[#FB942B] text-white py-2 rounded-[100px] hover:bg-blue-700 focus:outline-none"
                    >
                        Konfirmasi Pembelian
                    </button>
                </div>
            `,
      showConfirmButton: false,
      customClass: {
        popup: "bg-white w-[328px] h-[600px] rounded-3xl shadow-lg", // Customizing popup for correct padding
      },
      didOpen: () => {
        const form = document.getElementById("loginForm");
      },
    });
  };

  return { openPaymentConfirmModal };
};

export default PaymentConfirmModal;
