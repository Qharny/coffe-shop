import { useContext, useEffect, useState } from 'react';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';
import * as NativeSplashScreen from 'expo-splash-screen';
import { COLORS } from '@/constant/colos';



type Props = {
  onFinish?: () => void; 
  duration?: number; // ms the splash stays up
};

export default function SplashScreen({ onFinish, duration = 2800 }: Props) {
  const insetsContext = useContext(SafeAreaInsetsContext);
  const insets = insetsContext ?? { top: 0, bottom: 0, left: 0, right: 0 };

  // Animation values
  const [bgScale] = useState(() => new Animated.Value(1.12)); // slow zoom-out on the photo
  const [textOpacity] = useState(() => new Animated.Value(0));
  const [textY] = useState(() => new Animated.Value(24));
  const [lineWidth] = useState(() => new Animated.Value(0)); // underline accent
  const [dot] = useState(() => new Animated.Value(0)); // loading pulse

  useEffect(() => {
    // Hide the native splash screen once the custom animated splash screen mounts
    NativeSplashScreen.hideAsync().catch(() => {});

    // Background: gentle Ken Burns zoom
    Animated.timing(bgScale, {
      toValue: 1,
      duration: duration + 600,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start();

    // Text: fade + rise, then accent line grows
    Animated.sequence([
      Animated.delay(300),
      Animated.parallel([
        Animated.timing(textOpacity, { toValue: 1, duration: 700, useNativeDriver: true }),
        Animated.timing(textY, {
          toValue: 0,
          duration: 700,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(lineWidth, {
        toValue: 1,
        duration: 500,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: false,
      }),
    ]).start();

    // Loading dots pulse
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(dot, { toValue: 1, duration: 600, useNativeDriver: true }),
        Animated.timing(dot, { toValue: 0, duration: 600, useNativeDriver: true }),
      ])
    );
    pulse.start();

    const t = setTimeout(() => onFinish?.(), duration);
    return () => {
      clearTimeout(t);
      pulse.stop();
    };
  }, [bgScale, dot, duration, lineWidth, onFinish, textOpacity, textY]);

  const accentWidth = lineWidth.interpolate({ inputRange: [0, 1], outputRange: [0, 56] });

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* 1. Image background */}
      <Animated.View style={[StyleSheet.absoluteFill, { transform: [{ scale: bgScale }] }]}>
        <Image
          source={require('../../../assets/image/coffee.jpg')}
          style={StyleSheet.absoluteFill}
          contentFit="cover"
          transition={300}
        />
      </Animated.View>

      {/* 2. Overlay: light tint over the whole image + deep gradient at the bottom for text contrast */}
      <View style={[StyleSheet.absoluteFill, styles.tint]} />
      <LinearGradient
        colors={['transparent', 'rgba(26,15,10,0.55)', 'rgba(26,15,10,0.95)']}
        locations={[0.35, 0.65, 1]}
        style={StyleSheet.absoluteFill}
      />

      {/* 3. Text at the bottom */}
      <Animated.View
        style={[
          styles.content,
          {
            paddingBottom: insets.bottom + 40,
            opacity: textOpacity,
            transform: [{ translateY: textY }],
          },
        ]}>
        <Text style={styles.eyebrow}>EST. 2026 · ACCRA</Text>
        <Text style={styles.title}>Brew & Bean</Text>
        <Animated.View style={[styles.accent, { width: accentWidth }]} />
        <Text style={styles.tagline}>
          Freshly roasted, carefully poured.{'\n'}Your daily ritual starts here.
        </Text>

        <View style={styles.dots}>
          {[0, 1, 2].map((i) => (
            <Animated.View
              key={i}
              style={[
                styles.dot,
                {
                  opacity: dot.interpolate({
                    inputRange: [0, 1],
                    outputRange: i === 1 ? [1, 0.3] : [0.3, 1],
                  }),
                },
              ]}
            />
          ))}
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.espresso, // shows while the image loads
    overflow: 'hidden',
  },
  tint: {
    backgroundColor: 'rgba(26,15,10,0.25)',
  },
  content: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 28,
  },
  eyebrow: {
    color: COLORS.latte,
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 3,
    marginBottom: 10,
  },
  title: {
    color: COLORS.cream,
    fontSize: 44,
    fontWeight: '800',
    letterSpacing: -0.5,
    lineHeight: 50,
    // Swap in a serif via expo-font for a café feel, e.g. fontFamily: 'PlayfairDisplay_700Bold'
  },
  accent: {
    height: 3,
    borderRadius: 2,
    backgroundColor: COLORS.latte,
    marginTop: 14,
    marginBottom: 16,
  },
  tagline: {
    color: 'rgba(245,230,211,0.85)',
    fontSize: 16,
    lineHeight: 24,
  },
  dots: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 32,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: COLORS.cream,
  },
});

