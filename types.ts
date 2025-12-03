import React from 'react';

export enum NodeType {
  CORE = 'CORE',
  CAPABILITY = 'CAPABILITY',
  JV = 'JV',
  OUTPUT = 'OUTPUT',
  STRATEGY = 'STRATEGY'
}

export enum NodeStatus {
  COMPLETED = 'COMPLETED',   // 已完成/已落地
  IN_PROGRESS = 'IN_PROGRESS', // 正在做/推进中
  PLANNING = 'PLANNING'      // 规划中/未来
}

export interface GraphNode {
  id: string;
  label: string;
  type: NodeType;
  status: NodeStatus; // Added status
  description?: string;
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
  val?: number;
}

export interface GraphLink {
  source: string | GraphNode;
  target: string | GraphNode;
  label?: string;
}

export interface CapabilityData {
  title: string;
  icon: React.ReactNode;
  description: string;
  details: string[];
  color: string;
}

export interface AdvantagePoint {
  title: string;
  description: string;
  evidence: string; // Source evidence (e.g., from recording)
  icon: React.ReactNode;
}

export interface RoadmapItem {
  phase: string;
  timeframe: string;
  items: {
    title: string;
    status: 'done' | 'doing' | 'todo';
    desc: string;
  }[];
}