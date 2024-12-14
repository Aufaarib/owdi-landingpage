import { useState } from 'react';
import Link from 'next/link';
import { IconArticle, IconChevronRight, IconPlus } from '@tabler/icons-react';
import Image from 'next/image';

const MainSidebar = ({ openSidebar, setOpenSidebar }) => {
    const sessionData = [
        {
            time: "3 Menit",
            price: "Rp5.000",
            label: "Paling Banyak Dibeli",
            labelGradient: "from-[#001A41] to-[#0E336C]",
            promo: false,
        },
        {
            time: "5 Menit",
            price: "Rp10.000",
            promo: false,
        },
        {
            time: "5 Menit",
            price: "Rp10.000",
            promo: false,
        },
        {
            time: "5 Menit",
            price: "Rp10.000",
            promo: false,
        },
        {
            time: "5 Menit",
            price: "Rp10.000",
            promo: false,
        },
        {
            time: "5 Menit",
            price: "Rp10.000",
            promo: false,
        },
        {
            time: "5 Menit",
            price: "Rp10.000",
            promo: false,
        },
        {
            time: "5 Menit",
            price: "Rp10.000",
            promo: false,
        },
        {
            time: "20 Menit",
            price: "Rp18.000",
            oldPrice: "Rp20.500",
            label: "Promo",
            labelGradient: "from-[#EF2328] to-[#FB942B]",
            promo: true,
        },
    ];

    return (
        <div className={`absolute flex flex-col h-full bg-white w-[312px] z-10 ${openSidebar ? 'block' : 'hidden'}`}>
            {/* Header Section */}
            <div className='bg-[#ebdcd3]'>
                <div className="flex mt-4 gap-2 items-center h-[32px] w-full">
                    <Image
                        src="/icons/menuSidebar.png"
                        onClick={() => setOpenSidebar(!openSidebar)}
                        alt="Menu"
                        className='w-6 h-6 ml-5 cursor-pointer'
                        width={24}
                        height={24}
                    />
                    <Image
                        src="/icons/logoSidebar.png"
                        alt="Logo"
                        className='w-[90px] h-6 ml-[22px] object-cover'
                        width={200}
                        height={200}
                    />
                    <div className='flex justify-center items-center ml-2 bg-gradient-to-r from-transparent to-[#001A41BF] text-white text-[14px] px-1 py-2'>
                        <p className='whitespace-nowrap'>Tersisa: 10 Menit</p>
                        <IconPlus size={14} className='ml-2' />
                    </div>
                </div>

                <div className="flex flex-col px-4">
                    <p className='font-semibold text-xs mt-4'>Own Digital Companion</p>
                    <p className='text-xs'>Your digital friend who is always ready to help you with your daily activities, making life simpler and more fun!</p>
                    <button className='relative flex justify-between items-center gap-2 my-4 bg-gradient-to-r from-[#EF2328] to-[#FB942B] px-4 py-5 rounded-xl text-white'>
                        <p>Mulai Sesi Obrolan</p>
                        <Image src="/img/union.png" alt="Union" width={58} height={48} className='absolute right-5 w-[57px] h-[48px]' />
                    </button>
                </div>
            </div>

            {/* Session Data Section */}
            <div className="bg-white">
                <div className="flex flex-col px-4">
                    <p className="font-semibold text-md mt-4">Top Up Sesi Waktu</p>
                    <div className="h-[420px] overflow-y-auto no-scrollbar mt-2">
                        {sessionData.map((session, index) => (
                            <div
                                key={index}
                                className="inset-0 rounded-xl bg-gradient-to-r from-[#EF2328] to-[#FB942B] p-[1px] my-2"
                            >
                                <div className="relative flex justify-between items-center bg-[#f2dbd5] rounded-xl h-full px-4 py-5">
                                    <p className="w-[120px] text-xs font-semibold">{session.time}</p>
                                    {session.label && (
                                        <div
                                            className={`absolute top-0 text-[10px] text-white bg-gradient-to-r ${session.labelGradient} px-2 py-1 rounded-b-xl`}
                                        >
                                            <p>{session.label}</p>
                                        </div>
                                    )}

                                    <div className="flex items-center">
                                        {session.promo && (
                                            <Image src="/icons/promo.png" alt="Promo Icon" width={24} height={24} />
                                        )}
                                        <div className={`ml-${session.promo ? 2 : 0} mr-${session.promo ? 2 : 11}`}>
                                            <p className="m-0 text-xs">{session.price}</p>
                                            {session.oldPrice && (
                                                <span className="text-[10px] line-through text-[#9CA9B9]">{session.oldPrice}</span>
                                            )}
                                        </div>
                                        <IconChevronRight size={24} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainSidebar;
