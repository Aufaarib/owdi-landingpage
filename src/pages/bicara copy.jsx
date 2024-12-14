import { IconMicrophone, IconX } from "@tabler/icons-react";
import { useRouter } from "next/router";

const Bicara = () => {
    const router = useRouter();
    router.push("/");

    return (
        <div className="relative  mb-[40px] ">
            <div className="relative mt-4 flex items-center h-[45px] bg-white rounded-t-xl">
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

            <div className=" flex justify-center items-center bg-white ">
                <div className="w-full h-[700px]">
                    <iframe
                        src="https://avatara-star-livestream.vercel.app/embed?aspect-ratio=9:16"
                        allow="microphone"
                        title="Embedded content"
                        allowFullScreen
                        style={{ width: "100%", height: "100%" }}
                        className="rounded-xl"

                    >

                    </iframe>


                    {/* <img src="/img/Models2.png" className="object-cover" alt="icon" /> */}
                </div>
            </div>
            <div className="w-full bg-white flex flex-col justify-center p-4 rounded-b-xl">
                {/* <button className="flex justify-center items-center bg-gradient-to-t from-[#EF2328] to-[#FB942B] text-white py-2 px-16 rounded-full"><p>Bicara</p>
                    <IconMicrophone />
                </button> */}
                <p className="text-center text-xs text-[#718290]">Microfon sudah siap dipakai</p>
            </div>

        </div>
    );
};

export default Bicara;
