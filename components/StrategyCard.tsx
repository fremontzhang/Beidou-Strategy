import React from 'react';
import { CapabilityData } from '../types';

const StrategyCard: React.FC<CapabilityData> = ({ title, icon, description, details, color }) => {
  return (
    <div className={`bg-white rounded-xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow border-t-4 ${color}`}>
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-slate-50 text-slate-700">
          {icon}
        </div>
        <h3 className="font-bold text-lg text-slate-800">{title}</h3>
      </div>
      <p className="text-slate-600 text-sm mb-4 leading-relaxed h-10">
        {description}
      </p>
      <div className="space-y-2">
        {details.map((detail, idx) => (
          <div key={idx} className="flex items-start gap-2 text-sm text-slate-500">
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-300 flex-shrink-0"></span>
            <span>{detail}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StrategyCard;