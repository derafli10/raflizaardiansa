import type { Skill, SkillCategory, ProficiencyLevel } from '@/types/skill';

/**
 * Static skills dataset for The Schematic Network.
 * Models technical proficiencies as an interconnected graph topology.
 *
 * Color coding standard (Req 15.3):
 * - proficient: green (#10B981)
 * - intermediate: cyan (#06B6D4)
 * - learning: amber (#F59E0B)
 *
 * **Requirements: 15.1, 15.2, 15.3, 15.4, 15.5, 15.6, 15.7**
 */
export const skills: Skill[] = [
  // ─── 1. NETWORKING DOMAIN ─────────────────────────────────────────
  {
    id: 'skill-bgp-ospf',
    name: 'BGP & OSPF Routing',
    category: 'networking',
    proficiency: 'proficient',
    description:
      'Advanced dynamic routing protocol architecture, multi-homing traffic engineering, BGP EVPN overlays, and convergence optimization.',
    relatedProjects: ['proj-01', 'proj-06'],
    connections: ['skill-cisco', 'skill-sdn', 'skill-wireshark', 'skill-net-auto'],
    x: 20,
    y: 20,
  },
  {
    id: 'skill-cisco',
    name: 'Cisco IOS-XE & Enterprise Switching',
    category: 'networking',
    proficiency: 'proficient',
    description:
      'Enterprise chassis and switch provisioning, VLAN segmentation, STP/RSTP tuning, LACP aggregation, and QoS policing.',
    relatedProjects: ['proj-01'],
    connections: ['skill-bgp-ospf', 'skill-sdn', 'skill-wireguard'],
    x: 35,
    y: 18,
  },
  {
    id: 'skill-sdn',
    name: 'SDN & VXLAN Fabrics',
    category: 'networking',
    proficiency: 'intermediate',
    description:
      'Software-Defined Network fabrics, spine-leaf data center architecture, VXLAN encapsulation, and programmable data planes.',
    relatedProjects: ['proj-01'],
    connections: ['skill-bgp-ospf', 'skill-cisco', 'skill-net-auto', 'skill-dpdk'],
    x: 28,
    y: 32,
  },
  {
    id: 'skill-net-auto',
    name: 'NetDevOps & Ansible Automation',
    category: 'networking',
    proficiency: 'proficient',
    description:
      'Declarative infrastructure as code, automated switch configuration with Ansible, Python Netmiko/NAPALM, and gNMI telemetry.',
    relatedProjects: ['proj-01', 'proj-06'],
    connections: ['skill-bgp-ospf', 'skill-python', 'skill-sdn'],
    x: 15,
    y: 35,
  },
  {
    id: 'skill-wireguard',
    name: 'WireGuard & IPsec Encrypted Tunnels',
    category: 'networking',
    proficiency: 'proficient',
    description:
      'Point-to-point and mesh VPN architectures, modern cryptographic key exchange, high-speed tunnel encapsulation, and MTU optimization.',
    relatedProjects: ['proj-01', 'proj-05'],
    connections: ['skill-cisco', 'skill-zero-trust', 'skill-linux-kernel'],
    x: 45,
    y: 22,
  },
  {
    id: 'skill-wireshark',
    name: 'Deep Packet Inspection & Wireshark',
    category: 'networking',
    proficiency: 'proficient',
    description:
      'PCAP stream analysis, TCP window sizing, jitter/latency troubleshooting, protocol dissection, and network baseline profiling.',
    relatedProjects: ['proj-01', 'proj-02', 'proj-04'],
    connections: ['skill-bgp-ospf', 'skill-suricata', 'skill-dpdk'],
    x: 18,
    y: 48,
  },

  // ─── 2. CYBER SECURITY DOMAIN ─────────────────────────────────────
  {
    id: 'skill-ebpf',
    name: 'eBPF Kernel Telemetry',
    category: 'security',
    proficiency: 'intermediate',
    description:
      'Attaching custom bytecode to Linux kernel tracepoints, ringbuffer telemetry streaming, and zero-overhead observability.',
    relatedProjects: ['proj-02'],
    connections: ['skill-rust', 'skill-linux-kernel', 'skill-suricata'],
    x: 60,
    y: 20,
  },
  {
    id: 'skill-suricata',
    name: 'IDS / IPS & Network Telemetry',
    category: 'security',
    proficiency: 'proficient',
    description:
      'Signature-based threat detection with Suricata, Zeek metadata extraction, and real-time malicious payload interception.',
    relatedProjects: ['proj-02'],
    connections: ['skill-wireshark', 'skill-ebpf', 'skill-siem'],
    x: 52,
    y: 32,
  },
  {
    id: 'skill-siem',
    name: 'SIEM & SOC Operations (Wazuh / ELK)',
    category: 'security',
    proficiency: 'proficient',
    description:
      'Centralized event log correlation, custom Wazuh decoders and rulesets, threat hunting, and automated incident response workflows.',
    relatedProjects: ['proj-02'],
    connections: ['skill-suricata', 'skill-zero-trust', 'skill-python'],
    x: 68,
    y: 32,
  },
  {
    id: 'skill-zero-trust',
    name: 'Zero-Trust Architecture',
    category: 'security',
    proficiency: 'proficient',
    description:
      'Micro-segmentation, identity-aware proxies, mutual TLS enforcement, least-privilege network access, and policy orchestration.',
    relatedProjects: ['proj-01', 'proj-02', 'proj-05'],
    connections: ['skill-wireguard', 'skill-siem', 'skill-crypto-hw'],
    x: 62,
    y: 45,
  },
  {
    id: 'skill-crypto-hw',
    name: 'Hardware Root of Trust & Cryptography',
    category: 'security',
    proficiency: 'intermediate',
    description:
      'Secure element integration (ATECC608A), hardware-bound ECDSA private keys, secure boot chaining, and flash encryption.',
    relatedProjects: ['proj-05'],
    connections: ['skill-zero-trust', 'skill-embedded', 'skill-pcb'],
    x: 75,
    y: 42,
  },

  // ─── 3. HARDWARE & EMBEDDED DOMAIN ────────────────────────────────
  {
    id: 'skill-pcb',
    name: 'KiCad High-Speed PCB Layout',
    category: 'hardware',
    proficiency: 'proficient',
    description:
      'Multi-layer PCB routing, 50Ω/100Ω controlled impedance stackups, differential pair length matching, and EMI/EMC mitigation.',
    relatedProjects: ['proj-03'],
    connections: ['skill-embedded', 'skill-can-fd', 'skill-crypto-hw', 'skill-lab'],
    x: 82,
    y: 65,
  },
  {
    id: 'skill-embedded',
    name: 'STM32 & ESP32 Microcontrollers',
    category: 'hardware',
    proficiency: 'proficient',
    description:
      'Bare-metal and HAL C/C++ driver development for ARM Cortex-M and Xtensa cores, DMA transfers, and low-power sleep modes.',
    relatedProjects: ['proj-03', 'proj-05'],
    connections: ['skill-pcb', 'skill-freertos', 'skill-cpp', 'skill-can-fd'],
    x: 68,
    y: 62,
  },
  {
    id: 'skill-freertos',
    name: 'FreeRTOS Real-Time Kernel',
    category: 'hardware',
    proficiency: 'proficient',
    description:
      'Deterministic preemptive multitasking, mutex/semaphore synchronization, queue management, and task priority inversion avoidance.',
    relatedProjects: ['proj-03', 'proj-05'],
    connections: ['skill-embedded', 'skill-cpp', 'skill-can-fd'],
    x: 60,
    y: 75,
  },
  {
    id: 'skill-can-fd',
    name: 'CAN-FD & Industrial Protocols',
    category: 'hardware',
    proficiency: 'intermediate',
    description:
      'CAN 2.0B / CAN-FD frame parsing, transceiver termination, Modbus RTU/TCP, and industrial bus noise immunity.',
    relatedProjects: ['proj-03'],
    connections: ['skill-pcb', 'skill-embedded', 'skill-freertos'],
    x: 75,
    y: 80,
  },
  {
    id: 'skill-lab',
    name: 'Lab Instrumentation & Prototyping',
    category: 'hardware',
    proficiency: 'proficient',
    description:
      'Digital storage oscilloscopes, logic analyzers, RF spectrum analyzers, SMD hot-air rework, and precision soldering.',
    relatedProjects: ['proj-03', 'proj-05'],
    connections: ['skill-pcb', 'skill-embedded'],
    x: 88,
    y: 80,
  },

  // ─── 4. SOFTWARE & SYSTEMS DOMAIN ─────────────────────────────────
  {
    id: 'skill-cpp',
    name: 'Modern C / C++ Systems',
    category: 'software',
    proficiency: 'proficient',
    description:
      'Memory-safe systems programming, RAII paradigms, low-latency socket programming, and SIMD instruction set vectorization.',
    relatedProjects: ['proj-03', 'proj-04'],
    connections: ['skill-dpdk', 'skill-embedded', 'skill-freertos', 'skill-linux-kernel'],
    x: 45,
    y: 62,
  },
  {
    id: 'skill-dpdk',
    name: 'DPDK Line-Rate Packet Processing',
    category: 'software',
    proficiency: 'intermediate',
    description:
      'Kernel-bypass networking with DPDK, hugepages allocation, lockless ringbuffers, and wire-speed packet categorization.',
    relatedProjects: ['proj-04'],
    connections: ['skill-cpp', 'skill-linux-kernel', 'skill-sdn', 'skill-wireshark'],
    x: 32,
    y: 60,
  },
  {
    id: 'skill-linux-kernel',
    name: 'Linux Kernel & Netfilter',
    category: 'software',
    proficiency: 'proficient',
    description:
      'Socket buffer architectures, iptables / nftables pipeline customization, kernel namespaces, and sysctl network tuning.',
    relatedProjects: ['proj-02', 'proj-04', 'proj-06'],
    connections: ['skill-ebpf', 'skill-cpp', 'skill-dpdk', 'skill-golang'],
    x: 42,
    y: 75,
  },
  {
    id: 'skill-golang',
    name: 'Go Distributed Services',
    category: 'software',
    proficiency: 'intermediate',
    description:
      'Concurrent daemon development with goroutines/channels, REST and gRPC microservices, and high-volume metrics ingestion.',
    relatedProjects: ['proj-06'],
    connections: ['skill-linux-kernel', 'skill-python', 'skill-docker'],
    x: 30,
    y: 78,
  },
  {
    id: 'skill-python',
    name: 'Python Systems & Telemetry',
    category: 'software',
    proficiency: 'proficient',
    description:
      'AsyncIO network clients, automated data transformation pipelines, RESTful backend APIs, and telemetry processing.',
    relatedProjects: ['proj-01', 'proj-02'],
    connections: ['skill-net-auto', 'skill-siem', 'skill-golang', 'skill-nextjs'],
    x: 18,
    y: 70,
  },
  {
    id: 'skill-nextjs',
    name: 'Next.js 16 & React 19 / TypeScript',
    category: 'software',
    proficiency: 'proficient',
    description:
      'App Router architecture, React Server Components, GSAP/Motion 60fps animations, Tailwind CSS v4, and WCAG AA accessibility.',
    relatedProjects: [],
    connections: ['skill-python', 'skill-docker'],
    x: 15,
    y: 88,
  },
  {
    id: 'skill-docker',
    name: 'Docker & Microservice Orchestration',
    category: 'software',
    proficiency: 'proficient',
    description:
      'Multi-stage container builds, network bridge isolation, persistent storage volumes, and CI/CD automated deployment pipelines.',
    relatedProjects: ['proj-01', 'proj-02', 'proj-06'],
    connections: ['skill-golang', 'skill-nextjs', 'skill-linux-kernel'],
    x: 32,
    y: 92,
  },
  {
    id: 'skill-rust',
    name: 'Rust Systems & Concurrency',
    category: 'software',
    proficiency: 'intermediate',
    description:
      'Ownership/borrow checker semantics, zero-cost abstractions, asynchronous runtime (Tokio), and safe concurrency.',
    relatedProjects: ['proj-02'],
    connections: ['skill-ebpf', 'skill-cpp'],
    x: 52,
    y: 88,
  },
];

/**
 * Helper to fetch a skill by ID
 */
export function getSkillById(id: string): Skill | undefined {
  return skills.find((s) => s.id === id);
}

/**
 * Helper to filter skills by category
 */
export function getSkillsByCategory(category: SkillCategory): Skill[] {
  return skills.filter((s) => s.category === category);
}

/**
 * Helper to filter skills by proficiency level
 */
export function getSkillsByProficiency(proficiency: ProficiencyLevel): Skill[] {
  return skills.filter((s) => s.proficiency === proficiency);
}

/**
 * Category metadata for section rendering and legends
 */
export const SKILL_CATEGORIES: Record<
  SkillCategory,
  { label: string; description: string; accentColor: string }
> = {
  networking: {
    label: 'Networking & Infrastructure',
    description: 'Enterprise routing, SDN fabrics, dynamic protocols, and deep packet inspection',
    accentColor: 'var(--color-copper)',
  },
  security: {
    label: 'Cyber Security & Zero-Trust',
    description:
      'eBPF kernel telemetry, SIEM/SOC analytics, intrusion detection, and hardware root of trust',
    accentColor: 'var(--color-signal-cyan)',
  },
  hardware: {
    label: 'Hardware & Embedded Systems',
    description: 'Multi-layer PCB engineering, STM32/ESP32 firmware, CAN-FD buses, and FreeRTOS',
    accentColor: 'var(--color-copper-bright)',
  },
  software: {
    label: 'Software & Systems Engineering',
    description: 'Kernel-bypass DPDK, modern C++, Rust, Go, Next.js 16, and Linux internals',
    accentColor: 'var(--color-signal-green)',
  },
};
