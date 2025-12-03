import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { GraphNode, GraphLink, NodeType, NodeStatus } from '../types';
import { CheckCircle2, CircleDashed, BrainCircuit, Users, Database, ZoomIn, ZoomOut, Maximize } from 'lucide-react';

interface EcosystemGraphProps {
  // Width and height are now optional/ignored in favor of responsive CSS
  width?: number; 
  height?: number;
}

const EcosystemGraph: React.FC<EcosystemGraphProps> = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);

  // Logical Canvas Dimensions (The "Virtual" Screen size)
  // This ensures the layout is always consistent relative to itself, then scaled by CSS/ViewBox
  const V_WIDTH = 1000;
  const V_HEIGHT = 650;

  // Layout Constants based on Virtual Coordinates
  const cx = V_WIDTH / 2;
  const cy = V_HEIGHT / 2;
  const leftColX = V_WIDTH * 0.15; // 15% from left
  const rightColX = V_WIDTH * 0.85; // 15% from right
  
  const nodes: GraphNode[] = [
    // --- CENTER: Core Platform ---
    { 
      id: 'beidou', 
      label: '北斗平台 (核心)', 
      type: NodeType.CORE, 
      status: NodeStatus.COMPLETED, 
      description: '生态大脑。不做苦力，只做助力。', 
      fx: cx, 
      fy: cy, 
      val: 50 // Slightly larger for visibility
    },

    // --- CENTER INNER ORBIT: Core Engines ---
    {
      id: 'cap_ai',
      label: 'AI 技术能力',
      type: NodeType.CAPABILITY,
      status: NodeStatus.COMPLETED,
      description: '核心引擎1：AI动态漫制作 / 虚拟人(OPG版权) / 批量化内容生产 / 原创与二创(Remix)。',
      fx: cx,
      fy: cy - 140, // Top
      val: 32
    },
    {
      id: 'cap_kol',
      label: '达人整合能力',
      type: NodeType.CAPABILITY,
      status: NodeStatus.COMPLETED,
      description: '核心引擎2：类比"三只羊"MCN模式 / 达人AI转型支持 / 主播资源无忧化 / 孵化超级个体。',
      fx: cx - 120,
      fy: cy + 100, // Bottom Left
      val: 32
    },
    {
      id: 'cap_platform',
      label: '平台底层理解',
      type: NodeType.CAPABILITY,
      status: NodeStatus.COMPLETED,
      description: '核心引擎3：Youtube平台规则 / 流量分发逻辑 / 数据驱动决策 / 商业化变现路径。',
      fx: cx + 120,
      fy: cy + 100, // Bottom Right
      val: 32
    },

    // --- LEFT: Production/JV Entities (Supply Side) ---
    { 
      id: 'jv_xiaowu', 
      label: '小五兄弟 (Youtube)', 
      type: NodeType.JV, 
      status: NodeStatus.COMPLETED, 
      description: '首个落地案例。Youtube头部大V。关系：[控股]', 
      fx: leftColX,
      fy: cy - 140,
      val: 35 
    },
    { 
      id: 'jv_anime', 
      label: 'AI 动态漫制作', 
      type: NodeType.JV, 
      status: NodeStatus.IN_PROGRESS, 
      description: '整合制作链标的，锁定产能。关系：[整合中]', 
      fx: leftColX,
      fy: cy,
      val: 30 
    },
    { 
      id: 'jv_opg', 
      label: '虚拟人/OPG', 
      type: NodeType.JV, 
      status: NodeStatus.IN_PROGRESS, 
      description: '虚拟人版权核心，构建版权护城河。关系：[整合中]', 
      fx: leftColX,
      fy: cy + 140,
      val: 30 
    },

    // --- RIGHT: Outputs & Strategy (Demand/Value Side) ---
    { 
      id: 'global_dist', 
      label: '全球分发 (出海)', 
      type: NodeType.OUTPUT, 
      status: NodeStatus.COMPLETED, 
      description: 'CPS效率第一，南京乃至全国第一出海分发平台。', 
      fx: rightColX,
      fy: cy - 100,
      val: 38 
    },
    { 
      id: 'monetization', 
      label: '商业变现', 
      type: NodeType.OUTPUT, 
      status: NodeStatus.COMPLETED, 
      description: '通过赋能变现，换取版权控股，构建产销同盟。', 
      fx: rightColX,
      fy: cy + 100,
      val: 34 
    },
    { 
      id: 'super_individual', 
      label: '超级个体', 
      type: NodeType.STRATEGY, 
      status: NodeStatus.PLANNING, 
      description: '战略愿景：人人都是创作者，规模化二创。', 
      fx: rightColX + 30, 
      fy: cy,
      val: 28 
    },
  ];

  const links: GraphLink[] = [
    // Core Engines to Platform
    { source: 'beidou', target: 'cap_ai', label: '引擎' },
    { source: 'beidou', target: 'cap_kol', label: '引擎' },
    { source: 'beidou', target: 'cap_platform', label: '引擎' },

    // JVs to Platform/Capabilities
    { source: 'jv_xiaowu', target: 'beidou', label: '控股' },
    { source: 'jv_anime', target: 'beidou', label: '整合' },
    { source: 'jv_opg', target: 'beidou', label: '整合' },
    
    // Connect JVs to specific capabilities they provide/use
    { source: 'jv_xiaowu', target: 'cap_kol', label: '资源' },
    { source: 'jv_anime', target: 'cap_ai', label: '技术' },
    { source: 'jv_opg', target: 'cap_ai', label: '版权' },

    // Platform to Output
    { source: 'beidou', target: 'global_dist', label: '分发' },
    
    // Engines enabling Output
    { source: 'cap_platform', target: 'global_dist', label: '算法支撑' },
    { source: 'cap_platform', target: 'monetization', label: '变现路径' },

    // Logic Flow
    { source: 'global_dist', target: 'monetization', label: '变现' },
    { source: 'monetization', target: 'super_individual', label: '孵化' }
  ];

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear previous render

    // Create a container group for zooming
    const g = svg.append("g");

    // Definitions for markers
    const defs = svg.append("defs");
    defs.selectAll("marker")
      .data(["end"])
      .enter().append("marker")
      .attr("id", "arrow")
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 25) // Adjusted for node sizes
      .attr("refY", 0)
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .attr("orient", "auto")
      .append("path")
      .attr("d", "M0,-5L10,0L0,5")
      .attr("fill", "#cbd5e1");

    // Zoom behavior
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.5, 3]) // Limit zoom scale
      .on("zoom", (event) => {
        g.attr("transform", event.transform);
      });

    // Apply zoom to SVG
    svg.call(zoom);

    // Initial Zoom Transform to fit nicely
    // We start centered
    svg.call(zoom.transform, d3.zoomIdentity);


    // Force Simulation
    const simulation = d3.forceSimulation(nodes as any)
      .force("link", d3.forceLink(links).id((d: any) => d.id).distance(120))
      .force("charge", d3.forceManyBody().strength(-400))
      .force("collide", d3.forceCollide().radius((d: any) => d.val + 15));

    // Links
    const link = g.append("g")
      .selectAll("line")
      .data(links)
      .enter().append("line")
      .attr("stroke", "#cbd5e1")
      .attr("stroke-width", 1.5)
      .attr("stroke-dasharray", (d: any) => {
         const targetId = typeof d.target === 'object' ? d.target.id : d.target;
         const targetNode = nodes.find(n => n.id === targetId);
         return targetNode?.status === NodeStatus.PLANNING ? "5,5" : "none";
      })
      .attr("marker-end", "url(#arrow)");

    // Link Labels
    const linkText = g.append("g")
      .selectAll("text")
      .data(links)
      .enter().append("text")
      .text((d) => d.label || "")
      .attr("font-size", "10px")
      .attr("fill", "#64748b")
      .attr("text-anchor", "middle")
      .attr("dy", -4)
      .attr("class", "bg-white/70 select-none");

    // Nodes Group
    const node = g.append("g")
      .selectAll("g")
      .data(nodes)
      .enter().append("g")
      .attr("cursor", "grab")
      .call(d3.drag<any, any>()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));

    // Node Circles
    node.append("circle")
      .attr("r", (d: any) => d.val)
      .attr("fill", (d: any) => getNodeColor(d.type))
      .attr("stroke", (d: any) => getStatusColor(d.status))
      .attr("stroke-width", (d: any) => d.type === NodeType.CORE ? 5 : 2.5)
      .attr("stroke-opacity", 0.8)
      .attr("filter", "drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.15))")
      .transition().duration(750) // Animate entrance
      .attrTween("r", (d: any) => {
          const i = d3.interpolate(0, d.val);
          return (t) => i(t);
      });

    // Icons/Initials logic
    node.append("foreignObject")
      .attr("x", (d: any) => -d.val/1.4)
      .attr("y", (d: any) => -d.val/1.4)
      .attr("width", (d: any) => d.val * 1.45)
      .attr("height", (d: any) => d.val * 1.45)
      .style("pointer-events", "none")
      .append("xhtml:div")
      .style("width", "100%")
      .style("height", "100%")
      .style("display", "flex")
      .style("align-items", "center")
      .style("justify-content", "center")
      .style("color", "white")
      .html((d: any) => {
         // Placeholder for more complex icons if needed
         return "";
      });

    // Node Labels (Main Title)
    node.append("text")
      .text((d: any) => d.label)
      .attr("text-anchor", "middle")
      .attr("dy", (d: any) => d.val + 18)
      .attr("font-size", (d: any) => d.type === NodeType.CORE ? "14px" : "12px")
      .attr("font-weight", (d: any) => d.type === NodeType.CORE ? "800" : "600")
      .attr("fill", "#0f172a")
      .style("pointer-events", "none")
      .style("text-shadow", "0 1px 2px white");

    // Sub-labels (Role/Relation)
    node.append("text")
      .text((d: any) => {
          if (d.type === NodeType.CAPABILITY) return "[核心引擎]";
          if (d.id === 'jv_xiaowu') return "[控股]";
          if (d.id === 'jv_anime' || d.id === 'jv_opg') return "[整合]";
          return "";
      })
      .attr("text-anchor", "middle")
      .attr("dy", (d: any) => d.val + 32)
      .attr("font-size", "10px")
      .attr("fill", (d: any) => d.type === NodeType.CAPABILITY ? "#7c3aed" : "#64748b")
      .style("pointer-events", "none");

    node.on("click", (event, d) => {
        event.stopPropagation();
        setSelectedNode(d as GraphNode);
    });

    // Click background to deselect
    svg.on("click", () => setSelectedNode(null));

    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      linkText
        .attr("x", (d: any) => (d.source.x + d.target.x) / 2)
        .attr("y", (d: any) => (d.source.y + d.target.y) / 2);

      node
        .attr("transform", (d: any) => `translate(${d.x},${d.y})`);
    });

    function dragstarted(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
      d3.select(event.sourceEvent.target).attr("cursor", "grabbing");
    }

    function dragged(event: any, d: any) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0);
      // We don't release fx/fy to keep layout stable after manual adjustment if desired,
      // or we can release them. For this specific chart, keeping them fixed after drag is often better UX.
      d3.select(event.sourceEvent.target).attr("cursor", "grab");
    }

  }, []); // Run once on mount

  const handleZoomIn = () => {
    if (svgRef.current) {
      d3.select(svgRef.current).transition().duration(300).call(d3.zoom<SVGSVGElement, unknown>().scaleBy, 1.2);
    }
  };

  const handleZoomOut = () => {
    if (svgRef.current) {
      d3.select(svgRef.current).transition().duration(300).call(d3.zoom<SVGSVGElement, unknown>().scaleBy, 0.8);
    }
  };

  const handleResetZoom = () => {
     if (svgRef.current) {
      d3.select(svgRef.current).transition().duration(750).call(d3.zoom<SVGSVGElement, unknown>().transform, d3.zoomIdentity);
    }
  };

  const getNodeColor = (type: NodeType) => {
    switch (type) {
      case NodeType.CORE: return '#0f172a'; // Slate 900
      case NodeType.CAPABILITY: return '#8b5cf6'; // Violet 500 (Engines)
      case NodeType.JV: return '#3b82f6'; // Blue 500
      case NodeType.OUTPUT: return '#f59e0b'; // Amber 500
      case NodeType.STRATEGY: return '#f43f5e'; // Rose 500
      default: return '#94a3b8';
    }
  };

  const getStatusColor = (status: NodeStatus) => {
      switch (status) {
          case NodeStatus.COMPLETED: return '#22c55e'; // Green
          case NodeStatus.IN_PROGRESS: return '#3b82f6'; // Blue
          case NodeStatus.PLANNING: return '#94a3b8'; // Slate
      }
  };

  return (
    <div ref={containerRef} className="relative w-full h-full bg-slate-50 overflow-hidden">
      {/* Legend & Controls Overlay */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-4">
        {/* Legend */}
        <div className="bg-white/90 backdrop-blur p-3 rounded-lg border border-slate-200 text-xs shadow-sm">
          <p className="font-bold mb-2 text-slate-700">业务全景图例:</p>
          <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#0f172a] border border-green-500"></div>
                  <span className="text-slate-600">北斗核心平台</span>
              </div>
              <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#8b5cf6]"></div>
                  <span className="text-slate-600 font-medium">三大核心引擎 (能力)</span>
              </div>
              <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#3b82f6]"></div>
                  <span className="text-slate-600">合资/控股实体 (JV)</span>
              </div>
              <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#f59e0b]"></div>
                  <span className="text-slate-600">分发与变现 (Output)</span>
              </div>
          </div>
        </div>

        {/* Zoom Controls */}
        <div className="flex flex-col bg-white/90 backdrop-blur rounded-lg border border-slate-200 shadow-sm overflow-hidden w-fit">
          <button onClick={handleZoomIn} className="p-2 hover:bg-slate-100 text-slate-600" title="Zoom In"><ZoomIn size={16}/></button>
          <button onClick={handleZoomOut} className="p-2 hover:bg-slate-100 text-slate-600 border-t border-slate-100" title="Zoom Out"><ZoomOut size={16}/></button>
          <button onClick={handleResetZoom} className="p-2 hover:bg-slate-100 text-slate-600 border-t border-slate-100" title="Reset View"><Maximize size={16}/></button>
        </div>
      </div>
      
      {/* 
        Responsive SVG:
        viewBox matches the V_WIDTH/V_HEIGHT constants.
        preserveAspectRatio ensures it fits within the parent container without distortion.
      */}
      <svg 
        ref={svgRef} 
        viewBox={`0 0 ${V_WIDTH} ${V_HEIGHT}`}
        preserveAspectRatio="xMidYMid meet"
        className="w-full h-full touch-pan-x touch-pan-y"
      ></svg>
      
      {selectedNode && (
        <div className="absolute bottom-4 right-4 left-4 md:left-auto md:w-80 bg-white/95 backdrop-blur shadow-2xl rounded-xl p-5 border border-slate-100 animate-in slide-in-from-bottom-5 duration-300 z-20">
          <div className="flex justify-between items-start mb-2">
             <div className="flex items-center gap-2">
                {selectedNode.type === NodeType.CAPABILITY && <BrainCircuit size={16} className="text-violet-500"/>}
                {selectedNode.type === NodeType.JV && <Users size={16} className="text-blue-500"/>}
                <h3 className="font-bold text-slate-800 text-lg">{selectedNode.label}</h3>
             </div>
             <button onClick={() => setSelectedNode(null)} className="text-slate-400 hover:text-slate-600">✕</button>
          </div>
          <div className="flex items-center gap-2 mb-3">
             <span className={`px-2 py-0.5 rounded text-[10px] text-white font-medium`} style={{backgroundColor: getStatusColor(selectedNode.status)}}>
                {selectedNode.status === NodeStatus.COMPLETED ? '已落地' : selectedNode.status === NodeStatus.IN_PROGRESS ? '推进中' : '规划中'}
             </span>
             <span className="text-xs text-slate-400">|</span>
             <span className="text-xs text-slate-500 uppercase">{selectedNode.type}</span>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
            {selectedNode.description}
          </p>
        </div>
      )}
    </div>
  );
};

export default EcosystemGraph;