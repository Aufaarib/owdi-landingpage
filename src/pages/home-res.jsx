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
    <div className="relative flex flex-col md:flex-row justify-center">
      <IconVolume className="absolute top-4 right-4 text-white" size={24} />
      <div className="w-full mt-10 md:hidden flex justify-center ">
        <Image
          className="object-cover"
          src="/img/Talk (1).png"
          alt="Talk"
          width={288}
          height={192}
          layout="intrinsic"
        />
      </div>

      <div className="flex flex-col w-full md:h-[550px] justify-end items-center  mt-10 md:w-[550px]  rounded-b-xl bg-blue-500">
        {/* Image hidden on desktop */}
        <Image
          className="w-80"
          src="/img/Models.png"
          alt="Models"
          width={330}
          height={220}
          layout="intrinsic"
        />
        <div className="flex flex-col justify-center items-center w-full bg-white p-4 md:rounded-xl rounded-t-xl">
          <button
            onClick={handleSession}
            className="relative flex items-center justify-center w-full h-[56px] text-white font-bold text-[14px] rounded-full overflow-hidden cursor-pointer"
            style={{
              backgroundImage: "url('/img/union.png'), linear-gradient(to right, #EF2328, #FB942B)",
              backgroundSize: "50px, cover",
              backgroundPosition: "right 10% center",
              backgroundRepeat: "no-repeat",
            }}
          >
            Mulai Sesi Ngobrol
          </button>
        </div>
      </div>

      <div className="relative bg-[#FFFFFFBF] p-4 h-[550px] md:mx-5 md:w-[408px] md:mt-10 md:rounded-xl md:order-first">
        <p className="text-[14px] text-[#001A41]">Mau Owdi ceritakan rekomendasi topik?</p>

        {/* Menu Buttons */}
        <div className="text-[12px] my-3 flex space-x-2 overflow-auto no-scrollbar">
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

        {/* Content */}
        <div className="text-[12px] flex flex-col gap-2 h-[445px] w-full overflow-y-auto no-scrollbar px-2 md:px-0">
          {[...Array(10)].map((_, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row w-full md:h-[104px] bg-white rounded-xl"
            >
              {/* Thumbnail */}
              <div className="relative bg-red-600 w-full h-[93px] md:w-[160px] md:h-full flex-shrink-0 rounded-t-xl md:rounded-l-xl md:rounded-tr-none">
                <Image
                  src="/img/film/banner1.png"
                  className="w-full h-full object-cover rounded-t-xl md:rounded-l-xl md:rounded-tr-none"
                  width={100}
                  height={100}
                  alt="Film Banner"
                />
                <div className="absolute bottom-2 left-2 py-[2px] px-[8px] bg-gray-500 text-white text-[10px] flex items-center rounded-full">
                  <img src="/icons/video.png" alt="Video Icon" className="w-3 h-3 mr-1" />
                  <span>Film</span>
                </div>
              </div>

              {/* Description */}
              <div className="p-4 md:p-2">
                <p className="text-sm text-gray-700 line-clamp-4">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est pariatur
                  necessitatibus saepe repellendus ut dolorem, neque natus libero recusandae
                  ullam, eligendi quidem esse a quam? Ullam doloribus libero eaque aliquam!
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
