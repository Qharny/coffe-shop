import React from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constant/colors';

export const ProfileScreen: React.FC = () => {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Ionicons name="person" size={32} color={COLORS.latte} />
        </View>
        <Text style={styles.name}>Elena Vance</Text>
        <Text style={styles.membership}>Gold Bean Tier Member</Text>
      </View>

      {/* Loyalty Club Card */}
      <View style={styles.loyaltyCard}>
        <View style={styles.cardTop}>
          <View>
            <Text style={styles.cardLabel}>BREW CLUB POINTS</Text>
            <Text style={styles.points}>740</Text>
          </View>
          <View style={styles.badgePill}>
            <Ionicons name="sparkles" size={12} color="#D4AF37" />
            <Text style={styles.badgePillText}>2x Rewards</Text>
          </View>
        </View>

        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '74%' }]} />
          </View>
          <Text style={styles.progressText}>260 points away from Free Reserve Pour Over</Text>
        </View>
      </View>

      {/* Menu / Settings List */}
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>PREFERENCES & ACCOUNT</Text>

        <TouchableOpacity style={styles.settingItem} activeOpacity={0.7}>
          <View style={styles.settingIconBox}>
            <Ionicons name="time-outline" size={18} color={COLORS.latte} />
          </View>
          <Text style={styles.settingText}>Order History</Text>
          <Ionicons name="chevron-forward" size={18} color="rgba(245, 230, 211, 0.4)" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem} activeOpacity={0.7}>
          <View style={styles.settingIconBox}>
            <Ionicons name="options-outline" size={18} color={COLORS.latte} />
          </View>
          <Text style={styles.settingText}>Brewing Preferences</Text>
          <Ionicons name="chevron-forward" size={18} color="rgba(245, 230, 211, 0.4)" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem} activeOpacity={0.7}>
          <View style={styles.settingIconBox}>
            <Ionicons name="card-outline" size={18} color={COLORS.latte} />
          </View>
          <Text style={styles.settingText}>Payment Methods</Text>
          <Ionicons name="chevron-forward" size={18} color="rgba(245, 230, 211, 0.4)" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem} activeOpacity={0.7}>
          <View style={styles.settingIconBox}>
            <Ionicons name="location-outline" size={18} color={COLORS.latte} />
          </View>
          <Text style={styles.settingText}>Favorite Café Locations</Text>
          <Ionicons name="chevron-forward" size={18} color="rgba(245, 230, 211, 0.4)" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem} activeOpacity={0.7}>
          <View style={styles.settingIconBox}>
            <Ionicons name="notifications-outline" size={18} color={COLORS.latte} />
          </View>
          <Text style={styles.settingText}>Order Notifications</Text>
          <Ionicons name="chevron-forward" size={18} color="rgba(245, 230, 211, 0.4)" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.espresso,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 110,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarContainer: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: 'rgba(200, 162, 122, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.latte,
    marginBottom: 12,
  },
  name: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.cream,
  },
  membership: {
    fontSize: 13,
    color: COLORS.latte,
    marginTop: 3,
    fontWeight: '600',
  },
  loyaltyCard: {
    backgroundColor: '#26160F',
    borderRadius: 22,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(200, 162, 122, 0.22)',
    marginBottom: 24,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.35,
        shadowRadius: 10,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  cardLabel: {
    fontSize: 11,
    letterSpacing: 2,
    color: COLORS.latte,
    fontWeight: '700',
  },
  points: {
    fontSize: 34,
    fontWeight: '800',
    color: COLORS.cream,
    marginTop: 2,
  },
  badgePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(212, 175, 55, 0.15)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.3)',
  },
  badgePillText: {
    color: '#D4AF37',
    fontSize: 11,
    fontWeight: '700',
  },
  progressContainer: {
    gap: 8,
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.latte,
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: 'rgba(245, 230, 211, 0.65)',
  },
  section: {
    backgroundColor: '#23150E',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: 'rgba(200, 162, 122, 0.14)',
  },
  sectionHeader: {
    fontSize: 11,
    letterSpacing: 1.5,
    fontWeight: '700',
    color: COLORS.latte,
    marginVertical: 10,
    paddingHorizontal: 4,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  settingIconBox: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: 'rgba(200, 162, 122, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  settingText: {
    flex: 1,
    fontSize: 14,
    color: COLORS.cream,
    fontWeight: '600',
  },
});

export default ProfileScreen;
