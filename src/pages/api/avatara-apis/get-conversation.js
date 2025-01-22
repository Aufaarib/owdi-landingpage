// import { streamAvatarServer } from "@/lib/stream-avatar-server";
// import { headers } from "next/headers";

// export async function POST(request) {
//   try {
//     const headersList = headers();
//     const authorizationHeader = headersList.get("authorization");

//     if (!authorizationHeader) {
//       return new Response("Unauthorized", { status: 401 });
//     }

//     const token = authorizationHeader.replace(/^Bearer\s+/, "");

//     const reqBody = await request.json();
//     const starUID = reqBody.star_uid;

//     const uid = await streamAvatarServer.getConversationUID(starUID, token);

//     return Response.json({ uid });
//   } catch (error) {
//     console.error("Error retrieving access token:", error);

//     return new Response("Failed to retrieve access token", {
//       status: 500,
//     });
//   }
// }
