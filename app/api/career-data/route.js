import { NextResponse } from "next/server";
import { getAnalyticsJobPage, getCareerDataSummary } from "../../../lib/server/careerDataStore";

export const dynamic = "force-dynamic";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const view = searchParams.get("view");

  try {
    if (!view || view === "summary") {
      return NextResponse.json(await getCareerDataSummary(), {
        headers: { "Cache-Control": "private, max-age=300" }
      });
    }

    if (view !== "analytics-jobs") {
      return NextResponse.json({ error: `Unsupported career data view: ${view}` }, { status: 400 });
    }

    const page = Number(searchParams.get("page") ?? "1");
    const pageSize = Number(searchParams.get("pageSize") ?? "50");
    const query = searchParams.get("query") ?? "";
    if (!Number.isInteger(page) || page < 1) {
      return NextResponse.json({ error: "page must be a positive integer." }, { status: 400 });
    }
    if (!Number.isInteger(pageSize) || pageSize < 1 || pageSize > 100) {
      return NextResponse.json({ error: "pageSize must be an integer between 1 and 100." }, { status: 400 });
    }
    if (query.length > 120) {
      return NextResponse.json({ error: "query must not exceed 120 characters." }, { status: 400 });
    }

    return NextResponse.json(await getAnalyticsJobPage({ page, pageSize, query }), {
      headers: { "Cache-Control": "private, max-age=300" }
    });
  } catch (error) {
    console.error("Unable to load Vriksha career datasets.", error);
    return NextResponse.json(
      { error: "Career datasets could not be loaded. Check the server logs for details." },
      { status: 500 }
    );
  }
}
