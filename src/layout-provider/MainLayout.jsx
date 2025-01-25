import FormProfileModal from "@/components/Modal/FormProfileModal";
import MainFooter from "@/components/shared/MainFooter";
import MainHeader from "@/components/shared/MainHeader";
import MainHeaderText from "@/components/shared/MainHeaderText";
import MainSidebar from "@/components/shared/MainSidebar"; // Pastikan Sidebar sudah ada di komponen ini
import Cookies from "js-cookie";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import axios from "axios";
import { useCoin } from "@/context/CoinContext";

// MainLayout.js
const MainLayout = ({ children }) => {
  const router = useRouter();
  const { coin, setCoin } = useCoin(); // Ambil setProfile dari ProfileContext
  const isMainHeaderTextRoute =
    router.route === "/metode-pembayaran" || router.route === "/profile";
  const [openSidebar, setOpenSidebar] = useState(false);
  const { openFormProfileModal, closeModal } = FormProfileModal();


  useEffect(() => {
    const getCoint = async () => {
      const token = Cookies.get("access_token");

      if (token) {
        try {
          const res = await axios.get(`/api/coin`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (res.status === 200) {

            setCoin(res.data.body);
          }
        } catch (err) {
          console.error("Error fetching profile:", err.message);

        }
      }
    };

    getCoint();
  }, [router]);
  console.log("coin", coin);


  useEffect(() => {
    if (localStorage.getItem("nomor") && !localStorage.getItem("name")) {
      openFormProfileModal(localStorage.getItem("nomor"));
    } else {
      closeModal();
    }
  }, []);

  return (
    <div
      className={`relative ${isMainHeaderTextRoute
        ? "bg-white"
        : "bg-gradient-to-r from-[#EF2328] to-[#FB942B]"
        } flex flex-col min-h-screen justify-between max-w-screen m-auto`}
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
        {isMainHeaderTextRoute ? (
          <MainHeaderText />
        ) : (
          <MainHeader
            openSidebar={openSidebar}
            setOpenSidebar={setOpenSidebar}
          />
        )}

        {/* Konten utama */}
        <div className="flex-1">{children}</div>
        {/* {router.pathname == "/" && <MainFooter />} */}
      </div>
    </div>
  );
};

export default MainLayout;
