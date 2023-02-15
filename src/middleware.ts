import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const getUser = async (idToken: string) => {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${process.env.FIREBASE_API_KEY}`;
  const data = { idToken };
  const request = await fetch(url, {
    mode: "same-origin",
    credentials: "same-origin",
    cache: "default",
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const response = await request.json();
  const firebaseUser = response.users[0];

  const user = {
    id: firebaseUser.localId,
    name: firebaseUser.displayName,
    email: firebaseUser.email,
  };
  return user;
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/api/user" && request.method === "POST") {
    return NextResponse.next();
  }

  const header = request.headers.get("Authorization");
  if (!header) {
    return new NextResponse(JSON.stringify({}), {
      status: 401,
      headers: { "content-type": "application/json" },
    });
  }

  const token = header.replace("Bearer ", "");
  const user = await getUser(token);
  request.cookies.set("user", JSON.stringify(user));

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/post/:path*", "/api/user/:path*"],
};
