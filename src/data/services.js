// Cennik na podstawie oficjalnego cennika Kamili (obowiązuje od 1.12.2025 r.)
// SERVICES poniżej zasila kreator rezerwacji (/rezerwacja).
// LASH_STYLES / LIP_TREATMENTS / HYALURONIDASE zasilają sekcję "Oferta" na stronie głównej.

export const SERVICE_CATEGORIES = [
  { id: 'rzesy', label: 'Stylizacja rzęs' },
  { id: 'usta', label: 'Usta i hialuronidaza' },
]

/* =========================
   PEŁNY CENNIK — STYLIZACJA RZĘS
   (Założenie / Uzupełnienie do 4 tyg. / Stylizacja UV)
========================= */

export const LASH_STYLES = [
  { id: '1-1', name: '1:1', zalozenie: 150, uzupelnienie: 140, uv: 180 },
  { id: 'light-volume', name: 'Light volume', zalozenie: 180, uzupelnienie: 160, uv: 210 },
  { id: 'russian-volume', name: 'Russian volume', zalozenie: 200, uzupelnienie: 180, uv: 230 },
  { id: 'mega-volume', name: 'Mega volume', zalozenie: 220, uzupelnienie: 200, uv: 250 },
  { id: 'kim-camellia', name: 'Efekt Kim Camellia', zalozenie: 245, uzupelnienie: 235, uv: 275 },
  { id: 'wispy', name: 'Efekt Wispy', zalozenie: 235, uzupelnienie: 200, uv: 260 },
  { id: 'lami', name: 'Efekt Lami', zalozenie: 235, uzupelnienie: 200, uv: 260 },
  { id: 'express-set', name: 'EXPRESS SET', zalozenie: 150, uzupelnienie: 150, uv: 180 },
]

export const LASH_EXTRAS = [
  { id: 'henna', name: 'Henna dolnych rzęs', price: 40 },
  { id: 'farbowanie', name: 'Farbowanie dolnych rzęs', price: 80 },
]

export const LASH_REMOVAL_NOTE = 'Ściągnięcie rzęs (innej stylistki) + 35 zł'

/* =========================
   USTA I HIALURONIDAZA
========================= */

export const LIP_TREATMENTS = [
  { id: 'lips-1ml', name: 'Powiększanie i modelowanie ust — 1 ml', price: 600, badge: 'nowość' },
  { id: 'lips-05ml', name: 'Powiększanie i modelowanie ust — 0.5 ml', price: 450, badge: 'nowość' },
]

export const HYALURONIDASE_TREATMENTS = [
  { id: 'hyaluronidase-partial', name: 'Hialuronidaza częściowa', price: 400 },
  { id: 'hyaluronidase-full', name: 'Hialuronidaza całościowa', price: 600 },
]

/* =========================
   LISTA DLA KREATORA REZERWACJI
   (ceny za założenie / usługę bazową)
========================= */

export const SERVICES = [
  {
    id: 'lash-1-1',
    categoryId: 'rzesy',
    name: 'Stylizacja rzęs 1:1',
    description: 'Efekt naturalny, delikatnie podkreślone spojrzenie.',
    durationMinutes: 120,
    price: 150,
  },
  {
    id: 'lash-light-volume',
    categoryId: 'rzesy',
    name: 'Stylizacja rzęs — Light volume',
    description: 'Lekka objętość, wyraźniejsze niż 1:1.',
    durationMinutes: 130,
    price: 180,
  },
  {
    id: 'lash-russian-volume',
    categoryId: 'rzesy',
    name: 'Stylizacja rzęs — Russian volume',
    description: 'Gęste kępki, wyrazisty efekt objętościowy.',
    durationMinutes: 150,
    price: 200,
  },
  {
    id: 'lash-mega-volume',
    categoryId: 'rzesy',
    name: 'Stylizacja rzęs — Mega volume',
    description: 'Maksymalna gęstość i objętość spojrzenia.',
    durationMinutes: 165,
    price: 220,
  },
  {
    id: 'lash-kim-camellia',
    categoryId: 'rzesy',
    name: 'Stylizacja rzęs — Efekt Kim Camellia',
    description: 'Efektowna, nietuzinkowa stylizacja objętościowa.',
    durationMinutes: 165,
    price: 245,
  },
  {
    id: 'lash-wispy',
    categoryId: 'rzesy',
    name: 'Stylizacja rzęs — Efekt Wispy',
    description: 'Naturalna nieregularność z efektem "puchatych" kępek.',
    durationMinutes: 150,
    price: 235,
  },
  {
    id: 'lash-lami',
    categoryId: 'rzesy',
    name: 'Stylizacja rzęs — Efekt Lami',
    description: 'Uczesane, uniesione rzęsy — efekt laminacji.',
    durationMinutes: 150,
    price: 235,
  },
  {
    id: 'lash-express',
    categoryId: 'rzesy',
    name: 'Stylizacja rzęs — Express Set',
    description: 'Szybkie podkreślenie spojrzenia w 60 minut.',
    durationMinutes: 60,
    price: 150,
  },
  {
    id: 'lash-removal',
    categoryId: 'rzesy',
    name: 'Zdjęcie stylizacji rzęs',
    description: 'Bezpieczne, delikatne usunięcie poprzedniej stylizacji.',
    durationMinutes: 30,
    price: 35,
  },
  {
    id: 'lips-1ml',
    categoryId: 'usta',
    name: 'Powiększanie i modelowanie ust — 1 ml',
    description: 'Kwas hialuronowy, naturalne podkreślenie ust.',
    durationMinutes: 45,
    price: 600,
  },
  {
    id: 'lips-05ml',
    categoryId: 'usta',
    name: 'Powiększanie i modelowanie ust — 0.5 ml',
    description: 'Delikatna korekta objętości i konturu ust.',
    durationMinutes: 45,
    price: 450,
  },
  {
    id: 'hyaluronidase-partial',
    categoryId: 'usta',
    name: 'Hialuronidaza częściowa',
    description: 'Częściowe rozpuszczenie wcześniej podanego kwasu.',
    durationMinutes: 30,
    price: 400,
  },
  {
    id: 'hyaluronidase-full',
    categoryId: 'usta',
    name: 'Hialuronidaza całościowa',
    description: 'Całkowite rozpuszczenie wcześniej podanego kwasu.',
    durationMinutes: 45,
    price: 600,
  },
]

export function getServiceById(id) {
  return SERVICES.find((service) => service.id === id) ?? null
}