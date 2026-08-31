import { memo } from 'react';
import { StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import Animated from 'react-native-reanimated';

import { CAR_WIDTH, GROUND_OFFSET } from '../gameEngine';
import { gamePalette } from '../gameConfig';

type PoliceCarSpriteProps = { animatedStyle: StyleProp<ViewStyle>; hidden: boolean };

export const PoliceCarSprite = memo(function PoliceCarSprite({
  animatedStyle,
  hidden,
}: PoliceCarSpriteProps) {
  return (
    <Animated.View style={[styles.car, animatedStyle, hidden && styles.hidden]}>
      <View style={styles.lights}>
        <View style={styles.redLight} />
        <View style={styles.blueLight} />
      </View>
      <View style={styles.cabin} />
      <View style={styles.body}>
        <Text style={styles.label}>POLICE</Text>
      </View>
      <View style={styles.wheel} />
      <View style={[styles.wheel, styles.wheelRight]} />
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  car: {
    position: 'absolute',
    left: 0,
    bottom: GROUND_OFFSET - 1,
    width: CAR_WIDTH,
    height: 48,
  },
  hidden: { opacity: 0 },
  lights: { position: 'absolute', zIndex: 2, top: 2, left: 22, flexDirection: 'row' },
  redLight: { width: 8, height: 5, backgroundColor: gamePalette.redLight },
  blueLight: { width: 8, height: 5, backgroundColor: gamePalette.blueLight },
  cabin: {
    position: 'absolute',
    width: 34,
    height: 21,
    top: 7,
    left: 12,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 12,
    backgroundColor: gamePalette.policeBody,
    borderWidth: 3,
    borderColor: gamePalette.policeOutline,
  },
  body: {
    position: 'absolute',
    width: CAR_WIDTH,
    height: 25,
    bottom: 5,
    borderRadius: 7,
    backgroundColor: gamePalette.policeBody,
    borderWidth: 3,
    borderColor: gamePalette.policeOutline,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: { fontSize: 8, fontWeight: '900', color: gamePalette.policeLabel },
  wheel: {
    position: 'absolute',
    width: 11,
    height: 11,
    borderRadius: 6,
    bottom: 0,
    left: 8,
    backgroundColor: gamePalette.tire,
    borderWidth: 2,
    borderColor: gamePalette.tireRim,
  },
  wheelRight: { left: 40 },
});
