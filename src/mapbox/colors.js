import { Parties } from "./parties";

export const PartyColors = {
  Tie: { low: "#ffffff", high: "#ffffff" },
  "No cómputo": { low: "#000000", high: "#000000" },
  PRI: { low2018: "#f9cfd2", low: "#fbdedf", mid: "#f29a9d", high: "#e21f26" },
  MORENA: {
    low2018: "#dbc6c6",
    low: "#ecdcdc",
    mid: "#c69596",
    high: "#801517"
  },
  PAN: { low: "#dfe6f2", mid: "#9db2d6", high: "#2654a5" },
  PRD: { low: "#fff9dd", mid: "#ffee99", high: "#feda1d" },
  MC: { low: "#fdebde", mid: "#f9c39b", high: "#f27a21" },
  PVEM: { low: "#e1f4e4", mid: "#a4ddae", high: "#35b34b" },
  PT: { low: "#f1e9e8", mid: "#d4bcba", high: "#9f6a65" },
  FXM: { low: "#fce8f1", mid: "#f6b9d4", high: "#ea63a0" },
  PES: { low: "#e3dee6", mid: "#aa9ab4", high: "#422059" },
  RSP: { low: "#ececec", mid: "#c6c7c6", high: "#808281" },
  "PAN-PRI-PRD": { low: "#d9f0ee", mid: "#8cd1cc", high: "#00998f" },
  INE: { low: "#f7daed", mid: "#e88ec7", high: "#cb0483" },
  PANAL: { low: "#e9f5f9", mid: "#87c6dc", high: "#2596be" },
  "PRI-PVEM": { low: "#fbdedf", mid: "#f29a9d", high: "#e21f26" },
  "PRI-PVEM-PANAL": { low: "#fbdedf", mid: "#f29a9d", high: "#e21f26" },
  "PAN-PANAL": { low: "#dfe6f2", mid: "#9db2d6", high: "#2654a5" },
  "PAN-PRD-MC": { low: "#dfe6f2", mid: "#9db2d6", high: "#2654a5" },
  "PRD-PT": { low: "#fff9dd", mid: "#ffee99", high: "#feda1d" },
  "PRD-PT-MC": { low: "#fff9dd", mid: "#ffee99", high: "#feda1d" },
  "PRD-PT-CONVERGENCIA": { low: "#fff9dd", mid: "#ffee99", high: "#feda1d" },
  "MORENA-PT-PES": {
    low2018: "#dbc6c6",
    low: "#ecdcdc",
    mid: "#c69596",
    high: "#801517"
  },
  "MORENA-PT-PVEM": {
    low2018: "#dbc6c6",
    low: "#ecdcdc",
    mid: "#c69596",
    high: "#801517"
  },
  Independiente: { low: "#ffffff", mid: "#bebebe", high: "#7c7d7d" }
};

export const GeneralFillColors = {
  pres: [
    "case",
    ["==", ["get", "TIE"], "TRUE"],
    "white",
    ["==", ["get", "FIRST"], "No cómputo"],
    "black",
    ["==", ["get", "FIRST_PARTY"], "PRI"],
    ["to-color", PartyColors["PRI"].high],
    ["==", ["get", "FIRST_PARTY"], "MORENA"],
    ["to-color", PartyColors["MORENA"].high],
    ["==", ["get", "FIRST_PARTY"], "PAN"],
    ["to-color", PartyColors["PAN"].high],
    ["==", ["get", "FIRST_PARTY"], "PRD"],
    ["to-color", PartyColors["PRD"].high],
    ["==", ["get", "FIRST_PARTY"], "MC"],
    ["to-color", PartyColors["MC"].high],
    ["==", ["get", "FIRST_PARTY"], "PVEM"],
    ["to-color", PartyColors["PVEM"].high],
    ["==", ["get", "FIRST_PARTY"], "PT"],
    ["to-color", PartyColors["PT"].high],
    ["==", ["get", "FIRST_PARTY"], "FXM"],
    ["to-color", PartyColors["FXM"].high],
    ["==", ["get", "FIRST_PARTY"], "PES"],
    ["to-color", PartyColors["PES"].high],
    ["==", ["get", "FIRST_PARTY"], "RSP"],
    ["to-color", PartyColors["RSP"].high],
    ["==", ["get", "FIRST_PARTY"], "PAN-PRI-PRD"],
    ["to-color", PartyColors["PAN-PRI-PRD"].high],
    ["==", ["get", "FIRST_PARTY"], "INE"],
    ["to-color", PartyColors["INE"].high],
    ["==", ["get", "FIRST_PARTY"], "PANAL"],
    ["to-color", PartyColors["PANAL"].high],
    ["==", ["get", "FIRST_PARTY"], "PRI-PVEM"],
    ["to-color", PartyColors["PRI-PVEM"].high],
    ["==", ["get", "FIRST_PARTY"], "PRI-PVEM-PANAL"],
    ["to-color", PartyColors["PRI-PVEM-PANAL"].high],
    ["==", ["get", "FIRST_PARTY"], "PAN-PANAL"],
    ["to-color", PartyColors["PAN-PANAL"].high],
    ["==", ["get", "FIRST_PARTY"], "PAN-PRD-MC"],
    ["to-color", PartyColors["PAN-PRD-MC"].high],
    ["==", ["get", "FIRST_PARTY"], "PRD-PT"],
    ["to-color", PartyColors["PRD-PT"].high],
    ["==", ["get", "FIRST_PARTY"], "PRD-PT-MC"],
    ["to-color", PartyColors["PRD-PT-MC"].high],
    ["==", ["get", "FIRST_PARTY"], "PRD-PT-CONVERGENCIA"],
    ["to-color", PartyColors["PRD-PT-CONVERGENCIA"].high],
    ["==", ["get", "FIRST_PARTY"], "MORENA-PT-PES"],
    ["to-color", PartyColors["MORENA-PT-PES"].high],
    ["==", ["get", "FIRST_PARTY"], "MORENA-PT-PVEM"],
    ["to-color", PartyColors["MORENA-PT-PVEM"].high],
    ["to-color", PartyColors.Independiente.high]
  ],
  cong: [
    "case",
    ["==", ["get", "TIE"], "TRUE"],
    "white",
    ["==", ["get", "FIRST"], "No cómputo"],
    "black",
    ["==", ["get", "FIRST_DISPLAY"], "PRI"],
    ["to-color", PartyColors["PRI"].high],
    ["==", ["get", "FIRST_DISPLAY"], "MORENA"],
    ["to-color", PartyColors["MORENA"].high],
    ["==", ["get", "FIRST_DISPLAY"], "PAN"],
    ["to-color", PartyColors["PAN"].high],
    ["==", ["get", "FIRST_DISPLAY"], "PRD"],
    ["to-color", PartyColors["PRD"].high],
    ["==", ["get", "FIRST_DISPLAY"], "MC"],
    ["to-color", PartyColors["MC"].high],
    ["==", ["get", "FIRST_DISPLAY"], "PVEM"],
    ["to-color", PartyColors["PVEM"].high],
    ["==", ["get", "FIRST_DISPLAY"], "PT"],
    ["to-color", PartyColors["PT"].high],
    ["==", ["get", "FIRST_DISPLAY"], "FXM"],
    ["to-color", PartyColors["FXM"].high],
    ["==", ["get", "FIRST_DISPLAY"], "PES"],
    ["to-color", PartyColors["PES"].high],
    ["==", ["get", "FIRST_DISPLAY"], "RSP"],
    ["to-color", PartyColors["RSP"].high],
    ["==", ["get", "FIRST_DISPLAY"], "PAN-PANAL"],
    ["to-color", PartyColors["PAN-PANAL"].high],
    ["==", ["get", "FIRST_DISPLAY"], "PAN-PRI-PRD"],
    ["to-color", PartyColors["PAN-PRI-PRD"].high],
    ["==", ["get", "FIRST_DISPLAY"], "INE"],
    ["to-color", PartyColors["INE"].high],
    ["==", ["get", "FIRST_DISPLAY"], "PANAL"],
    ["to-color", PartyColors["PANAL"].high],
    ["==", ["get", "FIRST_DISPLAY"], "PRI-PVEM"],
    ["to-color", PartyColors["PRI-PVEM"].high],
    ["==", ["get", "FIRST_DISPLAY"], "PRI-PVEM-PANAL"],
    ["to-color", PartyColors["PRI-PVEM-PANAL"].high],
    ["==", ["get", "FIRST_DISPLAY"], "PAN-PRD-MC"],
    ["to-color", PartyColors["PAN-PRD-MC"].high],
    ["==", ["get", "FIRST_DISPLAY"], "PRD-PT"],
    ["to-color", PartyColors["PRD-PT"].high],
    ["==", ["get", "FIRST_DISPLAY"], "PRD-PT-MC"],
    ["to-color", PartyColors["PRD-PT-MC"].high],
    ["==", ["get", "FIRST_DISPLAY"], "PRD-PT-CONVERGENCIA"],
    ["to-color", PartyColors["PRD-PT-CONVERGENCIA"].high],
    ["==", ["get", "FIRST_DISPLAY"], "MORENA-PT-PES"],
    ["to-color", PartyColors["MORENA-PT-PES"].high],
    ["==", ["get", "FIRST_DISPLAY"], "MORENA-PT-PVEM"],
    ["to-color", PartyColors["MORENA-PT-PVEM"].high],
    ["==", ["get", "FIRST"], "PRI"],
    ["to-color", PartyColors["PRI"].high],
    ["==", ["get", "FIRST"], "MORENA"],
    ["to-color", PartyColors["MORENA"].high],
    ["==", ["get", "FIRST"], "PAN"],
    ["to-color", PartyColors["PAN"].high],
    ["==", ["get", "FIRST"], "PRD"],
    ["to-color", PartyColors["PRD"].high],
    ["==", ["get", "FIRST"], "MC"],
    ["to-color", PartyColors["MC"].high],
    ["==", ["get", "FIRST"], "PVEM"],
    ["to-color", PartyColors["PVEM"].high],
    ["==", ["get", "FIRST"], "PT"],
    ["to-color", PartyColors["PT"].high],
    ["==", ["get", "FIRST"], "FXM"],
    ["to-color", PartyColors["FXM"].high],
    ["==", ["get", "FIRST"], "PES"],
    ["to-color", PartyColors["PES"].high],
    ["==", ["get", "FIRST"], "RSP"],
    ["to-color", PartyColors["RSP"].high],
    ["==", ["get", "FIRST"], "PAN-PRI-PRD"],
    ["to-color", PartyColors["PAN-PRI-PRD"].high],
    ["==", ["get", "FIRST"], "INE"],
    ["to-color", PartyColors["INE"].high],
    ["==", ["get", "FIRST"], "PANAL"],
    ["to-color", PartyColors["PANAL"].high],
    ["==", ["get", "FIRST"], "PRI-PVEM"],
    ["to-color", PartyColors["PRI-PVEM"].high],
    ["==", ["get", "FIRST"], "PRI-PVEM-PANAL"],
    ["to-color", PartyColors["PRI-PVEM-PANAL"].high],
    ["==", ["get", "FIRST"], "PAN-PANAL"],
    ["to-color", PartyColors["PAN-PANAL"].high],
    ["==", ["get", "FIRST"], "PAN-PRD-MC"],
    ["to-color", PartyColors["PAN-PRD-MC"].high],
    ["==", ["get", "FIRST"], "PRD-PT"],
    ["to-color", PartyColors["PRD-PT"].high],
    ["==", ["get", "FIRST"], "PRD-PT-MC"],
    ["to-color", PartyColors["PRD-PT-MC"].high],
    ["==", ["get", "FIRST"], "PRD-PT-CONVERGENCIA"],
    ["to-color", PartyColors["PRD-PT-CONVERGENCIA"].high],
    ["==", ["get", "FIRST"], "MORENA-PT-PES"],
    ["to-color", PartyColors["MORENA-PT-PES"].high],
    ["==", ["get", "FIRST"], "MORENA-PT-PVEM"],
    ["to-color", PartyColors["MORENA-PT-PVEM"].high],
    ["to-color", PartyColors.Independiente.high]
  ]
};

// export const MarginFillColors = {
//   "pres-2012": [
//     "case",
//     ["==", ["get", "TIE"], "TRUE"],
//     "white",
//     ["==", ["get", "FIRST"], "No cómputo"],
//     "black",
//     ["==", ["get", "FIRST_PARTY"], "PRI-PVEM"],
//     [
//       "interpolate",
//       ["linear"],
//       ["to-number", ["get", "MARGIN"], 0],
//       0,
//       ["to-color", PartyColors["PRI-PVEM"].low],
//       100,
//       ["to-color", PartyColors["PRI-PVEM"].high]
//     ],
//     ["==", ["get", "FIRST_PARTY"], "PRD-PT-MC"],
//     [
//       "interpolate",
//       ["linear"],
//       ["to-number", ["get", "MARGIN"], 0],
//       0,
//       ["to-color", PartyColors["PRD-PT-MC"].low],
//       100,
//       ["to-color", PartyColors["PRD-PT-MC"].high]
//     ],
//     ["==", ["get", "FIRST_PARTY"], "PAN"],
//     [
//       "interpolate",
//       ["linear"],
//       ["to-number", ["get", "MARGIN"], 0],
//       0,
//       ["to-color", PartyColors.PAN.low],
//       100,
//       ["to-color", PartyColors.PAN.high]
//     ],
//     ["==", ["get", "FIRST_PARTY"], "PANAL"],
//     [
//       "interpolate",
//       ["linear"],
//       ["to-number", ["get", "MARGIN"], 0],
//       0,
//       ["to-color", PartyColors.PANAL.low],
//       100,
//       ["to-color", PartyColors.PANAL.high]
//     ],
//     [
//       "interpolate",
//       ["linear"],
//       ["to-number", ["get", "MARGIN"], 0],
//       0,
//       ["to-color", PartyColors.Independiente.low],
//       100,
//       ["to-color", PartyColors.Independiente.high]
//     ]
//   ],
//   "pres-2018": [
//     "case",
//     ["==", ["get", "TIE"], "TRUE"],
//     "white",
//     ["==", ["get", "FIRST"], "No cómputo"],
//     "black",
//     ["==", ["get", "FIRST_PARTY"], "MORENA-PT-PES"],
//     [
//       "interpolate",
//       ["linear"],
//       ["to-number", ["get", "MARGIN"], 0],
//       0,
//       ["to-color", PartyColors["MORENA-PT-PES"].low],
//       100,
//       ["to-color", PartyColors["MORENA-PT-PES"].high]
//     ],
//     ["==", ["get", "FIRST_PARTY"], "PAN-PRD-MC"],
//     [
//       "interpolate",
//       ["linear"],
//       ["to-number", ["get", "MARGIN"], 0],
//       0,
//       ["to-color", PartyColors["PAN-PRD-MC"].low],
//       100,
//       ["to-color", PartyColors["PAN-PRD-MC"].high]
//     ],
//     ["==", ["get", "FIRST_PARTY"], "PRI-PVEM-PANAL"],
//     [
//       "interpolate",
//       ["linear"],
//       ["to-number", ["get", "MARGIN"], 0],
//       0,
//       ["to-color", PartyColors["PRI-PVEM-PANAL"].low],
//       100,
//       ["to-color", PartyColors["PRI-PVEM-PANAL"].high]
//     ],
//     ["==", ["get", "FIRST_PARTY"], "Independiente"],
//     [
//       "interpolate",
//       ["linear"],
//       ["to-number", ["get", "MARGIN"], 0],
//       0,
//       ["to-color", PartyColors.Independiente.low],
//       100,
//       ["to-color", PartyColors.Independiente.high]
//     ],
//     [
//       "interpolate",
//       ["linear"],
//       ["to-number", ["get", "MARGIN"], 0],
//       0,
//       ["to-color", PartyColors.Independiente.low],
//       100,
//       ["to-color", PartyColors.Independiente.high]
//     ]
//   ],
//   "cong-2021": [
//     "case",
//     ["==", ["get", "TIE"], "TRUE"],
//     "white",
//     ["==", ["get", "FIRST"], "No cómputo"],
//     "black",
//     ["==", ["get", "FIRST"], "MORENA"],
//     [
//       "interpolate",
//       ["linear"],
//       ["to-number", ["get", "MARGIN"], 0],
//       0,
//       ["to-color", PartyColors.MORENA.low],
//       100,
//       ["to-color", PartyColors.MORENA.high]
//     ],
//     ["==", ["get", "FIRST"], "PRI"],
//     [
//       "interpolate",
//       ["linear"],
//       ["to-number", ["get", "MARGIN"], 0],
//       0,
//       ["to-color", PartyColors["PRI"].low],
//       100,
//       ["to-color", PartyColors["PRI"].high]
//     ],
//     ["==", ["get", "FIRST"], "PAN-PRI-PRD"],
//     [
//       "interpolate",
//       ["linear"],
//       ["to-number", ["get", "MARGIN"], 0],
//       0,
//       ["to-color", PartyColors["PAN-PRI-PRD"].low],
//       100,
//       ["to-color", PartyColors["PAN-PRI-PRD"].high]
//     ],
//     ["==", ["get", "FIRST"], "PVEM"],
//     [
//       "interpolate",
//       ["linear"],
//       ["to-number", ["get", "MARGIN"], 0],
//       0,
//       ["to-color", PartyColors.PVEM.low],
//       100,
//       ["to-color", PartyColors.PVEM.high]
//     ],
//     ["==", ["get", "FIRST"], "MC"],
//     [
//       "interpolate",
//       ["linear"],
//       ["to-number", ["get", "MARGIN"], 0],
//       0,
//       ["to-color", PartyColors.MC.low],
//       100,
//       ["to-color", PartyColors.MC.high]
//     ],
//     ["==", ["get", "FIRST"], "MORENA-PT-PVEM"],
//     [
//       "interpolate",
//       ["linear"],
//       ["to-number", ["get", "MARGIN"], 0],
//       0,
//       ["to-color", PartyColors["MORENA-PT-PVEM"].low],
//       100,
//       ["to-color", PartyColors["MORENA-PT-PVEM"].high]
//     ],
//     ["==", ["get", "FIRST"], "PT"],
//     [
//       "interpolate",
//       ["linear"],
//       ["to-number", ["get", "MARGIN"], 0],
//       0,
//       ["to-color", PartyColors.PT.low],
//       100,
//       ["to-color", PartyColors.PT.high]
//     ],
//     ["==", ["get", "FIRST"], "PAN"],
//     [
//       "interpolate",
//       ["linear"],
//       ["to-number", ["get", "MARGIN"], 0],
//       0,
//       ["to-color", PartyColors.PAN.low],
//       100,
//       ["to-color", PartyColors.PAN.high]
//     ],
//     ["==", ["get", "FIRST"], "PRD"],
//     [
//       "interpolate",
//       ["linear"],
//       ["to-number", ["get", "MARGIN"], 0],
//       0,
//       ["to-color", PartyColors.PRD.low],
//       100,
//       ["to-color", PartyColors.PRD.high]
//     ],
//     [
//       "interpolate",
//       ["linear"],
//       ["to-number", ["get", "MARGIN"], 0],
//       0,
//       ["to-color", PartyColors.Independiente.low],
//       100,
//       ["to-color", PartyColors.Independiente.high]
//     ]
//   ]
// };

export const MarginFillColors = (year) => {
  return {
    pres: [
      "case",
      ["==", ["get", "TIE"], "TRUE"],
      "white",
      ["==", ["get", "FIRST"], "No cómputo"],
      "black",
      ["==", ["get", "FIRST_PARTY"], "PRI"],
      [
        "step",
        ["to-number", ["get", "MARGIN"], 0],
        ["to-color", PartyColors["PRI"].low],
        15,
        ["to-color", PartyColors["PRI"].mid],
        35,
        ["to-color", PartyColors["PRI"].high]
      ],
      ["==", ["get", "FIRST_PARTY"], "MORENA"],
      [
        "step",
        ["to-number", ["get", "MARGIN"], 0],
        [
          "to-color",
          year === 2018
            ? PartyColors["MORENA"].low2018
            : PartyColors["MORENA"].low
        ],
        15,
        ["to-color", PartyColors["MORENA"].mid],
        35,
        ["to-color", PartyColors["MORENA"].high]
      ],
      ["==", ["get", "FIRST_PARTY"], "PAN"],
      [
        "step",
        ["to-number", ["get", "MARGIN"], 0],
        ["to-color", PartyColors["PAN"].low],
        15,
        ["to-color", PartyColors["PAN"].mid],
        35,
        ["to-color", PartyColors["PAN"].high]
      ],
      ["==", ["get", "FIRST_PARTY"], "PRD"],
      [
        "step",
        ["to-number", ["get", "MARGIN"], 0],
        ["to-color", PartyColors["PRD"].low],
        15,
        ["to-color", PartyColors["PRD"].mid],
        35,
        ["to-color", PartyColors["PRD"].high]
      ],
      ["==", ["get", "FIRST_PARTY"], "MC"],
      [
        "step",
        ["to-number", ["get", "MARGIN"], 0],
        ["to-color", PartyColors["MC"].low],
        15,
        ["to-color", PartyColors["MC"].mid],
        35,
        ["to-color", PartyColors["MC"].high]
      ],
      ["==", ["get", "FIRST_PARTY"], "PVEM"],
      [
        "step",
        ["to-number", ["get", "MARGIN"], 0],
        ["to-color", PartyColors["PVEM"].low],
        15,
        ["to-color", PartyColors["PVEM"].mid],
        35,
        ["to-color", PartyColors["PVEM"].high]
      ],
      ["==", ["get", "FIRST_PARTY"], "PT"],
      [
        "step",
        ["to-number", ["get", "MARGIN"], 0],
        ["to-color", PartyColors["PT"].low],
        15,
        ["to-color", PartyColors["PT"].mid],
        35,
        ["to-color", PartyColors["PT"].high]
      ],
      ["==", ["get", "FIRST_PARTY"], "FXM"],
      [
        "step",
        ["to-number", ["get", "MARGIN"], 0],
        ["to-color", PartyColors["FXM"].low],
        15,
        ["to-color", PartyColors["FXM"].mid],
        35,
        ["to-color", PartyColors["FXM"].high]
      ],
      ["==", ["get", "FIRST_PARTY"], "PES"],
      [
        "step",
        ["to-number", ["get", "MARGIN"], 0],
        ["to-color", PartyColors["PES"].low],
        15,
        ["to-color", PartyColors["PES"].mid],
        35,
        ["to-color", PartyColors["PES"].high]
      ],
      ["==", ["get", "FIRST_PARTY"], "RSP"],
      [
        "step",
        ["to-number", ["get", "MARGIN"], 0],
        ["to-color", PartyColors["RSP"].low],
        15,
        ["to-color", PartyColors["RSP"].mid],
        35,
        ["to-color", PartyColors["RSP"].high]
      ],
      ["==", ["get", "FIRST_PARTY"], "PAN-PRI-PRD"],
      [
        "step",
        ["to-number", ["get", "MARGIN"], 0],
        ["to-color", PartyColors["PAN-PRI-PRD"].low],
        15,
        ["to-color", PartyColors["PAN-PRI-PRD"].mid],
        35,
        ["to-color", PartyColors["PAN-PRI-PRD"].high]
      ],
      ["==", ["get", "FIRST_PARTY"], "INE"],
      [
        "step",
        ["to-number", ["get", "MARGIN"], 0],
        ["to-color", PartyColors["INE"].low],
        15,
        ["to-color", PartyColors["INE"].mid],
        35,
        ["to-color", PartyColors["INE"].high]
      ],
      ["==", ["get", "FIRST_PARTY"], "PANAL"],
      [
        "step",
        ["to-number", ["get", "MARGIN"], 0],
        ["to-color", PartyColors.PANAL.low],
        15,
        ["to-color", PartyColors.PANAL.mid],
        35,
        ["to-color", PartyColors.PANAL.high]
      ],
      ["==", ["get", "FIRST_PARTY"], "PRI-PVEM"],
      [
        "step",
        ["to-number", ["get", "MARGIN"], 0],
        ["to-color", PartyColors["PRI-PVEM"].low],
        15,
        ["to-color", PartyColors["PRI-PVEM"].mid],
        35,
        ["to-color", PartyColors["PRI-PVEM"].high]
      ],
      ["==", ["get", "FIRST_PARTY"], "PRI-PVEM-PANAL"],
      [
        "step",
        ["to-number", ["get", "MARGIN"], 0],
        ["to-color", PartyColors["PRI-PVEM-PANAL"].low],
        15,
        ["to-color", PartyColors["PRI-PVEM-PANAL"].mid],
        35,
        ["to-color", PartyColors["PRI-PVEM-PANAL"].high]
      ],
      ["==", ["get", "FIRST_PARTY"], "PAN-PRD-MC"],
      [
        "step",
        ["to-number", ["get", "MARGIN"], 0],
        ["to-color", PartyColors["PAN-PRD-MC"].low],
        15,
        ["to-color", PartyColors["PAN-PRD-MC"].mid],
        35,
        ["to-color", PartyColors["PAN-PRD-MC"].high]
      ],
      ["==", ["get", "FIRST_PARTY"], "PRD-PT-MC"],
      [
        "step",
        ["to-number", ["get", "MARGIN"], 0],
        ["to-color", PartyColors["PRD-PT-MC"].low],
        15,
        ["to-color", PartyColors["PRD-PT-MC"].mid],
        35,
        ["to-color", PartyColors["PRD-PT-MC"].high]
      ],
      ["==", ["get", "FIRST_PARTY"], "PRD-PT-CONVERGENCIA"],
      [
        "step",
        ["to-number", ["get", "MARGIN"], 0],
        ["to-color", PartyColors["PRD-PT-CONVERGENCIA"].low],
        15,
        ["to-color", PartyColors["PRD-PT-CONVERGENCIA"].mid],
        35,
        ["to-color", PartyColors["PRD-PT-CONVERGENCIA"].high]
      ],
      ["==", ["get", "FIRST_PARTY"], "MORENA-PT-PES"],
      [
        "step",
        ["to-number", ["get", "MARGIN"], 0],
        [
          "to-color",
          year === 2018
            ? PartyColors["MORENA-PT-PES"].low2018
            : PartyColors["MORENA-PT-PES"].low
        ],
        15,
        ["to-color", PartyColors["MORENA-PT-PES"].mid],
        35,
        ["to-color", PartyColors["MORENA-PT-PES"].high]
      ],
      ["==", ["get", "FIRST_PARTY"], "MORENA-PT-PVEM"],
      [
        "step",
        ["to-number", ["get", "MARGIN"], 0],
        [
          "to-color",
          year === 2018
            ? PartyColors["MORENA-PT-PVEM"].low2018
            : PartyColors["MORENA-PT-PVEM"].low
        ],
        15,
        ["to-color", PartyColors["MORENA-PT-PVEM"].mid],
        35,
        ["to-color", PartyColors["MORENA-PT-PVEM"].high]
      ],
      [
        "step",
        ["to-number", ["get", "MARGIN"], 0],
        ["to-color", PartyColors.Independiente.low],
        15,
        ["to-color", PartyColors.Independiente.mid],
        35,
        ["to-color", PartyColors.Independiente.high]
      ]
    ],
    cong: [
      "case",
      ["==", ["get", "TIE"], "TRUE"],
      "white",
      ["==", ["get", "FIRST"], "No cómputo"],
      "black",
      ["==", ["get", "FIRST"], "PRI"],
      [
        "step",
        ["to-number", ["get", "MARGIN"], 0],
        ["to-color", PartyColors["PRI"].low],
        15,
        ["to-color", PartyColors["PRI"].mid],
        35,
        ["to-color", PartyColors["PRI"].high]
      ],
      ["==", ["get", "FIRST"], "MORENA"],
      [
        "step",
        ["to-number", ["get", "MARGIN"], 0],
        ["to-color", PartyColors["MORENA"].low],
        15,
        ["to-color", PartyColors["MORENA"].mid],
        35,
        ["to-color", PartyColors["MORENA"].high]
      ],
      ["==", ["get", "FIRST"], "PAN"],
      [
        "step",
        ["to-number", ["get", "MARGIN"], 0],
        ["to-color", PartyColors["PAN"].low],
        15,
        ["to-color", PartyColors["PAN"].mid],
        35,
        ["to-color", PartyColors["PAN"].high]
      ],
      ["==", ["get", "FIRST"], "PRD"],
      [
        "step",
        ["to-number", ["get", "MARGIN"], 0],
        ["to-color", PartyColors["PRD"].low],
        15,
        ["to-color", PartyColors["PRD"].mid],
        35,
        ["to-color", PartyColors["PRD"].high]
      ],
      ["==", ["get", "FIRST"], "MC"],
      [
        "step",
        ["to-number", ["get", "MARGIN"], 0],
        ["to-color", PartyColors["MC"].low],
        15,
        ["to-color", PartyColors["MC"].mid],
        35,
        ["to-color", PartyColors["MC"].high]
      ],
      ["==", ["get", "FIRST"], "PVEM"],
      [
        "step",
        ["to-number", ["get", "MARGIN"], 0],
        ["to-color", PartyColors["PVEM"].low],
        15,
        ["to-color", PartyColors["PVEM"].mid],
        35,
        ["to-color", PartyColors["PVEM"].high]
      ],
      ["==", ["get", "FIRST"], "PT"],
      [
        "step",
        ["to-number", ["get", "MARGIN"], 0],
        ["to-color", PartyColors["PT"].low],
        15,
        ["to-color", PartyColors["PT"].mid],
        35,
        ["to-color", PartyColors["PT"].high]
      ],
      ["==", ["get", "FIRST"], "FXM"],
      [
        "step",
        ["to-number", ["get", "MARGIN"], 0],
        ["to-color", PartyColors["FXM"].low],
        15,
        ["to-color", PartyColors["FXM"].mid],
        35,
        ["to-color", PartyColors["FXM"].high]
      ],
      ["==", ["get", "FIRST"], "PES"],
      [
        "step",
        ["to-number", ["get", "MARGIN"], 0],
        ["to-color", PartyColors["PES"].low],
        15,
        ["to-color", PartyColors["PES"].mid],
        35,
        ["to-color", PartyColors["PES"].high]
      ],
      ["==", ["get", "FIRST"], "RSP"],
      [
        "step",
        ["to-number", ["get", "MARGIN"], 0],
        ["to-color", PartyColors["RSP"].low],
        15,
        ["to-color", PartyColors["RSP"].mid],
        35,
        ["to-color", PartyColors["RSP"].high]
      ],
      ["==", ["get", "FIRST"], "PAN-PANAL"],
      [
        "step",
        ["to-number", ["get", "MARGIN"], 0],
        ["to-color", PartyColors["PAN-PANAL"].low],
        15,
        ["to-color", PartyColors["PAN-PANAL"].mid],
        35,
        ["to-color", PartyColors["PAN-PANAL"].high]
      ],
      ["==", ["get", "FIRST"], "PAN-PRI-PRD"],
      [
        "step",
        ["to-number", ["get", "MARGIN"], 0],
        ["to-color", PartyColors["PAN-PRI-PRD"].low],
        15,
        ["to-color", PartyColors["PAN-PRI-PRD"].mid],
        35,
        ["to-color", PartyColors["PAN-PRI-PRD"].high]
      ],
      ["==", ["get", "FIRST"], "INE"],
      [
        "step",
        ["to-number", ["get", "MARGIN"], 0],
        ["to-color", PartyColors["INE"].low],
        15,
        ["to-color", PartyColors["INE"].mid],
        35,
        ["to-color", PartyColors["INE"].high]
      ],
      ["==", ["get", "FIRST"], "PANAL"],
      [
        "step",
        ["to-number", ["get", "MARGIN"], 0],
        ["to-color", PartyColors.PANAL.low],
        15,
        ["to-color", PartyColors.PANAL.mid],
        35,
        ["to-color", PartyColors.PANAL.high]
      ],
      ["==", ["get", "FIRST"], "PRI-PVEM"],
      [
        "step",
        ["to-number", ["get", "MARGIN"], 0],
        ["to-color", PartyColors["PRI-PVEM"].low],
        15,
        ["to-color", PartyColors["PRI-PVEM"].mid],
        35,
        ["to-color", PartyColors["PRI-PVEM"].high]
      ],
      ["==", ["get", "FIRST"], "PRI-PVEM-PANAL"],
      [
        "step",
        ["to-number", ["get", "MARGIN"], 0],
        ["to-color", PartyColors["PRI-PVEM-PANAL"].low],
        15,
        ["to-color", PartyColors["PRI-PVEM-PANAL"].mid],
        35,
        ["to-color", PartyColors["PRI-PVEM-PANAL"].high]
      ],
      ["==", ["get", "FIRST"], "PAN-PRD-MC"],
      [
        "step",
        ["to-number", ["get", "MARGIN"], 0],
        ["to-color", PartyColors["PAN-PRD-MC"].low],
        15,
        ["to-color", PartyColors["PAN-PRD-MC"].mid],
        35,
        ["to-color", PartyColors["PAN-PRD-MC"].high]
      ],
      ["==", ["get", "FIRST"], "PRD-PT-MC"],
      [
        "step",
        ["to-number", ["get", "MARGIN"], 0],
        ["to-color", PartyColors["PRD-PT-MC"].low],
        15,
        ["to-color", PartyColors["PRD-PT-MC"].mid],
        35,
        ["to-color", PartyColors["PRD-PT-MC"].high]
      ],
      ["==", ["get", "FIRST"], "PRD-PT-CONVERGENCIA"],
      [
        "step",
        ["to-number", ["get", "MARGIN"], 0],
        ["to-color", PartyColors["PRD-PT-CONVERGENCIA"].low],
        15,
        ["to-color", PartyColors["PRD-PT-CONVERGENCIA"].mid],
        35,
        ["to-color", PartyColors["PRD-PT-CONVERGENCIA"].high]
      ],
      ["==", ["get", "FIRST"], "MORENA-PT-PES"],
      [
        "step",
        ["to-number", ["get", "MARGIN"], 0],
        ["to-color", PartyColors["MORENA-PT-PES"].low],
        15,
        ["to-color", PartyColors["MORENA-PT-PES"].mid],
        35,
        ["to-color", PartyColors["MORENA-PT-PES"].high]
      ],
      ["==", ["get", "FIRST"], "MORENA-PT-PVEM"],
      [
        "step",
        ["to-number", ["get", "MARGIN"], 0],
        ["to-color", PartyColors["MORENA-PT-PVEM"].low],
        15,
        ["to-color", PartyColors["MORENA-PT-PVEM"].mid],
        35,
        ["to-color", PartyColors["MORENA-PT-PVEM"].high]
      ],
      [
        "step",
        ["to-number", ["get", "MARGIN"], 0],
        ["to-color", PartyColors.Independiente.low],
        15,
        ["to-color", PartyColors.Independiente.mid],
        35,
        ["to-color", PartyColors.Independiente.high]
      ]
    ]
  };
};

export const PartyStrFillColors = (raceType, year, party) => {
  const partyField = Parties[`${raceType}-${year}`][party];

  return [
    "interpolate",
    ["linear"],
    ["to-number", ["get", partyField], 0],
    0,
    ["to-color", PartyColors[party].low, "#ffffff"],
    100,
    ["to-color", PartyColors[party].high, "#888888"]
  ];
};

export const TurnoutColor = [
  "interpolate",
  ["linear"],
  ["to-number", ["get", "TURNOUT"], 0],
  40,
  ["to-color", PartyColors.INE.low, "#ffffff"],
  80,
  ["to-color", PartyColors.INE.high, "#888888"]
];
