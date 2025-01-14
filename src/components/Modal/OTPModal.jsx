import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import FormProfileModal from "./FormProfileModal";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import axios from "axios";

const dumyOTP = 123456;

const OTPModal = () => {
  const { openFormProfileModal } = FormProfileModal();
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const router = useRouter();

  const openOTPModal = (nomor) => {
    let countdown = 180; // 3 menit dalam detik
    let countdownInterval;

    const updateCountdownDisplay = () => {
      const countdownElement = document.getElementById("countdown-timer");
      if (countdownElement) {
        const minutes = Math.floor(countdown / 60);
        const seconds = countdown % 60;
        const countdownText = `${minutes.toString().padStart(2, "0")}:${seconds
          .toString()
          .padStart(2, "0")}`;
        countdownElement.innerText = countdownText;
      }
    };

    Swal.fire({
      html: `
            <div class="w-full mx-auto bg-white rounded-lg  p-6 z-50">
                <div class="flex items-center mb-4">
                    <img src="/img/owdi-colors 1.png" class="w-[90px] h-[25px] mr-3" alt="logo" />
                    <h2 class="text-xl font-semibold text-gray-800">Login/Sign Up</h2>
                </div>

                <div class="rounded-md mb-4 flex items-start text-start">
                    <p class="text-sm">
                        Masukan Kode OTP yang berjumlah 6 digit angka yang telah dikirimkan ke <span class="font-bold"> Nomor ${nomor}</span>.
                    </p>
                </div>

                <div class="w-full flex justify-center gap-2 mb-4">
                    ${new Array(6)
          .fill("")
          .map(
            (_, index) => `
                        <input 
                          type="number" 
                          maxlength="1" 
                          class="w-12 h-12 text-center text-xl border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mx-1" 
                          id="otp-${index}" 
                        />
                      `
          )
          .join("")}
                </div>
                <div className="w-full flex justify-center items-center">
                    <button id="resend-otp" class="text-sm font-medium mb-4 font-semibold text-[#0050AE] hidden">
                        Kirim Ulang OTP
                    </button>
                </div>

                <div id="countdown" class="w-full flex flex-col justify-center gap-2 mb-4">
                    <div class="rounded-md mb-2 flex justify-center items-center">
                        <p id="countdown-timer" class="text-sm text-center font-bold">03:00</p>
                    </div>
                    <div class="rounded-md mb-4 flex items-center text-center">
                        <p class="text-sm">
                            OTP telah dikirim, mohon menunggu untuk dapat mengirim ulang OTP.
                        </p>
                    </div>
                </div>

                <button
                    id="submit-otp"
                    class="w-full bg-blue-500 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 focus:outline-none disabled:opacity-50"
                    disabled
                >
                    Submit 
                </button>
            </div>
            `,
      showConfirmButton: false,
      didOpen: () => {
        // Focus on the first input
        document.getElementById("otp-0").focus();

        // Countdown logic
        updateCountdownDisplay(); // Panggil pertama kali untuk menampilkan timer awal
        countdownInterval = setInterval(() => {
          if (countdown > 0) {
            countdown -= 1;
            updateCountdownDisplay();
          } else {
            clearInterval(countdownInterval);
            const countdownElement = document.getElementById("countdown-timer");
            if (countdownElement) {
              countdownElement.innerText = "Kirim Ulang OTP";
            }
            const resendButton = document.getElementById("resend-otp");
            if (resendButton) {
              resendButton.classList.remove("hidden");
            }
          }
        }, 1000);

        // Add event listeners to each input
        for (let i = 0; i < 6; i++) {
          const input = document.getElementById(`otp-${i}`);

          input.addEventListener("input", (e) => {
            const value = e.target.value;

            if (!value.match(/^\d$/)) {
              e.target.value = "";
            } else if (value.length > 1) {
              e.target.value = value[0];
            }

            const newOtp = [...otp];
            newOtp[i] = value;
            setOtp(newOtp);

            setIsButtonDisabled(newOtp.includes(""));

            if (value.length === 1 && i < 5) {
              document.getElementById(`otp-${i + 1}`).focus();
            }
          });

          input.addEventListener("keydown", (e) => {
            if (
              ["e", "E", "+", "-", ".", " "].includes(e.key) ||
              (e.target.value.length >= 1 && e.key !== "Backspace")
            ) {
              e.preventDefault();
            }
          });
        }

        document.getElementById("submit-otp").addEventListener("click", async () => {
          let otpGet = "";
          for (let i = 0; i < 6; i++) {
            otpGet += document.getElementById(`otp-${i}`).value.trim();
          }

          // Validasi OTP harus terdiri dari 6 digit
          if (otpGet.length !== 6 || !/^\d{6}$/.test(otpGet)) {
            Swal.fire("Invalid OTP", "Masukkan 6 digit kode OTP yang valid.", "error");
            return;
          }

          if (!nomor) {
            Swal.fire("Error", "Nomor telepon tidak ditemukan. Silakan coba lagi.", "error");
            return;
          }

          try {
            const response = await axios.post(
              `${process.env.NEXT_PUBLIC_API_BASE_URL}api/v1/auth/verify-otp`,
              {
                phone_number: nomor,
                code: otpGet,
              },
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );

            // Logika ketika respons berhasil
            if (response.data.code === 200) {
              const { fullname, access_token } = response.data.body;
              localStorage.setItem("nomor", nomor);
              localStorage.setItem("remainingTime", "10:00");
              Cookies.set("nomor", nomor);
              Cookies.set("access_token", access_token);

              if (fullname) {
                router.push("/choose-character");
              } else {
                openFormProfileModal(nomor);
              }
            } else {
              Swal.fire("Invalid OTP", "Kode OTP tidak valid, coba lagi.", "error");
            }
          } catch (error) {
            // Penanganan error API
            if (error.response) {
              Swal.fire("Error", error.response.data.message || "Terjadi kesalahan pada server.", "error");
            } else if (error.request) {
              Swal.fire("Error", "Tidak ada respons dari server, cek koneksi Anda.", "error");
            } else {
              Swal.fire("Error", "Terjadi kesalahan. Silakan coba lagi.", "error");
            }
          }
        });


        document.getElementById("resend-otp").addEventListener("click", () => {
          Swal.fire("OTP Resent", "Kode OTP telah dikirim ulang.", "success");
          countdown = 180;
          updateCountdownDisplay();
          document.getElementById("resend-otp").classList.add("hidden");
          countdownInterval = setInterval(() => {
            if (countdown > 0) {
              countdown -= 1;
              updateCountdownDisplay();
            } else {
              clearInterval(countdownInterval);
              document.getElementById("countdown-timer").innerText =
                "Kirim Ulang OTP";
              document.getElementById("resend-otp").classList.remove("hidden");
            }
          }, 1000);
        });
      },
    });
  };

  useEffect(() => {
    // Enable/disable submit button based on OTP length
    let kodeOtp = [];
    for (let i = 0; i < 6; i++) {
      const inputElement = document.getElementById(`otp-${i}`);
      if (inputElement) {
        const getkode = inputElement.value;
        kodeOtp.push(getkode);
      }
    }
    const submitButton = document.getElementById("submit-otp");
    if (submitButton) {
      submitButton.disabled = kodeOtp.includes("");
    }
  }, [otp]);

  return { openOTPModal };
};

export default OTPModal;
