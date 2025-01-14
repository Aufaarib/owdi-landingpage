// pages/api/paymentMethods.js

export default function handler(req, res) {
    // Data metode pembayaran yang disediakan
    const paymentMethods = [
        {
            id: 1,
            kategori: "pulsa",
            name: "Telkomsel",
            adminFee: 2500,
            imageUrl: "/icons/payment/pulsa.png",
        },
        {
            id: 2,
            kategori: "e-wallet",
            name: "Gopay",
            adminFee: 3000,
            imageUrl: "/icons/payment/gopay.png",
        },
        {
            id: 3,
            kategori: "e-wallet",
            name: "LinkAja",
            adminFee: 3000,
            imageUrl: "/icons/payment/linkaja.png",
        },
        {
            id: 4,
            kategori: "e-wallet",
            name: "ShopeePay",
            adminFee: 3000,
            imageUrl: "/icons/payment/shopeepay.png",
        },
        {
            id: 5,
            kategori: "e-wallet",
            name: "OVO",
            adminFee: 3000,
            imageUrl: "/icons/payment/ovo.png",
        },
        {
            id: 6,
            kategori: "bank",
            name: "BCA",
            adminFee: 5000,
            imageUrl: "/icons/payment/pulsa.png",
        },
        {
            id: 7,
            kategori: "bank",
            name: "Mandiri",
            adminFee: 5000,
            imageUrl: "/icons/payment/pulsa.png",
        },
        {
            id: 8,
            kategori: "bank",
            name: "BRI",
            adminFee: 5000,
            imageUrl: "/icons/payment/pulsa.png",
        },
    ];

    if (req.method === "GET") {
        const { id } = req.query;
        if (id) {
            const paymentMethod = paymentMethods.find((method) => method.id === parseInt(id));
            if (paymentMethod) {
                res.status(200).json(paymentMethod);
            } else {
                res.status(404).json({ message: "Payment method not found" });
            }
        } else {
            res.status(200).json(paymentMethods);
        }
    } else {
        res.status(405).json({ message: "Method Not Allowed" });
    }
}
