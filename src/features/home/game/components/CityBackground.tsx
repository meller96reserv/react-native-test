import { memo } from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import Animated from 'react-native-reanimated';

import { colors } from '@/theme/tokens';

import { CITY_PATTERN, gamePalette } from '../gameConfig';

const CityStrip = memo(function CityStrip() {
  return (
    <View style={styles.strip}>
      {CITY_PATTERN.map((building, buildingIndex) => (
        <View
          key={buildingIndex}
          style={[
            styles.building,
            { backgroundColor: building.color, flex: building.flex, height: building.height },
          ]}
        >
          <View style={styles.windows}>
            {Array.from({ length: building.rows }, (_, rowIndex) => (
              <View key={rowIndex} style={styles.windowRow}>
                {Array.from({ length: building.columns }, (_, columnIndex) => (
                  <View
                    key={columnIndex}
                    style={[
                      styles.window,
                      (rowIndex + columnIndex + buildingIndex) % 4 === 0
                        ? styles.purpleWindow
                        : styles.limeWindow,
                    ]}
                  />
                ))}
              </View>
            ))}
          </View>
        </View>
      ))}
    </View>
  );
});

type CityBackgroundProps = { animatedStyle: StyleProp<ViewStyle> };

export const CityBackground = memo(function CityBackground({ animatedStyle }: CityBackgroundProps) {
  return (
    <Animated.View
      style={[styles.track, animatedStyle]}
      pointerEvents="none"
      renderToHardwareTextureAndroid
      shouldRasterizeIOS
    >
      <CityStrip />
      <CityStrip />
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  track: {
    position: 'absolute',
    top: 0,
    bottom: 74,
    left: 0,
    width: '200%',
    flexDirection: 'row',
    backgroundColor: gamePalette.sky,
  },
  strip: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 5,
    paddingHorizontal: 5,
  },
  building: {
    minWidth: 34,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    borderWidth: 1,
    borderColor: gamePalette.buildingBorder,
    overflow: 'hidden',
  },
  windows: { ...StyleSheet.absoluteFillObject, justifyContent: 'space-evenly', paddingVertical: 5 },
  windowRow: { flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' },
  window: { width: 7, height: 10, borderRadius: 1 },
  limeWindow: {
    backgroundColor: colors.accent,
    shadowColor: colors.accent,
    shadowOpacity: 0.9,
    shadowRadius: 5,
  },
  purpleWindow: {
    backgroundColor: gamePalette.purpleWindow,
    shadowColor: colors.primary,
    shadowOpacity: 0.8,
    shadowRadius: 5,
  },
});
