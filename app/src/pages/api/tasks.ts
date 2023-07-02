import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

import { NotionTask } from '../../models/notion'
import { Task } from '../../models/task'

const databaseId = process.env.DB_ID
const secret = process.env.SECRET_KEY

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const url = 'https://api.notion.com/v1/pages'
  const notionVersion = '2021-08-16'

  const config = {
    headers: {
      Authorization: `Bearer ${secret}`,
      'Notion-Version': notionVersion,
      'Content-Type': 'application/json',
      'Allow-Control-Allow-Origin': '*',
    },
  }

  if (req.method == 'GET') {
    try {
      const getURL = `https://api.notion.com/v1/databases/${process.env.DB_ID}/query`
      const response = await axios.post(getURL, {}, config)
      const tasks: NotionTask[] = response.data.results
        .map(transformToTask)
        .filter((task: Task) => task.start !== '')
      res.status(200).json({ message: 'Success', data: tasks })
    } catch (err) {
      res.status(500).json({ message: 'Failed' })
    }
  } else if (req.method == 'POST') {
    const body = JSON.parse(req.body)
    const requestBody = createCreateTaskBody(body.name, body.tag, body.start)
    try {
      const response = await axios.post(url, requestBody, config)
      res.status(200).json({ message: 'Success', data: response.data })
    } catch (err) {
      res.status(500).json({ message: 'Failed' })
    }
  } else if (req.method == 'PATCH') {
    const body = JSON.parse(req.body)
    const requestBody = createUpdateTaskBody(body.end)
    try {
      const response = await axios.patch(
        `${url}/${body.pageId}`,
        requestBody,
        config
      )
      res.status(200).json({ message: 'Success', data: response.data })
    } catch (err) {
      res.status(500).json({ message: 'Failed' })
    }
  }
}

const createCreateTaskBody = (name: string, tag: string, start: string) => {
  return {
    parent: { database_id: databaseId },
    properties: {
      title: {
        title: [
          {
            text: {
              content: name,
            },
          },
        ],
      },
      Tag: {
        multi_select: [
          {
            name: tag,
          },
        ],
      },
      Start: {
        rich_text: [
          {
            type: 'text',
            text: {
              content: start,
              link: null,
            },
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: 'default',
            },
            plain_text: start,
            href: null,
          },
        ],
      },
    },
  }
}

const createUpdateTaskBody = (end: string) => {
  return {
    parent: { database_id: databaseId },
    properties: {
      End: {
        rich_text: [
          {
            type: 'text',
            text: {
              content: end,
              link: null,
            },
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: 'default',
            },
            plain_text: end,
            href: null,
          },
        ],
      },
    },
  }
}

const transformToTask = (data: NotionTask): Task  => {
  let end = null
  if (data.properties.End.rich_text.length !== 0) {
    end = data.properties.End.rich_text[0].text.content
  }
  return {
    pageId: data.id,
    name:
      data.properties.Name.title.length > 0
        ? data.properties.Name.title[0].text.content
        : '',
    tag:
      data.properties.Tag.multi_select.length > 0
        ? data.properties.Tag.multi_select[0].name
        : '',
    start:
      data.properties.Start.rich_text.length > 0
        ? data.properties.Start.rich_text[0].text.content
        : '',
    end: end,
  }
}
