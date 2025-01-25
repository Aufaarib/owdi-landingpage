import { useEffect, useState } from "react";
import Link from "next/link";
import { IconArticle, IconChevronRight, IconPlus } from "@tabler/icons-react";
import Image from "next/image";
import PaymentConfirmModal from "../Modal/PaymentConfirmModal";
import { useRouter } from "next/router";
import formatRupiah from "@/utils/formatRupiah";
import axios from "axios";
import Cookies from "js-cookie";
import LogoutModal from "../Modal/LogoutConfirmModal";
import StartChatModal from "../Modal/StartChatModal";
import NotEnoughCoinModal from "../Modal/NotEnoughCoinModal";
import PeymentMethodModal from "../Modal/PeymentMethodModal";
import FormProfileUpdateModal from "../Modal/FormProfileUpdateModal";
import TopUpMDL from "../Modal/TopUpMDL";
import { useCoin } from "@/context/CoinContext";

const MainSidebar = ({ openSidebar, setOpenSidebar }) => {
  const { coin } = useCoin();
  const router = useRouter();
  const { openFormPeymentMethod } = PeymentMethodModal();
  const { openTopUpMDL } = TopUpMDL();
  const { openPaymentConfirmModal } = PaymentConfirmModal();
  const [remainingCoin, setRemainingCoin] = useState(0);
  const [sessionData, setSessionData] = useState([]);
  const [subscriptionData, setSubscriptionData] = useState([]);
  const { openLogoutModal } = LogoutModal();
  const { openStartChatModal } = StartChatModal();
  const { openNotEnoughCoinModal } = NotEnoughCoinModal();
  const { FormProfileUpdateMDL } = FormProfileUpdateModal();
  const coinLeft = coin.coin_amount;
  const token = Cookies.get("access_token");


  useEffect(() => {
    axios
      .get("/api/session") // Mengakses endpoint API
      .then((response) => {
        setSessionData(response.data); // Menyimpan data ke dalam state
      })
      .catch((error) => {
        console.error("Error fetching session data:", error); // Menangani error
      });
  }, []);

  useEffect(() => {
    const fetchSubscription = async () => {
      if (token) {
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}api/v1/pricing/all`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setSubscriptionData(response.data.body);
        } catch (error) {
          console.error("Error fetching subscription data:", error);
        }
      }
    }

    fetchSubscription();

  }, []);



  useEffect(() => {
    // Sinkronisasi data setiap 1 detik
    const interval = setInterval(() => {
      // setRemainingCoin(localStorage.getItem("remainingCoin"));
      setRemainingCoin(coin.coin_amount);
    }, 1000);

    return () => clearInterval(interval);
  }, [remainingCoin]);

  const selectedProduct = (id) => {
    openFormPeymentMethod(id)
  };
  // router.push(`/metode-pembayaran?id=${id}`);
  // setOpenSidebar(false);

  const onStartSession = () => {
    if (coinLeft > 0) {
      openStartChatModal();
    } else {
      openNotEnoughCoinModal();
    }
  };

  return (
    <div
      className={`flex flex-col justify-between h-screen bg-[#f2e8e5] w-[85%] z-10 backdrop-blur-2xl ${openSidebar ? "block" : "hidden"
        }`}
    >
      <div className="h-screen flex justify-between flex-col">
        {/* Header Section */}
        <div className="flex gap-4 flex-col">
          <div className="bg-[#ebdcd3]">
            <div className="flex pt-8 py-6 items-center h-[32px] w-full justify-between">
              <div className="flex flex-row">
                <Image
                  src="/icons/menuSidebar.png"
                  onClick={() => setOpenSidebar(!openSidebar)}
                  alt="Menu"
                  className="w-6 h-6 ml-5 cursor-pointer"
                  width={24}
                  height={24}
                />
                <Image
                  src="/icons/logoSidebar.png"
                  alt="Logo"
                  className="w-[90px] h-6 ml-[12px] object-cover"
                  width={200}
                  height={200}
                />
              </div>
              <button
                onClick={openTopUpMDL}
                style={{
                  background:
                    "linear-gradient(270deg, rgba(0, 26, 65, 0.75) 26.26%, #EADAD3 99.74%)",
                }}
                className="flex justify-between w-[50%] items-center text-white font-bold text-[14px] px-1 pl-4 py-1"
              >
                <div className="flex flex-row items-center gap-2">
                  <Image
                    src={"/icons/icon-coin.png"}
                    alt="logo"
                    className="object-cover sm:block"
                    width={30}
                    height={30}
                  />
                  <p className="font-semibold text-[18px] mb-0.5">
                    {`${remainingCoin || 0} Koin`}
                  </p>
                </div>
                <IconPlus size={24} />
              </button>
            </div>

            <div className="flex flex-col px-4">
              <p className="font-semibold text-xs mt-4">
                Own Digital Companion
              </p>
              <p className="text-xs">
                Your digital friend who is always ready to help you with your
                daily activities, making life simpler and more fun!
              </p>
              <button
                onClick={() => {
                  // setOpenSidebar(false);
                  // router.push("/bicara");
                  onStartSession();
                }}
                className="relative flex justify-between items-center gap-2 my-4 bg-gradient-to-r from-[#EF2328] to-[#FB942B] px-8 py-[5px] rounded-2xl text-white"
              >
                <div className="flex flex-col gap-1">
                  <p>Mulai Sesi Obrolan</p>
                  <div className="flex flex-row items-center gap-2">
                    <Image
                      src={"/icons/icon-coin.png"}
                      alt="logo"
                      className="object-cover sm:block"
                      width={25}
                      height={25}
                    />
                    <p className="font-normal text-[18px] mb-0.5">1 Koin</p>
                  </div>
                </div>
                <Image
                  src="/img/Union.png"
                  alt="Union"
                  width={58}
                  height={48}
                  className="absolute right-5 w-[57px] h-[48px]"
                />
              </button>
            </div>
          </div>

          {/* Session Data Section */}
          <div className="flex h-[58vh] flex-col px-4">
            <p className="font-semibold text-md">Top Up Koin</p>
            <div className="h-full overflow-y-auto no-scrollbar mt-2">
              {subscriptionData.map((subscription) => (
                <button
                  onClick={() => selectedProduct(subscription.plan_code)} // Kirim subscriptin.id
                  key={subscription.id} // Gunakan subscriptin.id sebagai key
                  className="inset-0 w-full rounded-xl bg-gradient-to-r from-[#EF2328] to-[#FB942B] p-[1px] my-2"
                >
                  <div className="relative flex items-center bg-[#f2dbd5] rounded-xl h-full px-4 py-5">
                    {/* Rata Kiri */}
                    <div className="w-[120px] text-xs font-semibold text-left">
                      <p>{subscription?.coin} koin</p>
                      {subscription.discount > 0 && (
                        <div
                          className={`absolute top-0 text-[10px] text-white bg-gradient-to-r from-[#EF2328] to-[#FB942B] px-2 py-1 rounded-b-xl`}
                        >
                          <p>Promo</p>
                        </div>
                      )}
                    </div>

                    {/* Rata Tengah */}
                    <div className="flex justify-center items-center flex-1">
                      {subscription?.discount > 0 && (
                        <div className="bg-[url('/icons/discount.png')] bg-no-repeat bg-center w-6 h-6 flex justify-center items-center">
                          <p className="text-[8px] text-white font-semibold ">{subscription?.discount}%</p>
                        </div>
                      )}
                      <div className="text-center">
                        <p className="m-0 text-xs">
                          {formatRupiah(subscription?.special_price)}
                        </p>
                        {subscription?.discount > 0 && (
                          <span className="text-[10px] line-through text-[#9CA9B9]">
                            {formatRupiah(subscription?.price)}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Rata Kanan */}
                    <IconChevronRight size={24} className="ml-auto" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute w-full bottom-0">
          <div className="p-5 bg-[#e8d6d2] flex flex-row justify-between text-[12px] items-center border-y-[2px] border-white">
            <div className="flex flex-row gap-3 items-center">
              <Image
                src="/icons/default-profile.png"
                onClick={() => setOpenSidebar(!openSidebar)}
                alt="profile"
                className="w-9 h-9 cursor-pointer"
                width={100}
                height={100}
              />
              <div className="flex flex-col">
                <p className="text-black text-[15px]">Mawardi</p>
                <p className="text-black text-[15px]">081234567890</p>
              </div>
            </div>

            <div className="flex flex-row gap-7">
              <svg
                onClick={() => FormProfileUpdateMDL()}
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10.7469 4.8996L9.76586 6.56534C9.67169 6.72524 9.53039 6.85213 9.36131 6.92862C9.08437 7.0539 8.82762 7.19307 8.58512 7.35162C8.43461 7.45003 8.25807 7.50109 8.07826 7.49822L6.04068 7.46574C5.52964 8.05344 5.12599 8.71938 4.83859 9.42097L5.85616 11.0249C5.96176 11.1913 6.00979 11.3878 5.99288 11.5842C5.96947 11.8562 5.97039 12.1301 5.99365 12.4136C6.00963 12.6084 5.96179 12.8031 5.85736 12.9682L4.83654 14.5827C5.12851 15.2967 5.53655 15.9533 6.04217 16.5358L8.08889 16.5019C8.2659 16.499 8.43984 16.5483 8.58895 16.6438C8.84074 16.8049 9.10359 16.9485 9.37781 17.0745C9.54539 17.1515 9.68526 17.2781 9.7785 17.4372L10.7567 19.1065C11.5879 19.2364 12.4289 19.2278 13.2531 19.1004L14.2341 17.4347C14.3283 17.2748 14.4696 17.1479 14.6387 17.0714C14.9156 16.9461 15.1724 16.8069 15.4149 16.6484C15.5654 16.55 15.7419 16.4989 15.9217 16.5018L17.9593 16.5343C18.4704 15.9466 18.874 15.2806 19.1614 14.579L18.1438 12.9751C18.0382 12.8087 17.9902 12.6121 18.0071 12.4158C18.0305 12.1438 18.0296 11.8699 18.0063 11.5864C17.9904 11.3916 18.0382 11.1969 18.1426 11.0318L19.1635 9.41735C18.8715 8.70334 18.4635 8.04667 17.9578 7.4642L15.9111 7.49809C15.7341 7.50102 15.5602 7.45168 15.4111 7.35625C15.1593 7.19509 14.8964 7.05153 14.6222 6.92551C14.4546 6.8485 14.3147 6.72187 14.2215 6.56276L13.2433 4.89353C12.4121 4.76361 11.5711 4.77222 10.7469 4.8996ZM6.11902 7.37704C6.11799 7.37822 6.11695 7.3794 6.11591 7.38055L6.11902 7.37704ZM10.3501 3.14027C11.4258 2.96109 12.5423 2.94666 13.6557 3.13711L13.664 3.13854C14.0789 3.21354 14.5013 3.45768 14.7427 3.89197L15.6357 5.41585C15.8086 5.50272 15.9782 5.59544 16.1442 5.69398L18.0225 5.66288L18.0412 5.66277C18.4649 5.66455 18.9047 5.82902 19.2227 6.17723L19.2291 6.18427C19.9433 6.9831 20.5132 7.90397 20.9015 8.91781C21.0708 9.35565 21.0212 9.86237 20.7577 10.2641L19.8191 11.7485C19.8256 11.9175 19.826 12.0867 19.8197 12.2567L20.7695 13.7537C21.0031 14.1325 21.0793 14.6205 20.8967 15.0862C20.5193 16.0659 19.9614 16.998 19.2336 17.8106C18.9139 18.1741 18.4653 18.3375 18.0404 18.3357L18.0299 18.3357L16.1588 18.3058C15.9908 18.4062 15.8197 18.4993 15.645 18.586L14.7435 20.1168L14.7362 20.129C14.5019 20.5128 14.1106 20.7821 13.6515 20.8594L13.6499 20.8597C12.5742 21.0389 11.4577 21.0533 10.3443 20.8629L10.336 20.8615C9.92108 20.7865 9.49865 20.5423 9.25727 20.108L8.36429 18.5841C8.19135 18.4973 8.02183 18.4046 7.85577 18.306L5.97745 18.3371L5.95878 18.3372C5.53509 18.3355 5.09532 18.171 4.7773 17.8228L4.77088 17.8157C4.05662 17.0168 3.48666 16.0959 3.09839 15.0819C2.92922 14.6441 2.97885 14.1375 3.24228 13.7359L4.18092 12.2515C4.17436 12.0825 4.17395 11.9133 4.18025 11.7433L3.23049 10.2463C2.99697 9.8676 2.92072 9.37963 3.10323 8.91406C3.48057 7.93426 4.0386 7.00201 4.76651 6.1893C5.08618 5.82584 5.53475 5.6625 5.95956 5.66428L5.97014 5.66433L7.84124 5.69422C8.00918 5.59377 8.18032 5.50069 8.35497 5.41397L9.25648 3.88323L9.2638 3.87102C9.49809 3.48721 9.88942 3.21791 10.3485 3.14056L10.3501 3.14027Z"
                  fill="#001A41"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 9.6C10.6745 9.6 9.6 10.6745 9.6 12C9.6 13.3255 10.6745 14.4 12 14.4C13.3255 14.4 14.4 13.3255 14.4 12C14.4 10.6745 13.3255 9.6 12 9.6ZM8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12Z"
                  fill="#001A41"
                />
              </svg>

              <p className="cursor-pointer" onClick={openLogoutModal}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.75473 12.0002C9.75473 11.3789 10.2584 10.8752 10.8797 10.8752L17.625 10.8752L15.0455 8.29547C14.6061 7.85612 14.6062 7.14381 15.0455 6.70448C15.4849 6.26515 16.1972 6.26517 16.6365 6.70453L20.341 10.4093C21.2197 11.288 21.2197 12.7126 20.341 13.5912L16.6365 17.2957C16.1971 17.735 15.4848 17.735 15.0455 17.2957C14.6061 16.8563 14.6062 16.144 15.0455 15.7047L17.625 13.1252H10.8797C10.2584 13.1252 9.75473 12.6215 9.75473 12.0002Z"
                    fill="#181C21"
                  />
                  <path
                    d="M12 4.125C12 4.74632 11.4963 5.25 10.875 5.25L6.375 5.25C5.75368 5.25 5.25 5.75368 5.25 6.375L5.25 17.5C4.63872 17.3306 4.01866 17.0393 3.48386 16.665C3.30337 16.5386 3.14229 16.4101 3 16.2814V6.375C3 4.51104 4.51104 3 6.375 3H10.875C11.4963 3 12 3.50368 12 4.125Z"
                    fill="#181C21"
                  />
                  <path
                    d="M3.00252 17.7567C3.07171 19.5596 4.55515 21 6.375 21H10.875C11.4963 21 12 20.4963 12 19.875C12 19.2537 11.4963 18.75 10.875 18.75H6.375L6.37136 18.75C5.22995 18.7492 4.01579 18.353 3.00252 17.7567Z"
                    fill="#181C21"
                  />
                </svg>
              </p>
            </div>
          </div>

          <div className="p-5 bg-[#e8d6d2] flex flex-row gap-1 text-[12px]">
            <p className="text-black font-bold">Copyright © 2024 OWDI.</p>
            <p>All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainSidebar;
