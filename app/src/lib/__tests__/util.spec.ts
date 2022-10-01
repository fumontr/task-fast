import { getTodayForHeader } from '../util'

describe('ヘッダー', () => {
  test('ヘッダー用の日付を取得', () => {
    const today = getTodayForHeader()
    expect(today).toEqual('2022/10/01 土')
  })
})
