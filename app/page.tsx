import { Hero } from '@/components/Hero';
import { Pricing } from '@/components/Pricing';
import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';

export default async function Home() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <main className="min-h-screen bg-slate-950 flex flex-col items-center pt-10">
      <nav className="w-full max-w-7xl px-6 lg:px-8 py-4 flex justify-between items-center text-white">
        <div className="font-bold text-xl tracking-tight text-white flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
            P
          </div>
          PortalPro
        </div>
        <div className="flex gap-4 items-center">
          <a href="#pricing" className="text-sm font-medium hover:text-blue-400 transition-colors">Pricing</a>
          {user ? (
            <Link href="/dashboard" className="text-sm font-medium bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition-colors">
              Dashboard
            </Link>
          ) : (
            <Link href="/login" className="text-sm font-medium bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition-colors">
              Login
            </Link>
          )}
        </div>
      </nav>
      
      <Hero />
      <Pricing userId={user?.id} />
      
      <footer className="w-full mt-24 py-8 border-t border-white/10 text-center text-gray-500 text-sm">
        © 2026 PortalPro Micro-SaaS. Built with AI.
      </footer>
    </main>
  );
}
