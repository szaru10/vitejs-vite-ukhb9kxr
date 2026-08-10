// Mockowa dostępność terminów.
// W przyszłości zamień funkcje poniżej na fetch('/api/availability?...'),
// zachowując te same kształty danych zwracanych do komponentów.

const DAY_NAMES = ['Nd', 'Pon', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob']
const MONTH_NAMES = [
  'stycznia', 'lutego', 'marca', 'kwietnia', 'maja', 'czerwca',
  'lipca', 'sierpnia', 'września', 'października', 'listopada', 'grudnia',
]

const WORK_START_MINUTES = 9 * 60
const WORK_END_MINUTES = 18 * 60

function toIsoDate(date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

// Prosty, deterministyczny hash tekstu -> liczba (ten sam wynik za każdym razem
// dla tego samego stringa, więc dostępność nie "skacze" między renderami).
function seedFromString(str) {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) | 0
  }
  return Math.abs(hash)
}

/**
 * Zwraca listę kolejnych dni roboczych (salon zamknięty w niedziele) wraz
 * z informacją, czy danego dnia są jeszcze wolne miejsca.
 */
export function getAvailableDays(count = 21, startDate = new Date()) {
  const days = []
  const cursor = new Date(startDate)
  cursor.setHours(0, 0, 0, 0)

  while (days.length < count) {
    const isSunday = cursor.getDay() === 0
    const isoDate = toIsoDate(cursor)
    const seed = seedFromString(isoDate)

    days.push({
      isoDate,
      dayName: DAY_NAMES[cursor.getDay()],
      dayNumber: cursor.getDate(),
      monthName: MONTH_NAMES[cursor.getMonth()],
      isClosed: isSunday,
      // ok. 1 na 6 dni roboczych wygląda na w pełni zajęty
      hasFreeSlots: !isSunday && seed % 6 !== 0,
    })

    cursor.setDate(cursor.getDate() + 1)
  }

  return days
}

/**
 * Zwraca listę slotów czasowych dla danego dnia i długości usługi.
 * Część slotów jest oznaczona jako zajęta (deterministycznie, na podstawie
 * daty + godziny), żeby siatka wyglądała realistycznie.
 */
export function getTimeSlots(isoDate, durationMinutes = 60) {
  const stepMinutes = 30
  const slots = []

  for (
    let minutes = WORK_START_MINUTES;
    minutes + durationMinutes <= WORK_END_MINUTES;
    minutes += stepMinutes
  ) {
    const hh = String(Math.floor(minutes / 60)).padStart(2, '0')
    const mm = String(minutes % 60).padStart(2, '0')
    const time = `${hh}:${mm}`
    const seed = seedFromString(`${isoDate}-${time}`)

    slots.push({
      time,
      available: seed % 5 !== 0,
    })
  }

  return slots
}