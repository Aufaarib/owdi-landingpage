import { IconArrowLeft, IconX } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import ReactDOM from "react-dom";
import Swal from "sweetalert2";

const SwalContent = () => {
  return (
    <div className="w-full bg-white rounded-[20px] p-4 z-50 flex flex-col gap-5">
      <div className="flex flex-row w-full justify-between">
        <p>Akhiri Sesi</p>
        <IconX onClick={() => Swal.close()} />
      </div>
      <div className="flex flex-col items-center justify-center gap-7">
        <img className="w-[138px]" src="/icons/warning-icon.png" alt="-" />
        <p className="font-bold">
          Kamu sudah yakin akan mengakhiri session dengan Owdi?
        </p>
      </div>
      <div className="flex flex-row gap-1">
        <button
          onClick={() => Swal.close()}
          style={{
            background: "linear-gradient(45deg, #EF2328 0%, #FB942B 100%)",
          }}
          className="w-full text-white rounded-full h-[40px] font-semibold"
        >
          Batal
        </button>
        <button
          onClick={() => (window.location.href = "/choose-character")}
          style={{
            background: "linear-gradient(45deg, #EF2328 0%, #FB942B 100%)",
          }}
          className="w-full text-white rounded-full h-[40px] font-semibold"
        >
          Akhiri
        </button>
      </div>
    </div>
  );
};

const EndChatModal = () => {
  const openEndChatModal = () => {
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

  return { openEndChatModal, closeModal };
};

export default EndChatModal;
