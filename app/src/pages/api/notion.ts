import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'
import { NotionTask } from '../../models/notion'
import { Task } from '../../models/task'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const url = `https://api.notion.com/v1/databases/${process.env.DB_ID}/query`
  const secret = process.env.SECRET_KEY
  const notionVersion = '2021-08-16'
  const data = {}
  const config = {
    headers: {
      Authorization: `Bearer ${secret}`,
      'Notion-Version': notionVersion,
      'Content-Type': 'application/json',
      'Allow-Control-Allow-Origin': '*',
    },
  }

  try {
    const response = await axios.post(url, data, config)
    const tasks: NotionTask[] = response.data.results.map(transformToTask)
    res.status(200).json({ message: 'Success', data: tasks })
  } catch (err) {
    res.status(500).json({ message: 'Failed' })
  }
}

const transformToTask = (data: NotionTask): Task => {
  let end = null
  if (data.properties.End.rich_text.length !== 0) {
    end = data.properties.End.rich_text[0].text.content
  }
  return {
    pageId: data.id,
    name: data.properties.Name.title[0].text.content,
    tag: data.properties.Tag.multi_select[0].name,
    start: data.properties.Start.rich_text[0].text.content,
    end: end,
  }
}
