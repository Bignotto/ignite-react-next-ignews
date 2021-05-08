import { NextApiRequest, NextApiResponse } from "next";

export default (request: NextApiRequest, response: NextApiResponse) => {
  console.log("evento");
  return response.status(200).json({ deu: "certo!" });
};
