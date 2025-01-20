import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";
import formatRupiah from "@/utils/formatRupiah";
import { IconArrowLeft } from "@tabler/icons-react";
import PaymentStatusModal from "./PaymentStatusModal";
import Cookies from "js-cookie";

const MySwal = withReactContent(Swal);

const PeymentMethod = ({ codeSubscription }) => {
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
    const [produk, setProduk] = useState(null);
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [produkLoading, setProdukLoading] = useState(true);
    const { openPaymentStatusModal } = PaymentStatusModal();
    const token = Cookies.get("access_token");
    const nomer = localStorage.getItem("nomor");


    useEffect(() => {
        const fetchPaymentMethods = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}api/v1/payment/fetch`);
                setPaymentMethods(response.data.body);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching payment methods:", error);
                setLoading(false);
            }
        };

        fetchPaymentMethods();
    }, []);

    useEffect(() => {
        const fetchProductData = async () => {
            if (codeSubscription) {
                try {
                    const response = await axios.get(
                        `${process.env.NEXT_PUBLIC_API_BASE_URL}api/v1/subscription/code/${codeSubscription}`
                    );
                    setProduk(response.data.body);
                    console.log("produk", response.data.body);

                } catch (error) {
                    console.error("Error fetching product:", error);
                } finally {
                    setProdukLoading(false);
                }
            } else {
                setProdukLoading(false);
            }
        };

        fetchProductData();
    }, [codeSubscription]);

    const groupByCategory = (paymentMethods) => {
        return paymentMethods.reduce((grouped, method) => {
            const { payment_type } = method;
            if (!grouped[payment_type]) {
                grouped[payment_type] = [];
            }
            grouped[payment_type].push(method);
            return grouped;
        }, {});
    };

    const handlePaymentMethodChange = (methodName) => {
        const paymentMethod = paymentMethods.find(
            (item) => item.payment_name.toLowerCase() === methodName.toLowerCase()
        );
        setSelectedPaymentMethod(paymentMethod);
    };

    const handleBayarClick = async () => {
        if (selectedPaymentMethod && produk) {
            const total = produk.special_price + (selectedPaymentMethod.admin_fee || 0);
            const dataPayment = {
                status: "success",
                produk,
                paymentMethod: selectedPaymentMethod,
                total,
            };
            // console.log('data payment', dataPayment);
            // return;

            try {
                const ressponse = await axios.post(
                    `${process.env.NEXT_PUBLIC_API_BASE_URL}api/v1/transaction/create`,
                    {
                        msisdn: nomer,
                        plan_code: produk.plan_code,
                        payment_method: selectedPaymentMethod.payment_type,
                        payment_code: selectedPaymentMethod.payment_code
                    }, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                }
                );
                if (ressponse.status === 200) {
                    Swal.close();
                    openPaymentStatusModal(dataPayment);
                    console.log("Data Payment:", dataPayment);
                }
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Terjadi kesalahan saat melakukan pembayaran.",
                })
            }


        } else {
            console.log("Belum memilih metode pembayaran atau produk belum dipilih");
        }
    };

    const handleCloseModal = () => {
        Swal.close();
        const status = "success";
        const message = "Pembayaran sebesar Rp150.000 berhasil dilakukan.";



    };

    if (loading || produkLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="relative flex flex-col items-center bg-[#EFF1F4] min-h-screen pb-[110px]">
            <div className="p-4 md:px-14 grid grid-cols-3 items-center bg-[#EFF1F4]">
                <div className="text-left">
                    <IconArrowLeft onClick={handleCloseModal} />
                </div>

                <div className="text-center text-sm whitespace-nowrap">
                    Metode Pembayaran
                </div>
            </div>
            {/* Product Section */}
            <div className="mt-4 h-[76px] w-[328px] rounded-md bg-gradient-to-r from-[#EF2328] to-[#FB942B] p-1">
                <div className="relative flex items-center px-4 h-full w-full bg-[#f0d3ce]">
                    {produk?.discount > 0 && (
                        <div className="absolute top-0 left-2 px-4 text-[12px] rounded-b-md bg-gradient-to-r from-[#EF2328] to-[#FB942B]">
                            promo
                        </div>
                    )}

                    <div className="flex justify-between items-center w-full">
                        <p className="text-sm font-semibold">{produk?.coin} coin</p>
                        <div className="flex items-center mr-[55px]">
                            {produk?.discount > 0 && (
                                <div className="w-[26px] rounded-md bg-[url('/icons/discount.png')] bg-no-repeat mr-2 text-center">
                                    <p className="text-[8px] text-white font-semibold">{produk?.discount}%</p>
                                </div>
                            )
                            }

                            <div>
                                <p className="font-semibold text-[#ED0226]">{formatRupiah(produk?.special_price)}</p>
                                {produk?.discount > 0 && <p className="line-through text-[#9CA9B9]">{formatRupiah(produk?.price)}</p>}

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Payment Methods */}
            <div className="bg-[#FFFFFF80] flex flex-col w-[328px] mt-4 rounded-lg px-4 border-2 border-[#DAE0E9]">
                {Object.entries(groupByCategory(paymentMethods)).map(([category, methods]) => (
                    <div key={category}>
                        <p className="my-2 font-semibold capitalize text-left">{category}</p>
                        {methods.map((method) => (
                            <div key={method.payment_name}>
                                <label
                                    htmlFor={method.payment_name}
                                    className="bg-white flex flex-row justify-between items-center w-full px-4 py-5 rounded-lg my-2"
                                >
                                    <div className="flex flex-row items-center">
                                        <img
                                            src={`${process.env.NEXT_PUBLIC_API_BASE_URL}api/v1/static/${method.payment_logo}`}
                                            alt={method.payment_name}
                                            className="w-8 h-8 object-contain mr-2"
                                        />
                                        <p>{method.payment_name}</p>
                                    </div>
                                    <input
                                        id={method.payment_name}
                                        type="radio"
                                        value={method.payment_name.toLowerCase()}
                                        name="paymentMethod"
                                        className="w-6 h-6 text-black focus:ring-black checked:bg-black checked:border-black"
                                        onChange={() => handlePaymentMethodChange(method.payment_name.toLowerCase())}
                                    />
                                </label>
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            {/* Footer */}
            <div className=" w-full absolute bottom-0 rounded-md bg-white pt-[10px] pb-[20px] px-4">
                <div className="grid grid-cols-2 items-center mb-4">
                    <div className="flex flex-row items-center">
                        {selectedPaymentMethod && selectedPaymentMethod.payment_logo && (
                            <img
                                src={`${process.env.NEXT_PUBLIC_API_BASE_URL}api/v1/static/${selectedPaymentMethod.payment_logo}`}
                                alt={selectedPaymentMethod.payment_name}
                                className="w-5 h-5 object-contain mr-2"
                            />
                        )}
                        <p className="font-semibold text-sm">{selectedPaymentMethod?.payment_name}</p>
                    </div>
                    <div className="flex flex-row items-end justify-end">
                        <p className="font-semibold text-sm">
                            {formatRupiah(produk?.special_price + (selectedPaymentMethod?.admin_fee || 0))}
                        </p>
                    </div>
                </div>
                <button
                    className="w-full flex h-[40px] justify-center items-center bg-gradient-to-t from-[#EF2328] to-[#FB942B] text-white rounded-[100px] outline-none"
                    onClick={handleBayarClick}
                >
                    Bayar
                </button>
            </div>
        </div>
    );
};

const PeymentMethodModal = () => {

    const openFormPeymentMethod = (codeSubscription) => {
        console.log("codeSubscription", codeSubscription);

        MySwal.fire({
            html: <PeymentMethod codeSubscription={codeSubscription} />,
            showConfirmButton: false,
            allowOutsideClick: false,
            customClass: {
                popup: "bg-[#EFF1F4] w-[328px] h-auto rounded-[20px] shadow-lg p-2",
            },
        });
    };

    return { openFormPeymentMethod };
};

export default PeymentMethodModal;
