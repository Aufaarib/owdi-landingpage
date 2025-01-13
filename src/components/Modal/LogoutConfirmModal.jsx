import Swal from "sweetalert2";
import ReactDOM from "react-dom";
import { useEffect, useState } from "react";
import { IconArrowLeft, IconChevronLeft, IconX } from "@tabler/icons-react";
import FormProfileModal from "./FormProfileModal";
import Cookies from "js-cookie";
const SwalContent = () => {
  const onLogout = () => {
    localStorage.clear();
    Cookies.remove("nomor");
    window.location.reload();
  };

  return (
    <div className="w-full bg-white rounded-[20px] p-4 z-50 flex flex-col gap-5">
      <div className="flex flex-row w-full justify-between">
        <p>Log Out</p>
        <IconX />
      </div>
      <div className="flex flex-col items-center justify-center gap-7">
        <img className="w-[88px]" src="/icons/warning-icon.png" alt="-" />
        <p>Kamu yakin untuk log out Owdi?</p>
      </div>
      <div className="flex flex-row w-full justify-between gap-5">
        {/* <button className="border-gradient border-gradient-purple bg-white w-[50%]">
          Log Out
        </button> */}
        <button
          onClick={() => onLogout()}
          style={{
            background: "linear-gradient(45deg, #EF2328 0%, #FB942B 100%)",
          }}
          className="w-[50%] rounded-full p-[3px] h-[40px] outline-none"
        >
          <p className="w-full bg-white text-[#FF0025] rounded-full h-full flex justify-center items-center font-semibold">
            Log Out
          </p>
        </button>
        <button
          style={{
            background: "linear-gradient(45deg, #EF2328 0%, #FB942B 100%)",
          }}
          className="w-[50%] text-white rounded-full h-[40px] font-semibold"
        >
          Batal
        </button>
      </div>
    </div>
  );
};

const LogoutModal = () => {
  const openLogoutModal = () => {
    // console.log("noSK", nomor);
    const wrapper = document.createElement("div");

    // Render the React component insid e the div
    ReactDOM.render(<SwalContent />, wrapper);

    Swal.fire({
      allowOutsideClick: false,
      html: wrapper,
      showConfirmButton: false,
      customClass: {
        popup: "bg-white w-[90%] h-auto rounded-[20px] shadow-lg p-0 flex",
      },
    });
  };
  const closeModal = () => {
    Swal.close();
  };

  return { openLogoutModal, closeModal };
};

export default LogoutModal;
