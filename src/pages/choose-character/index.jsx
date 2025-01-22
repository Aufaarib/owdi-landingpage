import NotEnoughCoinModal from "@/components/Modal/NotEnoughCoinModal";
import StartChatModal from "@/components/Modal/StartChatModal";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ChooseCharacter() {
  const { openNotEnoughCoinModal } = NotEnoughCoinModal();
  const [stars, setStars] = useState([]);
  const [currentCharacterIndex, setCurrentCharacterIndex] = useState(0);
  const [unSelectedChars, setUnSelectedChars] = useState([]);
  const { openStartChatModal, setUid } = StartChatModal();

  useEffect(() => {
    setUid(stars[currentCharacterIndex]?.uid);
  }, [currentCharacterIndex, stars]);

  // fetch all avatara characters
  useEffect(() => {
    const fetchStars = async () => {
      const response = await fetch("/api/avatara-apis/get-characters");
      const data = await response.json();

      setStars(data);
    };

    fetchStars();
  }, []);

  useEffect(() => {
    // Push the 0th index of stars into displayedChars
    if (stars.length > 0 && unSelectedChars.length == 0) {
      setUnSelectedChars((prevChars) => [...prevChars, stars[1]]);
    }
  }, [stars]);

  // Handle "next" button click
  const nextCharacter = () => {
    const newCharIndex = currentCharacterIndex + 1;
    setCurrentCharacterIndex(newCharIndex);
    setUnSelectedChars([stars[currentCharacterIndex], stars[newCharIndex + 1]]);
  };

  // Handle "previous" button click
  const prevCharacter = () => {
    const newCharIndex = currentCharacterIndex - 1;
    setCurrentCharacterIndex(newCharIndex);
    setUnSelectedChars([stars[currentCharacterIndex], stars[newCharIndex - 1]]);
  };

  // Get the current character
  const currentCharacter = stars[currentCharacterIndex];

  const onStartSession = () => {
    const coinLeft = parseInt(localStorage.getItem("remainingCoin"));

    if (coinLeft > 0) {
      openStartChatModal();
    } else {
      openNotEnoughCoinModal();
    }
  };

  // console.log("starss", stars);
  // console.log("backgroundChars", displayedChars);

  return (
    <div className="w-full flex flex-col items-center pt-8">
      <div className="h-[70%] w-full flex flex-col justify-between">
        <div className="flex flex-col items-center gap-4">
          <p className="text-white text-[16px] font-semibold">
            Pilih Karakter Teman Digital
          </p>
          <div
            style={{
              background: "var(--background-bg-transparent, #F9FAFBB2)",
              backdropFilter: "blur(5px)",
            }}
            className="flex flex-row p-2 rounded-[16px] h-[32px] w-[123px] items-center justify-center gap-3"
          >
            <button
              disabled={currentCharacterIndex + 1 == 1}
              onClick={prevCharacter}
              className="disabled:opacity-25"
            >
              <IconChevronLeft />
            </button>
            <p className="text-[14px] font-bold">
              {currentCharacterIndex + 1} / {stars.length}
            </p>
            <button
              disabled={currentCharacterIndex + 1 == stars.length}
              onClick={nextCharacter}
              className={`disabled:opacity-25`}
            >
              <IconChevronRight />
            </button>
          </div>
        </div>

        <div className="relative mt-[500px] z-[-999] mb-24 w-full md:w-[380px]">
          {/*  */}
          {/* Unselected Chars */}
          <div
            className={`flex flex-row w-full ${
              currentCharacterIndex + 1 == stars.length
                ? "justify-start"
                : "justify-end"
            } left-0 absolute bottom-0 right-0 pb-40 overflow-auto`}
          >
            {unSelectedChars
              .filter((val) => val?.name !== undefined)
              ?.map((val, index) => (
                <Image
                  key={index}
                  // src={"/img/unselected_rico.png"}
                  src={val?.banner_pic || ""}
                  alt="logo"
                  className="w-[260px] object-cover z-[-999]"
                  quality={100}
                  width={100}
                  height={100}
                />
              ))}
          </div>
          {/*  */}
          {/* Selected Char */}
          <div className="flex sm:block absolute bottom-0  pb-20 justify-center items-center w-full">
            <Image
              // src={"/img/Amanda.png"}
              src={currentCharacter?.banner_pic || ""}
              alt="logo"
              className=" object-cover z-[-999] w-[300px] h-w-[300px] "
              quality={100}
              width={100}
              height={100}
            />
          </div>

          <div className="bg-white p-3 mx-3 rounded-2xl">
            <div className="flex flex-row gap-1 items-start justify-start">
              <p>
                <strong>{currentCharacter?.name},</strong> 25 tahun, dengan
                tatapan lembut, senyuman manis, dan kehadirannya yang
                menenangkan.
              </p>
            </div>
          </div>
        </div>

        {/* <div className="flex items-center justify-center">
          <div className="mx-4 text-center">
            <Image
              src={currentCharacter?.profile_pic}
              alt={currentCharacter?.name}
              className="w-32 h-32 object-cover mx-auto mb-4 rounded-full"
              quality={100}
              width={100}
              height={100}
            />
          </div>
        </div>
         */}
      </div>

      <div className="bg-white flex items-center justify-center w-full absolute  bottom-0 p-5 rounded-tl-[16px] rounded-tr-[16px] h-[72px]">
        <button
          onClick={() => onStartSession()}
          style={{
            background: "linear-gradient(45deg, #EF2328 0%, #FB942B 100%)",
          }}
          className="w-full  flex flex-row items-center gap-2 h-[40px] justify-between px-6 pl-20 text-white font-semibold rounded-full"
        >
          <p>Mulai Sesi Ngobrol</p>
          <div className="flex flex-row items-center gap-2">
            <Image
              src={"/icons/icon-coin.png"}
              alt="logo"
              className="object-cover sm:block"
              width={20}
              height={20}
            />
            <p className="font-semibold text-[18px] mb-0.5">1 Koin</p>
          </div>
        </button>
      </div>
    </div>
  );
}
