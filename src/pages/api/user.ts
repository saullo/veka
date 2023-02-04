import admin from "@/lib/firebase";
import { NextApiRequest, NextApiResponse } from "next";

const create = async (req: NextApiRequest, res: NextApiResponse) => {
  const { name, email, password } = req.body;

  const createUser = await admin.auth().createUser({
    displayName: name,
    email,
    password,
  });

  const data = { id: createUser.uid, name, email, password };
  return res.status(200).json(data);
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "POST":
      return create(req, res);
  }
}
