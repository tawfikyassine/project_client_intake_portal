'use client';

import { useEffect, useState, useRef } from 'react';
import { PortalEngine, IntakeItem } from '@/lib/engine';
import { Upload, Plus, CheckCircle, FileText, Loader2 } from 'lucide-react';

export default function Dashboard() {
  const [items, setItems] = useState<IntakeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploadingId, setUploadingId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeItemId, setActiveItemId] = useState<string | null>(null);
  const [portalName, setPortalName] = useState("Smith & Co LLC");

  // Keep a reference to the static anonymous user ID for our demo
  const DEMO_USER_ID = '00000000-0000-0000-0000-000000000000';

  useEffect(() => {
    fetchChecklist();
  }, []);

  const fetchChecklist = () => {
    PortalEngine.getChecklist(DEMO_USER_ID).then(data => {
      setItems(data);
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });
  };

  const handleUploadClick = (itemId: string) => {
    setActiveItemId(itemId);
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !activeItemId) return;

    try {
      setUploadingId(activeItemId);
      
      // Simulate network/upload delay for realism
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app we'd upload to Supabase Storage and get a URL here
      const mockFileUrl = `https://storage.example.com/${file.name}`;
      
      await PortalEngine.completeItem(DEMO_USER_ID, activeItemId, mockFileUrl);
      
      // Update local state to reflect completion
      setItems(prevItems => prevItems.map(item => 
        item.id === activeItemId ? { ...item, completed: true, fileUrl: mockFileUrl } : item
      ));

      // Reset file input
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (err) {
      console.error('Failed to complete item:', err);
      alert("Failed to upload file. Please try again.");
    } finally {
      setUploadingId(null);
      setActiveItemId(null);
    }
  };

  const handleNewPortal = () => {
    const name = window.prompt("Enter new client portal name:");
    if (name && name.trim()) {
      setLoading(true);
      // Simulate creation delay
      setTimeout(() => {
        setPortalName(name);
        // Reset checklist for the "new" portal
        setItems(items.map(i => ({ ...i, completed: false, fileUrl: undefined })));
        setLoading(false);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-8">
      <div className="max-w-4xl mx-auto">
        <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-10 pb-6 border-b border-slate-200">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Your Client Portals</h1>
            <p className="text-sm text-slate-500 mt-1">Manage intake checklists and files</p>
          </div>
          <button 
            onClick={handleNewPortal}
            className="mt-4 sm:mt-0 flex items-center justify-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition shadow-sm"
          >
            <Plus className="w-4 h-4" />
            New Portal
          </button>
        </header>

        <main>
          {/* Hidden file input for handling uploads */}
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            className="hidden" 
          />

          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></span>
              Active Intake: {portalName}
            </h2>
            
            {loading ? (
              <div className="animate-pulse space-y-4">
                <div className="h-20 bg-slate-100 rounded-xl w-full"></div>
                <div className="h-20 bg-slate-100 rounded-xl w-full"></div>
                <div className="h-20 bg-slate-100 rounded-xl w-full"></div>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map(item => (
                  <div key={item.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-xl border border-slate-100 hover:border-blue-100 hover:bg-blue-50/50 transition bg-slate-50/50 group">
                    <div className="flex gap-4">
                      <div className="mt-1">
                        {item.completed ? (
                          <CheckCircle className="w-6 h-6 text-green-500" />
                        ) : (
                          <FileText className="w-6 h-6 text-slate-300" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                          {item.title}
                          {item.required && <span className="text-[10px] uppercase font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded-full">Required</span>}
                        </h3>
                        <p className="text-sm text-slate-500 mt-1 leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                    <div className="mt-4 sm:mt-0 flex items-center gap-3 pl-10 sm:pl-0">
                      {item.completed ? (
                        <div className="flex items-center gap-2">
                          <span className="inline-flex items-center rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700 ring-1 ring-inset ring-green-600/20">
                            Completed
                          </span>
                        </div>
                      ) : (
                        <button 
                          onClick={() => handleUploadClick(item.id)}
                          disabled={uploadingId === item.id}
                          className="flex items-center justify-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-800 bg-white border border-slate-200 px-4 py-2 rounded-lg shadow-sm hover:shadow hover:border-blue-300 transition disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
                        >
                          {uploadingId === item.id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Upload className="w-4 h-4" />
                          )}
                          {uploadingId === item.id ? 'Uploading...' : 'Upload File'}
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
