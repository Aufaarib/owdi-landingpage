import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const Content = ({ nomor }) => {
    console.log("nomor", nomor);

    return (
        <div className="w-full rounded-lg rounded-br-none z-50 h-full flex flex-col gap-5 my-2 ">
            <div className=" flex justify-center">
                <img src="img/profile-amanda.png" className="w-[128px]" alt="" />
            </div>
            <div className=" flex flex-col justify-center my-4">
                <p className="text-[16px] font-semibold">Nomor kamu belum bisa menggunakan layanan OWDI</p>
                <p className="text-sm text-[#718290]">Apakah Kamu bersedia untuk jadi daftar tunggu untuk layanan OWDI?</p>
            </div>
            <div className="flex justify-center gap-4 items-center mx-4">



                <div
                    className=" flex w-[140px] rounded-full mx-auto bg-gradient-to-tr from-red-400 via-orange-400 to-rose-400 p-[2px]  shadow-lg">
                    <button className="flex-1 font-semibold text-sm bg-white px-6 py-[8px] rounded-full">
                        Batal
                    </button>
                </div>
                <div
                    className=" flex w-[140px] rounded-full mx-auto bg-gradient-to-t from-[#EF2328] to-[#FB942B] p-[2px] shadow-lg">
                    <button className="flex-1 font-semibold text-sm text-white bg-transparent px-6 py-[8px] rounded-full">
                        Bersedia
                    </button>
                </div>
            </div>
        </div>
    );
}

const NumberNotAllowedModal = () => {
    const NumberNotAllowedMDL = (nomor) => {
        MySwal.fire({
            html: <Content nomor={nomor} />,
            showConfirmButton: false,
            allowOutsideClick: true,
            customClass: {
                popup: "bg-white rounded-[20px] shadow-lg p-2 overflow-y-hidden", // Pastikan menggunakan overflow-y-hidden
            },

        });
    };

    return { NumberNotAllowedMDL };
};

export default NumberNotAllowedModal;