export const MOCK_REPAIR_TICKETS = [
  {
    id: "REP-9042",
    customerName: "Alex Rivera",
    device: "MacBook Pro 14\" M1 Pro",
    service: "Display & Glass Screen Replacement",
    status: "Repair in Progress",
    stepIndex: 3,
    steps: [
      { name: "Ticket Created & Intake", date: "Aug 11, 09:30 AM", done: true },
      { name: "50-Point Hardware Diagnostic", date: "Aug 11, 02:15 PM", done: true },
      { name: "OEM Display Panel Sourced", date: "Aug 12, 10:00 AM", done: true },
      { name: "Screen Installation & Micro-soldering", date: "Aug 13, In Progress", done: true, current: true },
      { name: "Final Quality Check & Thermal Stress Test", date: "Pending", done: false },
      { name: "Ready for Doorstep Delivery / Pickup", date: "Pending", done: false }
    ],
    technician: "Marcus Vance (Senior Apple Certified Tech)",
    estimatedCompletion: "Tomorrow, 4:00 PM",
    notes: "New Liquid Retina panel mounted. Testing True Tone calibration sensor."
  },
  {
    id: "REP-8812",
    customerName: "Samantha Chen",
    device: "Dell XPS 15 9520",
    service: "Genuine Battery Replacement & Calibration",
    status: "Ready for Pickup",
    stepIndex: 5,
    steps: [
      { name: "Ticket Created & Intake", date: "Aug 10, 11:00 AM", done: true },
      { name: "50-Point Hardware Diagnostic", date: "Aug 10, 01:00 PM", done: true },
      { name: "OEM Battery Sourced", date: "Aug 10, 03:30 PM", done: true },
      { name: "Battery Swap & Clean", date: "Aug 11, 10:00 AM", done: true },
      { name: "8-Hour Battery Endurance QC Test", date: "Aug 11, 06:00 PM", done: true },
      { name: "Ready for Doorstep Delivery / Pickup", date: "Aug 12, 09:00 AM", done: true, current: true }
    ],
    technician: "David Miller",
    estimatedCompletion: "Completed",
    notes: "New 86Wh battery installed with 100% capacity rating. Device sanitized."
  }
];

export const MOCK_ORDERS = [
  {
    id: "ORD-77291",
    date: "2026-08-10",
    total: 99900,
    status: "Shipped",
    trackingNumber: "BLUE DART-88912903",
    laptop: "Apple MacBook Pro 14\" (M1 Pro, 2021)",
    warranty: "12 Months ReTech Warranty",
    shippingAddress: "742 MG Road, Indiranagar, Bengaluru, KA"
  }
];
