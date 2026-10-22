import React, { useState } from 'react';
import {
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constant/colors';

interface MenuItem {
  id: string;
  name: string;
  category: string;
  roast: string;
  price: string;
  rating: number;
  badge?: string;
  notes: string;
}

const MENU_ITEMS: MenuItem[] = [
  {
    id: '1',
    name: 'Espresso Romano',
    category: 'Hot Brew',
    roast: 'Dark Roast',
    price: '$4.50',
    rating: 4.9,
    badge: 'Popular',
    notes: 'Candied lemon peel, rich crema, dark cocoa',
  },
  {
    id: '2',
    name: 'Vanilla Oat Flat White',
    category: 'Latte',
    roast: 'Medium Roast',
    price: '$5.75',
    rating: 4.8,
    badge: 'Signature',
    notes: 'Microfoam, Madagascar vanilla, Ethiopian single-origin',
  },
  {
    id: '3',
    name: 'Cold Drip Nitro Reserve',
    category: 'Cold Brew',
    roast: 'Light Roast',
    price: '$6.20',
    rating: 4.9,
    badge: 'Seasonal',
    notes: '18-hour cold steep, velvety head, hints of blackberry',
  },
  {
    id: '4',
    name: 'Smoked Caramel Macchiato',
    category: 'Specialty',
    roast: 'Medium Dark',
    price: '$5.90',
    rating: 4.7,
    notes: 'Artisan sea salt caramel, steamed milk, double ristretto',
  },
  {
    id: '5',
    name: 'Almond Croissant & Drip',
    category: 'Bakery',
    roast: 'House Blend',
    price: '$7.50',
    rating: 4.9,
    notes: 'Flaky French pastry paired with fresh drip brew',
  },
];

const CATEGORIES = ['All', 'Hot Brew', 'Latte', 'Cold Brew', 'Specialty', 'Bakery'];

interface MenuScreenProps {
  onAddToCart?: () => void;
}

export const MenuScreen: React.FC<MenuScreenProps> = ({ onAddToCart }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredItems =
    selectedCategory === 'All'
      ? MENU_ITEMS
      : MENU_ITEMS.filter((item) => item.category === selectedCategory);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.eyebrow}>CURATED SELECTION</Text>
          <Text style={styles.title}>Artisanal Menu</Text>
        </View>
        <TouchableOpacity style={styles.searchButton}>
          <Ionicons name="search" size={20} color={COLORS.latte} />
        </TouchableOpacity>
      </View>

      {/* Category Pills */}
      <View style={styles.categoriesContainer}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={CATEGORIES}
          keyExtractor={(cat) => cat}
          contentContainerStyle={styles.categoriesList}
          renderItem={({ item: category }) => {
            const isSelected = selectedCategory === category;
            return (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setSelectedCategory(category)}
                style={[
                  styles.categoryPill,
                  isSelected && styles.categoryPillActive,
                ]}
              >
                <Text
                  style={[
                    styles.categoryText,
                    isSelected && styles.categoryTextActive,
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      {/* Coffee Items List */}
      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.cardIconBox}>
                <Ionicons name="cafe" size={26} color={COLORS.latte} />
              </View>
              <View style={styles.cardMeta}>
                <View style={styles.cardTitleRow}>
                  <Text style={styles.cardTitle}>{item.name}</Text>
                  {item.badge && (
                    <View style={styles.itemBadge}>
                      <Text style={styles.itemBadgeText}>{item.badge}</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.cardRoast}>{item.roast}</Text>
              </View>
            </View>

            <Text style={styles.cardNotes}>{item.notes}</Text>

            <View style={styles.cardFooter}>
              <View style={styles.ratingRow}>
                <Ionicons name="star" size={14} color="#E8A738" />
                <Text style={styles.ratingText}>{item.rating.toFixed(1)}</Text>
              </View>

              <View style={styles.priceRow}>
                <Text style={styles.priceText}>{item.price}</Text>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={onAddToCart}
                  style={styles.addButton}
                >
                  <Ionicons name="add" size={18} color="#FFF" />
                  <Text style={styles.addButtonText}>Add</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.espresso,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 22,
    paddingTop: 18,
    paddingBottom: 14,
  },
  eyebrow: {
    fontSize: 11,
    letterSpacing: 2,
    fontWeight: '700',
    color: COLORS.latte,
    marginBottom: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.cream,
    letterSpacing: -0.5,
  },
  searchButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(200, 162, 122, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(200, 162, 122, 0.2)',
  },
  categoriesContainer: {
    paddingBottom: 12,
  },
  categoriesList: {
    paddingHorizontal: 20,
    gap: 8,
  },
  categoryPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  categoryPillActive: {
    backgroundColor: COLORS.latte,
    borderColor: COLORS.latte,
  },
  categoryText: {
    color: 'rgba(245, 230, 211, 0.65)',
    fontSize: 13,
    fontWeight: '600',
  },
  categoryTextActive: {
    color: COLORS.espresso,
    fontWeight: '700',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 110, // clear floating bottom bar
    gap: 14,
  },
  card: {
    backgroundColor: '#23150E',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(200, 162, 122, 0.15)',
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
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  cardIconBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: 'rgba(200, 162, 122, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(200, 162, 122, 0.2)',
  },
  cardMeta: {
    flex: 1,
  },
  cardTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.cream,
    flex: 1,
  },
  itemBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    backgroundColor: 'rgba(200, 162, 122, 0.2)',
  },
  itemBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.latte,
  },
  cardRoast: {
    fontSize: 12,
    color: 'rgba(245, 230, 211, 0.55)',
    marginTop: 2,
  },
  cardNotes: {
    fontSize: 13,
    lineHeight: 18,
    color: 'rgba(245, 230, 211, 0.75)',
    marginVertical: 12,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.06)',
    paddingTop: 12,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    color: COLORS.cream,
    fontSize: 13,
    fontWeight: '600',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  priceText: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.latte,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: COLORS.carmel,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 14,
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '700',
  },
});

export default MenuScreen;
