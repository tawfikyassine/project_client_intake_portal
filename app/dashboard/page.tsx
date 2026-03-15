'use client';

import { useEffect, useState } from 'react';
import { PortalEngine, IntakeItem } from '@/lib/engine';
import { supabase } from '@/lib/supabase';

export default function Dashboard() {
  const [items, setItems] = useState<IntakeItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real flow, we'd use Supabase Auth to get the user ID
    // Simulating user fetch for demo purposes
    PortalEngine.getChecklist('00000000-0000-0000-0000-000000000000').then(data => {
      setItems(data);
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-8">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-10 pb-6 border-b border-slate-200">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Your Client Portals</h1>
          <button className="bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition shadow-sm">
            + New Portal
          </button>
        </header>

        <main>
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></span>
              Active Intake: Smith & Co LLC
            </h2>
            
            {loading ? (
              <div className="animate-pulse space-y-4">
                <div className="h-12 bg-slate-100 rounded-lg w-full"></div>
                <div className="h-12 bg-slate-100 rounded-lg w-full"></div>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map(item => (
                  <div key={item.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-slate-100 hover:border-blue-100 hover:bg-blue-50/50 transition bg-slate-50/50">
                    <div>
                      <h3 className="font-semibold text-slate-800">{item.title}</h3>
                      <p className="text-sm text-slate-500 mt-1">{item.description}</p>
                    </div>
                    <div className="mt-4 sm:mt-0 flex items-center gap-3">
                      {item.completed ? (
                        <span className="inline-flex items-center rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-700 ring-1 ring-inset ring-green-600/20">
                          Completed
                        </span>
                      ) : (
                        <button className="text-sm font-medium text-blue-600 hover:text-blue-800 bg-white border border-slate-200 px-4 py-2 rounded-lg shadow-sm hover:shadow transition">
                          Upload File
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
