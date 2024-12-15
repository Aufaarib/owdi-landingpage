export default function handler(req, res) {
    const sessionData = [
        {
            id: 1,
            time: "3 Menit",
            price: 5000,
            label: "Paling Banyak Dibeli",
            labelGradient: "from-[#001A41] to-[#0E336C]",
            promo: false,
        },
        {
            id: 2,
            time: "3 Menit",
            price: 5000,
            promo: false,
        },
        {
            id: 3,
            time: "20 Menit",
            price: 18000,
            oldPrice: 20500,
            label: "Promo",
            labelGradient: "from-[#EF2328] to-[#FB942B]",
            promo: true,
        },
    ];

    const { id } = req.query;

    if (req.method === 'GET') {
        if (id) {
            // Get by ID
            const session = sessionData.find(item => item.id === parseInt(id));
            if (session) {
                res.status(200).json(session);
            } else {
                res.status(404).json({ message: 'Data not found' });
            }
        } else {
            // Get all
            res.status(200).json(sessionData);
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
