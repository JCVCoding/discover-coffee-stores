import { findRecordByFilter } from "@/lib/airtable";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const data = await findRecordByFilter(id);
  const voteCount = data[0].voting;
  return NextResponse.json(voteCount);
}
