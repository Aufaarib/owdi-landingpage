import formidable from "formidable";
import { streamAvatarServer } from "@/lib/stream-avatar-server";

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    const form = formidable({ multiples: false });

    form.parse(req, async (err, fields, files) => {
        if (err) {
            console.error("Error parsing form:", err);
            return res.status(500).json({ message: "Failed to process form" });
        }

        const { conversation_uid } = fields;
        const { audio } = files;

        const authorization = req.headers.authorization;

        if (!authorization) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        if (!conversation_uid || !audio) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const token = authorization.replace(/^Bearer\s+/, "");

        const cekData = {
            'conversation_uid': conversation_uid,
            'token': token,
            'audio': audio,
        }
        console.log("cekData", cekData);

        const formData = new FormData();
        formData.append("conversation_uid", conversation_uid);
        formData.append("audio", audio[0]);

        try {
            const stsResponse = await streamAvatarServer.stsWithTransript(formData, token);

            if (!stsResponse) {
                return res.status(500).json({ message: "No response from STS processing" });
            }

            return res.status(200).json({
                message: "Audio processed successfully",
                audioStream: stsResponse,
            });
        } catch (error) {
            console.error("STS processing failed:", error);
            return res.status(500).json({ message: "Error processing STS", error });
        }
    });
}
