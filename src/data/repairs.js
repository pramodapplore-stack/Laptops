export const REPAIR_SERVICES = [
  {
    id: "rep-screen",
    title: "Display & Glass Screen Replacement",
    category: "Hardware Repair",
    estimatedCostRange: "₹4,999 - ₹16,999",
    turnaround: "Same Day / 24 Hours",
    popular: true,
    icon: "Monitor",
    description: "Fix cracked screens, flickering displays, vertical lines, black screens, or touch response failure with genuine Grade-A panels.",
    symptoms: ["Cracked LCD or outer glass", "Black screen / No backlight", "Flickering lines or bleeding colors", "Touchscreen non-responsive"]
  },
  {
    id: "rep-battery",
    title: "Genuine Battery Replacement & Calibration",
    category: "Power & Battery",
    estimatedCostRange: "₹2,499 - ₹6,999",
    turnaround: "1 - 2 Hours",
    popular: true,
    icon: "BatteryCharging",
    description: "Restore all-day battery life with certified OEM/High-Capacity lithium-ion cells and system power health calibration.",
    symptoms: ["Battery health below 75%", "Laptop dies abruptly", "Swollen trackpad / bulging case", "Not charging when plugged in"]
  },
  {
    id: "rep-thermal",
    title: "Deep Dust Cleaning & Thermal Repasting",
    category: "Maintenance",
    estimatedCostRange: "₹1,499 - ₹2,999",
    turnaround: "2 - 4 Hours",
    popular: false,
    icon: "Thermometer",
    description: "Thermal throttling fix using premium Arctic MX-6 / Noctua thermal paste, fan bearing lubrication, and heat sink dust removal.",
    symptoms: ["Loud fan noise / constantly spinning", "Laptop overheats to touch", "Random thermal shutdowns during gaming/work", "Sluggish performance under load"]
  },
  {
    id: "rep-keyboard",
    title: "Keyboard & Trackpad Replacement",
    category: "Hardware Repair",
    estimatedCostRange: "₹2,299 - ₹5,999",
    turnaround: "24 Hours",
    popular: false,
    icon: "Keyboard",
    description: "Replace sticky, missing, or unresponsive keys, liquid-damaged keyboards, and erratic trackpads with factory original assemblies.",
    symptoms: ["Keys auto-repeating or stuck", "Spilled liquid on keyboard", "Trackpad mouse jumping or not clicking", "Backlight stopped working"]
  },
  {
    id: "rep-motherboard",
    title: "Motherboard & Chip-Level Repair",
    category: "Advanced Micro-Soldering",
    estimatedCostRange: "₹5,999 - ₹19,999",
    turnaround: "2 - 4 Business Days",
    popular: true,
    icon: "Cpu",
    description: "Advanced component micro-soldering, short-circuit troubleshooting, liquid damage corrosion clean, and BIOS chip reprogramming.",
    symptoms: ["No power / completely dead unit", "Liquid spill / coffee damage", "Charging port burnt / loose", "Blue screen crashes (BSOD) continuously"]
  },
  {
    id: "rep-upgrade",
    title: "SSD Storage & RAM Memory Upgrade",
    category: "Performance Upgrade",
    estimatedCostRange: "₹2,999 - ₹9,999",
    turnaround: "Same Day",
    popular: true,
    icon: "HardDrive",
    description: "Supercharge your laptop speed with ultra-fast NVMe PCIe SSDs up to 4TB and RAM expansion up to 64GB with seamless OS cloning.",
    symptoms: ["Running out of disk storage", "System boots up slowly (> 1 min)", "Multitasking lag with heavy apps", "Disk usage at 100% in task manager"]
  }
];

export const REPAIR_FAQS = [
  {
    q: "How long does a standard repair take?",
    a: "90% of screen, battery, and RAM/SSD upgrade repairs are completed on the same day or within 24 hours. Motherboard micro-soldering takes 2-4 business days."
  },
  {
    q: "Do you offer a warranty on repairs?",
    a: "Yes! All repair services include a complimentary 180-Day (6 Month) ReTech Guarantee on parts and labor."
  },
  {
    q: "Is diagnostic testing free?",
    a: "Yes! We perform free 30-minute upfront hardware diagnostics when you drop off or send in your device."
  },
  {
    q: "How does Doorstep Courier Pickup work?",
    a: "We send a insured, padded packaging kit with a courier driver to pick up your laptop from your home or office, and deliver it back upon completion."
  }
];
