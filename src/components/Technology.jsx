import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Cpu, Layers, Shield, FileText, CheckCircle2, Search, Lock } from 'lucide-react';
import ShinyText from './ShinyText';
import DecryptedText from './DecryptedText';

const workflowNodes = [
  { id: 'matters', label: 'MATTERS', category: 'Workflow', x: 22, y: 25, desc: 'Litigation portfolios, regulatory inquiries, and complex dispute lifecycles.' },
  { id: 'custodians', label: 'CUSTODIANS', category: 'Workflow', x: 78, y: 25, desc: 'Targeted corporate data sources, personnel endpoints, and cloud repositories.' },
  { id: 'documents', label: 'DOCUMENTS', category: 'Data Unit', x: 16, y: 55, desc: 'Structured & unstructured electronic files, email archives, and collaboration data.' },
  { id: 'evidence', label: 'EVIDENCE', category: 'Forensics', x: 84, y: 55, desc: 'Forensically sound artifacts with mathematical SHA-256 chain of custody.' },
  { id: 'privilege', label: 'PRIVILEGE', category: 'Compliance', x: 25, y: 82, desc: 'Attorney-client work product defense, redaction protocols, and privilege logs.' },
  { id: 'review', label: 'REVIEW', category: 'Analysis', x: 75, y: 82, desc: 'Continuous active learning (CAL), concept clustering, and tiered attorney review.' },
  { id: 'data', label: 'DATA', category: 'Payload', x: 50, y: 16, desc: 'High-throughput ingestion normalization, multi-format OCR, and deduplication.' },
];

const platformNodes = [
  { id: 'relativity', label: 'RELATIVITY', role: 'Analytics & Review Engine', desc: 'Integrated for high-throughput processing, CAL machine learning, and secure litigation review.', x: 32, y: 92 },
  { id: '4ig', label: '4iG', role: 'Forensic Processing Engine', desc: 'Applied for rapid metadata extraction, hash deduplication, and forensic normalization.', x: 50, y: 92 },
  { id: 'canopy', label: 'CANOPY', role: 'PII & Privacy Mining', desc: 'Utilized for automated PII/PHI extraction and consolidated entity exposure assessment.', x: 68, y: 92 }
];

export default function Technology() {
  const [selectedNode, setSelectedNode] = useState(workflowNodes[0]);

  return (
    <section id="technology" className="relative py-32 bg-[#081018] border-t border-white/[0.08] overflow-hidden text-[#F4F7FA]">
      {/* Subtle Atmospheric Depth */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[550px] bg-[#00BFEF]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="mb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/[0.03] border border-white/[0.08]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00BFEF]" />
              <ShinyText 
                text="TECHNOLOGY & ARCHITECTURE" 
                className="font-mono text-xs uppercase tracking-[0.2em] font-medium"
                speed={4}
              />
            </div>
          </div>
          <h2 className="font-display font-semibold text-3xl sm:text-4xl md:text-5xl text-[#F4F7FA] tracking-tight leading-[1.12]">
            Data relationship & technology topology.
          </h2>
          <p className="text-base text-[#91A0AE] mt-4 leading-relaxed max-w-2xl font-normal">
            A visual representation of how core matter entities, evidentiary units, and operational technologies interconnect within Aegis eDiscovery workflows.
          </p>
        </div>

        {/* DATA VISUALIZATION GRAPH CANVAS */}
        <div className="relative border border-white/[0.08] bg-[#0A121A]/90 p-6 sm:p-10 shadow-2xl flex flex-col justify-between overflow-hidden">
          
          {/* Top Bar Telemetry */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-white/[0.08] text-xs font-mono">
            <div className="flex items-center gap-3">
              <span className="inline-block w-2 h-2 rounded-full bg-[#00BFEF] animate-pulse" />
              <span className="text-[#F4F7FA] tracking-wider uppercase font-semibold">RELATIONSHIP NETWORK // TOPOLOGY MAP</span>
            </div>
            <div className="flex items-center gap-6 text-[#728495]">
              <span className="hidden sm:inline">COORDINATE MAPPING: VECTOR-LINKED</span>
              <span>SELECT ANY NODE TO INSPECT</span>
            </div>
          </div>

          {/* Interactive SVG Network Area */}
          <div className="relative my-10 h-[360px] sm:h-[420px] w-full">
            
            {/* SVG Vector Connection Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
              {/* Central to Workflow Node Vectors */}
              {workflowNodes.map((node) => (
                <g key={`line-${node.id}`}>
                  <line
                    x1="50%"
                    y1="50%"
                    x2={`${node.x}%`}
                    y2={`${node.y}%`}
                    stroke={selectedNode?.id === node.id ? "#00BFEF" : "rgba(255, 255, 255, 0.12)"}
                    strokeWidth={selectedNode?.id === node.id ? "2" : "1"}
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
                    strokeWidth={selectedNode?.id === tech.id ? "2" : "1"}
                    strokeDasharray="4,4"
                    className="transition-all duration-300"
                  />
                </g>
              ))}

              {/* Cross-entity connections */}
              <line x1="22%" y1="25%" x2="16%" y2="55%" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
              <line x1="78%" y1="25%" x2="84%" y2="55%" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
              <line x1="16%" y1="55%" x2="25%" y2="82%" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
              <line x1="84%" y1="55%" x2="75%" y2="82%" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
            </svg>

            {/* Central Concept Node: eDISCOVERY */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
              <div className="px-6 py-3 sm:px-8 sm:py-4 bg-[#081018] border-2 border-[#00BFEF] text-[#F4F7FA] font-display font-bold text-sm sm:text-base tracking-[0.2em] uppercase text-center shadow-xl shadow-[#00BFEF]/15">
                <div className="flex items-center gap-2 justify-center">
                  <span className="w-2 h-2 rounded-full bg-[#00BFEF]" />
                  <span>eDISCOVERY</span>
                </div>
                <div className="text-[10px] font-mono tracking-widest text-[#00BFEF] font-normal mt-0.5">
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
                  className={`absolute -translate-x-1/2 -translate-y-1/2 z-10 px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs font-mono font-semibold tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-[#00BFEF] text-[#081018] shadow-lg shadow-[#00BFEF]/25 scale-105'
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
                  className={`absolute -translate-x-1/2 -translate-y-1/2 z-10 px-4 py-2 text-xs font-mono uppercase tracking-widest transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-[#00BFEF] text-[#081018] font-bold shadow-lg shadow-[#00BFEF]/25'
                      : 'bg-[#081018] border border-[#00BFEF]/50 text-[#00BFEF] hover:bg-[#00BFEF]/10'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00BFEF]" />
                    {tech.label}
                  </span>
                </button>
              );
            })}

          </div>

          {/* Bottom Active Node Inspector Bar */}
          <div className="pt-6 border-t border-white/[0.08] flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="font-mono text-xs text-[#00BFEF] uppercase tracking-[0.2em] mb-1 font-semibold flex items-center gap-2">
                <span>NODE DETAIL //</span>
                <DecryptedText 
                  text={`${selectedNode?.label} ${selectedNode?.category ? `(${selectedNode.category})` : selectedNode?.role ? `(${selectedNode.role})` : ''}`}
                  speed={35}
                />
              </div>
              <p className="text-sm text-[#C5D2DC] max-w-3xl font-normal leading-relaxed">
                {selectedNode?.desc}
              </p>
            </div>
            <div className="shrink-0 text-xs font-mono text-[#536575] bg-white/[0.02] px-3 py-1.5 border border-white/[0.06]">
              WORKFLOW INTEGRATION MATRIX
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
