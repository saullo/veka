import { firestore } from "@/lib/firebase";
import { User } from "@/lib/user.type";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

const create = async (req: NextApiRequest, res: NextApiResponse) => {
  const schema = z.object({
    content: z.string(),
  });

  const validation = schema.safeParse(req.body);
  if (!validation.success) {
    return res.status(400).json({});
  }

  const { content } = validation.data;
  const user = JSON.parse(req.cookies.user!) as User;

  const post = await firestore
    .collection("feed")
    .doc(user.id)
    .collection("latest")
    .add({ content });

  return res.status(200).json({ id: post.id, content });
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "POST":
      return create(req, res);
  }
}
