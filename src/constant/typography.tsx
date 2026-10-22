import { StyleSheet, Platform } from "react-native";
export const fonts = {
  regular: "MTNBrighterSans",
  medium: "MTNBrighterSans-Medium",
  bold: "MTNBrighterSans-ExtraBold",
};
export const typography = StyleSheet.create({
  h1: {
    fontFamily: fonts.bold,
    fontSize: 24,
  },
  h2: {
    fontFamily: fonts.bold,
    fontSize: 20,
  },
  h3: {
    fontFamily: fonts.bold,
    fontSize: 14,
  },
  body: {
    fontFamily: fonts.regular,
    fontSize: 16,
  },
  caption: {
    fontFamily: fonts.regular,
    fontSize: 14,
  },
  label: {
    fontFamily: fonts.regular,
    fontSize: 12,
  },
  bold: {
    fontFamily: fonts.bold,
  },
  titleRegular: {
    fontFamily: fonts.regular,
    fontSize: 18,
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: 18,
  },
  // --- Added variants to support richer text primitives ---
  // Display variants (above h1)
  display1: {
    fontFamily: fonts.bold,
    fontSize: 40,
  },
  display2: {
    fontFamily: fonts.bold,
    fontSize: 36,
  },
  display3: {
    fontFamily: fonts.bold,
    fontSize: 24,
  },
  // Additional headings
  h4: {
    fontFamily: fonts.bold,
    fontSize: 13,
  },
  h5: {
    fontFamily: fonts.bold,
    fontSize: 12,
  },
  h6: {
    fontFamily: fonts.bold,
    fontSize: 11,
  },
  // Body sizes
  bodyLarge: {
    fontFamily: fonts.regular,
    fontSize: 16, // matches body
  },
  bodyMedium: {
    fontFamily: fonts.regular,
    fontSize: 14,
  },
  bodySmall: {
    fontFamily: fonts.regular,
    fontSize: 12,
  },
  // Label sizes
  labelLarge: {
    fontFamily: fonts.regular,
    fontSize: 14,
  },
  labelMedium: {
    fontFamily: fonts.regular,
    fontSize: 12, // matches label
  },
  labelSmall: {
    fontFamily: fonts.regular,
    fontSize: 11,
    flexShrink: 1,
  },
  describtion: {
    fontFamily: fonts.regular,
    fontSize: 10,
    flexShrink: 1,
  },
  // Caption sizes
  captionLarge: {
    fontFamily: fonts.regular,
    fontSize: 14, // aligned with caption
  },
  // Title sizes
  titleLarge: {
    fontFamily: fonts.medium,
    fontSize: 20,
  },
  titleMedium: {
    fontFamily: fonts.bold,
    fontSize: 18, // matches title
  },
  titleSmall: {
    fontFamily: fonts.bold,
    fontSize: 14,
  },
  // Button text
  button: {
    fontFamily: fonts.bold,
    fontSize: 16,
  },
  buttonLarge: {
    fontFamily: fonts.bold,
    fontSize: 18,
  },
  // Overline
  overline: {
    fontFamily: fonts.regular,
    fontSize: 10,
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  // Weight helpers (map to available font families)
  semiBold: {
    fontFamily: fonts.medium,
  },
  medium: {
    fontFamily: fonts.medium,
  },
  light: {
    fontFamily: fonts.regular,
  },
  thin: {
    fontFamily: fonts.regular,
  },
  // Monospace
  mono: {
    fontFamily: Platform.select({ ios: "Courier", android: "monospace" }),
    fontSize: 14,
  },
});

 