import React from 'react';
import { CheckCircle2, Circle, Clock } from 'lucide-react';
import { RoadmapItem } from '../types';

const Roadmap: React.FC = () => {
  const roadmap: RoadmapItem[] = [
    {
      phase: "阶段一：模型验证 (已完成)",
      timeframe: "2024 - 2025",
      items: [
        { title: "整合小五兄弟 (Youtube)", status: "done", desc: "建立首个合资案例，跑通‘内容控股+平台分发’模式。" },
        { title: "构建MCN分销网络", status: "done", desc: "类比‘三只羊’模式，完成基础达人资源整合。" },
        { title: "CPS 变现模型跑通", status: "done", desc: "实现正向毛利，不烧钱模式验证成功。" }
      ]
    },
    {
      phase: "阶段二：AI 能力注入 (进行中)",
      timeframe: "2025 Q4 - 2026",
      items: [
        { title: "AI 动态漫制作链整合", status: "doing", desc: "寻找并整合相关制作标的，提升二创效率。" },
        { title: "虚拟人技术 (OPG) 落地", status: "doing", desc: "依托版权核心，实现虚拟人规模化内容生产。" },
        { title: "平台算法深度打通", status: "doing", desc: "进一步优化对Youtube等海外平台的底层规则理解。" }
      ]
    },
    {
      phase: "阶段三：超级个体生态 (未来)",
      timeframe: "2026+",
      items: [
        { title: "全面C端化平台", status: "todo", desc: "从B端/达人端向广泛C端用户开放，人人皆可借助AI成为超级个体。" },
        { title: "全球第一出海分发平台", status: "todo", desc: "打造南京乃至全国第一的出海内容基础设施。" },
        { title: "自动化内容工厂", status: "todo", desc: "实现从创意到变现的全链路AI自动化。" }
      ]
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">战略演进路线图</h2>
          <p className="text-slate-500 mt-2">从单点验证到生态爆发的演进路径</p>
        </div>
      </div>

      <div className="relative border-l-2 border-slate-200 ml-4 space-y-12">
        {roadmap.map((phase, idx) => (
          <div key={idx} className="relative pl-8">
            <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 bg-white ${
                idx === 0 ? 'border-green-500' : idx === 1 ? 'border-blue-500' : 'border-slate-300'
            }`}></div>
            
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-4">
              <h3 className={`text-xl font-bold ${
                  idx === 0 ? 'text-green-700' : idx === 1 ? 'text-blue-700' : 'text-slate-700'
              }`}>{phase.phase}</h3>
              <span className="text-sm font-medium px-3 py-1 bg-slate-100 rounded-full text-slate-600 w-fit">
                {phase.timeframe}
              </span>
            </div>

            <div className="grid gap-4">
              {phase.items.map((item, i) => (
                <div key={i} className="bg-white p-4 rounded-lg border border-slate-100 shadow-sm flex items-start gap-4 hover:border-blue-200 transition-colors">
                  <div className="mt-1">
                    {item.status === 'done' && <CheckCircle2 size={20} className="text-green-500" />}
                    {item.status === 'doing' && <Circle size={20} className="text-blue-500 fill-blue-100 animate-pulse" />}
                    {item.status === 'todo' && <Clock size={20} className="text-slate-300" />}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm md:text-base">{item.title}</h4>
                    <p className="text-sm text-slate-500 mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Roadmap;