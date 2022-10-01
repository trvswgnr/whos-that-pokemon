/**
 * Determines whether a string is similar enough to another string to be considered a match.
 */
export function isCloseMatch(a: string, b: string, threshold = 0.8): boolean {
  return jaroWinkler(a, b) > threshold
}

/**
 * Calculates the Jaro-Winkler distance between two strings,
 * with 0 being completely different strings and 1 being identical strings.
 */
export function jaroWinkler(a: string, b: string): number {
  const mtp = matches(a, b)
  const m = mtp[0]

  if (m === 0) {
    return 0
  }

  const j = (m / a.length + m / b.length + (m - mtp[1]) / m) / 3
  const jw = j < 0.7 ? j : j + Math.min(0.1, 1 / mtp[3]) * mtp[2] * (1 - j)

  return jw
}

/**
 * Returns an array with the number of matches, transpositions,
 * prefix length, and the number of prefix matches.
 */
function matches(a: string, b: string): number[] {
  const range = Math.floor(Math.max(a.length, b.length) / 2) - 1
  const rangeFloor = Math.floor(range)
  const ms1 = new Array(a.length)
  const ms2 = new Array(b.length)
  let transpositions = 0

  for (let i = 0; i < a.length; i++) {
    const low = i >= rangeFloor ? i - rangeFloor : 0
    const high = i + rangeFloor <= b.length ? i + rangeFloor : b.length - 1

    for (let j = low; j <= high; j++) {
      if (ms2[j] !== true && a.charAt(i) === b.charAt(j)) {
        ms1[i] = true
        ms2[j] = true
        break
      }
    }
  }

  let i1 = ms1.indexOf(true)
  let i2 = ms2.indexOf(true)

  while (i1 !== -1 && i2 !== -1) {
    if (a.charAt(i1) !== b.charAt(i2)) {
      transpositions++
    }
    i1 = ms1.indexOf(true, i1 + 1)
    i2 = ms2.indexOf(true, i2 + 1)
  }
  const prefixLength: number = getPrefixLength(a, b)

  return [
    ms1.filter(Boolean).length,
    transpositions / 2,
    prefixLength,
    prefixLength / 4
  ]
}

/**
 * Returns the length of the matching prefix between two strings.
 * The prefix length is the number of matching characters at the start of the string.
 */
function getPrefixLength(a: string, b: string): number {
  let n = 0
  const min = Math.min(4, Math.min(a.length, b.length))

  for (let i = 0; i < min; i++) {
    if (a.charAt(i) === b.charAt(i)) {
      n++
      continue
    }

    break
  }

  return n
}

