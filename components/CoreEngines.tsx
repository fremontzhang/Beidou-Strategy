import React from 'react';
import { BrainCircuit, Users, Database } from 'lucide-react';

const CoreEngines: React.FC = () => {
  const engines = [
    {
      title: "AI 技术能力",
      description: "以 AI 为核心的创作与内容生成能力。",
      icon: <BrainCircuit size={32} strokeWidth={1.5} />,
      items: [
        "AI 动态漫制作",
        "虚拟人 (OPG版权核心)",
        "原创与二创 (Remix) 能力",
        "批量化内容生产"
      ]
    },
    {
      title: "达人整合能力",
      description: "强大的 KOL/KOC 资源整合与运营能力。",
      icon: <Users size={32} strokeWidth={1.5} />,
      items: [
        "类比 '三只羊' 的 MCN 模式",
        "达人向 AI 方向转型支持",
        "孵化超级个体",
        "主播资源无忧化"
      ]
    },
    {
      title: "平台底层理解",
      description: "对社交媒体平台算法的深度理解。",
      icon: <Database size={32} strokeWidth={1.5} />,
      items: [
        "Youtube 等海外平台规则",
        "流量分发逻辑",
        "数据驱动的运营决策",
        "商业化变现路径"
      ]
    }
  ];

  return (
    <div className="mt-10 animate-in slide-in-from-bottom-5 duration-700 delay-100">
      <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
        <span className="w-1 h-8 bg-blue-600 rounded-full block"></span>
        北斗智影核心引擎
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {engines.map((engine, idx) => (
          <div key={idx} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 group">
            <div className="bg-slate-50 w-14 h-14 rounded-xl flex items-center justify-center mb-6 text-slate-700 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
              {engine.icon}
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">{engine.title}</h3>
            <p className="text-slate-500 text-sm mb-6 leading-relaxed border-b border-slate-100 pb-4">
              {engine.description}
            </p>
            <ul className="space-y-3">
              {engine.items.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-600 text-sm">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-blue-400 transition-colors flex-shrink-0"></span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoreEngines;