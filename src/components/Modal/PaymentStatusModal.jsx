import React from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { IconCheck, IconX } from "@tabler/icons-react";
import formatRupiah from "@/utils/formatRupiah";

const MySwal = withReactContent(Swal);

const PaymentStatusModal = () => {
    const openPaymentStatusModal = (dataPayment) => {
        // Status: "success" atau "error"
        const isSuccess = dataPayment.status === "success";
        console.log("dataPayment", dataPayment);


        MySwal.fire({
            html: (
                <div className="flex flex-col items-center justify-center  w-full rounded-lg">
                    <div className="half-circle relative">
                        <p className="text-[16px] text-white mt-4">Status Pembayaran</p>
                        <img src="/img/TransaksiSukses.png" alt="Transaksi Sukses" className="TransaksiSukses"></img>
                    </div>
                    <div className="mt-16">
                        <p className="font-bold text-[14]">Transaksi Sukses</p>
                        <p className="text-[12px]">Pembayaran berhasil dan layanan kamu bisa kamu akses sekarang</p>
                    </div>
                    <div className="w-full px-4 py-4 rounded-lg my-4 bg-[#EFF1F4]">
                        <p className="font-bold text-left">Detail Transaksi</p>
                        <div className=" grid grid-cols-2 items-center ">
                            <div className="text-left my-1">
                                Tanggal
                            </div>
                            <div className="text-right text-sm whitespace-nowrap my-1">
                                18/09/2020
                            </div>
                            <div className="text-left my-1">
                                No. Transaksi
                            </div>
                            <div className="text-right text-sm whitespace-nowrap my-1">
                                AL4678790                            </div>
                            <div className="text-left my-1 font-semibold">
                                {dataPayment?.produk.coin} koin
                            </div>
                            <div className="text-right text-sm whitespace-nowrap my-1 font-semibold">
                                {formatRupiah(dataPayment?.produk.special_price)}
                            </div>

                        </div>

                    </div>


                    <button
                        className="my-8 px-4 py-2   bg-gradient-to-t from-[#EF2328] to-[#FB942B] text-white rounded-lg hover:shadow-lg"
                        onClick={() => Swal.close()}
                    >
                        Kembali Ke Beranda
                    </button>
                </div>
            ),
            showConfirmButton: false, // Tidak menampilkan tombol default
            allowOutsideClick: false,
            customClass: {
                popup: "bg-white w-[328px] h-auto rounded-lg shadow-lg p-0",
            },
        });
    };

    return { openPaymentStatusModal };
};

export default PaymentStatusModal;
