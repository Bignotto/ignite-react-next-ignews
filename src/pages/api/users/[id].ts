import { NextApiRequest, NextApiResponse } from "next";

export default (request: NextApiRequest, response: NextApiResponse) => {
  const id = request.query;
  console.log(id);
  const users = [
    { id: 1, name: "Thiago" },
    { id: 2, name: "Damaris" },
    { id: 3, name: "Guilherme" },
    { id: 4, name: "Pedro" },
    { id: 5, name: "André" },
    { id: 6, name: "Gabriel" },
    { id: 7, name: "Felipe" },
    { id: 8, name: "Sérgio" },
    { id: 9, name: "Gelson" },
    { id: 10, name: "Vitor" },
    { id: 11, name: "Edgard" },
  ];

  return response.json(users);
};
