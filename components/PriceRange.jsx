import { View, TextInput, StyleSheet } from 'react-native'
import React from 'react'
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedGestureHandler, useAnimatedStyle, useAnimatedProps, runOnJS } from 'react-native-reanimated';

const PriceRange = ({ min, max, sliderWidth, onValueChange, step }) => {
  const position = useSharedValue(0);
  const position2 = useSharedValue(sliderWidth);
  const zIndex = useSharedValue(0);
  const zIndex2 = useSharedValue(0);
  const opacity = useSharedValue(0);
  const opacity2 = useSharedValue(0);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (event, ctx) => {
      ctx.startX = position.value;
    },
    onActive: (event, ctx) => {
      opacity.value = 1;
      if (ctx.startX + event.translationX < 0) {
        position.value = 0;
      } else if (ctx.startX + event.translationX > position2.value) {
        position.value = position2.value;
        zIndex.value = 1;
        zIndex2.value = 0;
      }
      else {
        position.value = ctx.startX + event.translationX;
      }
    },
    onEnd: (event, ctx) => {
      opacity.value = 0;
      runOnJS(onValueChange)({
        min: min + Math.floor(position.value / ((sliderWidth / (max - min) / step))) * step,
        max: min + Math.floor(position2.value / ((sliderWidth / (max - min) / step))) * step,
      })
    }
  });

  const gestureHandler2 = useAnimatedGestureHandler({
    onStart: (event, ctx) => {
      ctx.startX = position2.value;
    },
    onActive: (event, ctx) => {
      opacity2.value = 1;
      if (ctx.startX + event.translationX > sliderWidth) {
        position2.value = sliderWidth;
      } else if (ctx.startX + event.translationX < position.value) {
        position2.value = position.value;
        zIndex.value = 0;
        zIndex2.value = 1;
      } else {
        position2.value = ctx.startX + event.translationX;
      }
    },
    onEnd: (event, ctx) => {
      opacity2.value = 0;
      runOnJS(onValueChange)({
        min: min + Math.floor(position.value / ((sliderWidth / (max - min) / step))) * step,
        max: min + Math.floor(position2.value / ((sliderWidth / (max - min) / step))) * step,
      })
    }
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: position.value,
        }
      ],
      zIndex: zIndex.value,
    };
  });

  const animatedStyle2 = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: position2.value,
        }
      ],
      zIndex: zIndex2.value,
    };
  });

  const opacityStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  })

  const opacityStyle2 = useAnimatedStyle(() => {
    return {
      opacity: opacity2.value,
    };
  })

  const sliderStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: position.value,
        }
      ],
      width: position2.value - position.value,
    };
  })

  const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

  const minLabelText = useAnimatedProps(() => {
    return {
      text: `$${min + Math.floor(position.value / ((sliderWidth / (max - min) / step))) * step}`,
    };
  });

  const maxLabelText = useAnimatedProps(() => {
    return {
      text: `$${min + Math.floor(position2.value / ((sliderWidth / (max - min) / step))) * step}`,
    };
  });


  return (
    <View style={styles.sliderContainer}>
      <View style={[styles.sliderBack, { width: sliderWidth }]} />
      <Animated.View style={[styles.sliderFront, sliderStyle, { width: sliderWidth }]} />
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={[styles.thumb, animatedStyle]} >
          <Animated.View style={[styles.label, opacityStyle]}>
            <AnimatedTextInput style={styles.textLabel} defaultValue={`$${min}`} animatedProps={minLabelText} editable={false} />
          </Animated.View>
        </Animated.View>
      </PanGestureHandler>
      <PanGestureHandler onGestureEvent={gestureHandler2}>
        <Animated.View style={[styles.thumb, animatedStyle2]} >
          <Animated.View style={[styles.label, opacityStyle2]}>
            <AnimatedTextInput style={styles.textLabel} defaultValue={`$${max}`} animatedProps={maxLabelText} editable={false} />
          </Animated.View>
        </Animated.View>
      </PanGestureHandler>
    </View>

  )
}

export default PriceRange

const styles = StyleSheet.create({
  sliderContainer: {
    justifyContent: 'center',
    alignSelf: 'center',
  },
  sliderBack: {
    height: 8,
    backgroundColor: '#6E6E6E',
    borderRadius: 20,
  },
  sliderFront: {
    height: 8,
    backgroundColor: '#000000',
    borderRadius: 20,
    position: 'absolute',
  },
  thumb: {
    position: 'absolute',
    left: -10,
    width: 20,
    height: 20,
    backgroundColor: "white",
    borderColor: "#000000",
    borderWidth: 5,
    borderRadius: 10,
  },
  label: {
    position: 'absolute',
    top: 20,
    bottom: -40,
    backgroundColor: 'black',
    borderRadius: 5,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textLabel: {
    color: "white",
    padding: 5,
    fontWeight: 'bold',
    width: "100%",
    fontSize: 16,
  }
})