import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = 'https://iqxrjeisyzjwnxfkyiiu.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlxeHJqZWlzeXpqd254Zmt5aWl1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3OTc4OTQsImV4cCI6MjA3NTM3Mzg5NH0.tIxIVczP-rT_MdGyUckOTZckqRXMgez3ActH4Nb68s8';

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error("As variáveis de ambiente devem ser definidas");
}

// Exportando uma const supabase com os recursos de acesso ao back-end
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);