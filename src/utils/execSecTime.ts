
export default function execSecTime(t: number) {
  if (!t) t = 0
  let m: string | number = parseInt((t / 60) + '')
  let s: string | number = parseInt((t % 60) + '')
  if (m < 10) m = '0' + m
  if (s < 10) s = '0' + s
  return `${m}:${s}`
}