export const TRADE_IN_BRANDS = [
  {
    id: "apple",
    name: "Apple MacBook",
    seriesList: ["MacBook Pro 16\"", "MacBook Pro 14\"", "MacBook Pro 13\"", "MacBook Air 13.6\"", "MacBook Air 13\" M1"],
    baseValuation: 35000
  },
  {
    id: "dell",
    name: "Dell",
    seriesList: ["XPS 15", "XPS 13", "Alienware m15", "Latitude Enterprise", "Inspiron 15"],
    baseValuation: 26000
  },
  {
    id: "lenovo",
    name: "Lenovo",
    seriesList: ["ThinkPad X1 Carbon", "ThinkPad T14", "Legion 5 / 7", "Yoga 9i 2-in-1", "IdeaPad Slim"],
    baseValuation: 24000
  },
  {
    id: "hp",
    name: "HP",
    seriesList: ["Spectre x360", "ENVY 15", "Omen 16", "EliteBook 840", "Pavilion Gaming"],
    baseValuation: 22000
  },
  {
    id: "asus",
    name: "ASUS",
    seriesList: ["ROG Zephyrus G14", "ROG Strix SCAR", "ZenBook 14 OLED", "TUF Gaming A15", "VivoBook Pro"],
    baseValuation: 25000
  }
];

export const PROCESSORS = ["Apple M3 / M2 Pro", "Apple M1 / M2", "Intel Core i9 / Ryzen 9", "Intel Core i7 / Ryzen 7", "Intel Core i5 / Ryzen 5"];
export const RAM_OPTIONS = ["64 GB", "32 GB", "16 GB", "8 GB"];
export const STORAGE_OPTIONS = ["2 TB NVMe SSD", "1 TB NVMe SSD", "512 GB SSD", "256 GB SSD"];

export const PHYSICAL_CONDITIONS = [
  { id: "flawless", title: "Flawless / Mint", desc: "No scratch, zero dent, immaculate chassis & display", multiplier: 1.0 },
  { id: "good", title: "Good Condition", desc: "Minor light scratches on casing, no crack or screen flaw", multiplier: 0.85 },
  { id: "fair", title: "Fair / Used", desc: "Visible wear, small scuffs on edge, battery capacity worn down", multiplier: 0.70 },
  { id: "damaged", title: "Damaged / Defective", desc: "Cracked glass, key missing, or non-charging (for parts)", multiplier: 0.40 }
];
