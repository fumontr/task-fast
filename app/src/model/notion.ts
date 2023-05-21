type User = {
  object: string
  id: string
}

type PropertyTitleContent = {
  content: string
  link: null | string
}

type PropertyTitle = {
  type: string
  text: PropertyTitleContent
  annotations: {
    bold: boolean
    italic: boolean
    strikethrough: boolean
    underline: boolean
    code: boolean
    color: string
  }
  plain_text: string
  href: null | string
}

type PropertyDate = {
  start: string
  end: string
  time_zone: null | string
}

type Properties = {
  Tag: {
    id: string
    type: string
    multi_select: Array<{ id: string; name: string; color: string }>
  }
  Time: {
    id: string
    type: string
    date: PropertyDate
  }
  Name: {
    id: string
    type: string
    title: PropertyTitle[]
  }
}

type NotionDataType = {
  object: string
  id: string
  created_time: string
  last_edited_time: string
  created_by: User
  last_edited_by: User
  parent: {
    type: string
    database_id: string
  }
  archived: boolean
  properties: Properties
  url: string
}

export type {
  User,
  PropertyTitleContent,
  PropertyTitle,
  PropertyDate,
  Properties,
  NotionDataType,
}
