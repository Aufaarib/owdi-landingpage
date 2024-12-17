import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import PaymentConfirmModal from "./PaymentConfirmModal";
import formatRupiah from "@/utils/formatRupiah";

const TopupModal = () => {
  const { openPaymentConfirmModal } = PaymentConfirmModal();
  const [denom, setDenom] = useState([]);
  // const [selectedDenomId, setSelectedDenomId] = useState(null);

  useEffect(() => {
    axios
      .get("/api/session")
      .then((response) => {
        setDenom(response.data);
      })
      .catch((error) => {
        console.error("Error fetching denom data:", error);
      });
  }, []);

  // const denom = [
  //   {
  //     id: 1,
  //     time: 3,
  //     price: 5000,
  //   },
  //   {
  //     id: 2,
  //     time: 5,
  //     price: 10000,
  //   },
  //   {
  //     id: 3,
  //     time: 10,
  //     ori_price: 16500,
  //     disc_price: 15000,
  //   },
  //   {
  //     id: 4,
  //     time: 20,
  //     ori_price: 20500,
  //     disc_price: 18000,
  //   },
  // ];

  const openTopupModal = () => {
    Swal.fire({
      position: "bottom",
      title: "",
      html: `
                    <div class="w-full bg-white rounded-lg rounded-br-none z-50 h-full flex flex-col gap-5">
                        <div class="flex justify-center items-center w-full">
                            <img src="/img/TopUpModel.png" class="w-[260px]" alt="logo" />
                            <h2 class="text-3xl font-normal max-w-32 text-left">Top Up Sesi Waktu</h2>
                        </div>
                        <div class="flex gap-5 flex-row">
                          ${denom
                            .filter((val) => !val.promo)
                            .map(
                              (i, index) =>
                                `
                                    <button 
                                      data-id="${i.id}" 
                                      data-time="${i.time}" 
                                      data-price="${i.price}" 
                                      key=${index}
                                      class="denom-btn flex flex-col bg-[#fcf4ef] w-[50%] h-[130px] gap-2 items-start justify-center p-5 border-2 border-[#f9dec2] rounded-[16px]">
                                      <p class="text-black font-bold text-[16px]">${
                                        i.time
                                      }</p>
                                      <p class="text-[#ED0226] font-bold text-[16px]">${formatRupiah(
                                        i.price
                                      )}</p>
                                    </button>
                                `
                            )
                            .join("")}
                        </div>
                        <div class="flex gap-5 flex-row">
                          ${denom
                            .filter((val) => val.promo)
                            .map(
                              (i, index) =>
                                `
                                    <button 
                                        data-id="${i.id}" 
                                        data-time="${i.time}" 
                                        data-price="${i.oldPrice}" key=${index} 
                                        class="denom-btn flex flex-col bg-[#f9e5d9] w-[50%] h-[130px] gap-1 items-start justify-start border-2 rounded-[16px] border-[#f9dec2] px-5">
                                        <p class="bg-gradient-to-t from-[#EF2328] to-[#FB942B] text-white px-2 py-1 flex text-center text-[13px] rounded-b-xl">Promo<p/>
                                        
                                        <p class="text-black font-bold text-[16px]">${
                                          i.time
                                        }</p>

                                        <div class="flex flex-row gap-2 items-center justify-start">
                                            
                                            <svg width="50" height="26" viewBox="0 0 26 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g clip-path="url(#clip0_1061_154049)">
                                            <path d="M22.6578 12.2602L21.8049 10.8581C21.4847 10.9154 21.5039 10.6248 21.1963 10.5419C20.8888 10.4591 20.6028 10.3082 20.3547 10.0978C20.1065 9.88748 19.9011 9.62181 19.7502 9.31599C19.5993 9.01017 19.5057 8.6702 19.475 8.31547C19.4442 7.96074 19.4768 7.59821 19.5709 7.24858C19.6649 6.89894 19.8187 6.56905 20.0233 6.27774C20.2279 5.98643 20.4794 5.73941 20.7634 5.55077C21.0474 5.36213 21.3583 5.23558 21.6784 5.17833C21.8886 5.14055 22.1004 5.13208 22.3091 5.15312L22.3649 3.42038L23.2065 2.80161L21.9335 1.56554C21.7478 1.29379 21.5075 1.0756 21.2301 0.926784C20.9526 0.777972 20.645 0.70227 20.3295 0.705167L3.26589 1.30007C2.9803 1.30972 2.69559 1.38222 2.42808 1.5134C2.16056 1.64459 1.91548 1.8319 1.70688 2.0646C1.49828 2.2973 1.33024 2.57082 1.21238 2.86952C1.09453 3.16821 1.02918 3.48621 1.02006 3.8053L0.960287 5.85781L2.40536 7.2835L2.57485 6.48462C2.82259 6.72616 3.01807 7.0272 3.14833 7.36777C3.27859 7.70835 3.34066 8.08068 3.33042 8.46009C3.30661 9.18473 3.02715 9.8878 2.5531 10.4157C2.07904 10.9436 1.44893 11.2535 0.800396 11.2776L0.735802 13.3203C0.725312 13.6531 0.774764 13.9805 0.881223 14.2831C0.987682 14.5858 1.14898 14.8575 1.35553 15.0821L3.07173 16.7155L4.66646 15.6147L19.859 15.1009C20.1445 15.0913 20.4293 15.0188 20.6968 14.8876C20.9643 14.7564 21.2094 14.5691 21.418 14.3364C21.6266 14.1037 21.7946 13.8302 21.9125 13.5315C22.0303 13.2328 22.0957 12.9148 22.1048 12.5957L22.113 12.2602L22.6578 12.2602Z" fill="#AD2015"/>
                                            <path d="M24.3271 6.57831L24.3846 4.40871C24.4007 3.74051 24.178 3.10815 23.7651 2.64932C23.3521 2.19049 22.7824 1.94235 22.1799 1.95892L4.26003 2.52295C3.65723 2.54144 3.07118 2.82344 2.62959 3.30749C2.18799 3.79153 1.92665 4.4384 1.90251 5.10712L1.86392 7.26419C2.54662 7.24265 3.19282 7.52279 3.66038 8.04297C4.12793 8.56316 4.37854 9.28077 4.35706 10.038C4.33559 10.7951 4.04379 11.5299 3.54587 12.0805C3.04795 12.6311 2.38468 12.9526 1.70198 12.9741L1.64372 15.1171C1.62514 15.7882 1.84738 16.4241 2.26167 16.8853C2.67596 17.3465 3.24845 17.5953 3.85353 17.5771L21.7661 17.0111C22.3718 16.9862 22.9582 16.6957 23.3965 16.2035C23.8347 15.7113 24.0889 15.0577 24.1033 14.3862L24.1615 12.2432C23.8235 12.2539 23.4909 12.1906 23.1826 12.057C22.8744 11.9233 22.5966 11.722 22.3651 11.4644C22.1336 11.2069 21.9529 10.8981 21.8334 10.5558C21.7138 10.2135 21.6578 9.84438 21.6684 9.46946C21.679 9.09454 21.7562 8.72119 21.8953 8.37073C22.0345 8.02027 22.2331 7.69956 22.4796 7.42691C22.7261 7.15426 23.0159 6.93502 23.3323 6.78169C23.6486 6.62837 23.9854 6.54396 24.3235 6.5333L24.3271 6.57831Z" fill="url(#paint0_linear_1061_154049)"/>
                                            <path d="M6.82603 8.42841L6.80802 7.39657L8.73572 7.36292L8.83751 13.194L7.68568 13.2141L7.60191 8.41487L6.82603 8.42841ZM9.89156 10.1832C9.87546 9.26065 10.0282 8.53521 10.3496 8.00685C10.6765 7.4784 11.2265 7.20742 11.9997 7.19393C12.7729 7.18043 13.3294 7.43209 13.6691 7.94891C14.0142 8.46563 14.1948 9.18525 14.2109 10.1078C14.2271 11.0356 14.0718 11.7665 13.7451 12.3002C13.4237 12.8339 12.8764 13.1075 12.1032 13.121C11.33 13.1345 10.7708 12.8802 10.4256 12.3582C10.0858 11.836 9.90775 11.111 9.89156 10.1832ZM13.1071 10.127C13.1002 9.73244 13.0677 9.40229 13.0098 9.1366C12.957 8.86547 12.8518 8.64594 12.6942 8.478C12.5419 8.30997 12.3165 8.22856 12.0179 8.23377C11.7192 8.23898 11.4941 8.32826 11.3424 8.5016C11.1961 8.67484 11.0986 8.89791 11.0501 9.1708C11.0067 9.43827 10.9885 9.7693 10.9954 10.1639C11.0025 10.5692 11.0324 10.91 11.0853 11.1865C11.138 11.4576 11.2432 11.6771 11.4008 11.8451C11.5583 12.0077 11.7864 12.0864 12.085 12.0812C12.3836 12.076 12.6088 11.9894 12.7606 11.8214C12.9123 11.648 13.0097 11.4249 13.053 11.1521C13.0961 10.874 13.1141 10.5323 13.1071 10.127Z" fill="white"/>
                                            <path d="M16.0804 8.76217C16.0759 8.50621 16.1503 8.29888 16.3036 8.14018C16.4608 7.97741 16.6613 7.8939 16.9053 7.88964C17.1533 7.88531 17.3566 7.96177 17.5154 8.11902C17.6781 8.27221 17.7617 8.47678 17.7661 8.73274C17.7707 8.9927 17.6944 9.20407 17.5372 9.36683C17.3839 9.52553 17.1833 9.60705 16.9354 9.61137C16.6914 9.61563 16.4881 9.54117 16.3254 9.38799C16.1666 9.23073 16.0849 9.02213 16.0804 8.76217ZM19.426 7.90565L17.0396 12.1479L16.6137 12.1554L19.006 7.91298L19.426 7.90565ZM16.91 8.1596C16.758 8.16225 16.637 8.21637 16.5468 8.32196C16.4606 8.42348 16.4191 8.56823 16.4224 8.7562C16.4256 8.94417 16.4722 9.08938 16.562 9.19183C16.6558 9.29421 16.7787 9.34407 16.9306 9.34142C17.0826 9.33876 17.2037 9.28464 17.2939 9.17905C17.384 9.07346 17.4275 8.92668 17.4242 8.73871C17.421 8.55474 17.3725 8.41156 17.2787 8.30918C17.1849 8.20681 17.062 8.15694 16.91 8.1596ZM18.2855 11.3281C18.281 11.0681 18.3553 10.8588 18.5086 10.7001C18.6658 10.5373 18.8664 10.4538 19.1103 10.4495C19.3543 10.4453 19.5556 10.5218 19.7144 10.679C19.8771 10.8322 19.9607 11.0388 19.9653 11.2988C19.9698 11.5587 19.8935 11.7701 19.7363 11.9328C19.583 12.0915 19.3844 12.173 19.1405 12.1773C18.8965 12.1815 18.6932 12.1071 18.5305 11.9539C18.3717 11.7966 18.2901 11.588 18.2855 11.3281ZM19.1151 10.7255C18.9632 10.7282 18.8421 10.7823 18.7519 10.8879C18.6617 10.9935 18.6183 11.1382 18.6215 11.3222C18.6247 11.5062 18.6732 11.6494 18.767 11.7517C18.8608 11.8541 18.9837 11.904 19.1357 11.9013C19.2876 11.8987 19.4067 11.8466 19.493 11.7451C19.5832 11.6395 19.6266 11.4927 19.6233 11.3047C19.62 11.1167 19.5715 10.9736 19.4778 10.8752C19.388 10.7727 19.2671 10.7228 19.1151 10.7255Z" fill="white"/>
                                            </g>
                                            <defs>
                                            <linearGradient id="paint0_linear_1061_154049" x1="1.77287" y1="10.3698" x2="24.3101" y2="11.008" gradientUnits="userSpaceOnUse">
                                            <stop stop-color="#FA7C55"/>
                                            <stop offset="0.15" stop-color="#F75A49"/>
                                            <stop offset="0.43" stop-color="#F22136"/>
                                            <stop offset="0.56" stop-color="#F00B2E"/>
                                            <stop offset="0.97" stop-color="#C3001C"/>
                                            </linearGradient>
                                            <clipPath id="clip0_1061_154049">
                                            <rect width="26" height="18" fill="white"/>
                                            </clipPath>
                                            </defs>
                                            </svg>
                                        
                                        <div class="flex flex-col items-start">
                                                <p class="text-[#ED0226] font-bold text-[16px]">${formatRupiah(
                                                  i.price
                                                )}</p>
                                                <p class="text-[#9CA9B9] line-through text-sm">${formatRupiah(
                                                  i.oldPrice
                                                )}</p>
                                            </div>
                                        </div>
                                    </button>
                                `
                            )
                            .join("")}
                        </div>
                        <button
                            id="myButton"
                            type="submit" 
                            class="w-full text-white disabled:text-gray-400 py-2 rounded-[100px] focus:outline-none h-[50px] cursor-pointer"
                        >
                            Beli
                        </button>
                    </div>
                `,
      showConfirmButton: false,
      customClass: {
        popup:
          "bg-white rounded-lg rounded-br-none rounded-bl-none shadow-lg p-0", // Customizing popup for correct padding
      },
      didOpen: () => {
        const buttons = Swal.getHtmlContainer().querySelectorAll(".denom-btn");
        const buttonSubmit = document.getElementById("myButton");

        buttonSubmit.disabled = true;
        buttonSubmit.classList.add("bg-gray-300", "opacity-45", "text-red");

        buttons.forEach((button) => {
          button.addEventListener("click", () => {
            const picked = {
              id: button.getAttribute("data-id"),
              time: button.getAttribute("data-time"),
              price: button.getAttribute("data-price"),
            };
            console.log("picked", picked);

            buttons.forEach((btn) =>
              btn.classList.remove("border-[2px]", "border-[#eb9743]")
            );

            // Add the border class to the clicked button
            button.classList.add("border-[2px]", "border-[#eb9743]");

            buttonSubmit.addEventListener("click", () => {
              openPaymentConfirmModal(picked?.id);
              // Swal.fire({
              //   title: "",
              //   html: `
              //                 <div class="w-full p-0 rounded-2xl z-50 h-full justify-between flex flex-col py-2">
              //                     <div class="flex w-full flex-col justify-start items-start mb-4 gap-4">
              //                         <img src="/img/logoLogin.png" class="w-[90px] h-[25px] mr-2" alt="logo" />
              //                         <p class="text-[15px] text-black text-start">Anda akan membeli layanan OWDI. Tarif 15.000/SMS</p>
              //                         <div class="bg-[#4F607780] p-4 w-full rounded-2xl flex flex-col items-start justify-start gap-3">
              //                             <div class="flex flex-col gap-4 w-full">
              //                                 <p class="text-black font-bold text-[15px] text-start">1. Masukan Nomor Ponsel</p>
              //                                 <input
              //                                     placeholder="Nomor Ponsel"
              //                                     class="bg-white rounded-xl outline-none p-3 text-sm w-full"
              //                                 />
              //                             </div>
              //                             <button class="bg-red-600 text-white font-bold text-[12px] w-full rounded-xl py-1.5">
              //                                 Kirim Kode Verifikasi Via SMS
              //                             </button>
              //                             <div class="flex flex-col gap-4 w-full">
              //                                 <p class="text-black font-bold text-[15px] text-start">2. Masukan Kode Verifikasi</p>
              //                                 <input
              //                                     placeholder="Kode Verifikasi"
              //                                     class="bg-white rounded-xl outline-none p-3 text-sm w-full"
              //                                 />
              //                             </div>
              //                             <div class="flex flex-row gap-1">
              //                                 <p class="text-xs text-white">Tidak dapat kode verifikasi?</p>
              //                                 <a class="text-xs text-[#f0a647] underline  cursor-pointer">Kirim Ulang</a>
              //                             </div>
              //                         </div>
              //                     </div>
              //                     <button
              //                         id="myButton"
              //                         type="submit"
              //                         class="w-full bg-gradient-to-t from-[#EF2328] to-[#FB942B] text-white py-2 rounded-[100px] hover:bg-blue-700 focus:outline-none"
              //                     >
              //                         Konfirmasi Pembelian
              //                     </button>
              //                 </div>
              //             `,
              //   showConfirmButton: false,
              //   customClass: {
              //     popup: "bg-white w-[328px] h-[600px] rounded-3xl shadow-lg", // Customizing popup for correct padding
              //   },
              //   didOpen: () => {
              //     document
              //       .getElementById("myButton")
              //       .addEventListener("click", () => {
              //         Swal.close();
              //       });
              //   },
              // });
            });

            if (!picked) {
              buttonSubmit.disabled = true; // Disable the buttonSubmit if no denomination is selected
              buttonSubmit.classList.add("bg-gray-300", "opacity-45"); // Add styles for disabled buttonSubmit
              buttonSubmit.classList.remove(
                "bg-gradient-to-t",
                "from-[#EF2328]",
                "to-[#FB942B]"
              ); // Remove active buttonSubmit styles
            } else {
              buttonSubmit.disabled = false; // Enable the buttonSubmit
              buttonSubmit.classList.remove("bg-gray-300", "opacity-45"); // Remove disabled styles
              buttonSubmit.classList.add(
                "bg-gradient-to-t",
                "from-[#EF2328]",
                "to-[#FB942B]"
              ); // Add active buttonSubmit styles
            }
          });
        });
      },
    });
  };

  return { openTopupModal };
};

export default TopupModal;
