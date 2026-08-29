import { deleteFavoriteTour } from "@/lib/services/favorite.services";
import { getPublicErrorMessage } from "@/lib/utility/publicError";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    await deleteFavoriteTour({
      favoriteId: Number(id),
    });

    return NextResponse.json(
      { message: "Tour was removed from favorite" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: getPublicErrorMessage(error, "Unable to update favorite") },
      { status: 401 },
    );
  }
}
