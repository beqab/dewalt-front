import { revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";

type RevalidateBody = {
  secret?: string;
  tag?: string;
  tags?: string[];
};

export async function POST(request: NextRequest) {
  let body: RevalidateBody = {};
  try {
    body = (await request.json()) as RevalidateBody;
  } catch {
    body = {};
  }

  const secret = body.secret;
  const expected = process.env.REVALIDATE_SECRET;

  if (!expected || secret !== expected) {
    return NextResponse.json({ revalidated: false }, { status: 401 });
  }

  const tags = (body.tags ?? (body.tag ? [body.tag] : [])).filter(Boolean);
  if (tags.length === 0) {
    return NextResponse.json(
      { revalidated: false, message: "Missing tag(s)" },
      { status: 400 }
    );
  }

  for (const tag of tags) {
    revalidateTag(tag, "max");
  }

  return NextResponse.json({ revalidated: true, tags, at: Date.now() });
}
