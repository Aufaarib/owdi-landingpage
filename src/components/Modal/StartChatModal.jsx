import formatRupiah from "@/utils/formatRupiah";
import axios from "axios";
import Swal from "sweetalert2";

const StartChatModal = () => {
  const openStartChatModal = () => {
    Swal.fire({
      title: "",
      html: `
          <div class="w-full p-4 z-50 h-full justify-between items-center flex flex-col py-1 gap-3">
            <p id="closeButton" class="m-0 absolute right-0 top-0 p-3 cursor-pointer">X</p>
            <img src="/img/profile-amanda.png" class="w-[160px] mr-2" alt="logo" />
            <div class="flex w-full flex-col justify-start items-start gap-4">
              <p class="text-[16px] text-black font-bold text-start">1 Koin untuk 15 menit, saldo Koin akan terpotong otomatis jika sesi masih berlanjut</p>
              <div class="flex flex-row items-center gap-2 justify-center">
                <input class="w-4 h-4 bg-black" type="checkbox" />
                <p class="text-[13px] text-black text-start mb-0.5">Ingatkan saya lagi 7 hari kedepan</p>
              </div>
              <button 
                id="myButton"
                type="submit" 
                class="w-full flex h-[40px] justify-center items-center bg-gradient-to-t from-[#EF2328] to-[#FB942B] text-white rounded-[100px] outline-none"
              >
                <p class="mb-1">Lanjutkan</p>
              </button>
            </div>
          </div>
        `,
      showConfirmButton: false,
      customClass: {
        popup: "bg-white w-[328px] h-auto rounded-xl shadow-lg",
      },
      didOpen: () => {
        // Close the Swal popup when the "X" is clicked
        document.getElementById("closeButton").addEventListener("click", () => {
          Swal.close();
        });

        // Redirect to another page when the "Lanjutkan" button is clicked
        document.getElementById("myButton").addEventListener("click", () => {
          window.location.href = "/bicara";
        });
      },
    });
  };

  return { openStartChatModal };
};

export default StartChatModal;
