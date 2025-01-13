import { IconArrowLeft, IconX } from "@tabler/icons-react";
import ReactDOM from "react-dom";
import Swal from "sweetalert2";
import FormProfileModal from "./FormProfileModal";
import TopupModal from "./TopupModal";

const SwalContent = () => {
  const { openTopupModal } = TopupModal();
  return (
    <div className="w-full bg-white rounded-[20px] p-4 z-50 flex flex-col gap-5">
      <div className="flex flex-row w-full justify-between">
        <p>Top Up Koin</p>
        <IconX onClick={() => Swal.close()} />
      </div>
      <div className="flex flex-col items-center justify-center gap-7">
        <img className="w-[138px]" src="/icons/empty_voucher.png" alt="-" />
        <p className="font-bold">Kamu tidak mempunyai Koin</p>
      </div>
      <button
        onClick={() => openTopupModal()}
        style={{
          background: "linear-gradient(45deg, #EF2328 0%, #FB942B 100%)",
        }}
        className="w-full text-white rounded-full h-[40px] font-semibold"
      >
        Top Up Sekarang
      </button>
    </div>
  );
};

const NotEnoughCoinModal = () => {
  const openNotEnoughCoinModal = () => {
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

  return { openNotEnoughCoinModal, closeModal };
};

export default NotEnoughCoinModal;
