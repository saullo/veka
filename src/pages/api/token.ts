import { auth } from "@/lib/firebase";
import { NextApiRequest, NextApiResponse } from "next";

const createAuthToken = async (email: string, password: string) => {
  const data = { email, password };
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.FIREBASE_API_KEY}`;
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

  return request.json();
};

const create = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = req.body;

  const token = await createAuthToken(email, password);
  if (token.error) {
    const error = token.error;
    return res.status(error.code).json({ message: error.message });
  }

  const user = await auth.getUser(token.localId);

  return res.status(200).json({
    user: { id: user.uid, name: user.displayName, email: user.email },
    token: { access_token: token.idToken },
  });
};

const destroy = (req: NextApiRequest, res: NextApiResponse) => {};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "POST":
      return create(req, res);
    case "DELETE":
      return destroy(req, res);
  }
}
