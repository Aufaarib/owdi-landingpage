// src/utils/formatRupiah.js

/**
 * Format angka ke dalam format Rupiah tanpa desimal
 * @param {number} value - Angka yang akan diformat
 * @returns {string} - Angka dalam format Rupiah
 */
const formatRupiah = (value) => {
    if (typeof value !== 'number') {
        return 'Invalid input';
    }

    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0, // Tidak menampilkan desimal
        maximumFractionDigits: 0,
    }).format(value);
};

export default formatRupiah;
