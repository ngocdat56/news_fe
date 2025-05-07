import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.REACT_APP_SUPABASE_URL': JSON.stringify('https://oizscsknwuxyaxqcukey.supabase.co'),
    'process.env.REACT_APP_SUPABASE_ANON_KEY': JSON.stringify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9penNjc2tud3V4eWF4cWN1a2V5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY1NzQ3NzAsImV4cCI6MjA2MjE1MDc3MH0.Ja44NTIo_ejgrRntjhiqffku9xteYdiKTtSvcRrTFqY')
  }
})