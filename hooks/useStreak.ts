import { SharedData } from '~/lib'

const streak = new SharedData(0)
const useStreak = streak.hook()

export { useStreak }
