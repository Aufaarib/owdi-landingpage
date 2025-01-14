import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const MetodePembayaran = () => {
    const router = useRouter();
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
    const [produk, setProduk] = useState(null);
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [produkLoading, setProdukLoading] = useState(true);

    useEffect(() => {
        const fetchPaymentMethods = async () => {
            try {
                const response = await axios.get("/api/paymentMethods");
                setPaymentMethods(response.data);
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
            const productId = router.query.id;

            if (productId) {
                try {
                    const response = await axios.get(`/api/session?id=${productId}`);
                    setProduk(response.data);
                    setProdukLoading(false);
                } catch (error) {
                    console.error("Error fetching product:", error);
                    setProdukLoading(false);
                }
            } else {
                setProdukLoading(false);
            }
        };

        if (router.query.id) {
            fetchProductData();
        } else {
            setProdukLoading(false);
        }
    }, [router.query.id]);

    const groupByCategory = (paymentMethods) => {
        return paymentMethods.reduce((grouped, method) => {
            const { kategori } = method;
            if (!grouped[kategori]) {
                grouped[kategori] = [];
            }
            grouped[kategori].push(method);
            return grouped;
        }, {});
    };

    const handlePaymentMethodChange = async (methodId) => {
        try {
            const response = await axios.get(`/api/paymentMethods?id=${methodId}`);
            setSelectedPaymentMethod(response.data);
        } catch (error) {
            console.error("Error fetching payment method by ID:", error);
        }
    };

    const getpaymentMethod = (methodName) => {
        return paymentMethods.find((item) => item.name.toLowerCase() === methodName.toLowerCase());
    };

    const handleBayarClick = () => {
        if (selectedPaymentMethod && produk) {
            const total = produk.price + selectedPaymentMethod.adminFee || 0;
            const dataPayment = {
                produk: produk,
                paymentMethod: selectedPaymentMethod,
                total: total,
            };
            console.log('data payment', dataPayment);
            console.log(`Total yang harus dibayar: Rp ${total.toLocaleString()}`);
        } else {
            console.log("Belum memilih metode pembayaran atau produk belum dipilih");
        }
    };

    if (loading || produkLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="relative flex flex-col items-center bg-[#EFF1F4] min-h-screen pb-[110px]">
            <div className="mt-4 h-[76px] w-[328px] rounded-md bg-gradient-to-r from-[#EF2328] to-[#FB942B] p-1">
                <div className="relative flex items-center px-4 h-full w-full bg-[#f0d3ce]">
                    <div className="absolute top-0 left-2 px-4 text-[12px] rounded-b-md bg-gradient-to-r from-[#EF2328] to-[#FB942B]">
                        promo
                    </div>
                    <div className="flex justify-between items-center w-full">
                        <p className="text-sm font-semibold">{produk?.koin} coin</p>
                        <div className="flex items-center mr-[55px]">
                            <div className="w-3 h-3 rounded-md bg-green-500 mr-2"></div>
                            <div>
                                <p className="font-semibold text-[#ED0226]">{produk?.price}</p>
                                <p className="line-through text-[#9CA9B9]">100.000</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-[#FFFFFF80] flex flex-col w-[328px] mt-4 rounded-lg px-4 border-2 border-[#DAE0E9]">
                {Object.entries(groupByCategory(paymentMethods)).map(([category, methods]) => (
                    <div key={category}>
                        <p className="mb-2 font-semibold capitalize">{category}</p>
                        {methods.map((method) => (
                            <div key={method.name}>
                                <label
                                    htmlFor={method.name}
                                    className="bg-white flex flex-row justify-between items-center w-full px-4 py-5 rounded-lg my-2"
                                >
                                    <div className="flex flex-row items-center">
                                        <img
                                            src={method.imageUrl}
                                            alt={method.name}
                                            className="w-8 h-8 object-cover mr-1"
                                        />
                                        <p>{method.name}</p>
                                    </div>
                                    <input
                                        id={method.id}
                                        type="radio"
                                        value={method.id}
                                        name="paymentMethod"
                                        className="w-6 h-6 text-black focus:ring-black checked:bg-black checked:border-black"
                                        onChange={() => handlePaymentMethodChange(method.id)}
                                    />
                                </label>
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            <div className="h-[108px] w-full fixed bottom-0 rounded-md bg-white pt-[10px] pb-[20px] px-4">
                <div className="grid grid-cols-2 items-center mb-4">
                    <div className="flex flex-row items-center">
                        {selectedPaymentMethod && selectedPaymentMethod.imageUrl && (
                            <img
                                src={selectedPaymentMethod?.imageUrl}
                                alt={selectedPaymentMethod.name}
                                className="w-5 h-5 object-cover mr-1"
                            />
                        )}
                        <p className="font-semibold text-sm">{selectedPaymentMethod?.name}</p>
                    </div>
                    <div className="flex flex-row items-end justify-end">
                        <p className="font-semibold text-sm">
                            Rp {(produk?.price + (selectedPaymentMethod?.adminFee || 0)).toLocaleString()}
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

export default MetodePembayaran;
