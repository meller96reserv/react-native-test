import { memo } from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import Animated from 'react-native-reanimated';

import { colors } from '@/theme/tokens';

import { gamePalette, LOOP_STRIPS, ROAD_MARKERS } from '../gameConfig';

type RoadProps = { animatedStyle: StyleProp<ViewStyle> };

export const Road = memo(function Road({ animatedStyle }: RoadProps) {
  return (
    <View style={styles.road}>
      <Animated.View style={[styles.track, animatedStyle]} pointerEvents="none">
        {LOOP_STRIPS.map((strip) => (
          <View key={strip} style={styles.strip}>
            {ROAD_MARKERS.map((marker) => (
              <View key={marker} style={styles.line} />
            ))}
          </View>
        ))}
      </Animated.View>
    </View>
  );
});

const styles = StyleSheet.create({
  road: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 74,
    backgroundColor: gamePalette.road,
    borderTopWidth: 4,
    borderTopColor: gamePalette.roadEdge,
  },
  track: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: '200%',
    flexDirection: 'row',
  },
  strip: {
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 25,
  },
  line: { width: 34, height: 4, borderRadius: 2, backgroundColor: colors.primary },
});
