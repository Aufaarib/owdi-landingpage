
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import formatRupiah from "@/utils/formatRupiah";
import { useEffect, useState } from "react";
import axios from "axios";
import PeymentMethodModal from "./PeymentMethodModal";

const MySwal = withReactContent(Swal);

const TopUp = () => {
    const [subscription, setSubscription] = useState([]); // Untuk menyimpan data dari API
    const [selectSubscription, setSelectSubscription] = useState(null); // Untuk menyimpan pilihan user
    const { openFormPeymentMethod } = PeymentMethodModal();

    useEffect(() => {
        const fetchSubscription = async () => {
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_BASE_URL}api/v1/subscription/all`
                );
                setSubscription(response.data.body); // Simpan data dari API ke state
            } catch (error) {
                console.error("Error fetching subscription data:", error.message);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Gagal memuat data top-up. Silakan coba lagi nanti.",
                });
            }
        };

        fetchSubscription();
    }, []);

    const handleSubmit = () => {

        openFormPeymentMethod(selectSubscription.plan_code)

        // Logic untuk mengirim data ke backend (jika diperlukan)
        console.log("Selected Subscription:", selectSubscription);
    };

    return (
        <div class="w-full bg-white rounded-lg rounded-br-none z-50 h-full flex flex-col gap-5">
            <div class="grid grid-cols-2 items-center  w-full">
                <img src="/img/TopUpModel.png" class="w-[200px]" alt="logo" />
                <h2 class="text-3xl font-normal max-w-32 text-left">Top Up Koin</h2>
            </div>
            <div className="grid grid-cols-2 gap-2 items-center w-full">
                {subscription.map((item) => (

                    <div key={item.id}>
                        <input type="radio" name="index" id={`subscription-${item.id}`} value={item.plan_code} onChange={() => setSelectSubscription(item)} className="hidden peer" />
                        <label htmlFor={`subscription-${item.id}`} className="flex flex-col p-4 w-[156px] h-[102px] bg-gradient-to-r from-[#EF232813] to-[#FB942B13] text-left rounded-lg border-2 peer-checked:border-[#EF232840] border-[#FB942B40]">
                            <p className="font-semibold text-sm mb-2">{item.plan_name}</p>
                            <div className="flex flex-row items-center gap-2">
                                {item?.discount > 0 && (
                                    <div className="bg-[url('/icons/discount.png')] bg-no-repeat bg-center w-6 h-6 flex justify-center items-center">
                                        <p className="text-[8px] text-white font-semibold ">1%</p>
                                    </div>
                                )}

                                <div className="">

                                    <p className="font-semibold text-[18px]">
                                        {formatRupiah(item.special_price)}
                                    </p>
                                    {item?.discount > 0 && (
                                        <span className="text-[15px] line-through text-[#9CA9B9]">
                                            {formatRupiah(item.price)}
                                        </span>
                                    )}
                                </div>
                            </div>

                        </label>
                    </div>
                ))}

            </div>
            <button
                onClick={handleSubmit}
                disabled={!selectSubscription}

                className={`w-full ${!selectSubscription ? "bg-[#D1D3DB] text-[#97A6B1]" : "bg-gradient-to-t from-[#EF2328] to-[#FB942B] text-white"}  py-2 rounded-lg hover:opacity-90 focus:outline-none`}
            >
                Beli
            </button>

        </div>
    );
};

const TopUpMDL = () => {
    const openTopUpMDL = () => {
        MySwal.fire({
            html: <TopUp />,
            showConfirmButton: false,
            allowOutsideClick: false,
            customClass: {
                popup: "bg-white  h-auto rounded-[20px] shadow-lg p-2",
            }
        })
    }

    return { openTopUpMDL };
}

export default TopUpMDL;


