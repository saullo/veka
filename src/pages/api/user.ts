import { auth } from "@/lib/firebase";
import { User } from "@/lib/user.type";
import { NextApiRequest, NextApiResponse } from "next";

const index = async (req: NextApiRequest, res: NextApiResponse) => {
  const user = JSON.parse(req.cookies.user!) as User;

  return res.status(200).json(user);
};

const create = async (req: NextApiRequest, res: NextApiResponse) => {
  const { name, email, password } = req.body;

  const createUser = await auth.createUser({
    displayName: name,
    email,
    password,
  });

  const data = { id: createUser.uid, name, email, password };
  return res.status(200).json(data);
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      return index(req, res);
    case "POST":
      return create(req, res);
  }
}
