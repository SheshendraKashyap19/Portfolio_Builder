
import React, { useState, useEffect } from 'react';
import Editor from './components/Editor';
import Preview from './components/Preview';
import { PortfolioData, ThemeType } from './types';
import { Share, Download, Monitor, Smartphone, Eye, Palette } from 'lucide-react';

const INITIAL_DATA: PortfolioData = {
  basics: {
    name: 'Alex Rivera',
    title: 'Full Stack Developer',
    email: 'alex.rivera@example.com',
    location: 'Austin, Texas',
    bio: 'Passionate developer building scalable web applications with React and Node.js. Focused on creating user-centric experiences through clean code and modern architecture.',
    github: 'arivera-dev',
    linkedin: 'alexrivera'
  },
  experiences: [
    {
      id: '1',
      company: 'TechFlow Systems',
      role: 'Senior Software Engineer',
      period: '2021 - Present',
      description: 'Lead developer for the core SaaS platform, overseeing the migration from monolithic architecture to microservices. Mentored junior developers and improved CI/CD pipeline efficiency by 40%.'
    }
  ],
  projects: [
    {
      id: '1',
      name: 'EcoTrack App',
      description: 'A mobile-first platform for tracking personal carbon footprints. Features real-time data visualization and gamified sustainability challenges.',
      techStack: ['React Native', 'Firebase', 'D3.js']
    }
  ],
  skills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS', 'Docker', 'GraphQL'],
  education: [
    {
      id: '1',
      school: 'University of Texas',
      degree: 'B.S. in Computer Science',
      year: '2019'
    }
  ]
};

const App: React.FC = () => {
  const [data, setData] = useState<PortfolioData>(() => {
    const saved = localStorage.getItem('folio_flow_data');
    return saved ? JSON.parse(saved) : INITIAL_DATA;
  });
  
  const [theme, setTheme] = useState<ThemeType>(() => {
    return (localStorage.getItem('folio_flow_theme') as ThemeType) || 'modern';
  });

  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [isEditorOpen, setIsEditorOpen] = useState(true);

  useEffect(() => {
    localStorage.setItem('folio_flow_data', JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    localStorage.setItem('folio_flow_theme', theme);
  }, [theme]);

  const handleShare = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio-${data.basics.name.toLowerCase().replace(/\s+/g, '-')}.json`;
    a.click();
  };

  return (
    <div className="h-screen flex flex-col bg-slate-100 overflow-hidden">
      {/* Top Navigation */}
      <nav className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 z-10 shrink-0">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-200">
              <span className="text-white font-bold text-lg">F</span>
            </div>
            <h1 className="font-bold text-xl text-slate-900 tracking-tight hidden md:block">FolioFlow AI</h1>
          </div>
          
          <div className="hidden md:flex gap-1 p-1 bg-slate-100 rounded-lg">
            {(['modern', 'minimal', 'cyber', 'corporate'] as ThemeType[]).map((t) => (
              <button
                key={t}
                onClick={() => setTheme(t)}
                className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-md transition-all
                  ${theme === t ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center bg-slate-100 p-1 rounded-lg">
            <button 
              onClick={() => setViewMode('desktop')}
              className={`p-1.5 rounded ${viewMode === 'desktop' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400'}`}
            >
              <Monitor size={16} />
            </button>
            <button 
              onClick={() => setViewMode('mobile')}
              className={`p-1.5 rounded ${viewMode === 'mobile' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400'}`}
            >
              <Smartphone size={16} />
            </button>
          </div>

          <button 
            onClick={handleShare}
            className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-bold hover:bg-slate-800 transition-colors shadow-lg shadow-slate-200"
          >
            <Download size={16} />
            <span className="hidden md:inline">Export JSON</span>
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 flex overflow-hidden">
        {/* Editor Panel - Sidebar */}
        <aside 
          className={`h-full border-r border-slate-200 bg-white transition-all duration-300 overflow-hidden
            ${isEditorOpen ? 'w-[450px]' : 'w-0'}`}
        >
          <div className="w-[450px] h-full">
            <Editor data={data} onChange={setData} />
          </div>
        </aside>

        {/* Toggle Editor Button */}
        <button 
          onClick={() => setIsEditorOpen(!isEditorOpen)}
          className="absolute left-0 bottom-8 z-20 flex items-center justify-center w-10 h-10 bg-white border border-slate-200 border-l-0 rounded-r-xl shadow-xl hover:bg-indigo-50 text-slate-400 hover:text-indigo-600 transition-all"
        >
          <Eye size={20} className={isEditorOpen ? 'opacity-50' : ''} />
        </button>

        {/* Preview Panel */}
        <section className="flex-1 h-full overflow-hidden relative flex flex-col">
          <div className={`flex-1 transition-all duration-500 mx-auto ${viewMode === 'mobile' ? 'max-w-[420px] my-10 ring-8 ring-slate-900 rounded-[3rem] shadow-2xl' : 'w-full'}`}>
            <Preview data={data} theme={theme} />
          </div>
        </section>
      </main>

      {/* Bottom Status/Quick Menu (Mobile) */}
      <div className="md:hidden h-14 bg-white border-t border-slate-200 flex items-center justify-around">
        <button onClick={() => setIsEditorOpen(true)} className="flex flex-col items-center gap-1 text-slate-500">
          <Palette size={18} />
          <span className="text-[10px] font-bold">Edit</span>
        </button>
        <button onClick={() => setViewMode('desktop')} className="flex flex-col items-center gap-1 text-slate-500">
          <Monitor size={18} />
          <span className="text-[10px] font-bold">Desktop</span>
        </button>
        <button onClick={handleShare} className="flex flex-col items-center gap-1 text-slate-500">
          <Share size={18} />
          <span className="text-[10px] font-bold">Share</span>
        </button>
      </div>
    </div>
  );
};

export default App;
