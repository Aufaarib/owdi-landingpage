import moment from "moment";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const LoginModal = () => {
  const router = useRouter();

  const openLoginModal = () => {
    Swal.fire({
      title: "",
      html: `
                <div class="w-full max-w-sm mx-auto bg-white rounded-lg p-6 z-50">
                    <div class="flex justify-start items-center mb-4">
                        <img src="/img/logoLogin.png" class="w-[90px] h-[25px] mr-2" alt="logo" />
                        <h2 class="text-2xl font-semibold">Login</h2>
                    </div>

                    <form id="loginForm" class="space-y-4">
                        <div>
                            <label class="block text-left text-gray-700 font-medium mb-1" for="username">Username</label>
                            <input type="text" id="username" class="rounded-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block w-full text-sm p-2.5" placeholder="Isi nama kamu">
                        </div>

                        <div>
                            <label class="block text-left text-gray-700 font-medium mb-1" for="nomor">Nomor Handphone</label>
                            <div class="flex">
                                <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md">
                                    +62
                                </span>
                                <input type="text" id="nomor" class="rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 w-full text-sm p-2.5" placeholder="8xx">
                            </div>
                        </div>
                        
                        <button 
                            type="submit" 
                            class="w-full bg-gradient-to-t from-[#EF2328] to-[#FB942B] text-white py-2 rounded-lg hover:opacity-90 focus:outline-none"
                        >
                            Login
                        </button>
                    </form>
                </div>
            `,
      showConfirmButton: false,
      customClass: {
        popup: "bg-white rounded-lg shadow-lg p-0",
      },
      didOpen: () => {
        const form = document.getElementById("loginForm");
        form.addEventListener("submit", async (e) => {
          e.preventDefault();
          const username = document.getElementById("username").value.trim();
          const nomorInput = document.getElementById("nomor");
          let nomor = nomorInput.value.trim();

          if (nomor.startsWith("0")) {
            nomor = nomor.substring(1);
          }
          nomor = "0" + nomor;

          // Dummy data untuk login
          const dummyUsername = "userowdi";
          const dummyNomor = "08123456789";

          if (username && nomor) {
            if (username === dummyUsername && nomor === dummyNomor) {
              localStorage.setItem("username", username);
              localStorage.setItem("nomor", nomor);
              // const endTime = Date.now() + 10 * 60 * 1000;
              localStorage.setItem("remainingTime", "10:00");
              router.push("/home");
              Swal.fire({
                icon: "success",
                title: "Login Berhasil",
                text: `Selamat datang, ${username}!`,
                showConfirmButton: true,
              });
            } else {
              Swal.fire({
                icon: "error",
                title: "Login Gagal",
                text: "Username atau nomor handphone salah.",
                showConfirmButton: true,
              });
            }
          } else {
            Swal.fire({
              icon: "error",
              title: "Login Gagal",
              text: "Harap isi semua kolom.",
              showConfirmButton: true,
            });
          }
        });
      },
    });
  };

  return { openLoginModal };
};

export default LoginModal;
