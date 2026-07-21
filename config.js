// =====================================================================
// ОБЩАЯ КОНФИГУРАЦИЯ — подключается во всех страницах админ-панели
// (admin.html, database.html, lists.html), чтобы ключи хранились
// в одном месте и не расходились между файлами при копировании.
// =====================================================================

const SUPABASE_URL = 'https://ktacbvcwsyajpeacdmwt.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt0YWNidmN3c3lhanBlYWNkbXd0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ1NjM4NDgsImV4cCI6MjEwMDEzOTg0OH0.OhjANu7A7Wb7GUsBjVzrvjkGJlgVsehSf6EyC1DMxR8';
const TMDB_API_KEY = '3a3430d210cbf6ae4ee54b1ffc523ddd';

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
