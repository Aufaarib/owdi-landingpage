import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import FormProfileModal from "./FormProfileModal";

const dumyOTP = 123456;

const OTPModal = () => {
    const { openFormProfileModal } = FormProfileModal();
    const [otp, setOtp] = useState([]); // State untuk menyimpan OTP
    useEffect(() => {
        console.log('state otp', otp);
    }, [otp])

    const openOTPModal = (nomor) => {
        Swal.fire({
            html: `
            <div class="w-full mx-auto bg-white rounded-lg  p-6 z-50">
                <div class="flex items-center mb-4">
                    <img src="/img/logoLogin.png" class="w-[90px] h-[25px] mr-3" alt="logo" />
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

                <div class="rounded-md mb-2 flex justify-center items-center">
                    <p class="text-sm text-center font-bold">
                        20:45
                    </p>
                </div>
                <div class="rounded-md mb-4 flex items-center text-center">
                    <p class="text-sm">
                        OTP telah dikirim, mohon menunggu untuk dapat mengirim ulang OTP.
                    </p>
                </div>

                <button
                    id="submit-otp"
                    class="w-full bg-blue-500 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 focus:outline-none"
                >
                    Submit ${otp.length}
                </button>
            </div>
      `,
            showConfirmButton: false,
            didOpen: () => {
                // Focus on the first input
                document.getElementById("otp-0").focus();

                // Add event listeners to each input
                for (let i = 0; i < 6; i++) {
                    const input = document.getElementById(`otp-${i}`);


                    // Handle input validation and update state
                    input.addEventListener("input", (e) => {
                        const value = e.target.value;

                        // Allow only the first character
                        if (!value.match(/^\d$/)) {
                            e.target.value = "";
                        } else if (value.length > 1) {
                            e.target.value = value[0];
                        }

                        // Update the state
                        setOtp((prevOtp) => {
                            const newOtp = [...prevOtp]; // Copy previous OTP
                            newOtp[i] = value; // Update specific OTP digit
                            return newOtp;
                        });


                        if (value.length === 1 && i < 5) {
                            document.getElementById(`otp-${i + 1}`).focus();
                        }
                    });

                    // Block invalid keys
                    input.addEventListener("keydown", (e) => {
                        if (
                            ["e", "E", "+", "-", ".", " "].includes(e.key) ||
                            e.target.value.length >= 1 && e.key !== "Backspace"
                        ) {
                            e.preventDefault();
                        }
                    });

                }

                // Handle OTP submission
                // document.getElementById("submit-otp").addEventListener("click", () => {
                //     const enteredOtp = otp.join(""); // Combine OTP from state
                //     if (parseInt(enteredOtp) === dumyOTP) {
                //         openFormProfileModal(nomor);
                //     } else {
                //         Swal.fire("Invalid OTP", "Please enter the correct OTP.", "error");
                //     }
                // });

                document.getElementById("submit-otp").addEventListener("click", () => {
                    let otpGet = "";
                    for (let i = 0; i < 6; i++) {
                        otpGet += document.getElementById(`otp-${i}`).value;
                    }
                    if (parseInt(otpGet) === dumyOTP) {
                        openFormProfileModal(nomor);
                        // Swal.fire("OTP Entered", `Your OTP is: ${otpGet}`, "success");
                    } else {
                        Swal.fire("Invalid OTP", "Please enter the correct OTP.", "error");
                    }
                });
            },
        });
    };

    return { openOTPModal };
};

export default OTPModal;
