import { getAllTours } from "@/lib/services/tours.services";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const tours = await getAllTours();
    console.log(tours);
    // return NextResponse.json(
    //   {
    //     data: tours,
    //   },
    //   { status: 200 },
    // );
  } catch (error) {}
}
