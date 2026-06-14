import { NextResponse } from "next/server";
import { deliverLead, validateLead } from "@/lib/leads";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = validateLead(body);

    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    await deliverLead(result.data);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again or email hello@creator-ops.site." },
      { status: 500 }
    );
  }
}
