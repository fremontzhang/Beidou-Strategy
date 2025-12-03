import React, { useState } from 'react';
import { Search, BookOpen, Tag, FileText } from 'lucide-react';

interface TermEntry {
  id: string;
  term: string;
  category: 'Strategy' | 'Business' | 'Tech' | 'Asset' | 'Vision';
  definition: string;
  context: string;
}

const KnowledgeBase: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const terms: TermEntry[] = [
    {
      id: '1',
      term: 'JV Model (合资模式)',
      category: 'Business',
      definition: '通过控股或合资的方式锁定优质内容产能，而非简单的雇佣或外包。',
      context: '案例：小五兄弟 (Youtube)'
    },
    {
      id: '2',
      term: 'CPS (Cost Per Sale)',
      category: 'Business',
      definition: '按销售付费。北斗坚持“No Burn”策略，追求极致的效率和正向毛利。',
      context: '财务原则 / 阿当语录'
    },
    {
      id: '3',
      term: 'OPG',
      category: 'Asset',
      definition: 'Original Personality Gen (推测)。指代虚拟人版权核心，是构建版权护城河的关键。',
      context: '核心资产 / 护城河'
    },
    {
      id: '4',
      term: 'Remix (二创)',
      category: 'Tech',
      definition: '基于原创IP进行的规模化、批量化的二次创作与分发。',
      context: 'AI 核心能力'
    },
    {
      id: '5',
      term: 'Super Individual (超级个体)',
      category: 'Vision',
      definition: 'AI赋能下的新型创作者，具备从内容生产到商业变现的全链路能力。',
      context: '2026+ 终极愿景'
    },
    {
      id: '6',
      term: '北斗平台 (Beidou)',
      category: 'Strategy',
      definition: '不仅是分发工具，更是拥有底层算法理解和内容掌控力的快内容分发平台。',
      context: '产品定位'
    },
    {
      id: '7',
      term: 'MCN 分销网络',
      category: 'Business',
      definition: '类比“三只羊”模式，建立强大的达人资源整合与流量分发网络。',
      context: '核心引擎：达人整合'
    }
  ];

  const filteredTerms = terms.filter(item => 
    item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.definition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getCategoryColor = (cat: string) => {
    switch(cat) {
      case 'Strategy': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Business': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'Tech': return 'bg-violet-100 text-violet-700 border-violet-200';
      case 'Asset': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Vision': return 'bg-rose-100 text-rose-700 border-rose-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
            <BookOpen className="text-blue-600" size={32} />
            战略知识库
          </h2>
          <p className="text-slate-500 mt-2">核心概念、术语定义与会议纪要沉淀。</p>
        </div>
        
        <div className="relative w-full md:w-72">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-slate-400" />
          </div>
          <input
            type="text"
            placeholder="搜索术语..."
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  核心术语
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  类别
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  定义与说明
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  来源 / 语境
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-100">
              {filteredTerms.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-bold text-slate-800">{item.term}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${getCategoryColor(item.category)}`}>
                      {item.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-slate-600 leading-relaxed">{item.definition}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-xs text-slate-500">
                      <FileText size={14} className="mr-1.5 text-slate-400" />
                      {item.context}
                    </div>
                  </td>
                </tr>
              ))}
              
              {filteredTerms.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-slate-500">
                    <div className="flex flex-col items-center justify-center">
                       <Search size={32} className="mb-2 text-slate-300"/>
                       <p>未找到匹配的术语</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 text-xs text-slate-400 flex justify-between">
          <span>共 {filteredTerms.length} 条记录</span>
          <span>Last Updated: 2025.12.02</span>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeBase;