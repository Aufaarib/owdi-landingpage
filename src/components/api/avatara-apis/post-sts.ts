import { NextResponse } from "next/server";

export default async function POST(request: Request) {
  try {
    const formData = await request.formData();
    console.log(formData);

    return NextResponse.json({ body: [formData] }, { status: 200 });
  } catch (error) {
    console.error("Error in API handler:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
