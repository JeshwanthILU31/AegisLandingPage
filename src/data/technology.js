export const ediscoveryTechnologies = [
  {
    id: "relativity",
    name: "Relativity",
    type: "Review & Analytics Platform",
    tagline: "Enterprise eDiscovery & Investigation Engine",
    description: "Industry-standard platform utilized for high-throughput data processing, advanced structured analytics, active learning, and secure litigation review.",
    features: [
      "Continuous Active Learning (CAL)",
      "Conceptual Analytics & Clustering",
      "Robust Redaction & Privilege Controls",
      "High-scale Production Export"
    ]
  },
  {
    id: "4ig",
    name: "4iG",
    type: "Information Governance & Processing",
    tagline: "Advanced Forensic Data Architecture",
    description: "Integrated processing and governance technology engineered for rapid data ingestion, forensic verification, and multi-format extraction.",
    features: [
      "High-speed Metadata Extraction",
      "Forensic Hash De-duplication",
      "Automated OCR & Language ID",
      "Defensible Data Pruning"
    ]
  },
  {
    id: "canopy",
    name: "Canopy",
    type: "Data Breach & PII Assessment",
    tagline: "AI-Powered Privacy & Breach Data Mining",
    description: "Specialized technology applied within eDiscovery and breach response workflows to pinpoint Personally Identifiable Information (PII) and Protected Health Information (PHI).",
    features: [
      "Automated PII/PHI Identification",
      "Consolidated Entity Extraction",
      "Regulatory Notification List Generation",
      "High-precision Data Mapping"
    ]
  }
];

export const ediscoveryPipeline = [
  {
    step: "01",
    phase: "Collection",
    title: "Forensic Data Acquisition",
    description: "Forensically sound capture from on-premise servers, endpoints, mobile devices, cloud repositories, and messaging platforms with cryptographic verification.",
    metrics: "MD5/SHA-256 Hash Verification",
    icon: "Database"
  },
  {
    step: "02",
    phase: "Processing",
    title: "Extraction & Deduplication",
    description: "Multi-threaded text extraction, container decompression, OCR, metadata normalization, and global de-duplication to eliminate redundancy.",
    metrics: "Automated Metadata Parsing",
    icon: "Cpu"
  },
  {
    step: "03",
    phase: "Review",
    title: "Analytics & Managed Review",
    description: "Deployment of machine learning, concept clustering, structured search strings, and supervised attorney review teams for rapid responsiveness classification.",
    metrics: "Continuous Active Learning",
    icon: "FileCheck"
  },
  {
    step: "04",
    phase: "Production",
    title: "Defensible Production",
    description: "Application of automated redactions, endorsement branding, load file generation (DAT/OPT), and secure transmission compliant with court specifications.",
    metrics: "Standardized Court-Ready Output",
    icon: "Share2"
  }
];
