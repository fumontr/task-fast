import { NextApiRequest, NextApiResponse } from 'next'

import { getClient } from './tasks'

// TODO: Updateに対応（今はCreateしかできない）
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const PROJECT_ID = 'projects/task-fast-0928'

  const body = JSON.parse(req.body)
  const userId = body.userID
  const apiKey = body.apiKey
  const dbId = body.dbID
  console.log(`${body}, ${userId}, ${apiKey}, ${dbId}}`)

  const client = getClient()

  const apiSecretId = `NotionAPI${userId}`
  console.log(apiSecretId)

  const [apiSecret] = await client.createSecret({
    parent: PROJECT_ID,
    secretId: apiSecretId,
    secret: {
      replication: {
        automatic: {},
      },
    },
  })

  console.log('Created secret: ', apiSecret.name)

  const [apiVersion] = await client.addSecretVersion({
    parent: apiSecret.name,
    payload: {
      data: Buffer.from(apiKey, 'utf8'),
    },
  })

  console.log('Added secret version: ', apiVersion.name)

  const dbSecretId = `NotionDB${userId}`

  const [dbSecret] = await client.createSecret({
    parent: PROJECT_ID,
    secretId: dbSecretId,
    secret: {
      replication: {
        automatic: {},
      },
    },
  })

  console.log('Created secret: ', dbSecret.name)

  const [dbVersion] = await client.addSecretVersion({
    parent: dbSecret.name,
    payload: {
      data: Buffer.from(dbId, 'utf8'),
    },
  })

  console.log('Added secret version: ', dbVersion.name)

  res.status(200).json({ api: apiSecret.name, db: dbSecret.name })
}
