import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Database, Shield, FileText, Cpu, Search, CheckCircle2, Lock } from 'lucide-react';

const workflowNodes = [
  { id: 'matters', label: 'MATTERS', category: 'Workflow', x: 20, y: 22, desc: 'Litigation portfolios, regulatory inquiries, and internal investigations.' },
  { id: 'custodians', label: 'CUSTODIANS', category: 'Workflow', x: 80, y: 22, desc: 'Targeted data sources, personnel repositories, and communication channels.' },
  { id: 'documents', label: 'DOCUMENTS', category: 'Data Unit', x: 14, y: 52, desc: 'Structured & unstructured electronic files, email archives, and messaging threads.' },
  { id: 'evidence', label: 'EVIDENCE', category: 'Forensics', x: 86, y: 52, desc: 'Forensically preserved artifacts with validated cryptographic hash chains.' },
  { id: 'privilege', label: 'PRIVILEGE', category: 'Compliance', x: 22, y: 80, desc: 'Attorney-client work product defense, redaction protocols, and privilege logs.' },
  { id: 'review', label: 'REVIEW', category: 'Analysis', x: 78, y: 80, desc: 'Supervised multi-tier classification, continuous active learning, and QA validation.' },
  { id: 'data', label: 'DATA', category: 'Payload', x: 50, y: 15, desc: 'Ingestion normalization, high-throughput parsing, and defensible pruning.' },
];

const platformNodes = [
  { id: 'relativity', label: 'RELATIVITY', role: 'Analytics & Review Engine', desc: 'Integrated for high-throughput processing, CAL machine learning, and secure review.', x: 30, y: 92 },
  { id: '4ig', label: '4iG', role: 'Forensic Processing Engine', desc: 'Applied for rapid metadata extraction, hash deduplication, and forensic normalization.', x: 50, y: 92 },
  { id: 'canopy', label: 'CANOPY', role: 'PII & Privacy Mining', desc: 'Utilized for automated PII/PHI extraction and consolidated entity assessment.', x: 70, y: 92 }
];

export default function Technology() {
  const [selectedNode, setSelectedNode] = useState(workflowNodes[0]);

  return (
    <section id="technology" className="relative py-32 bg-[#081018] border-t border-white/[0.08] overflow-hidden text-[#F4F7FA]">
      {/* Subtle Atmospheric Depth */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#00BFEF]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="mb-3">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#00BFEF]">
              03 // eDISCOVERY ARCHITECTURE
            </span>
          </div>
          <h2 className="font-display font-semibold text-3xl sm:text-4xl md:text-5xl text-[#F4F7FA] tracking-tight leading-[1.12]">
            Data relationship & technology topology.
          </h2>
          <p className="text-base text-[#91A0AE] mt-4 leading-relaxed max-w-2xl font-normal">
            A visual representation of how core matter entities, evidentiary units, and operational technologies interconnect within Aegis eDiscovery workflows.
          </p>
        </div>

        {/* DATA VISUALIZATION GRAPH CANVAS */}
        <div className="relative border border-white/[0.08] bg-[#0A121A]/80 p-6 sm:p-12 min-h-[580px] flex flex-col justify-between overflow-hidden">
          
          {/* Top Bar Status */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/[0.06] text-xs font-mono">
            <div className="flex items-center gap-3">
              <span className="inline-block w-2 h-2 rounded-full bg-[#00BFEF] animate-pulse" />
              <span className="text-[#C5D2DC] tracking-wider uppercase">RELATIONSHIP NETWORK // ACTIVE TOPOLOGY</span>
            </div>
            <div className="flex items-center gap-6 text-[#728495]">
              <span>NODES: 10</span>
              <span className="hidden sm:inline">COORDINATE MAPPING: VECTOR-BASED</span>
              <span>CLICK NODE TO INSPECT</span>
            </div>
          </div>

          {/* Interactive SVG Network Area (Desktop/Tablet) */}
          <div className="relative my-8 sm:my-12 h-[340px] sm:h-[400px] w-full">
            
            {/* SVG Vector Connection Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="cyanLine" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00BFEF" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#00BFEF" stopOpacity="0.1" />
                </linearGradient>
                <linearGradient id="techLine" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#00BFEF" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#536575" stopOpacity="0.2" />
                </linearGradient>
              </defs>

              {/* Central to Workflow Node Vectors */}
              {workflowNodes.map((node) => (
                <g key={`line-${node.id}`}>
                  <line
                    x1="50%"
                    y1="50%"
                    x2={`${node.x}%`}
                    y2={`${node.y}%`}
                    stroke={selectedNode?.id === node.id ? "#00BFEF" : "rgba(255, 255, 255, 0.12)"}
                    strokeWidth={selectedNode?.id === node.id ? "1.5" : "1"}
                    strokeDasharray={selectedNode?.id === node.id ? "none" : "3,3"}
                    className="transition-all duration-300"
                  />
                </g>
              ))}

              {/* Center to Technology Nodes */}
              {platformNodes.map((tech) => (
                <g key={`techline-${tech.id}`}>
                  <line
                    x1="50%"
                    y1="50%"
                    x2={`${tech.x}%`}
                    y2={`${tech.y}%`}
                    stroke={selectedNode?.id === tech.id ? "#00BFEF" : "rgba(0, 191, 239, 0.25)"}
                    strokeWidth="1"
                    strokeDasharray="4,4"
                    className="transition-all duration-300"
                  />
                </g>
              ))}

              {/* Cross-entity connections */}
              <line x1="20%" y1="22%" x2="14%" y2="52%" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
              <line x1="80%" y1="22%" x2="86%" y2="52%" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
              <line x1="14%" y1="52%" x2="22%" y2="80%" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
              <line x1="86%" y1="52%" x2="78%" y2="80%" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
            </svg>

            {/* Central Concept Node: eDISCOVERY */}
            <div 
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
            >
              <div className="px-5 py-2.5 sm:px-7 sm:py-3.5 bg-[#081018] border-2 border-[#00BFEF] text-[#F4F7FA] font-display font-bold text-sm sm:text-base tracking-[0.2em] uppercase text-center shadow-lg shadow-[#00BFEF]/10">
                <div className="flex items-center gap-2 justify-center">
                  <span className="w-2 h-2 rounded-full bg-[#00BFEF]" />
                  <span>eDISCOVERY</span>
                </div>
                <div className="text-[9px] font-mono tracking-widest text-[#00BFEF] font-normal mt-0.5">
                  CORE HUB
                </div>
              </div>
            </div>

            {/* Workflow Entities */}
            {workflowNodes.map((node) => {
              const isSelected = selectedNode?.id === node.id;
              return (
                <button
                  key={node.id}
                  onClick={() => setSelectedNode(node)}
                  style={{ left: `${node.x}%`, top: `${node.y}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 z-10 px-3 py-1.5 sm:px-4 sm:py-2 text-xs font-mono font-medium tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-[#00BFEF] text-[#081018] font-bold shadow-md shadow-[#00BFEF]/20 scale-105'
                      : 'bg-[#0D1720] border border-white/[0.15] text-[#91A0AE] hover:text-[#F4F7FA] hover:border-[#00BFEF]/60'
                  }`}
                >
                  {node.label}
                </button>
              );
            })}

            {/* Platform / Technology Nodes */}
            {platformNodes.map((tech) => {
              const isSelected = selectedNode?.id === tech.id;
              return (
                <button
                  key={tech.id}
                  onClick={() => setSelectedNode(tech)}
                  style={{ left: `${tech.x}%`, top: `${tech.y}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 z-10 px-3.5 py-1.5 sm:px-5 sm:py-2 text-[11px] sm:text-xs font-mono uppercase tracking-widest transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-[#00BFEF] text-[#081018] font-bold shadow-md shadow-[#00BFEF]/20'
                      : 'bg-[#081018] border border-[#00BFEF]/40 text-[#00BFEF] hover:bg-[#00BFEF]/10'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-[#00BFEF]" />
                    {tech.label}
                  </span>
                </button>
              );
            })}

          </div>

          {/* Bottom Active Node Inspector Bar */}
          <div className="pt-6 border-t border-white/[0.08] flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="font-mono text-xs text-[#00BFEF] uppercase tracking-[0.2em] mb-1">
                NODE DETAIL // {selectedNode?.label} {selectedNode?.category ? `(${selectedNode.category})` : selectedNode?.role ? `(${selectedNode.role})` : ''}
              </div>
              <p className="text-sm text-[#C5D2DC] max-w-3xl font-normal leading-relaxed">
                {selectedNode?.desc}
              </p>
            </div>
            <div className="shrink-0 text-xs font-mono text-[#536575]">
              PLATFORM WORKFLOW INTEGRATION
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
