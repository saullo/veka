import admin from "@/lib/firebase";
import { NextApiRequest, NextApiResponse } from "next";

const create = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = req.body;

  return res.status(200).json({});
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
