import { NextResponse } from "next/server";
import { useEffect, useState } from "react";

export default function middleware(req) {
  const verify = req.cookies.get("nomor")?.value; // Get the "nomor" cookie value
  const currentPath = new URL(req.url).pathname; // Extract the current path
  // const url = new URL(req.headers.get("referer")).pathname;

  // console.log("Cookie 'nomor' value:", verify); // Debugging the cookie
  // console.log("Current Path:", currentPath.length); // Debugging the path

  // if (url == "/") {
  //   return NextResponse.redirect(new URL("/choose-character", req.url));
  // }

  if (currentPath === "/") {
    if (currentPath === "/" && verify) {
      return NextResponse.redirect(new URL("/choose-character", req.url));
    }
  }
  //
  else if (currentPath === "/choose-character") {
    if (currentPath === "/choose-character" && !verify) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}
