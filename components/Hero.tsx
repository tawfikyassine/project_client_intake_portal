import Link from 'next/link';

export function Hero() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 text-center">
      <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-7xl mb-6">
        Client Intake, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600">Perfected.</span>
      </h1>
      <p className="mx-auto max-w-2xl text-lg text-gray-300 mb-10">
        Stop chasing clients for documents. Create secure, guided intake portals for your professional services in 60 seconds.
      </p>
      <div className="flex justify-center gap-4">
        <Link 
          href="/dashboard"
          className="rounded-full bg-blue-600 px-8 py-4 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all hover:scale-105"
        >
          Start Building For Free
        </Link>
        <Link 
          href="#pricing"
          className="rounded-full bg-slate-800 px-8 py-4 text-sm font-semibold text-white shadow-sm hover:bg-slate-700 transition-all"
        >
          View Pricing
        </Link>
      </div>
    </section>
  );
}
