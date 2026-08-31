import { memo } from 'react';
import { StyleSheet, View } from 'react-native';

import { colors, radius } from '@/theme/tokens';

export const OnboardingHero = memo(function OnboardingHero() {
  return (
    <View style={styles.hero} accessibilityLabel="Скейтборд на рампе">
      <View style={styles.ramp} />
      <View style={styles.skateboard}>
        <View style={styles.deck} />
        <View style={styles.wheelLeft} />
        <View style={styles.wheelRight} />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  hero: {
    height: 260,
    borderRadius: radius.lg,
    backgroundColor: colors.primary,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ramp: {
    position: 'absolute',
    width: 230,
    height: 120,
    left: -28,
    bottom: -44,
    borderTopRightRadius: 120,
    backgroundColor: '#5B21B6',
    transform: [{ rotate: '-4deg' }],
  },
  skateboard: {
    position: 'absolute',
    width: 132,
    height: 40,
    right: 42,
    top: 92,
    transform: [{ rotate: '-14deg' }],
  },
  deck: { width: 132, height: 14, borderRadius: 9, backgroundColor: colors.accent },
  wheelLeft: {
    position: 'absolute',
    width: 14,
    height: 14,
    borderRadius: 7,
    left: 20,
    top: 15,
    backgroundColor: colors.ink,
  },
  wheelRight: {
    position: 'absolute',
    width: 14,
    height: 14,
    borderRadius: 7,
    right: 20,
    top: 15,
    backgroundColor: colors.ink,
  },
});
