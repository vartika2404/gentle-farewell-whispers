// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://omloybanrqvjmrinatdy.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9tbG95YmFucnF2am1yaW5hdGR5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUwMDE3OTUsImV4cCI6MjA2MDU3Nzc5NX0.pKXoAWGRIA_78bcE_wCfo0PyK6VN_-6D2TgLMs4pSeA";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);