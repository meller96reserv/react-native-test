export const colors = {
  canvas: '#F4F1EA',
  surface: '#FFFFFF',
  ink: '#17201B',
  muted: '#68736C',
  primary: '#275D45',
  primaryPressed: '#194733',
  accent: '#D7F06A',
  border: '#D9DED9',
  error: '#A43D3D',
  overlay: 'rgba(23, 32, 27, 0.08)',
} as const;

export const spacing = { xs: 6, sm: 10, md: 16, lg: 24, xl: 32, xxl: 48 } as const;
export const radius = { sm: 12, md: 18, lg: 28, pill: 999 } as const;
export const typography = {
  display: { fontSize: 38, lineHeight: 44, fontWeight: '800' as const },
  title: { fontSize: 28, lineHeight: 34, fontWeight: '800' as const },
  heading: { fontSize: 20, lineHeight: 26, fontWeight: '700' as const },
  body: { fontSize: 16, lineHeight: 24, fontWeight: '400' as const },
  label: { fontSize: 15, lineHeight: 20, fontWeight: '700' as const },
  caption: { fontSize: 13, lineHeight: 18, fontWeight: '500' as const },
} as const;
