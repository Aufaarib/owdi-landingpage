import { IconMicrophone, IconX } from "@tabler/icons-react";

const Bicara = () => {
    return (
        <div className="relative bg-[#d6d6d6] mb-[40px] ">
            <div className="relative mt-4 flex items-center h-[40px]">
                {/* Posisi di tengah */}
                <div className="absolute  left-1/2 transform -translate-x-1/2 flex justify-center items-center w-[185px] px-2 py-1 bg-gradient-to-t from-[#EF2328] to-[#FB942B] rounded-tr-xl rounded-bl-xl">
                    <p className="text-[12px] mr-1 text-white">Owdi is Talking</p>
                    <img src="/icons/IconR.png" className="w-6 h-6" alt="icon" />
                </div>

                {/* Posisi di kanan */}
                <button className="absolute right-4 bg-gray-400 px-3 py-1 rounded-full text-white">
                    <IconX size={24} />
                </button>
            </div>

            <div className="mt-1 flex justify-center items-center ">
                <div className="w-[360px]">

                    <img src="/img/Models2.png" className="object-cover" alt="icon" />
                </div>
            </div>
            <div className="w-full bg-white flex flex-col justify-center p-4 rounded-t-xl">
                <button className="flex justify-center items-center bg-gradient-to-t from-[#EF2328] to-[#FB942B] text-white py-2 px-16 rounded-full"><p>Bicara</p>
                    <IconMicrophone />
                </button>
                <p className="text-center text-xs text-[#718290] mt-2">Microfon sudah siap dipakai</p>
            </div>

        </div>
    );
};

export default Bicara;
