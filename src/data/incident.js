export const incidentStages = [
  {
    step: "01",
    id: "incident",
    name: "INCIDENT",
    summary: "Immediate notification & rapid triage activation",
    desc: "Deployment of rapid-response protocols to evaluate alerts, establish command, and initiate forensic preservation."
  },
  {
    step: "02",
    id: "investigation",
    name: "INVESTIGATION",
    summary: "Deep forensic discovery & root cause analysis",
    desc: "Extraction and examination of volatile memory, event logs, file system artifacts, and network traffic captures."
  },
  {
    step: "03",
    id: "evidence",
    name: "EVIDENCE",
    summary: "Forensically sound preservation & chain of custody",
    desc: "Cryptographically validated evidence handling meeting strict legal and regulatory evidentiary thresholds."
  },
  {
    step: "04",
    id: "containment",
    name: "CONTAINMENT",
    summary: "Threat eradication & blast radius isolation",
    desc: "Severing threat actor footholds, revoking compromised access keys, and eliminating malicious persistence mechanisms."
  },
  {
    step: "05",
    id: "recovery",
    name: "RECOVERY",
    summary: "Sanitized restoration & continuous posture verification",
    desc: "Controlled system re-entry, real-time threat monitoring, and strategic security hardening to prevent recurrence."
  }
];

export const incidentCapabilities = [
  {
    number: "01",
    title: "Cyber Incident Response",
    description: "Rapid deployment to triage, contain, and remediate active security compromises across distributed enterprise infrastructures.",
    icon: "ShieldAlert"
  },
  {
    number: "02",
    title: "Data Breach Investigation",
    description: "Comprehensive scope identification to determine what sensitive data, PII, or intellectual property was accessed or exfiltrated.",
    icon: "SearchCode"
  },
  {
    number: "03",
    title: "Digital Forensics",
    description: "Forensically sound imaging and artifact analysis across servers, workstations, mobile endpoints, and cloud workspaces.",
    icon: "HardDrive"
  },
  {
    number: "04",
    title: "Malware & Ransomware Investigation",
    description: "Static and dynamic analysis of malicious binaries, ransomware encryption payloads, and command-and-control communication channels.",
    icon: "Bug"
  },
  {
    number: "05",
    title: "Threat Hunting",
    description: "Proactive identification of hidden adversaries, dormant backdoors, and unauthorized persistence mechanisms within enterprise networks.",
    icon: "Crosshair"
  },
  {
    number: "06",
    title: "Incident Containment & Eradication",
    description: "Targeted isolation of compromised assets, credential revocation, firewall rule enforcement, and complete threat actor eviction.",
    icon: "Lock"
  },
  {
    number: "07",
    title: "Compromise Assessment",
    description: "In-depth historical and real-time audit to uncover ongoing compromises, unauthorized access, or undetected vulnerabilities.",
    icon: "Activity"
  },
  {
    number: "08",
    title: "Incident Recovery",
    description: "Disciplined operational restoration of critical applications, databases, and network services with continuous integrity validation.",
    icon: "RefreshCw"
  },
  {
    number: "09",
    title: "Post-Incident Analysis & Remediation",
    description: "Production of detailed forensic reports, regulatory notification documentation, and prioritized defense enhancement roadmaps.",
    icon: "FileText"
  },
  {
    number: "10",
    title: "Security Incident Readiness",
    description: "Development of tailored incident response playbooks, tabletop simulation exercises, and organizational preparedness reviews.",
    icon: "ShieldCheck"
  }
];
