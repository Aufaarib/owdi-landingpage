import NotEnoughCoinModal from "@/components/Modal/NotEnoughCoinModal";
import StartChatModal from "@/components/Modal/StartChatModal";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import Image from "next/image";

export default function ChooseCharacter() {
  const { openStartChatModal } = StartChatModal();
  const { openNotEnoughCoinModal } = NotEnoughCoinModal();
  const coinLeft = 1;

  const onStartSession = () => {
    if (coinLeft > 0) {
      openStartChatModal();
    } else {
      openNotEnoughCoinModal();
    }
  };

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
            <IconChevronLeft />
            <p className="text-[14px] font-bold">1 / 2</p>
            <IconChevronRight />
          </div>
        </div>

        <div className="relative mt-[500px] z-[-999] mb-24 w-full md:w-[380px]">
          <Image
            src={"/img/unselected_rico.png"}
            alt="logo"
            className="w-[260px] h-w-[260px] object-cover sm:block absolute bottom-0 right-0 z-[-999] pb-40"
            quality={100}
            width={100}
            height={100}
          />

          <Image
            src={"/img/Amanda.png"}
            alt="logo"
            className="w-[300px] h-w-[300px] object-cover sm:block absolute bottom-0 z-[-999] pb-20"
            quality={100}
            width={100}
            height={100}
          />

          <div className="bg-white p-3 mx-3 rounded-2xl">
            <div className="flex flex-row gap-1 items-start justify-start">
              <p>
                <strong>Amanda,</strong> 25 tahun, dengan tatapan lembut,
                senyuman manis, dan kehadirannya yang menenangkan.
              </p>
            </div>
          </div>
        </div>
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
