import { useStreak } from '~/hooks'

export function StreakCount() {
  const [streak] = useStreak()
  return (
    <h2 className="text-display text-5xl fixed top-5 right-5">
      {
        streak > 0 && streak < 4
          ? (
            Array.from({ length: streak }, (_, i) => (
              <span key={i} className="inline-block">🔥</span>
            ))
          )
          : (
            streak > 0
              ? (
                <span className="inline-block">🔥x {streak}</span>
              )
              : null
          )
      }
    </h2>
  )
}
