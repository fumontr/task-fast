import dayjs from 'dayjs'
import 'dayjs/locale/ja'

export const getTodayForHeader = () => {
  return dayjs().locale('ja').format('YYYY/MM/DD ddd')
}
