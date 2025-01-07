import { NextResponse } from "next/server";

export default function middleware(req) {
  let verify = req.cookies.get("username")?.value;
  const url = req.headers.get("referer");

  const urlParts = url?.split("://")[1].split("/"); // Remove 'http://' or 'https://'
  const pathAndQueryAndHash = "/" + urlParts?.slice(1).join("/");

  console.log("daasda", verify);
  console.log("w", pathAndQueryAndHash);

  if (url == "/" && verify !== undefined) {
    return NextResponse.redirect(new URL("/choose-character", req.url));
  }

  return NextResponse.next();
}
