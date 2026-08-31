export const gamePalette = {
  sky: '#190B2D',
  road: '#2A1A3B',
  roadEdge: '#7441A5',
  buildingBorder: '#6D3295',
  purpleWindow: '#D7A8FF',
  skin: '#E4A67A',
  policeOutline: '#28332E',
  policeBody: '#F6F8F7',
  policeLabel: '#26322C',
  tire: '#07030D',
  tireRim: '#DCC9EE',
  redLight: '#E04C4C',
  blueLight: '#427BD8',
} as const;

export const CITY_PATTERN = [
  { flex: 0.82, height: '58%', color: '#32184E', rows: 8, columns: 2 },
  { flex: 1, height: '88%', color: '#482267', rows: 13, columns: 3 },
  { flex: 0.74, height: '70%', color: '#281340', rows: 10, columns: 2 },
  { flex: 1.08, height: '96%', color: '#552478', rows: 15, columns: 3 },
  { flex: 0.78, height: '64%', color: '#351850', rows: 9, columns: 2 },
  { flex: 0.98, height: '82%', color: '#432060', rows: 12, columns: 3 },
] as const;

export const ROAD_MARKERS = Array.from({ length: 7 }, (_, index) => index);
export const LOOP_STRIPS = [0, 1] as const;

export const INITIAL_GAME_WIDTH = 320;
export const FLIP_DEGREES_PER_SECOND = 480;
export const MIN_CAR_GAP = 150;
export const RANDOM_CAR_GAP = 190;
