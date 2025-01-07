export default function handler(req, res) {
  const sessionData = [
    {
      id: 1,
      time: "3 Menit",
      val_time: "03:00",
      price: 5000,
      label: "Paling Banyak Dibeli",
      labelGradient: "from-[#001A41] to-[#0E336C]",
      promo: false,
    },
    {
      id: 2,
      time: "5 Menit",
      val_time: "05:00",
      price: 10000,
      promo: false,
    },
    {
      id: 3,
      time: "10 Menit",
      val_time: "10:00",
      price: 15000,
      oldPrice: 16500,
      label: "Promo",
      labelGradient: "from-[#EF2328] to-[#FB942B]",
      promo: true,
    },
    {
      id: 4,
      time: "20 Menit",
      val_time: "20:00",
      price: 18000,
      oldPrice: 20500,
      label: "Promo",
      labelGradient: "from-[#EF2328] to-[#FB942B]",
      promo: true,
    },
    {
      id: 5,
      time: "20 Menit",
      val_time: "20:00",
      price: 18000,
      oldPrice: 20500,
      label: "Promo",
      labelGradient: "from-[#EF2328] to-[#FB942B]",
      promo: true,
    },
    {
      id: 6,
      time: "20 Menit",
      val_time: "20:00",
      price: 18000,
      oldPrice: 20500,
      label: "Promo",
      labelGradient: "from-[#EF2328] to-[#FB942B]",
      promo: true,
    },
    {
      id: 7,
      time: "20 Menit",
      val_time: "20:00",
      price: 18000,
      oldPrice: 20500,
      label: "Promo",
      labelGradient: "from-[#EF2328] to-[#FB942B]",
      promo: true,
    },
    {
      id: 8,
      time: "20 Menit",
      val_time: "20:00",
      price: 18000,
      oldPrice: 20500,
      label: "Promo",
      labelGradient: "from-[#EF2328] to-[#FB942B]",
      promo: true,
    },
  ];

  const { id } = req.query;

  if (req.method === "GET") {
    if (id) {
      // Get by ID
      const session = sessionData.find((item) => item.id === parseInt(id));
      if (session) {
        res.status(200).json(session);
      } else {
        res.status(404).json({ message: "Data not found" });
      }
    } else {
      // Get all
      res.status(200).json(sessionData);
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
