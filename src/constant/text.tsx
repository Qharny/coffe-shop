import React from "react";
import {
  StyleSheet,
  type ColorValue,
  type StyleProp,
  type TextProps,
  type TextStyle,
} from "react-native";
import { Text } from "react-native";
const useThemeColors = () => ({
  alert: { success: '#2e7d32', error: '#d32f2f', warning: '#ed6c02', info: '#0288d1' },
  codeBackground: '#e0e0e0',
  link: '#1976d2',
});
import { typography } from "./typography";
// Local type aliases
type ThreeSizes = 1 | 2 | 3;
type SizeLMs = "large" | "medium" | "small";
type PrimitiveTextProps = {
  text: React.ReactNode;
  color?: ColorValue;
  style?: StyleProp<TextStyle>;
} & Pick<
  TextProps,
  | "accessibilityLabel"
  | "accessibilityRole"
  | "adjustsFontSizeToFit"
  | "allowFontScaling"
  | "ellipsizeMode"
  | "maxFontSizeMultiplier"
  | "minimumFontScale"
  | "numberOfLines"
>;
// React Native treats `{ color: undefined }` as "clear the color", which would
// drop a color set in `style` and the theme default. Only override when given.
const colorOverride = (color?: ColorValue) =>
  color == null ? null : { color };
// Header
export const Header = ({
  color,
  text,
  style,
  ...textProps
}: PrimitiveTextProps) => {
  return (
<Text style={[styles.text, style, colorOverride(color)]} {...textProps}>
      {text}
</Text>
  );
};
// Enhanced Text Components with Style Support
export const Display = ({
  color,
  text,
  style,
  size = 1,
  ...textProps
}: PrimitiveTextProps & {
  size?: ThreeSizes;
}) => {
  let displayStyle: TextStyle;
  switch (size) {
    case 1:
      displayStyle = typography.display1;
      break;
    case 2:
      displayStyle = typography.display2;
      break;
    default:
      displayStyle = typography.display3;
  }
  return (
<Text style={[displayStyle, style, colorOverride(color)]} {...textProps}>
      {text}
</Text>
  );
};
export const Title = ({
  color,
  text,
  style,
  size = "medium",
  ...textProps
}: PrimitiveTextProps & {
  size?: SizeLMs;
}) => {
  let titleStyle: TextStyle;
  switch (size) {
    case "large":
      titleStyle = typography.titleLarge;
      break;
    case "small":
      titleStyle = typography.titleSmall;
      break;
    default:
      titleStyle = typography.titleMedium;
  }
  return (
<Text style={[titleStyle, style, colorOverride(color)]} {...textProps}>
      {text}
</Text>
  );
};
export const Heading = ({
  color,
  text,
  style,
  level = 1,
  ...textProps
}: PrimitiveTextProps & {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}) => {
  const headingStyles: Record<number, TextStyle> = {
    1: typography.h1,
    2: typography.h2,
    3: typography.h3,
    4: typography.h4,
    5: typography.h5,
    6: typography.h6,
  };
  return (
<Text
      style={[headingStyles[level], style, colorOverride(color)]}
      {...textProps}
>
      {text}
</Text>
  );
};
export const Body = ({
  color,
  text,
  style,
  size = "medium",
  align = "left",
  ...textProps
}: PrimitiveTextProps & {
  size?: SizeLMs;
  align?: "left" | "auto" | "right" | "center" | "justify" | undefined;
}) => {
  let bodyStyle: TextStyle;
  switch (size) {
    case "large":
      bodyStyle = typography.bodyLarge;
      break;
    case "small":
      bodyStyle = typography.bodySmall;
      break;
    default:
      bodyStyle = typography.bodyMedium;
  }
  return (
<Text
      style={[bodyStyle, style, { textAlign: align }, colorOverride(color)]}
      {...textProps}
>
      {text}
</Text>
  );
};
export const Label = ({
  color,
  text,
  style,
  size = "medium",
  ...textProps
}: PrimitiveTextProps & {
  size?: SizeLMs;
}) => {
  let labelStyle: TextStyle;
  switch (size) {
    case "large":
      labelStyle = typography.labelLarge;
      break;
    case "small":
      labelStyle = typography.labelSmall;
      break;
    default:
      labelStyle = typography.labelMedium;
  }
  return (
<Text
      style={[labelStyle, style, colorOverride(color), { flexWrap: "wrap" }]}
      {...textProps}
>
      {text}
</Text>
  );
};
export const Caption = ({
  color,
  text,
  style,
  size = "large",
  ...textProps
}: PrimitiveTextProps & {
  size?: "large" | "small";
}) => {
  const captionStyle =
    size === "large" ? typography.captionLarge : typography.caption;
  return (
<Text style={[captionStyle, style, colorOverride(color)]} {...textProps}>
      {text}
</Text>
  );
};
export const Button = ({
  color,
  text,
  style,
  size = "medium",
  ...textProps
}: PrimitiveTextProps & {
  size?: "large" | "medium";
}) => {
  const buttonStyle =
    size === "large" ? typography.buttonLarge : typography.button;
  return (
<Text style={[buttonStyle, style, colorOverride(color)]} {...textProps}>
      {text}
</Text>
  );
};
export const Overline = ({
  color,
  text,
  style,
  ...textProps
}: PrimitiveTextProps) => {
  return (
<Text
      style={[typography.overline, style, colorOverride(color)]}
      {...textProps}
>
      {text}
</Text>
  );
};
export const Alert = ({
  color,
  text,
  style,
  variant = "info",
  ...textProps
}: PrimitiveTextProps & {
  variant?: "success" | "error" | "warning" | "info";
}) => {
  const colors = useThemeColors();
  const finalColor = color || colors.alert[variant];
  return (
<Text
      style={[
        typography.labelMedium,
        styles.alert,
        style,
        { color: finalColor },
      ]}
      {...textProps}
>
      {text}
</Text>
  );
};
export const Emphasized = ({
  color,
  text,
  style,
  weight = "bold",
  size = "medium",
  numberOfLines,
  adjustsFontSizeToFit,
  minimumFontScale,
  ...textProps
}: PrimitiveTextProps & {
  weight?: "bold" | "semiBold" | "medium" | "light" | "thin";
  size?: SizeLMs;
}) => {
  const weightStyles: Record<string, TextStyle> = {
    bold: typography.bold,
    semiBold: typography.semiBold,
    medium: typography.medium,
    light: typography.light,
    thin: typography.thin,
  };
  let bodyStyle: TextStyle;
  switch (size) {
    case "large":
      bodyStyle = typography.bodyLarge;
      break;
    case "small":
      bodyStyle = typography.bodySmall;
      break;
    default:
      bodyStyle = typography.bodyMedium;
  }
  return (
<Text
      style={[bodyStyle, weightStyles[weight], style, colorOverride(color)]}
      numberOfLines={numberOfLines}
      adjustsFontSizeToFit={adjustsFontSizeToFit}
      minimumFontScale={minimumFontScale}
      {...textProps}
>
      {text}
</Text>
  );
};
export const Code = ({
  color,
  text,
  style,
  ...textProps
}: PrimitiveTextProps) => {
  const colors = useThemeColors();
  return (
<Text
      style={[
        typography.mono,
        styles.code,
        { backgroundColor: colors.codeBackground },
        style,
        colorOverride(color),
      ]}
      {...textProps}
>
      {text}
</Text>
  );
};
export const Link = ({
  color,
  text,
  style,
  onPress,
  ...textProps
}: PrimitiveTextProps & {
  color?: ColorValue;
  onPress?: () => void;
}) => {
  const colors = useThemeColors();
  const linkColor = color || colors.link;
  return (
<Text
      style={[typography.bodyMedium, styles.link, style, { color: linkColor }]}
      onPress={onPress}
      {...textProps}
>
      {text}
</Text>
  );
};
const styles = StyleSheet.create({
  text: {
    ...typography.title,
  },
  alert: {
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  code: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  link: {
    textDecorationLine: "underline",
  },
});