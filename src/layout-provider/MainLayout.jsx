import MainFooter from "@/components/shared/MainFooter";
import MainHeader from "@/components/shared/MainHeader";
import MainSidebar from "@/components/shared/MainSidebar"; // Pastikan Sidebar sudah ada di komponen ini
import Image from "next/image";
import React, { useState } from "react";

const MainLayout = ({ children }) => {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <div className="relative bg-gradient-to-r from-[#EF2328] to-[#FB942B] flex flex-col min-h-screen justify-between max-w-screen m-auto">
      {/* Gambar latar belakang */}
      <Image
        className="h-full absolute md:right-0 md:w-1/2 object-cover"
        width={400}
        height={400}
        src="/img/image 1.png"
        alt="Background Motive"
      />

      {/* Sidebar */}
      <MainSidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />

      <div
        className={`${openSidebar && "opacity-50 hidden"}`}
        style={{
          zIndex: 9,
          // display: "flex",
          // flexDirection: "column",
        }}
      >
        {/* Header */}
        <MainHeader openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />

        {/* Konten utama */}
        <div className="flex-1">{children}</div>
        <MainFooter />
      </div>
    </div>
  );
};

export default MainLayout;
