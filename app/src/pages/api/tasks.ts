import { SecretManagerServiceClient } from '@google-cloud/secret-manager'
import axios from 'axios'
import { GoogleAuth } from 'google-auth-library'
import { NextApiRequest, NextApiResponse } from 'next'

import { NotionTask } from '../../models/notion'
import { Task } from '../../models/task'

let SECRET = ''
let DB = ''

const fetchEnvironments = async () => {
  const NOTION_SECRET_KEY = 'NOTION_SECRET_KEY'
  const DB_ID = 'DB_ID'

  const private_key = process.env.PRIVATE_KEY ?? ''
  const privateKey = Buffer.from(private_key, 'base64').toString('utf8')

  const DB_ID_VERSION = process.env.DB_ID_VERSION ?? 1

  const auth = new GoogleAuth({
    credentials: {
      private_key: privateKey.replace(/\\n/g, '\n'),
      client_email: process.env.CLIENT_EMAIL,
    },
    projectId: process.env.PROJECT_ID,
  })

  const client = new SecretManagerServiceClient({ auth })
  const secretResp = await client.accessSecretVersion({
    name: `projects/task-fast-0928/secrets/${NOTION_SECRET_KEY}/versions/1`, // TODO: バージョン管理に対応
  })

  const secret = secretResp[0].payload?.data?.toString()
  SECRET = secret ?? '' // TODO: エラーハンドリング

  const dbIdResp = await client.accessSecretVersion({
    name: `projects/task-fast-0928/secrets/${DB_ID}/versions/${DB_ID_VERSION}`, // TODO: バージョン管理に対応
  })

  const dbId = dbIdResp[0].payload?.data?.toString()
  DB = dbId ?? '' // TODO: エラーハンドリング
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const url = 'https://api.notion.com/v1/pages'
  const notionVersion = '2021-08-16'

  // Notionへの捜査に必要な環境変数がなければSecret Managerから取ってくる
  if (SECRET === '' || DB === '') {
    await fetchEnvironments()
  }

  if (SECRET === '' || DB === '') {
    console.log(
      `Failed to fetch environments: ${SECRET === '' ? 'SECRET' : ''}, ${
        DB === '' ? 'DB' : ''
      }`
    )
    res.status(500).json({ message: 'Failed' })
    return
  }

  const config = {
    headers: {
      Authorization: `Bearer ${SECRET}`,
      'Notion-Version': notionVersion,
      'Content-Type': 'application/json',
      'Allow-Control-Allow-Origin': '*',
    },
  }

  if (req.method == 'GET') {
    try {
      const getURL = `https://api.notion.com/v1/databases/${DB}/query`
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
    parent: { database_id: DB },
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
    parent: { database_id: DB },
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

const transformToTask = (data: NotionTask): Task => {
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
