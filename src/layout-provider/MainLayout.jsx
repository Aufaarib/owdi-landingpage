import MainHeader from "@/components/shared/MainHeader";
import MainSidebar from "@/components/shared/MainSidebar"; // Pastikan Sidebar sudah ada di komponen ini
import Image from "next/image";
import React, { useState } from "react";

const MainLayout = ({ children }) => {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <div className="relative bg-gradient-to-r from-[#EF2328] to-[#FB942B] flex flex-col min-h-screen justify-between">
      {/* Gambar latar belakang */}
      <Image
        style={{
          marginLeft: "60px",
          height: "100%",
          position: "absolute",
        }}
        width={400}
        height={400}
        src="/img/image 1.png"
        alt="Background Motive"
      />

      <div
        style={{
          zIndex: 9,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Sidebar */}
        <MainSidebar
          openSidebar={openSidebar}
          setOpenSidebar={setOpenSidebar}
        />

        {/* Header */}
        <MainHeader openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />

        {/* Konten utama */}
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
};

export default MainLayout;
