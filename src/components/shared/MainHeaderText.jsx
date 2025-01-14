import { IconArrowLeft } from "@tabler/icons-react";
import { useRouter } from "next/router";

const MainHeaderText = ({ openSidebar, setOpenSidebar }) => {
    const router = useRouter();
    return (
        <div className="p-4 md:px-14 grid grid-cols-3 items-center bg-[#EFF1F4]">
            <div className="text-left">
                <IconArrowLeft onClick={() => router.back()} />
            </div>

            <div className="text-center text-sm whitespace-nowrap">
                Metode Pembayaran
            </div>

            {/* <div className="text-right">
                kanan
            </div> */}
        </div>
    );
};

export default MainHeaderText;
