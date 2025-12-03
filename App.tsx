import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Share2, 
  Map, 
  Flag, 
  Menu, 
  X,
  Target,
  Zap,
  Globe,
  Quote,
  BookOpen
} from 'lucide-react';
import EcosystemGraph from './components/EcosystemGraph';
import WhyBeidou from './components/WhyBeidou';
import Roadmap from './components/Roadmap';
import CoreEngines from './components/CoreEngines';
import KnowledgeBase from './components/KnowledgeBase';

// Tabs definition
type TabId = 'overview' | 'blueprint' | 'why' | 'roadmap' | 'knowledge';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'overview', label: '战略总览', icon: <Target size={18} /> },
    { id: 'blueprint', label: '全景蓝图', icon: <Map size={18} /> },
    { id: 'why', label: '核心优势', icon: <Zap size={18} /> },
    { id: 'roadmap', label: '行动路线', icon: <Flag size={18} /> },
    { id: 'knowledge', label: '知识库', icon: <BookOpen size={18} /> },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-8 animate-in fade-in duration-500">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-r from-slate-900 to-indigo-900 rounded-2xl p-8 md:p-16 overflow-hidden shadow-2xl text-white">
              <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 opacity-20 rounded-full blur-[100px] transform translate-x-1/2 -translate-y-1/2"></div>
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold mb-6">
                   2025 战略核心
                </div>
                <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                  北斗智影<br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">快内容分发平台</span>
                </h1>
                <p className="text-slate-300 text-lg md:text-xl max-w-3xl leading-relaxed mb-10">
                  以 <b>AI分发变现能力</b> 为核心，通过 <b>AI 创作</b> 为基础 + <b>版权控股</b> 为辅助，形成基于产销一体化的快内容分发平台。
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/10">
                    <div className="text-blue-400 font-bold mb-1 flex items-center gap-2"><Globe size={16}/> 核心定位</div>
                    <div className="text-sm text-slate-200">面向C端的出海分发平台</div>
                  </div>
                   <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/10">
                    <div className="text-emerald-400 font-bold mb-1 flex items-center gap-2"><LayoutDashboard size={16}/> 商业模式</div>
                    <div className="text-sm text-slate-200">分发平台 + 控股制作 (JV Model)</div>
                  </div>
                   <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/10">
                    <div className="text-purple-400 font-bold mb-1 flex items-center gap-2"><Zap size={16}/> 终极愿景</div>
                    <div className="text-sm text-slate-200">赋能“超级个体”生态</div>
                  </div>
                </div>
              </div>
            </section>

            {/* Strategic Pillars Summary / Core Engines */}
            <CoreEngines />
          </div>
        );
      case 'blueprint':
        return (
           <div className="h-[calc(100vh-100px)] lg:h-[calc(100vh-60px)] flex flex-col space-y-4 pb-4">
             <div className="flex-shrink-0">
               <h2 className="text-2xl font-bold text-slate-800">生态业务架构全景图</h2>
               <p className="text-slate-500 text-sm mt-1">战略蓝图 Part 2：以“合资控股 (JV)”模式锁定优质产能</p>
             </div>
             
             {/* Graph Container: Flex grow to fill space, but enforce minimum height */}
             <div className="flex-grow w-full border border-slate-200 rounded-xl bg-white shadow-sm overflow-hidden min-h-[400px] relative">
                <EcosystemGraph />
             </div>

             {/* Strategic Quote Block */}
             <div className="flex-shrink-0 bg-amber-50 border-l-4 border-amber-400 p-4 md:p-6 rounded-r-xl shadow-sm">
                <div className="flex gap-4">
                  <Quote className="text-amber-400 flex-shrink-0" size={32} />
                  <div>
                    <p className="text-lg font-bold text-slate-800 italic leading-relaxed mb-2">
                      “由于我们不当制作的‘苦力’，我们是变现的‘助力’。通过赋能变现，换取版权控股，构建产销同盟。”
                    </p>
                    <div className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                      <span className="bg-amber-100 px-2 py-1 rounded">核心目的</span>
                      <span>锁定产能，保证质量，构建版权护城河。</span>
                    </div>
                  </div>
                </div>
             </div>
           </div>
        );
      case 'why':
        return <WhyBeidou />;
      case 'roadmap':
        return <Roadmap />;
      case 'knowledge':
        return <KnowledgeBase />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-800">
      
      {/* Sidebar Navigation (Desktop) */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-slate-200 fixed h-full z-20">
        <div className="h-16 flex items-center px-6 border-b border-slate-100">
           <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold mr-3">
              B
           </div>
           <span className="font-bold text-lg tracking-tight">北斗智影</span>
        </div>
        
        <nav className="flex-1 py-6 px-3 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as TabId)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === item.id 
                  ? 'bg-blue-50 text-blue-700' 
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100">
          <div className="bg-slate-50 rounded-lg p-3 text-xs text-slate-500">
            <p className="font-semibold text-slate-700 mb-1">Source Material:</p>
            <p>• OPC 会议纪要 (2025.12.02)</p>
            <p>• 录音转录 (张峰/阿当)</p>
          </div>
        </div>
      </aside>

      {/* Mobile Navigation Header */}
      <div className="lg:hidden fixed top-0 w-full bg-white border-b border-slate-200 z-30 h-14 flex items-center justify-between px-4">
         <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">B</div>
            <span className="font-bold text-slate-900">北斗智影战略</span>
         </div>
         <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-slate-600">
           {isMobileMenuOpen ? <X /> : <Menu />}
         </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-white z-20 pt-16 px-4">
           <nav className="space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id as TabId);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium ${
                  activeTab === item.id 
                    ? 'bg-blue-50 text-blue-700' 
                    : 'text-slate-600'
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
           </nav>
        </div>
      )}

      {/* Main Content Area */}
      <main className={`flex-1 min-w-0 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-50' : ''} lg:ml-64 pt-14 lg:pt-0`}>
        <div className="max-w-7xl mx-auto p-4 md:p-8 lg:p-8 h-full">
          {renderContent()}
        </div>
      </main>

    </div>
  );
};

export default App;