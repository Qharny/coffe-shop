import React, { useState } from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constant/colors';

interface HomeScreenProps {
  onNavigateToMenu?: () => void;
  onAddToCart?: () => void;
}

const CATEGORIES = ['All', 'Espresso', 'Latte', 'Cold Brew', 'Pourover'];

const FEATURED_COFFEES = [
  {
    id: 'c1',
    name: 'Caffe Mocha',
    description: 'Deep espresso & Belgian chocolate',
    price: '$4.95',
    rating: 4.8,
    reviews: '2.4k',
  },
  {
    id: 'c2',
    name: 'Vanilla Sweet Cream',
    description: 'Cold brew with cascading cream',
    price: '$5.40',
    rating: 4.9,
    reviews: '3.1k',
  },
  {
    id: 'c3',
    name: 'Caramel Macchiato',
    description: 'Steamed milk with vanilla & caramel',
    price: '$5.20',
    rating: 4.7,
    reviews: '1.8k',
  },
];

export default function HomeScreen({ onNavigateToMenu, onAddToCart }: HomeScreenProps) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Top Header */}
      <View style={styles.topBar}>
        <View>
          <View style={styles.locationRow}>
            <Ionicons name="location" size={14} color={COLORS.latte} />
            <Text style={styles.locationText}>Accra, Café District</Text>
            <Ionicons name="chevron-down" size={14} color={COLORS.latte} />
          </View>
          <Text style={styles.greetingText}>Good morning, Elena ☕</Text>
        </View>

        <TouchableOpacity style={styles.iconBtn} activeOpacity={0.75}>
          <Ionicons name="notifications-outline" size={20} color={COLORS.latte} />
          <View style={styles.notifDot} />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="rgba(245, 230, 211, 0.5)" />
        <TextInput
          placeholder="Search artisan coffee, roast, pastries..."
          placeholderTextColor="rgba(245, 230, 211, 0.45)"
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.searchInput}
        />
        <TouchableOpacity style={styles.filterBtn} activeOpacity={0.8}>
          <Ionicons name="options-outline" size={18} color={COLORS.espresso} />
        </TouchableOpacity>
      </View>

      {/* Promotional Banner */}
      <View style={styles.banner}>
        <View style={styles.bannerContent}>
          <View style={styles.promoTag}>
            <Text style={styles.promoTagText}>PROMO OF THE DAY</Text>
          </View>
          <Text style={styles.bannerTitle}>Buy One Get One{'\n'}Nitro Cold Brew</Text>
          <TouchableOpacity
            style={styles.bannerBtn}
            activeOpacity={0.85}
            onPress={onNavigateToMenu}
          >
            <Text style={styles.bannerBtnText}>Claim Offer</Text>
            <Ionicons name="arrow-forward" size={14} color={COLORS.espresso} />
          </TouchableOpacity>
        </View>

        <View style={styles.bannerCoffeeIllustration}>
          <Ionicons name="cafe" size={72} color="rgba(200, 162, 122, 0.35)" />
        </View>
      </View>

      {/* Categories */}
      <View style={styles.categoriesRow}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesScroll}>
          {CATEGORIES.map((cat) => {
            const isSelected = activeCategory === cat;
            return (
              <TouchableOpacity
                key={cat}
                activeOpacity={0.8}
                onPress={() => setActiveCategory(cat)}
                style={[styles.catPill, isSelected && styles.catPillActive]}
              >
                <Text style={[styles.catText, isSelected && styles.catTextActive]}>
                  {cat}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Featured Section */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Handcrafted Specials</Text>
        <TouchableOpacity activeOpacity={0.7} onPress={onNavigateToMenu}>
          <Text style={styles.seeAllText}>See all</Text>
        </TouchableOpacity>
      </View>

      {/* Coffee Cards Grid */}
      <View style={styles.cardGrid}>
        {FEATURED_COFFEES.map((coffee) => (
          <View key={coffee.id} style={styles.coffeeCard}>
            <View style={styles.cardVisual}>
              <View style={styles.cardBadge}>
                <Ionicons name="star" size={11} color="#E8A738" />
                <Text style={styles.cardRating}>{coffee.rating}</Text>
              </View>
              <Ionicons name="cafe-outline" size={48} color={COLORS.latte} />
            </View>

            <View style={styles.cardBody}>
              <Text style={styles.coffeeName}>{coffee.name}</Text>
              <Text numberOfLines={1} style={styles.coffeeDesc}>
                {coffee.description}
              </Text>

              <View style={styles.priceRow}>
                <Text style={styles.coffeePrice}>{coffee.price}</Text>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={onAddToCart}
                  style={styles.addCartBtn}
                >
                  <Ionicons name="add" size={18} color="#FFF" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.espresso,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 110, // padding for floating bottom bar
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  locationText: {
    fontSize: 12,
    color: 'rgba(245, 230, 211, 0.7)',
    fontWeight: '500',
  },
  greetingText: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.cream,
    letterSpacing: -0.4,
  },
  iconBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#26160F',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(200, 162, 122, 0.2)',
    position: 'relative',
  },
  notifDot: {
    position: 'absolute',
    top: 10,
    right: 12,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E05A47',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#23150E',
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: 'rgba(200, 162, 122, 0.16)',
    marginBottom: 20,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    color: COLORS.cream,
    fontSize: 14,
    padding: 0,
  },
  filterBtn: {
    backgroundColor: COLORS.latte,
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  banner: {
    backgroundColor: '#2C1B12',
    borderRadius: 22,
    padding: 20,
    marginBottom: 22,
    borderWidth: 1,
    borderColor: 'rgba(200, 162, 122, 0.25)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden',
    position: 'relative',
  },
  bannerContent: {
    flex: 1,
    zIndex: 2,
  },
  promoTag: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(200, 162, 122, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    marginBottom: 8,
  },
  promoTagText: {
    color: COLORS.latte,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },
  bannerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.cream,
    lineHeight: 26,
    marginBottom: 12,
  },
  bannerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: COLORS.latte,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
    gap: 6,
  },
  bannerBtnText: {
    color: COLORS.espresso,
    fontSize: 12,
    fontWeight: '800',
  },
  bannerCoffeeIllustration: {
    position: 'absolute',
    right: 12,
    bottom: -10,
    opacity: 0.6,
  },
  categoriesRow: {
    marginBottom: 22,
  },
  categoriesScroll: {
    gap: 8,
  },
  catPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  catPillActive: {
    backgroundColor: COLORS.latte,
    borderColor: COLORS.latte,
  },
  catText: {
    color: 'rgba(245, 230, 211, 0.6)',
    fontSize: 13,
    fontWeight: '600',
  },
  catTextActive: {
    color: COLORS.espresso,
    fontWeight: '700',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.cream,
  },
  seeAllText: {
    fontSize: 13,
    color: COLORS.latte,
    fontWeight: '700',
  },
  cardGrid: {
    gap: 14,
  },
  coffeeCard: {
    backgroundColor: '#23150E',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(200, 162, 122, 0.16)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  cardVisual: {
    width: 80,
    height: 80,
    borderRadius: 16,
    backgroundColor: 'rgba(200, 162, 122, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    borderWidth: 1,
    borderColor: 'rgba(200, 162, 122, 0.18)',
  },
  cardBadge: {
    position: 'absolute',
    top: 6,
    left: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 6,
  },
  cardRating: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '700',
  },
  cardBody: {
    flex: 1,
  },
  coffeeName: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.cream,
  },
  coffeeDesc: {
    fontSize: 12,
    color: 'rgba(245, 230, 211, 0.55)',
    marginTop: 2,
    marginBottom: 8,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  coffeePrice: {
    fontSize: 17,
    fontWeight: '800',
    color: COLORS.latte,
  },
  addCartBtn: {
    width: 34,
    height: 34,
    borderRadius: 12,
    backgroundColor: COLORS.carmel,
    alignItems: 'center',
    justifyContent: 'center',
  },
});