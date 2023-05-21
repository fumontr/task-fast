import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const url = `https://api.notion.com/v1/databases/${process.env.DB_ID}/query`
  const secret = process.env.SECRET_KEY
  const notionVersion = '2021-08-16'
  const data = {}
  axios
    .post(url, data, {
      headers: {
        Authorization: `Bearer ${secret}`,
        'Notion-Version': notionVersion,
        'Content-Type': 'application/json',
        'Allow-Control-Allow-Origin': '*',
      },
    })
    .then((resp) => {
      console.log(resp)
      console.log(resp.data.results[0])
      res.status(200).json({ message: 'Success', data: resp.data })
    })
    .catch((err) => {
      console.error(err)
      res.status(500).json({ message: 'Failed' })
    })
}
