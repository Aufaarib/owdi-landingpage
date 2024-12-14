import LoginModal from "@/components/Modal/LoginModal";
import { IconVolume } from "@tabler/icons-react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const HomePage = () => {
  const router = useRouter();
  const menuItems = [
    {
      label: "Semua Topik",
      icon: null,
      bgColor: "bg-[#001A41]",
      textColor: "text-white",
    },
    {
      label: "Film",
      icon: "/icons/video.png",
      bgColor: "bg-white",
      textColor: "text-black",
    },
    {
      label: "Horor",
      icon: "/icons/ghost.png",
      bgColor: "bg-white",
      textColor: "text-black",
    },
    {
      label: "Cerita Anak",
      icon: "/icons/book.png",
      bgColor: "bg-white",
      textColor: "text-black",
    },
  ];
  const [username, setUsername] = useState("");
  const { openLoginModal } = LoginModal();

  const handleSession = async () => {
    // Tunggu modal login selesai
    if (!username) {
      await openLoginModal();
      getUsername();
    } else {
      router.push("/bicara");
    }
  };

  const getUsername = () => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  };
  useEffect(() => {
    getUsername();

    const interval = setInterval(() => {
      if (!username) {
        getUsername();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [username]);

  return (
    <div className="relative">
      {/* Icon at the top right corner */}
      <IconVolume className="absolute top-4 right-4 text-white" size={24} />

      <div className="flex justify-center items-start relative mt-10">
        {/* First Image */}
        <div className="absolute mt-10">
          <Image
            className="w-72"
            src="/img/Talk (1).png"
            alt="Talk"
            width={288}
            height={192}
            layout="intrinsic"
          />
        </div>

        {/* Second Image */}
        <div className="mr-5 mt-36">
          <Image
            className="w-80"
            src="/img/Models.png"
            alt="Models"
            width={330}
            height={220}
            layout="intrinsic"
          />
        </div>
      </div>
      <div
        style={{
          width: "100%",
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "1rem",
          borderTopLeftRadius: "8px",
          borderTopRightRadius: "8px",
        }}
      >
        <button
          onClick={handleSession}
          style={{
            backgroundImage: "url('/img/union.png')",
            background: "linear-gradient(to right, #EF2328, #FB942B)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            color: "white",
            fontWeight: "bold",
            fontSize: "14px",
            borderRadius: "9999px",
            width: "328px",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "none",
            outline: "none",
            cursor: "pointer",
            position: "relative",
            overflow: "hidden",
          }}
        >
          Mulai Sesi Ngobrol
          <img
            src="/img/union.png"
            alt=""
            style={{
              position: "absolute",
              width: "58px",
              height: "46px",
              right: "10px",
            }}
          />
        </button>
      </div>

      <div className="w-full bg-[#FFFFFFBF] p-4">
        <p className="text-[14px] text-[#001A41]">
          Mau Owdi ceritakan rekomendasi topik?
        </p>

        {/* Buttons Menu */}
        <div className="text-[12px] mt-3 flex space-x-2 overflow-x-auto no-scrollbar">
          {menuItems.map((item, index) => (
            <button
              key={index}
              className={`${item.bgColor} ${item.textColor} px-4 py-2 rounded-full flex items-center space-x-2 flex-shrink-0`}
            >
              {item.icon && <img src={item.icon} alt="" className="w-4 h-4" />}
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        <div className="text-[12px] mt-3 flex space-x-3 overflow-x-auto no-scrollbar">
          {/* Card Item */}
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className="w-[166px] bg-white shadow-md rounded-lg flex-shrink-0 overflow-hidden border border-gray-200"
            >
              {/* Image Section */}
              <div className="relative w-full h-[93px]">
                <img
                  src="/img/film/banner1.png"
                  className="w-full h-full object-cover"
                  alt="Film Banner"
                />
                <div className="absolute bottom-2 left-2 py-[2px] px-[8px] bg-gray-500 text-white text-[10px] flex items-center rounded-full">
                  <img
                    src="/icons/video.png"
                    alt="Video Icon"
                    className="w-3 h-3 mr-1"
                  />
                  <span>Film</span>
                </div>
              </div>

              {/* Description Section */}
              <div className="p-2">
                <p className="text-[12px] text-[#001A41] line-clamp-3 overflow-hidden text-ellipsis">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Saepe labore distinctio voluptates voluptatum eos veniam
                  autem, modi impedit deleniti quae repellendus omnis, libero
                  excepturi, reiciendis totam nihil magni facilis cum?
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
