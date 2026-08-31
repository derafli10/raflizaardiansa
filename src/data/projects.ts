import type { Project } from '@/types/project';

/**
 * Static portfolio projects dataset for Rafliza Ardiansa.
 * Represents high-impact engineering work across Network, Cyber Security, Hardware, and Software domains.
 *
 * **Requirements: 14.1, 14.2, 14.3, 14.4, 14.5, 14.6, 14.7, 14.8**
 */
export const projects: Project[] = [
  {
    id: 'proj-01',
    slug: 'sdn-enterprise-mesh',
    name: 'SDN Enterprise Mesh Architecture',
    type: 'network',
    thumbnail: '/images/projects/sdn-mesh.webp',
    tags: ['Cisco IOS-XE', 'BGP EVPN', 'VXLAN', 'WireGuard', 'Ansible', 'Python'],
    summary:
      'High-resilience Software-Defined Enterprise Network fabric delivering automated multi-site interconnects and zero-packet-drop failover.',
    problem:
      'Legacy multi-site enterprise infrastructure suffered from 450ms failover latency during carrier outages, manual VLAN provisioning bottlenecks, and lack of end-to-end encrypted packet segmentation across hybrid cloud nodes.',
    process:
      'Engineered a spine-leaf BGP EVPN overlay over a VXLAN substrate with automated IPsec/WireGuard tunnels. Developed automated Ansible CI/CD playbooks for declarative switch configuration and telemetry ingestion via gNMI / Netconf.',
    solution:
      'Deployed a self-healing mesh topology spanning 3 regional data centers and 12 branch offices. Reduced failover reconvergence time to sub-50ms and automated 100% of routine subnet provisioning.',
    metrics: [
      { label: 'Failover Latency', value: '42', unit: 'ms' },
      { label: 'Network Uptime', value: '99.995', unit: '%' },
      { label: 'Provisioning Speed', value: '10x', unit: 'faster' },
      { label: 'Throughput', value: '40', unit: 'Gbps' },
    ],
    topology: [
      {
        id: 'node-wan',
        type: 'router',
        label: 'Edge Gateway (BGP)',
        x: 50,
        y: 15,
        connections: ['node-fw-1', 'node-fw-2'],
      },
      {
        id: 'node-fw-1',
        type: 'firewall',
        label: 'Primary Firewall',
        x: 30,
        y: 40,
        connections: ['node-spine-1', 'node-spine-2'],
      },
      {
        id: 'node-fw-2',
        type: 'firewall',
        label: 'Backup Firewall',
        x: 70,
        y: 40,
        connections: ['node-spine-1', 'node-spine-2'],
      },
      {
        id: 'node-spine-1',
        type: 'switch',
        label: 'Spine Switch 01',
        x: 35,
        y: 65,
        connections: ['node-leaf-1', 'node-leaf-2'],
      },
      {
        id: 'node-spine-2',
        type: 'switch',
        label: 'Spine Switch 02',
        x: 65,
        y: 65,
        connections: ['node-leaf-1', 'node-leaf-2'],
      },
      {
        id: 'node-leaf-1',
        type: 'server',
        label: 'Compute Cluster A',
        x: 25,
        y: 90,
        connections: [],
      },
      {
        id: 'node-leaf-2',
        type: 'database',
        label: 'NVMe Storage Pool',
        x: 75,
        y: 90,
        connections: [],
      },
    ],
    demoUrl: 'https://demo.schematic.network/sdn-mesh',
    repoUrl: 'https://github.com/derafli10/sdn-enterprise-mesh',
  },
  {
    id: 'proj-02',
    slug: 'sentinel-soc-zero-trust',
    name: 'SentinelSOC: eBPF Threat Engine',
    type: 'security',
    thumbnail: '/images/projects/sentinel-soc.webp',
    tags: ['eBPF', 'Rust', 'Suricata', 'Wazuh', 'Zeek', 'Grafana', 'ELK'],
    summary:
      'Real-time Linux kernel-level telemetry and anomaly detection engine processing 2.5M events/second with zero userspace overhead.',
    problem:
      'Traditional userspace IDS/IPS agents incurred 18% CPU overhead on critical API servers and failed to intercept zero-day kernel privilege escalations before payload execution.',
    process:
      'Constructed custom eBPF probes attached to Linux kernel tracepoints (`sys_enter_execve`, `tcp_connect`, `kprobe/security_socket_bind`). Streamed ringbuffer events directly to an asynchronous Rust ingestion pipeline with automated heuristic threat classification.',
    solution:
      'Achieved continuous real-time intrusion monitoring with sub-1% CPU footprint. Integrated automated firewall quarantine rules that isolate compromised endpoints within 120ms of anomalous outbound beaconing.',
    metrics: [
      { label: 'Event Throughput', value: '2.5M', unit: 'events/s' },
      { label: 'CPU Overhead', value: '< 0.8', unit: '%' },
      { label: 'Threat Response', value: '120', unit: 'ms' },
      { label: 'False Positives', value: '0.02', unit: '%' },
    ],
    topology: [
      {
        id: 'node-kernel',
        type: 'server',
        label: 'Linux Kernel (eBPF)',
        x: 20,
        y: 50,
        connections: ['node-rust-engine'],
      },
      {
        id: 'node-rust-engine',
        type: 'server',
        label: 'Rust Telemetry Daemon',
        x: 50,
        y: 30,
        connections: ['node-siem', 'node-quarantine'],
      },
      {
        id: 'node-quarantine',
        type: 'firewall',
        label: 'Automated Netfilter Rule',
        x: 50,
        y: 70,
        connections: ['node-client'],
      },
      {
        id: 'node-siem',
        type: 'database',
        label: 'Wazuh / Elasticsearch',
        x: 80,
        y: 30,
        connections: [],
      },
      {
        id: 'node-client',
        type: 'client',
        label: 'Protected Endpoints',
        x: 80,
        y: 70,
        connections: [],
      },
    ],
    demoUrl: 'https://demo.schematic.network/sentinelsoc',
    repoUrl: 'https://github.com/derafli10/sentinel-soc-ebpf',
  },
  {
    id: 'proj-03',
    slug: 'optitrace-mcu-pcb',
    name: 'OptiTrace: Multi-Layer High-Speed PCB',
    type: 'hardware',
    thumbnail: '/images/projects/optitrace-pcb.webp',
    tags: ['KiCad', 'STM32F4', 'CAN-FD', 'FreeRTOS', 'RF Layout', 'Impedance Control'],
    summary:
      'Custom 4-layer microcontroller PCB engineered for high-frequency industrial CAN-FD telemetry and harsh EMI environments.',
    problem:
      'Off-the-shelf development boards suffered signal reflection, ground bounce, and clock jitter when communicating over high-baud CAN-FD buses in high-electromagnetic industrial test benches.',
    process:
      'Designed a controlled 50Ω single-ended / 100Ω differential impedance 4-layer stackup (Signal-GND-PWR-Signal) in KiCad. Implemented continuous ground reference planes, matched length differential pairs (±0.1mm), and TVS diode electrostatic discharge protection.',
    solution:
      'Manufactured and assembled prototype hardware with 0 transmission errors across 500 hours of continuous vibration and thermal cycling tests (-40°C to +85°C).',
    metrics: [
      { label: 'Bus Bitrate', value: '5', unit: 'Mbps' },
      { label: 'Impedance Tolerance', value: '±3', unit: '%' },
      { label: 'Operating Temp', value: '-40 to +85', unit: '°C' },
      { label: 'Layers', value: '4', unit: 'layers' },
    ],
    topology: [
      {
        id: 'node-mcu',
        type: 'server',
        label: 'STM32F405 MCU Core',
        x: 30,
        y: 50,
        connections: ['node-transceiver', 'node-sensor'],
      },
      {
        id: 'node-transceiver',
        type: 'router',
        label: 'CAN-FD PHY Transceiver',
        x: 65,
        y: 35,
        connections: ['node-bus'],
      },
      {
        id: 'node-sensor',
        type: 'client',
        label: 'High-Res ADC Sensors',
        x: 65,
        y: 65,
        connections: [],
      },
      {
        id: 'node-bus',
        type: 'switch',
        label: 'Differential CAN Bus',
        x: 90,
        y: 35,
        connections: [],
      },
    ],
    demoUrl: 'https://demo.schematic.network/optitrace',
    repoUrl: 'https://github.com/derafli10/optitrace-mcu-hardware',
  },
  {
    id: 'proj-04',
    slug: 'kernel-link-dpdk-processor',
    name: 'KernelLink: DPDK Packet Engine',
    type: 'software',
    thumbnail: '/images/projects/kernellink.webp',
    tags: ['C++', 'DPDK', 'Zero-Copy', 'Linux Kernel', 'Prometheus', 'HugePages'],
    summary:
      'Bypass-kernel network packet processor capable of inspecting and filtering 100GbE line-rate Ethernet traffic in user space.',
    problem:
      'Linux kernel network stack context switching (softirqs and socket buffers) imposed a hard bottleneck at 8.5 Mpps on standard multi-core servers, causing severe packet loss on 100GbE fiber uplinks.',
    process:
      'Leveraged Intel DPDK (Data Plane Development Kit) with poll-mode drivers (PMD), 1GB hugepages, and lock-free ringbuffers to eliminate kernel context switches and memory copies.',
    solution:
      'Attained 14.88 Mpps line-rate packet classification with predictable sub-microsecond latency, unlocking wire-speed filtering for carrier-grade network gateways.',
    metrics: [
      { label: 'Throughput', value: '100', unit: 'GbE' },
      { label: 'Packet Rate', value: '14.88', unit: 'Mpps' },
      { label: 'Processing Latency', value: '620', unit: 'ns' },
      { label: 'Zero-Copy Speed', value: '100', unit: '%' },
    ],
    topology: [
      {
        id: 'node-nic',
        type: 'router',
        label: '100GbE PCIe NIC (PMD)',
        x: 20,
        y: 50,
        connections: ['node-hugepages'],
      },
      {
        id: 'node-hugepages',
        type: 'server',
        label: 'DPDK Ringbuffer Pool',
        x: 50,
        y: 50,
        connections: ['node-workers'],
      },
      {
        id: 'node-workers',
        type: 'switch',
        label: 'SIMD Packet Classifiers',
        x: 80,
        y: 50,
        connections: [],
      },
    ],
    demoUrl: 'https://demo.schematic.network/kernellink',
    repoUrl: 'https://github.com/derafli10/kernellink-dpdk',
  },
  {
    id: 'proj-05',
    slug: 'edgesentry-iot-gateway',
    name: 'EdgeSentry: Secure IoT Telemetry Hub',
    type: 'security',
    thumbnail: '/images/projects/edgesentry.webp',
    tags: ['ESP32', 'TLS 1.3', 'MQTT-SN', 'Hardware Root of Trust', 'FreeRTOS', 'ECDSA'],
    summary:
      'Cryptographically secured edge IoT device gateway featuring hardware-accelerated elliptic curve cryptography and mutual TLS authentication.',
    problem:
      'Distributed industrial sensor nodes were vulnerable to firmware tampering, man-in-the-middle replay attacks, and unauthorized telemetry spoofing on remote radio networks.',
    process:
      'Implemented secure boot with hardware flash encryption and ATECC608A cryptographic co-processor integration for secure private key storage. Developed custom mTLS handshake protocol over lightweight MQTT-SN.',
    solution:
      'Deployed across 350+ remote sensor points with zero reported security breaches, achieving autonomous device attestation and encrypted over-the-air (OTA) firmware rollback protections.',
    metrics: [
      { label: 'Sensor Nodes', value: '350', unit: '+' },
      { label: 'Encryption', value: 'ECC-256', unit: 'bit' },
      { label: 'Auth Time', value: '85', unit: 'ms' },
      { label: 'Battery Life', value: '3.2', unit: 'years' },
    ],
    topology: [
      {
        id: 'node-sensors',
        type: 'client',
        label: 'Wireless Sensor Array',
        x: 20,
        y: 50,
        connections: ['node-gateway'],
      },
      {
        id: 'node-gateway',
        type: 'router',
        label: 'EdgeSentry Gateway',
        x: 50,
        y: 50,
        connections: ['node-cloud-broker'],
      },
      {
        id: 'node-cloud-broker',
        type: 'server',
        label: 'Secure Cloud Broker',
        x: 80,
        y: 50,
        connections: [],
      },
    ],
    demoUrl: 'https://demo.schematic.network/edgesentry',
    repoUrl: 'https://github.com/derafli10/edgesentry-iot',
  },
  {
    id: 'proj-06',
    slug: 'bgp-route-optimizer',
    name: 'Autonomous BGP Route Optimizer',
    type: 'network',
    thumbnail: '/images/projects/bgp-optimizer.webp',
    tags: ['Go', 'BGP Flowspec', 'Prometheus', 'Grafana', 'Linux Netfilter', 'REST API'],
    summary:
      'Autonomous network traffic engineering controller that monitors latency anomalies and injects dynamic BGP routing policies in real-time.',
    problem:
      'Static transit routing suffered from suboptimal upstream peering paths and persistent packet jitter during trans-oceanic fiber congestion periods.',
    process:
      'Built a distributed active-probing daemon in Go sending high-frequency synthetic probes across 8 global transit providers. Integrated a predictive reinforcement learning controller to calculate optimal AS-path prepends and local preference attributes.',
    solution:
      'Decreased average cross-continental user latency by 28% and completely mitigated peering congestion without human NOC intervention.',
    metrics: [
      { label: 'Latency Reduction', value: '28', unit: '%' },
      { label: 'Active Probes/sec', value: '50k', unit: 'probes' },
      { label: 'AS Paths Managed', value: '1,200', unit: '+' },
      { label: 'Convergence Time', value: '< 2', unit: 's' },
    ],
    topology: [
      {
        id: 'node-probe',
        type: 'client',
        label: 'Active Probing Agents',
        x: 20,
        y: 35,
        connections: ['node-controller'],
      },
      {
        id: 'node-controller',
        type: 'server',
        label: 'Go BGP Route Controller',
        x: 50,
        y: 50,
        connections: ['node-bgp-speakers', 'node-telemetry'],
      },
      {
        id: 'node-bgp-speakers',
        type: 'router',
        label: 'Edge BGP Speakers',
        x: 80,
        y: 35,
        connections: [],
      },
      {
        id: 'node-telemetry',
        type: 'database',
        label: 'Prometheus / Grafana',
        x: 80,
        y: 65,
        connections: [],
      },
    ],
    demoUrl: 'https://demo.schematic.network/bgp-optimizer',
    repoUrl: 'https://github.com/derafli10/bgp-route-optimizer',
  },
];

/**
 * Helper to fetch a project by its URL slug
 */
export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/**
 * Helper to filter projects by engineering domain
 */
export function getProjectsByType(type: Project['type']): Project[] {
  return projects.filter((p) => p.type === type);
}
