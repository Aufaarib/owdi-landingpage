import { streamAvatarServer } from "@/lib/stream-avatar-server";
import { IncomingForm } from "formidable";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false, // Disable default body parsing
  },
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    const form = new IncomingForm();
    const formdata = req?.formData;
    console.log("body", formdata);
    // console.log("Filessss:", req.formidable());

    try {
      // Parse the incoming form data
      // const { fields, files } = await new Promise((resolve, reject) => {
      //   form.parse(req, (err, fields, files) => {
      //     if (err) reject(err);
      //     else resolve({ fields, files });
      //   });
      // });

      const authorizationHeader = req.headers.authorization;

      if (!authorizationHeader) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      // Extract token from the authorization header
      const token = authorizationHeader.replace(/^Bearer\s+/, "");

      form.parse(req, (err, fields, files) => {
        if (err) {
          console.error("Error parsing files:", err);
          res.status(500).send("Error uploading file");
          return;
        }

        console.log("Fields:", fields); // Other form fields
        console.log("Files:", files); // Uploaded files

        const audioFile = files.audio;
        console.log("File content:", audioFile); // { name: 'audio', value: [ [PersistentFile] ] }

        // Example: Reading the file
        // const filePath = audioFile.filepath; // Path to the uploaded file
        // const fileContent = fs.readFileSync(filePath);
        // console.log("File content:", fileContent);

        // res.status(200).send('File uploaded successfully');
        return res.status(200).json(audioFile);
      });

      // Manually create a FormData-like object
      // const formattedData = [
      //   { name: "conversation_uid", value: fields.conversation_uid },
      //   { name: "audio", value: files.audio }, // Ensure the key matches your FormData structure
      // ];

      // console.log("Formatted Data:", formattedData);
      // console.log("File:", files);
      // console.log("File:", token);

      // Pass the formatted data to streamAvatarServer.sts
      // const response = await streamAvatarServer.sts(formattedData, token);
    } catch (error) {
      console.error("Error processing STS request:", error);
      return res.status(500).json({ message: "Failed to process STS request" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
