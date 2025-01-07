import StartChatModal from "@/components/Modal/StartChatModal";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import Image from "next/image";

export default function ChooseCharacter() {
  const { openStartChatModal } = StartChatModal();
  return (
    <div className="w-full flex flex-col items-center justify-center pt-8">
      <p className="text-white text-[16px] font-semibold">
        Pilih Karakter Teman Digital
      </p>
      <br />
      <div
        style={{
          background: "var(--background-bg-transparent, #F9FAFBB2)",
          backdropFilter: "blur(5px)",
        }}
        className="flex flex-row p-2 rounded-[16px] h-[32px] w-[123px] items-center justify-center gap-3"
      >
        <IconChevronLeft />
        <p className="text-[14px] font-bold">1 / 2</p>
        <IconChevronRight />
      </div>
      <div className="bg-white flex items-center justify-center w-full absolute bottom-0 p-5 rounded-tl-[16px] rounded-tr-[16px] h-[72px]">
        <button
          onClick={openStartChatModal}
          style={{
            background: "linear-gradient(45deg, #EF2328 0%, #FB942B 100%)",
          }}
          className="w-full flex flex-row items-center gap-2 h-[40px] justify-between px-6 pl-20 text-white font-semibold rounded-full"
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
