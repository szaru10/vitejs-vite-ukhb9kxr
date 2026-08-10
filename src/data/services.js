// Mockowa lista usług. W przyszłości podmień to na fetch('/api/services')
// albo dane z Twojego CMS-a / bazy danych.

export const SERVICE_CATEGORIES = [
    { id: 'rzesy', label: 'Rzęsy' },
    { id: 'usta', label: 'Usta' },
  ]
  
  export const SERVICES = [
    {
      id: 'lash-classic',
      categoryId: 'rzesy',
      name: 'Stylizacja rzęs — metoda klasyczna',
      description: '1:1, efekt naturalny, delikatnie podkreślone spojrzenie.',
      durationMinutes: 90,
      price: 150,
    },
    {
      id: 'lash-volume',
      categoryId: 'rzesy',
      name: 'Stylizacja rzęs — mega objętość',
      description: 'Gęste, wyraziste rzęsy metodą kępkową.',
      durationMinutes: 120,
      price: 220,
    },
    {
      id: 'lash-hybrid',
      categoryId: 'rzesy',
      name: 'Stylizacja rzęs — metoda hybrydowa',
      description: 'Połączenie efektu naturalnego i objętościowego.',
      durationMinutes: 105,
      price: 190,
    },
    {
      id: 'lash-removal',
      categoryId: 'rzesy',
      name: 'Zdjęcie stylizacji rzęs',
      description: 'Bezpieczne, delikatne usunięcie poprzedniej stylizacji.',
      durationMinutes: 30,
      price: 40,
    },
    {
      id: 'lips-contour',
      categoryId: 'usta',
      name: 'Modelowanie ust kwasem hialuronowym',
      description: 'Naturalne podkreślenie konturu i objętości ust.',
      durationMinutes: 45,
      price: 480,
    },
    {
      id: 'lips-hydro',
      categoryId: 'usta',
      name: 'Zabieg nawilżający na usta',
      description: 'Regeneracja i nawilżenie bez ingerencji w objętość.',
      durationMinutes: 30,
      price: 180,
    },
  ]
  
  export function getServiceById(id) {
    return SERVICES.find((service) => service.id === id) ?? null
  }