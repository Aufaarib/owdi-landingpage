import FormProfileModal from "@/components/Modal/FormProfileModal";
import MainFooter from "@/components/shared/MainFooter";
import MainHeader from "@/components/shared/MainHeader";
import MainHeaderText from "@/components/shared/MainHeaderText";
import MainSidebar from "@/components/shared/MainSidebar"; // Pastikan Sidebar sudah ada di komponen ini
import Cookies from "js-cookie";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const MainLayout = ({ children }) => {
  const router = useRouter();
  const isMainHeaderTextRoute = router.route === "/metode-pembayaran" || router.route === "/profile";

  const [openSidebar, setOpenSidebar] = useState(false);
  const { openFormProfileModal, closeModal } = FormProfileModal();

  useEffect(() => {
    if (localStorage.getItem("nomor") && !localStorage.getItem("name")) {
      openFormProfileModal(localStorage.getItem("nomor"));
    } else {
      closeModal();
    }
  }, []);

  return (
    <div
      className={`relative ${isMainHeaderTextRoute ? "bg-white" : "bg-gradient-to-r from-[#EF2328] to-[#FB942B]"} flex flex-col min-h-screen justify-between max-w-screen m-auto`}
    >
      {/* Sidebar */}
      <MainSidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />

      <div
        className={`${openSidebar && "opacity-5 hidden"}`}
        style={{
          zIndex: 9,
          // display: "flex",
          // flexDirection: "column",
        }}
      >
        {/* Header */}
<<<<<<< HEAD
        {isMainHeaderTextRoute ? (
          <MainHeaderText />
        ) : (
          <MainHeader openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
        )}
=======
        {/* <MainHeaderText /> */}
        <MainHeader openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
>>>>>>> origin/develop

        {/* Konten utama */}
        <div className="flex-1">{children}</div>
        {/* {router.pathname == "/" && <MainFooter />} */}
      </div>
    </div>
  );
};

export default MainLayout;
