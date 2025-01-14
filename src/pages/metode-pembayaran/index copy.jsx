import { useState } from "react";

const MetodePembayaran = () => {
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
    const [totalPrice, setTotalPrice] = useState(50000); // Harga produk
    const adminFees = {
        "pulsa-telkomsel": 2500,
        "gopay": 3000,
        "linkaja": 3000,
        "shopeepay": 3000,
        "ovo": 3000,
    };

    const handlePaymentMethodChange = (method) => {
        setSelectedPaymentMethod(method);
    };

    const handleBayarClick = () => {
        const adminFee = adminFees[selectedPaymentMethod] || 0;
        const total = totalPrice + adminFee;
        console.log(`Metode Pembayaran: ${selectedPaymentMethod}`);
        console.log(`Total yang harus dibayar: Rp ${total.toLocaleString()}`);
    };

    return (
        <div className="relative flex flex-col items-center bg-[#EFF1F4] min-h-screen pb-[110px]">
            {/* Card Produk */}
            <div className="mt-4 h-[76px] w-[328px] rounded-md bg-gradient-to-r from-[#EF2328] to-[#FB942B] p-1">
                <div className="relative flex items-center px-4 h-full w-full bg-[#f0d3ce]">
                    <div className="absolute top-0 left-2 px-4 text-[12px] rounded-b-md bg-gradient-to-r from-[#EF2328] to-[#FB942B]">
                        promo
                    </div>
                    <div className="flex justify-between items-center w-full">
                        <p className="text-sm font-semibold">15 coin</p>
                        <div className="flex items-center mr-[55px]">
                            <div className="w-3 h-3 rounded-md bg-green-500 mr-2"></div>
                            <div>
                                <p className="font-semibold text-[#ED0226]">50.000</p>
                                <p className="line-through text-[#9CA9B9]">100.000</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-[#FFFFFF80] flex flex-col w-[328px] mt-4 rounded-lg px-4 border-2 border-[#DAE0E9]">
                <div className="mt-4">
                    <p className="mb-2">Pulsa</p>
                    <label
                        htmlFor="pulsa-telkomsel"
                        className="bg-white flex flex-row justify-between items-center w-full px-4 py-5 rounded-lg my-2"
                    >
                        <div className="flex flex-row items-center">
                            <img
                                src="/icons/payment/pulsa.png"
                                alt="Pulsa Telkomsel"
                                className="w-8 h-8 object-cover mr-1"
                            />
                            <p>Pulsa Telkomsel</p>
                        </div>
                        <input
                            id="pulsa-telkomsel"
                            type="radio"
                            value="pulsa-telkomsel"
                            name="paymentMethod"
                            className="w-6 h-6 text-black focus:ring-black checked:bg-black checked:border-black"
                            onChange={() => handlePaymentMethodChange("pulsa-telkomsel")}
                        />
                    </label>
                </div>

                <div className="mt-4">
                    <p className="mb-2">e-Wallet</p>
                    <label
                        htmlFor="gopay"
                        className="bg-white flex flex-row justify-between items-center w-full px-4 py-5 rounded-lg my-2"
                    >
                        <div className="flex flex-row items-center">
                            <img
                                src="/icons/payment/pulsa.png"
                                alt="Gopay"
                                className="w-8 h-8 object-cover mr-1"
                            />
                            <p>Gopay</p>
                        </div>
                        <input
                            id="gopay"
                            type="radio"
                            value="gopay"
                            name="paymentMethod"
                            className="w-6 h-6 text-black focus:ring-black checked:bg-black checked:border-black"
                            onChange={() => handlePaymentMethodChange("gopay")}
                        />
                    </label>

                    <label
                        htmlFor="LinkAja"
                        className="bg-white flex flex-row justify-between items-center w-full px-4 py-5 rounded-lg my-2"
                    >
                        <div className="flex flex-row items-center">
                            <img
                                src="/icons/payment/pulsa.png"
                                alt="LinkAja"
                                className="w-8 h-8 object-cover mr-1"
                            />
                            <p>LinkAja</p>
                        </div>
                        <input
                            id="LinkAja"
                            type="radio"
                            value="linkaja"
                            name="paymentMethod"
                            className="w-6 h-6 text-black focus:ring-black checked:bg-black checked:border-black"
                            onChange={() => handlePaymentMethodChange("linkaja")}
                        />
                    </label>

                    <label
                        htmlFor="shopeepay"
                        className="bg-white flex flex-row justify-between items-center w-full px-4 py-5 rounded-lg my-2"
                    >
                        <div className="flex flex-row items-center">
                            <img
                                src="/icons/payment/pulsa.png"
                                alt="ShopeePay"
                                className="w-8 h-8 object-cover mr-1"
                            />
                            <p>ShopeePay</p>
                        </div>
                        <input
                            id="shopeepay"
                            type="radio"
                            value="shopeepay"
                            name="paymentMethod"
                            className="w-6 h-6 text-black focus:ring-black checked:bg-black checked:border-black"
                            onChange={() => handlePaymentMethodChange("shopeepay")}
                        />
                    </label>

                    <label
                        htmlFor="ovo"
                        className="bg-white flex flex-row justify-between items-center w-full px-4 py-5 rounded-lg my-2"
                    >
                        <div className="flex flex-row items-center">
                            <img
                                src="/icons/payment/pulsa.png"
                                alt="OVO"
                                className="w-8 h-8 object-cover mr-1"
                            />
                            <p>OVO</p>
                        </div>
                        <input
                            id="ovo"
                            type="radio"
                            value="ovo"
                            name="paymentMethod"
                            className="w-6 h-6 text-black focus:ring-black checked:bg-black checked:border-black"
                            onChange={() => handlePaymentMethodChange("ovo")}
                        />
                    </label>
                </div>
            </div>

            <div className="h-[108px] w-full fixed bottom-0 rounded-md bg-white pt-[10px] pb-[20px] px-4">
                <div className="grid grid-cols-2 items-center mb-4">
                    <div className="flex flex-row items-center">
                        <img
                            src="/icons/payment/pulsa.png"
                            alt="Metode Pembayaran"
                            className="w-5 h-5 object-cover mr-1"
                        />
                        <p className="font-semibold text-sm">{selectedPaymentMethod && selectedPaymentMethod}</p>
                    </div>
                    <div className="flex flex-row items-end justify-end">
                        <p className="font-semibold text-sm">
                            Rp {(totalPrice + (adminFees[selectedPaymentMethod] || 0)).toLocaleString()}
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
