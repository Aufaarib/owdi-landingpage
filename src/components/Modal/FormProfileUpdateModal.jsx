import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import axios from "axios";
import { IconArrowLeft } from "@tabler/icons-react";

const MySwal = withReactContent(Swal);

const Content = () => {
    const [profile, setProfile] = useState({
        full_name: "John Doe",
        email: "johndoe@example.com",
        jenis_kelamin: "Laki-laki",
        call_title: "Kak",
        kustom_call_title: "",
        birth_date: {
            day: "15",
            month: "08",
            year: "1995",
        },
    });
    const [nomer, setNomer] = useState(localStorage.getItem("nomor") || "");

    // State untuk validasi
    const isFormValid = () => {
        // Validasi dasar: semua field harus diisi
        const isValidBasic = (
            profile.full_name.trim() &&
            profile.email.trim() &&
            profile.jenis_kelamin.trim() &&
            profile.call_title.trim() &&
            profile.birth_date.day &&
            profile.birth_date.month &&
            profile.birth_date.year
        );

        // Validasi tambahan untuk 'Kustom' panggilan
        const isKustomValid = profile.call_title !== 'Kustom' || (profile.call_title === 'Kustom' && profile.kustom_call_title.trim());

        return isValidBasic && isKustomValid;
    };

    useEffect(() => {
        const token = Cookies.get("access_token");

        if (token) {
            axios
                .get("https://api.owdi.nuncorp.id/api/v1/auth/profile/fetch", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((response) => {
                    const { body } = response.data;
                    const birthDate = body.birth_date ? new Date(body.birth_date) : null;

                    setProfile({
                        full_name: body.full_name || "",
                        email: body.email || "",
                        jenis_kelamin: body.jenis_kelamin || "",
                        call_title: body.call_title || "",
                        birth_date: birthDate
                            ? {
                                day: birthDate.getDate(),
                                month: birthDate.getMonth() + 1,
                                year: birthDate.getFullYear(),
                            }
                            : { day: "", month: "", year: "" },
                    });
                })
                .catch((error) => {
                    console.error("Gagal mengambil profil:", error);
                });
        } else {
            console.error("Token tidak ditemukan di cookies.");
        }
    }, []);

    const handleCloseModal = () => {
        MySwal.close();
    };

    const generateOptions = (start, end) => {
        const options = [];
        for (let i = start; i <= end; i++) {
            options.push(i);
        }
        return options;
    };

    const days = generateOptions(1, 31);
    const months = [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember",
    ];
    const years = generateOptions(1900, new Date().getFullYear());

    const handleSubmit = () => {
        console.log("Profile:", profile);

        MySwal.close();
    };


    return (
        <div className="w-full rounded-lg z-50 h-[720px] flex flex-col gap-6 ">
            <IconArrowLeft size={16} onClick={handleCloseModal} />
            <div className="flex w-full justify-center gap-2 items-center mb-12">
                <p className="text-base text-center"> {nomer}</p>
                <img src="/icons/verified.png" className="w-[24px] h-[24px] " alt="" />
            </div>

            {/* Nama */}
            <div className="flex flex-col gap-2">
                <label htmlFor="full_name" className="text-sm font-medium text-left">Nama</label>
                <input
                    type="text"
                    id="full_name"
                    value={profile.full_name}
                    onChange={(e) =>
                        setProfile({ ...profile, full_name: e.target.value })
                    }
                    className="w-full h-[40px] border rounded-md px-4 py-2 text-sm focus:outline-none focus:ring focus:ring-gray-100"
                    placeholder="Masukkan Nama"
                />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-medium text-left">Email</label>
                <input
                    type="email"
                    id="email"
                    value={profile.email}
                    onChange={(e) =>
                        setProfile({ ...profile, email: e.target.value })
                    }
                    className="w-full h-[40px] border rounded-md px-4 py-2 text-sm focus:outline-none focus:ring focus:ring-gray-100"
                    placeholder="Masukkan Email"
                />
            </div>

            {/* Jenis Kelamin */}
            <div className="flex flex-col gap-2">
                <label htmlFor="jenis_kelamin" className="text-sm font-medium text-left">Jenis Kelamin</label>
                <input
                    type="tel"
                    id="jenis_kelamin"
                    value={profile.jenis_kelamin}
                    className="w-full h-[40px] border rounded-md px-4 py-2 text-sm focus:outline-none focus:ring focus:ring-gray-100 bg-[#D1D3DB]"
                    placeholder="Masukkan Jenis Kelamin"
                    disabled
                />
            </div>

            {/* Tanggal Lahir */}
            <div className="flex flex-col gap-2">
                <label htmlFor="birth_date" className="text-sm font-medium text-left">Tanggal Lahir</label>
                <div className="flex gap-2">
                    <select
                        value={profile.birth_date.day}
                        onChange={(e) =>
                            setProfile({
                                ...profile,
                                birth_date: { ...profile.birth_date, day: e.target.value },
                            })
                        }
                        className="w-1/3 border rounded-md px-4 py-2 text-sm focus:outline-none focus:ring focus:ring-gray-100"
                    >
                        <option value="">Hari</option>
                        {days.map((day) => (
                            <option key={day} value={day}>
                                {day}
                            </option>
                        ))}
                    </select>
                    <select
                        value={profile.birth_date.month}
                        onChange={(e) =>
                            setProfile({
                                ...profile,
                                birth_date: { ...profile.birth_date, month: e.target.value },
                            })
                        }
                        className="w-1/3 border rounded-md px-4 py-2 text-sm focus:outline-none focus:ring focus:ring-gray-100"
                    >
                        <option value="">Bulan</option>
                        {months.map((month, index) => (
                            <option key={index + 1} value={index + 1}>
                                {month}
                            </option>
                        ))}
                    </select>
                    <select
                        value={profile.birth_date.year}
                        onChange={(e) =>
                            setProfile({
                                ...profile,
                                birth_date: { ...profile.birth_date, year: e.target.value },
                            })
                        }
                        className="w-1/3 border rounded-md px-4 py-2 text-sm focus:outline-none focus:ring focus:ring-gray-100"
                    >
                        <option value="">Tahun</option>
                        {years.map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Panggilan */}
            <div className="flex flex-col gap-2">
                <label htmlFor="call_title" className="text-sm font-medium text-left">
                    Panggilan
                </label>
                <select
                    id="call_title"
                    value={profile.call_title}
                    onChange={(e) =>
                        setProfile({ ...profile, call_title: e.target.value })
                    }
                    className="w-full h-[40px] border rounded-md px-4 py-2 text-sm focus:outline-none focus:ring focus:ring-gray-100"
                >
                    {profile.call_title === 'Laki-laki' ? (
                        <>
                            <option value="">Pilih Panggilan</option>
                            <option value="Abang">Abang</option>
                            <option value="Sayang">Sayang</option>
                            <option value="Kak">Kak</option>
                            <option value="Kak">Kak</option>
                            <option value="Aa">Aa</option>
                            <option value="Kustom">Kustom</option>

                        </>

                    ) : (
                        <>
                            <option value="">Pilih Panggilan</option>
                            <option value="Kak">Kak</option>
                            <option value="Sister">Sister</option>
                            <option value="Mbak">Mbak</option>
                            <option value="Ci">Ci</option>
                            <option value="Kustom">Kustom</option>
                        </>
                    )}

                </select>
            </div>

            {/* Kustom Panggilan */}
            {profile.call_title === 'Kustom' && (
                <div className="flex flex-col gap-2">
                    <div className="relative">
                        <input
                            type="text"
                            id="kustom_call_title"
                            value={profile.kustom_call_title}
                            onChange={(e) =>
                                setProfile({ ...profile, kustom_call_title: e.target.value })
                            }
                            maxLength="20" // Menetapkan batas karakter
                            className="w-full h-[40px] border rounded-md px-4 py-2 text-sm focus:outline-none focus:ring focus:ring-gray-100"
                            placeholder="Isi nama panggilan"
                        />
                        <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">
                            {profile.kustom_call_title.length}/20
                        </span>
                    </div>
                </div>

            )}

            <p className="text-[#718290] text-[12px] text-left"> Owdi akan memanggilmu sesuai panggilan yang kamu pilih dalam sesi obrolan</p>

            {/* Tombol */}
            <div className="flex justify-between gap-4 mt-6">
                <button
                    onClick={handleSubmit}
                    className={`w-full py-2 font-medium rounded-full ${isFormValid()
                        ? "bg-gradient-to-t from-[#EF2328] to-[#FB942B] text-white"
                        : "bg-[#D1D3DB] text-[#97A6B1] cursor-not-allowed"
                        }`}
                    disabled={!isFormValid()}
                >
                    Simpan
                </button>
            </div>
        </div>
    );
};

const FormProfileUpdateModal = () => {
    const FormProfileUpdateMDL = () => {
        MySwal.fire({
            html: <Content />,
            showConfirmButton: false,
            allowOutsideClick: true,
            customClass: {
                popup: "bg-white rounded-[20px] shadow-lg p-4 w-[400px]",
            },
        });
    };

    return { FormProfileUpdateMDL };
};

export default FormProfileUpdateModal;
