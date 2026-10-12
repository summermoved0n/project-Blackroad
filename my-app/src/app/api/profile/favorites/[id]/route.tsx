import { deleteFavoriteTour } from "@/lib/services/favorite.services";
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
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 401 });
    }

    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
