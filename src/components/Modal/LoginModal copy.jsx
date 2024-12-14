import React from "react";
import Swal from "sweetalert2";
import axios from "axios";

const LoginModal = () => {
    const openLoginModal = () => {
        Swal.fire({
            title: '',
            html: `
                <div class="w-full max-w-sm mx-auto bg-white rounded-lg p-6">
                    <div class="flex justify-start items-center mb-4">
                        <img src="/img/logoLogin.png" class="w-[90px] h-[25px] mr-2" alt="logo" />
                        <h2 class="text-2xl font-semibold">Login</h2>
                    </div>

                    <form id="loginForm" class="space-y-4">

                            <label class="block text-left text-gray-700 font-medium mb-1" for="username">Username</label>
                        <div class="flex">
                            
                            <input type="text" id="username" class=" rounded-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  " placeholder="Isi nama kamu">
                        </div>

                         <label class="block text-left text-gray-700 font-medium mb-1" for="nomor">Nomor Handphone</label>
                        <div class="flex">
                            <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md ">
                            <div class="text-nowrap w-6 h-6 text-center flex items-center text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <p>+62</p>
                            </div>
                            </span>
                            <input type="text" id="nomor" class=" rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  " placeholder="8xx">
                        </div>
                        
                        <button 
                            type="submit" 
                            class="w-full bg-gradient-to-t from-[#EF2328] to-[#FB942B] text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none"
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
                    const username = document.getElementById("username").value;
                    const nomorInput = document.getElementById("nomor");
                    let nomor = nomorInput.value;

                    if (nomor.startsWith("0")) {
                        nomor = nomor.substring(1);
                    } else {
                        nomor = "0" + nomor;
                    }


                    if (username && nomor) {
                        const dumyUsername = "admin";
                        const dumyNomor = "08123456789";

                        if (username === dumyUsername && nomor === dumyNomor) {
                            Swal.fire({
                                icon: "success",
                                title: "Login Successful",
                                text: `Welcome, ${username}!`,
                                showConfirmButton: true,
                            });
                            return;
                        }
                        try {
                            const response = await axios.post("/api/login", {
                                username,
                                nomor,
                            });

                            if (response.status === 200) {
                                Swal.fire({
                                    icon: "success",
                                    title: "Login Successful",
                                    text: `Welcome, ${response.data.username}!`,
                                    showConfirmButton: true,
                                });
                            } else {
                                Swal.fire({
                                    icon: "error",
                                    title: "Login Failed",
                                    text: response.data.message || "Invalid login credentials.",
                                    showConfirmButton: true,
                                });
                            }
                        } catch (error) {
                            Swal.fire({
                                icon: "error",
                                title: "Login Failed",
                                text: error.response?.data?.message || "An error occurred while logging in.",
                                showConfirmButton: true,
                            });
                        }
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: "Login Failed",
                            text: "Please fill out all fields.",
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
