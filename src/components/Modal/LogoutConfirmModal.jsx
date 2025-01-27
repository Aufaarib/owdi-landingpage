import { IconX } from "@tabler/icons-react";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const mySwal = withReactContent(Swal);

const SwalContent = () => {
  const onLogout = () => {
    localStorage.clear();
    Cookies.remove("access_token");
    window.location.reload();
  };

  return (
    <div className="w-full bg-white rounded-[20px] p-4 z-50 flex flex-col gap-5">
      <div className="flex flex-row w-full justify-between">
        <p>Log Out</p>
        <IconX onClick={() => Swal.close()} />
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
          onClick={() => Swal.close()}
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
    mySwal.fire({
      allowOutsideClick: false,
      html: <SwalContent />,
      showConfirmButton: false,
      customClass: {
        popup: "bg-white w-[328px] h-auto rounded-[20px] shadow-lg p-0 flex",
      },
    });
  };
  const closeModal = () => {
    Swal.close();
  };

  return { openLogoutModal, closeModal };
};

export default LogoutModal;
