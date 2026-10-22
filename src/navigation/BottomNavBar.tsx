import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constant/colors';

export type TabId = 'home' | 'menu' | 'favorites' | 'cart' | 'profile';

export interface TabItem {
  id: TabId;
  label: string;
  iconActive: keyof typeof Ionicons.glyphMap;
  iconInactive: keyof typeof Ionicons.glyphMap;
  badge?: number;
}

export interface BottomNavBarProps {
  activeTab: TabId;
  onTabChange: (tabId: TabId) => void;
  cartCount?: number;
}

const TABS: TabItem[] = [
  {
    id: 'home',
    label: 'Home',
    iconActive: 'home',
    iconInactive: 'home-outline',
  },
  {
    id: 'menu',
    label: 'Menu',
    iconActive: 'cafe',
    iconInactive: 'cafe-outline',
  },
  {
    id: 'favorites',
    label: 'Saved',
    iconActive: 'heart',
    iconInactive: 'heart-outline',
  },
  {
    id: 'cart',
    label: 'Cart',
    iconActive: 'bag-handle',
    iconInactive: 'bag-handle-outline',
  },
  {
    id: 'profile',
    label: 'Profile',
    iconActive: 'person',
    iconInactive: 'person-outline',
  },
];

interface NavItemProps {
  tab: TabItem;
  isActive: boolean;
  onPress: () => void;
  badgeCount?: number;
}

const NavItem: React.FC<NavItemProps> = ({ tab, isActive, onPress, badgeCount }) => {
  const scaleAnim = useRef(new Animated.Value(isActive ? 1 : 0.95)).current;
  const pillOpacity = useRef(new Animated.Value(isActive ? 1 : 0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: isActive ? 1.08 : 1,
        useNativeDriver: true,
        friction: 6,
        tension: 80,
      }),
      Animated.timing(pillOpacity, {
        toValue: isActive ? 1 : 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  }, [isActive, scaleAnim, pillOpacity]);

  const effectiveBadge = tab.id === 'cart' ? badgeCount : tab.badge;

  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityState={{ selected: isActive }}
      accessibilityLabel={`${tab.label} tab`}
      activeOpacity={0.75}
      onPress={onPress}
      style={styles.navItem}
    >
      <Animated.View
        style={[
          styles.itemContent,
          {
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        {/* Active Pill Glow */}
        <Animated.View
          style={[
            styles.activePill,
            {
              opacity: pillOpacity,
            },
          ]}
        />

        <View style={styles.iconContainer}>
          <Ionicons
            name={isActive ? tab.iconActive : tab.iconInactive}
            size={22}
            color={isActive ? COLORS.latte : 'rgba(245, 230, 211, 0.48)'}
          />

          {/* Badge for items like Cart */}
          {!!effectiveBadge && effectiveBadge > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                {effectiveBadge > 99 ? '99+' : effectiveBadge}
              </Text>
            </View>
          )}
        </View>

        <Text
          numberOfLines={1}
          style={[
            styles.label,
            isActive ? styles.labelActive : styles.labelInactive,
          ]}
        >
          {tab.label}
        </Text>

        {/* Small active dot indicator */}
        {isActive && <View style={styles.activeDot} />}
      </Animated.View>
    </TouchableOpacity>
  );
};

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  activeTab,
  onTabChange,
  cartCount = 2,
}) => {
  const insets = useSafeAreaInsets();
  const bottomInset = Math.max(insets.bottom, Platform.OS === 'ios' ? 12 : 10);

  return (
    <View
      pointerEvents="box-none"
      style={[
        styles.wrapper,
        {
          paddingBottom: bottomInset,
        },
      ]}
    >
      <View style={styles.container}>
        {TABS.map((tab) => (
          <NavItem
            key={tab.id}
            tab={tab}
            isActive={activeTab === tab.id}
            onPress={() => onTabChange(tab.id)}
            badgeCount={tab.id === 'cart' ? cartCount : undefined}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  container: {
    flexDirection: 'row',
    width: '100%',
    maxWidth: 440,
    backgroundColor: '#1E120B',
    borderRadius: 28,
    paddingVertical: 8,
    paddingHorizontal: 6,
    alignItems: 'center',
    justifyContent: 'space-around',
    borderWidth: 1,
    borderColor: 'rgba(200, 162, 122, 0.22)',
    // Elegant warm glow & shadow
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.42,
        shadowRadius: 16,
      },
      android: {
        elevation: 14,
      },
    }),
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
  },
  itemContent: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 18,
    minWidth: 54,
  },
  activePill: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(200, 162, 122, 0.12)',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(200, 162, 122, 0.18)',
  },
  iconContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    height: 26,
    width: 26,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -8,
    backgroundColor: '#C25E2E',
    borderRadius: 9,
    minWidth: 16,
    height: 16,
    paddingHorizontal: 3,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#1E120B',
  },
  badgeText: {
    color: '#FFF',
    fontSize: 9,
    fontWeight: '800',
  },
  label: {
    fontSize: 10,
    letterSpacing: 0.3,
    marginTop: 2,
    fontWeight: '500',
  },
  labelActive: {
    color: COLORS.latte,
    fontWeight: '700',
  },
  labelInactive: {
    color: 'rgba(245, 230, 211, 0.45)',
  },
  activeDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.latte,
    marginTop: 3,
  },
});

export default BottomNavBar;
