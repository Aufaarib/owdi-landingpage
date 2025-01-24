import { streamAvatarServer } from "@/lib/stream-avatar-server";

export default async function handler(req, res) {
  // console.log("asdas", req.headers);
  if (req.method === "GET") {
    try {
      const authorizationHeader = req.headers.authorization;

      if (!authorizationHeader) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      // Extract token from the authorization header
      const token = authorizationHeader.replace(/^Bearer\s+/, "");

      const { star_uid } = req.query; // For GET requests, use query parameters

      const uid = await streamAvatarServer.getConversationUID(star_uid, token);

      return res.status(200).json({ uid });
    } catch (error) {
      console.error("Error retrieving access token:", error);

      return res
        .status(500)
        .json({ message: "Failed to retrieve access token" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
