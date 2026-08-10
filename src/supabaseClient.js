import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    '[Supabase] Brak VITE_SUPABASE_URL lub VITE_SUPABASE_ANON_KEY w pliku .env. ' +
      'Rezerwacje i panel admina nie będą działać, dopóki nie uzupełnisz tych wartości.',
  )
}

export const supabase = createClient(
  supabaseUrl ?? '',
  supabaseAnonKey ?? '',
)