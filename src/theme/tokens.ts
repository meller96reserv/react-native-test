export const colors = {
  canvas: '#100718',
  surface: '#1D102C',
  ink: '#F8F1FF',
  muted: '#B8A6C9',
  primary: '#9B5CFF',
  primaryPressed: '#7636DC',
  accent: '#D7FF3F',
  border: '#43275F',
  error: '#FF5C7A',
  overlay: 'rgba(215, 255, 63, 0.10)',
} as const;

export const spacing = { xs: 6, sm: 10, md: 16, lg: 24, xl: 32, xxl: 48 } as const;
export const radius = { sm: 12, md: 18, lg: 28, pill: 999 } as const;
export const typography = {
  display: { fontFamily: 'BebasNeue_400Regular', fontSize: 44, lineHeight: 48, letterSpacing: 1.2 },
  title: { fontFamily: 'BebasNeue_400Regular', fontSize: 34, lineHeight: 38, letterSpacing: 1 },
  heading: { fontFamily: 'BebasNeue_400Regular', fontSize: 25, lineHeight: 29, letterSpacing: 0.8 },
  body: { fontFamily: 'BebasNeue_400Regular', fontSize: 19, lineHeight: 25, letterSpacing: 0.5 },
  label: { fontFamily: 'BebasNeue_400Regular', fontSize: 18, lineHeight: 22, letterSpacing: 0.8 },
  caption: { fontFamily: 'BebasNeue_400Regular', fontSize: 15, lineHeight: 19, letterSpacing: 0.6 },
} as const;
