import ReactDOM from "react-dom";
import Swal from "sweetalert2";
import TopupModal from "./TopupModal";
import { IconX } from "@tabler/icons-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const StartChatModal = () => {
  const router = useRouter();
  const [uid, setUid] = useState("2ppiObWYvS3sZScI7uLitb1LtHj");

  const onStartSession = () => {
    const remaining_coin = parseInt(localStorage.getItem("remainingCoin"));
    const updated_coin = remaining_coin - 1;

    localStorage.setItem("remainingCoin", updated_coin);
    // router.push(`/bicara/${uid}`);
    router.push(`/bicara/${uid}`);
    Swal.close();
    // window.location.href = `/bicara/${uid}`;
  };

  const SwalContent = () => {
    const { openTopupModal } = TopupModal();
    return (
      <div class="w-full p-4 py-4 z-50 h-full justify-between items-center flex flex-col gap-3">
        <p class="m-0 absolute right-0 top-0 p-3 cursor-pointer">
          <IconX onClick={() => Swal.close()} />
        </p>
        <img src="/img/profile-amanda.png" class="w-[160px] mr-2" alt="logo" />
        <div class="flex w-full flex-col justify-start items-start gap-4">
          <p class="text-[16px] text-black font-bold text-start">
            1 Koin untuk 15 menit, saldo Koin akan terpotong otomatis jika sesi
            masih berlanjut
          </p>
          <div class="flex flex-row items-center gap-2 justify-center">
            <input class="w-4 h-4 bg-black" type="checkbox" />
            <p class="text-[13px] text-black text-start mb-0.5">
              Ingatkan saya lagi 7 hari kedepan
            </p>
          </div>
          <button
            onClick={() => onStartSession()}
            class="w-full flex h-[40px] justify-center items-center bg-gradient-to-t from-[#EF2328] to-[#FB942B] text-white rounded-[100px] outline-none"
          >
            <p class="mb-1">Lanjutkan</p>
          </button>
        </div>
      </div>
    );
  };

  const openStartChatModal = () => {
    // console.log("noSK", nomor);
    const wrapper = document.createElement("div");

    // Render the React component insid e the div
    ReactDOM.render(<SwalContent />, wrapper);

    Swal.fire({
      allowOutsideClick: false,
      html: wrapper,
      showConfirmButton: false,
      customClass: {
        popup: "bg-white w-[328px] h-auto rounded-[20px] shadow-lg p-0 flex",
      },
    });
  };

  const closeModal = () => {
    Swal.close();
  };

  return { openStartChatModal, closeModal, setUid };
};

export default StartChatModal;
