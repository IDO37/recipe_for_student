import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://axlospaekpdlhlokvijz.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF4bG9zcGFla3BkbGhsb2t2aWp6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MjM4ODIzNCwiZXhwIjoyMDY3OTY0MjM0fQ.bQ0iH94gFa2FvD6MgkRwBW9Pig1uQNDpLp4feAyAS_Y'

export const supabase = createClient(supabaseUrl, supabaseAnonKey) 