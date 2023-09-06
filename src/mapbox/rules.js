
export const StateOlWidth = [
  "interpolate",
  ["linear"],
  ["zoom"],
  4,
  0.0,
  7,
  5.0
];

export const MunFillOpacity = (opacity) => [
  "interpolate",
  ["exponential", 0.5],
  ["zoom"],
  4,
  0.0,
  4.5,
  opacity
];

export const MunDisFillOpacity = (opacity) => [
  "interpolate",
  ["exponential", 0.5],
  ["zoom"],
  8,
  0.0,
  8.5,
  opacity
];

export const DisFillOpacity = (opacity) => [
  "interpolate",
  ["exponential", 0.5],
  ["zoom"],
  4,
  0.0,
  4.5,
  opacity,
  8,
  opacity,
  8.5,
  0.0
];

export const StateFillOpacity = [
  "interpolate",
  ["exponential", 0.5],
  ["zoom"],
  4,
  0.0,
  4.5,
  1.0,
  6.5,
  1.0,
  7,
  1.0
];

export const ForceMunFillOpacity = (opacity) => [
  "interpolate",
  ["exponential", 0.5],
  ["zoom"],
  4,
  opacity,
  4.5,
  opacity,
  6,
  opacity,
  7,
  opacity
];

export const ForceDisFillOpacity = (opacity) => [
  "interpolate",
  ["exponential", 0.5],
  ["zoom"],
  4,
  opacity,
  4.5,
  opacity,
  6,
  opacity,
  7,
  opacity
];

export const MunOutlineColor = (fillColor) => [
  "interpolate",
  ["exponential", 0.5],
  ["zoom"],
  5,
  fillColor,
  6,
  fillColor,
  7,
  ["to-color", "white"]
];

export const MunDisOutlineColor = (fillColor) => [
  "interpolate",
  ["exponential", 0.5],
  ["zoom"],
  5,
  fillColor,
  6,
  fillColor,
  7,
  ["to-color", "white"]
];

export const DisOutlineColor = (fillColor) => [
  "interpolate",
  ["exponential", 0.5],
  ["zoom"],
  5,
  fillColor,
  6,
  fillColor,
  7,
  ["to-color", "white"]
];

export const StateOutlineColor = (fillColor) => [
  "interpolate",
  ["exponential", 0.5],
  ["zoom"],
  4,
  fillColor,
  4.5,
  ["to-color", "white"],
  7,
  ["to-color", "white"]
];

export const PresMunCircleRadius = [
  "interpolate",
  ["exponential", 0.5],
  ["zoom"],
  4,
  ["max", ["/", ["get", "FIRST_VOTES"], 12000], 6],
  8,
  ["max", ["/", ["get", "FIRST_VOTES"], 6000], 6],
  12,
  ["max", ["/", ["get", "FIRST_VOTES"], 3000], 6]
];

export const CongMunCircleRadius = [
  "interpolate",
  ["exponential", 0.5],
  ["zoom"],
  4,
  ["max", ["/", ["get", "FIRST_VOTES"], 12000], 6],
  8,
  ["max", ["/", ["get", "FIRST_VOTES"], 6000], 6],
  12,
  ["max", ["/", ["get", "FIRST_VOTES"], 3000], 6]
];

export const DisCircleRadius = [
  "interpolate",
  ["exponential", 0.5],
  ["zoom"],
  4,
  ["max", ["/", ["get", "FIRST_VOTES"], 6000], 6],
  8,
  ["max", ["/", ["get", "FIRST_VOTES"], 3000], 6],
  12,
  ["max", ["/", ["get", "FIRST_VOTES"], 1500], 6]
];

export const StateCircleRadius = ["/", ["get", "FIRST_votes"], 5000];
