import { streamAvatarServer } from "@/lib/stream-avatar-server";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      // Fetch the remote_id from req.body
      const { remote_id } = req.body;

      if (!remote_id) {
        return res.status(400).json({ message: "remote_id is required" });
      }

      // Call the streamAvatarServer.getToken method with the remote_id
      const tokenResponse = await streamAvatarServer.getToken({ remote_id });
      return res.status(200).json(tokenResponse);
    } catch (error) {
      console.error("Error in POST handler:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    // Handle unsupported methods
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
