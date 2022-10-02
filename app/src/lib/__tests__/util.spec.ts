import { getTodayForHeader } from '../util'
import dayjs from 'dayjs'

describe('ヘッダー', () => {
  test('ヘッダー用の日付を取得', () => {
    const today = getTodayForHeader()
    const target = dayjs().locale('ja').format('YYYY/MM/DD ddd')
    expect(today).toEqual(target)
  })
})
