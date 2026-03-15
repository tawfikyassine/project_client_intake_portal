import Link from 'next/link';

export function Pricing() {
  const starterLink = process.env.NEXT_PUBLIC_STRIPE_STARTER_LINK || '#';
  const proLink = process.env.NEXT_PUBLIC_STRIPE_PRO_LINK || '#';

  return (
    <section id="pricing" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base font-semibold leading-7 text-blue-400">Pricing</h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Simple pricing, no surprises.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 gap-y-6 sm:mt-20 lg:max-w-4xl lg:grid-cols-2 lg:gap-x-8">
          
          {/* Starter Plan */}
          <div className="rounded-3xl p-8 ring-1 ring-white/10 bg-slate-900/50 backdrop-blur">
            <h3 className="text-lg font-semibold leading-8 text-white">Starter</h3>
            <p className="mt-4 text-sm leading-6 text-gray-300">Perfect for solo professionals.</p>
            <p className="mt-6 flex items-baseline gap-x-1">
              <span className="text-4xl font-bold tracking-tight text-white">$9</span>
              <span className="text-sm font-semibold leading-6 text-gray-300">/month</span>
            </p>
            <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-300">
              <li className="flex gap-x-3">✓ Up to 10 Client Portals</li>
              <li className="flex gap-x-3">✓ Standard Templates</li>
              <li className="flex gap-x-3">✓ Email Support</li>
            </ul>
            <a
              href={starterLink}
              className="mt-8 block rounded-md bg-white/10 px-3 py-2 text-center text-sm font-semibold leading-6 text-white hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors"
            >
              Get Starter
            </a>
          </div>

          {/* Pro Plan */}
          <div className="rounded-3xl p-8 ring-2 ring-blue-500 bg-slate-900 shadow-2xl shadow-blue-500/10">
            <h3 className="text-lg font-semibold leading-8 text-blue-400">Pro</h3>
            <p className="mt-4 text-sm leading-6 text-gray-300">For growing agencies and firms.</p>
            <p className="mt-6 flex items-baseline gap-x-1">
              <span className="text-4xl font-bold tracking-tight text-white">$29</span>
              <span className="text-sm font-semibold leading-6 text-gray-300">/month</span>
            </p>
            <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-300">
              <li className="flex gap-x-3 text-white font-medium">✓ Unlimited Client Portals</li>
              <li className="flex gap-x-3">✓ Custom Branding</li>
              <li className="flex gap-x-3">✓ Automations & Webhooks</li>
              <li className="flex gap-x-3">✓ Priority 24/7 Support</li>
            </ul>
            <a
              href={proLink}
              className="mt-8 block rounded-md bg-blue-500 px-3 py-2 text-center text-sm font-semibold leading-6 text-white hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 hover:scale-[1.02] transition-all"
            >
              Get Pro
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
