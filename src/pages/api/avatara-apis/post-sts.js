import { IncomingForm } from "formidable";
import { Blob } from "buffer";
import fs from "fs";
import { streamAvatarServer } from "@/lib/stream-avatar-server";
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    const form = new IncomingForm();

    try {
      const authorizationHeader = req.headers.authorization;

      if (!authorizationHeader) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const token = authorizationHeader.replace(/^Bearer\s+/, "");

      const data = await new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
          if (err) return reject(err);
          resolve({ fields, files });
        });
      });

      const newFormData = new FormData();

      if (data) {
        let buffer = fs.readFileSync(data.files.audio[0].filepath);
        let blob = new Blob([buffer]);
        newFormData.append("conversation_uid", data.fields.conversation_uid[0]);
        newFormData.append("audio", blob);
      }

      console.log("FORM", newFormData);

      const response = await streamAvatarServer.stsWithTransript(
        newFormData,
        token
      );

      if (!response.stream) {
        return res.json(
          { error: "No stream received from backend" },
          { status: 500 }
        );
      }

      if (!response.headers) {
        return res.json(
          { error: "No headers received from backend" },
          { status: 500 }
        );
      }

      console.log(response);

      const reader = response.stream.getReader();

      const stream = new ReadableStream({
        async pull(controller) {
          const { done, value } = await reader.read();

          if (done) {
            controller.close();

            return;
          }
          controller.enqueue(value);
        },
      });

      console.log("header", response.headers.get("Content-Type"));
      console.log("stream", stream);

      res.setHeader(
        "Content-Type",
        response.headers.get("Content-Type") || "application/octet-stream"
      );

      // Pipe the stream data directly to the response
      const writer = res.write.bind(res);

      stream.pipeTo(
        new WritableStream({
          write(chunk) {
            writer(chunk);
          },
          close() {
            res.end();
          },
        })
      );
    } catch (err) {
      console.error("Error parsing form data:", err);
      return res.json({ error: "Error parsing form data" }, { status: 500 });
    }
  } else {
    return res.json({ error: "Internal server error" }, { status: 500 });
  }
}
