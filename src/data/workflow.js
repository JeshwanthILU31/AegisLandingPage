export const workflowModes = {
  general: {
    id: "general",
    title: "General Services",
    subtitle: "End-to-End Operational Lifecycle",
    description: "A structured, milestone-driven framework applied across legal operations, document review, and compliance workflows.",
    steps: [
      {
        number: "01",
        name: "Understand",
        headline: "Scope Definition & Objective Alignment",
        details: "Assess operational parameters, data landscapes, regulatory constraints, and project milestones to establish a clear procedural baseline.",
        deliverables: ["Project charter & scoping document", "Data source inventory", "Timeline & resource mapping"]
      },
      {
        number: "02",
        name: "Organize",
        headline: "Data Architecture & Protocol Setup",
        details: "Structure incoming information, establish chain of custody, configure review environments, and deploy tailored analytical workflows.",
        deliverables: ["Secure data repository configuration", "Coding manual & protocol guide", "Sample validation set"]
      },
      {
        number: "03",
        name: "Review",
        headline: "Rigorous Analysis & Quality Verification",
        details: "Execute disciplined review cycles using technology-assisted workflows and multi-layer quality control sampling.",
        deliverables: ["Tiered review execution", "Statistical QC audits", "Exception & anomaly logging"]
      },
      {
        number: "04",
        name: "Support",
        headline: "Operational Delivery & Intermediary Reporting",
        details: "Provide continuous technical advisory, progress telemetry, intermediate data extracts, and cross-functional coordination.",
        deliverables: ["Daily telemetry reports", "Privilege logs & redaction matrices", "Stakeholder briefings"]
      },
      {
        number: "05",
        name: "Resolve",
        headline: "Final Output & Defensible Delivery",
        details: "Deliver finalized, court-ready productions, verified compliance documentation, and post-project operational debriefs.",
        deliverables: ["Defensible final production files", "Audit trail certification", "Archival & data return protocol"]
      }
    ]
  },
  incident: {
    id: "incident",
    title: "Incident Response",
    subtitle: "Forensic Containment & Threat Remediation",
    description: "A specialized forensic methodology engineered to neutralize threats, investigate breach vectors, and restore operational resilience.",
    steps: [
      {
        number: "01",
        name: "Detect",
        headline: "Signal Verification & Threat Triage",
        details: "Rapidly evaluate anomalous telemetry, SIEM alerts, and security notifications to verify compromise indicators and define initial breach scope.",
        deliverables: ["Incident classification & severity scoring", "Initial triage report", "Emergency response activation"]
      },
      {
        number: "02",
        name: "Investigate",
        headline: "Digital Forensics & Attack Path Reconstruction",
        details: "Preserve forensic disk images, analyze volatile memory, examine system logs, and determine the exact threat actor ingress and lateral movement.",
        deliverables: ["Forensic artifact extraction", "Timeline of attacker activity", "Root cause determination"]
      },
      {
        number: "03",
        name: "Contain",
        headline: "Threat Neutralization & Blast Radius Isolation",
        details: "Isolate compromised endpoints, revoke illicit credentials, block malicious command-and-control communication, and sever unauthorized access.",
        deliverables: ["Network segmentation verification", "Host isolation & malware eradication", "Persistence mechanism removal"]
      },
      {
        number: "04",
        name: "Recover",
        headline: "Secure System Restoration & Validation",
        details: "Rebuild and restore affected systems from validated states, monitor environment telemetry, and ensure business operational continuity.",
        deliverables: ["Sanitized system restoration", "Integrity validation testing", "Controlled operational re-entry"]
      },
      {
        number: "05",
        name: "Strengthen",
        headline: "Post-Incident Analysis & Resilience Engineering",
        details: "Conduct comprehensive post-incident reviews, produce executive forensic documentation, and implement structural defense improvements.",
        deliverables: ["Comprehensive forensic report", "Regulatory notification evidence", "Security hardening roadmap"]
      }
    ]
  }
};
