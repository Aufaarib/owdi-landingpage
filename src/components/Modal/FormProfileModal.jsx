import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Swal from "sweetalert2";
import SDKModal from "./S&KModal";

const Inputs = ({ title, placeholder, id, children }) => {
  return (
    <div class="flex flex-col gap-2">
      <label
        class="block text-left text-gray-700 text-[14px] font-medium"
        for={id}
      >
        {title}
      </label>

      {children}
    </div>
  );
};

const SwalContent = () => {
  const [nomor, setNomor] = useState();
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [calling_pick, setCallingPick] = useState("");
  const [custom_calling_pick, setCustomCallingPick] = useState("");
  const { openSDKModal } = SDKModal();

  useEffect(() => {
    setNomor(localStorage.getItem("nomor"));
  }, []);

  const handleSubmitProfile = () => {
    localStorage.setItem("name", name);
    localStorage.setItem("gender", gender);
    localStorage.setItem("agreed", agreed);
    localStorage.setItem("calling_pick", calling_pick);
    localStorage.setItem("remainingCoin", 1);
    Swal.fire({
      icon: "success",
      title: "Profile Berhasil Disimpan",
      showConfirmButton: false,
      timer: 2500,
    }).then(() => {
      window.location.reload();
    });
  };

  return (
    <div className="w-full bg-white rounded-[20px] p-0 z-50 flex flex-col">
      <div className="bg-[#eef9fe] w-full p-[20px] rounded-t-[20px]">
        <div className="flex justify-center items-center mb-4">
          <img
            src="/icons/new-user-head.png"
            className="w-[64px] mr-2"
            alt="logo"
          />
          <p className="text-[14px] font-semibold text-black text-left m-0">
            Hai, sebelum memulai ngobrol isi Data Kamu dulu yuk
          </p>
        </div>
        <Inputs title="Nomor Handphone">
          <div className="relative">
            {/* Start Adornment */}
            <span className="absolute inset-y-0 border-[1.5px] border-[#BFC9D0] left-0 flex items-center bg-[#EEEFF2] px-3 text-[14px] rounded-l-xl  border-r-0 text-[#718290]">
              +62
            </span>

            {/* Input */}
            <input
              disabled
              type="text"
              className="bg-white rounded-xl border-[1.5px] border-[#BFC9D0] text-[#001A41] w-full text-sm pl-14 p-2.5 outline-none"
              value={nomor}
            />

            <span className="absolute inset-y-0 right-0 flex items-center px-3 text-[14px] rounded-xl text-[#718290]">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M9.76484 2.99706C10.9573 1.66504 13.0427 1.66504 14.2352 2.99706L14.936 3.77982C15.1385 4.00611 15.433 4.12807 15.7362 4.1113L16.7852 4.05331C18.5703 3.95462 20.0449 5.42927 19.9462 7.21433L19.8883 8.26334C19.8715 8.56659 19.9934 8.86102 20.2197 9.0636L21.0025 9.76435C22.3345 10.9568 22.3345 13.0423 21.0025 14.2347L20.2197 14.9355C19.9934 15.138 19.8715 15.4325 19.8883 15.7357L19.9462 16.7847C20.0449 18.5698 18.5703 20.0444 16.7852 19.9458L15.7362 19.8878C15.433 19.871 15.1385 19.993 14.936 20.2192L14.2352 21.002C13.0428 22.334 10.9573 22.334 9.76484 21.002L9.06409 20.2192C8.86151 19.993 8.56708 19.871 8.26383 19.8878L7.21482 19.9458C5.42976 20.0444 3.95511 18.5698 4.0538 16.7847L4.11179 15.7357C4.12855 15.4325 4.0066 15.138 3.78031 14.9355L2.99755 14.2347C1.66553 13.0423 1.66553 10.9568 2.99754 9.76435L3.78031 9.0636C4.0066 8.86102 4.12855 8.56659 4.11179 8.26334L4.0538 7.21433C3.95511 5.42927 5.42976 3.95462 7.21482 4.05331L8.26383 4.1113C8.56708 4.12807 8.86151 4.00611 9.06409 3.77982L9.76484 2.99706ZM16.7337 10.5195C17.0888 10.1718 17.0888 9.60801 16.7337 9.26029C16.3787 8.91258 15.8031 8.91258 15.4481 9.26029L11.0434 13.5743L8.50073 11.4398C8.11953 11.1198 7.54562 11.163 7.21887 11.5364C6.89213 11.9097 6.93627 12.4718 7.31748 12.7918L10.9053 15.8807C10.9836 15.948 11.1002 15.9448 11.1746 15.8732L16.7337 10.5195Z"
                  fill="#008E53"
                />
              </svg>
            </span>
          </div>
        </Inputs>
      </div>
      <div className="p-[20px] py-[10px] flex flex-col gap-4">
        <Inputs title="Nama">
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            className="form_inputs text-[#001A41] w-full text-sm p-2.5 outline-none"
            placeholder="Isi Nama Kamu"
          />
        </Inputs>
        <Inputs title="Jenis Kelamin">
          <div className="flex flex-row w-full justify-between pr-[30%] font-normal">
            <div className="flex flex-row gap-2 items-center">
              <input
                type="radio"
                name="gender"
                value="male"
                onChange={() => setGender("male")}
              />
              <p className="text-[14px]">Laki-laki</p>
            </div>
            <div className="flex flex-row gap-2 items-center">
              <input
                type="radio"
                name="gender"
                value="female"
                onChange={() => setGender("female")}
              />
              <p className="text-[14px]">Perempuan</p>
            </div>
          </div>
          <p className="text-left text-[12px] text-[#718290]">
            Pastikan sudah sesuai, karena jenis kelamin tidak dapat dirubah lagi
          </p>
        </Inputs>
        <Inputs title="Pilihan Panggilan">
          <select
            onChange={(e) => setCallingPick(e.target.value)}
            className="form_inputs text-[#001A41] w-full text-sm p-2.5 outline-none"
          >
            <option value="Default">Default</option>
            <option value="Abang">Abang</option>
            <option value="Sayang">Sayang</option>
            <option value="Kak">Kak</option>
            <option value="Aa">Aa</option>
            <option value="Kustom">Kustom</option>
          </select>
          {calling_pick === "Kustom" && (
            <div className="relative">
              <input
                type="text"
                maxLength={20}
                // disabled={custom_calling_pick.length >= 20}
                onChange={(e) => setCustomCallingPick(e.target.value)}
                className="form_inputs text-[#001A41] w-full text-sm p-2.5 outline-none"
                placeholder="Isi nama panggilan"
              />
              <p className="absolute inset-y-0 right-0 flex items-center text-[14px] text-gray-400 pr-3">
                {custom_calling_pick.length}/20
              </p>
            </div>
          )}
          <p className="text-left text-[12px] text-[#718290]">
            Owdi akan memanggilmu sesuai panggilan yang kamu pilih dalam sesi
            obrolan
          </p>
        </Inputs>
        <div className="flex flex-row text-[12px] text-start items-start gap-3 py-3">
          <input
            type="checkbox"
            className="mt-1"
            onClick={() => setAgreed(!agreed)}
          />
          <p>
            Dengan melanjutkan, saya telah setuju sengan{" "}
            <a
              onClick={() => openSDKModal()}
              className="underline text-blue-600 cursor-pointer"
            >
              Ketentuan Layanan
            </a>{" "}
            dan{" "}
            <a
              onClick={() => openSDKModal()}
              className="underline text-blue-600 cursor-pointer"
            >
              Kebijakan Privasi
            </a>{" "}
            Owdi
          </p>
        </div>
        <button
          onClick={() => handleSubmitProfile()}
          disabled={!name || !nomor || !agreed || !calling_pick || !gender}
          className={`h-[40px] rounded-full text-[14px] font-semibold text-white ${
            !name || !nomor || !agreed || !calling_pick || !gender
              ? "bg-gray-400"
              : "bg-gradient-to-r from-[#EF2328] to-[#FB942B]"
          }`}
        >
          Lanjutkan
        </button>
      </div>
    </div>
  );
};

const FormProfileModal = () => {
  const openFormProfileModal = () => {
    const wrapper = document.createElement("div");

    // Render the React component inside the div
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

  return { openFormProfileModal, closeModal };
};

export default FormProfileModal;
