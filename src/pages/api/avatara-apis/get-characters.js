import { streamAvatarServer } from "@/lib/stream-avatar-server";

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === "GET") {
    // Get by ID
    if (!id) {
      const res1 = await streamAvatarServer.getStars((1, 2));
      res.status(200).json(res1);
    } else {
      const res2 = await streamAvatarServer.getStarByUID(id);
      res.status(200).json(res2);
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
