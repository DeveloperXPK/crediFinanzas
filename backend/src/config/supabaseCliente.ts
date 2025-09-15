import { createClient } from "@supabase/supabase-js";
import dotenv from 'dotenv';


dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseKey || !supabaseUrl) {
    throw new Error("No se encontro la supabase_url o supabase_key en .env");
}

export const supabase = createClient(supabaseUrl, supabaseKey);