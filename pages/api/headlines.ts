// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from "next";
import { fetchLatestUKNews } from "../../core/api/server";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const response = await fetchLatestUKNews(req.query);
    res.statusCode = 200;
    res.json(response);
  } catch (error) {
    res.statusCode = 400;
    res.json({
      message: error?.message,
    });
  }
};
