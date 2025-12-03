import React from 'react';
import { AdvantagePoint } from '../types';
import { BadgeDollarSign, ShieldCheck, Zap, Network } from 'lucide-react';

const WhyBeidou: React.FC = () => {
  const advantages: AdvantagePoint[] = [
    {
      title: "CPS 效率第一 (No Burn)",
      description: "不做烧钱的互联网模式，每一分钱都有正向毛利。我们是分销出海的第一，效率极高。",
      evidence: "录音来源：'我们现在不烧钱...而且我用很少的钱就做得比别人效率更高' - 阿当",
      icon: <BadgeDollarSign size={24} className="text-emerald-500" />
    },
    {
      title: "已验证的闭环模型",
      description: "不同于单纯的PPT公司，北斗已有小五兄弟等成功合资案例，商业逻辑已跑通。",
      evidence: "录音来源：'我们今天已经有案例了...已经在Youtube端整合了小五兄弟作为合资公司' - 阿当",
      icon: <ShieldCheck size={24} className="text-blue-500" />
    },
    {
      title: "产销一体化生态",
      description: "既懂流量分发（平台），又通过控股控制了内容源头（制作），解决了传统平台内容质量不可控的痛点。",
      evidence: "战略图：'控股/合资' 锁定产能，'分发平台' 面向C端 - 核心架构",
      icon: <Network size={24} className="text-violet-500" />
    },
    {
      title: "超级个体赋能者",
      description: "不仅是分发工具，更是通过AI技术将达人升级为'超级个体'，实现规模化二创变现。",
      evidence: "会议纪要：将BP中 '人人都是创作者' 改为 '超级个体' - 2025.12.02 决策",
      icon: <Zap size={24} className="text-amber-500" />
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-gradient-to-br from-slate-900 to-blue-900 rounded-2xl p-8 text-white shadow-xl">
        <h2 className="text-3xl font-bold mb-4">为什么是北斗智影?</h2>
        <p className="text-blue-100 text-lg leading-relaxed max-w-3xl">
           我们不是传统的制作公司，也不是单纯的MCN。我们是拥有<b>底层算法理解能力</b>和<b>内容掌控力</b>的新型AI分发平台。
           我们的核心壁垒在于：<span className="font-bold text-yellow-400">极致的ROI效率</span>与<span className="font-bold text-yellow-400">深度绑定的优质产能</span>。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {advantages.map((adv, idx) => (
          <div key={idx} className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-all group">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-slate-50 group-hover:bg-slate-100 transition-colors">
                {adv.icon}
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">{adv.title}</h3>
                <p className="text-slate-600 text-sm mb-3 leading-relaxed">
                  {adv.description}
                </p>
                <div className="text-xs text-slate-400 italic border-l-2 border-slate-200 pl-3 py-1">
                  {adv.evidence}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyBeidou;