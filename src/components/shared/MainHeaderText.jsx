import { IconArrowLeft } from "@tabler/icons-react";

const MainHeaderText = ({ openSidebar, setOpenSidebar }) => {
    return (
        <div className="p-4 md:px-14 grid grid-cols-3 items-center">
            {/* Bagian Kiri */}
            <div className="text-left">
                <IconArrowLeft />
            </div>

            {/* Bagian Tengah */}
            <div className="text-center">
                tengah
            </div>

            {/* Bagian Kanan */}
            <div className="text-right">
                kanan
            </div>
        </div>
    );
};

export default MainHeaderText;
