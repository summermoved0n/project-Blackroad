import { createFavoriteTour } from "@/lib/services/favorite.services";
import { getPublicErrorMessage } from "@/lib/utility/publicError";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    await createFavoriteTour(body);

    return NextResponse.json(
      { message: "Tour was added to favorite" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: getPublicErrorMessage(error, "Unable to update favorite") },
      { status: 401 },
    );
  }
}
