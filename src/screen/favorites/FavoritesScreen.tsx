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

interface FavoriteItem {
  id: string;
  name: string;
  subtitle: string;
  price: string;
  icon: keyof typeof Ionicons.glyphMap;
}

const INITIAL_FAVORITES: FavoriteItem[] = [
  {
    id: 'f1',
    name: 'Single Origin Guji Pour Over',
    subtitle: 'Floral jasmine, peach, bergamot',
    price: '$5.50',
    icon: 'water-outline',
  },
  {
    id: 'f2',
    name: 'Velvet Vanilla Flat White',
    subtitle: 'Oat milk, double ristretto, cinnamon',
    price: '$5.75',
    icon: 'cafe-outline',
  },
  {
    id: 'f3',
    name: 'Brown Sugar Cardamom Cold Brew',
    subtitle: 'Slow steeped, hints of toasted spice',
    price: '$6.00',
    icon: 'snow-outline',
  },
];

export const FavoritesScreen: React.FC = () => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>(INITIAL_FAVORITES);

  const removeFavorite = (id: string) => {
    setFavorites((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.eyebrow}>YOUR SAVED CUP</Text>
        <Text style={styles.title}>Favorites</Text>
        <Text style={styles.subtitle}>
          {favorites.length} customized {favorites.length === 1 ? 'brew' : 'brews'} ready to reorder
        </Text>
      </View>

      {favorites.length === 0 ? (
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIconCircle}>
            <Ionicons name="heart-dislike-outline" size={42} color={COLORS.latte} />
          </View>
          <Text style={styles.emptyTitle}>No saved favorites yet</Text>
          <Text style={styles.emptySubtitle}>
            Tap the heart icon on any coffee or artisanal roast to save it here for fast ordering.
          </Text>
        </View>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.iconCircle}>
                <Ionicons name={item.icon} size={22} color={COLORS.latte} />
              </View>

              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{item.name}</Text>
                <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
                <Text style={styles.cardPrice}>{item.price}</Text>
              </View>

              <View style={styles.actions}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => removeFavorite(item.id)}
                  style={styles.heartButton}
                >
                  <Ionicons name="heart" size={22} color="#E05A47" />
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.8} style={styles.reorderButton}>
                  <Text style={styles.reorderButtonText}>Order</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.espresso,
  },
  header: {
    paddingHorizontal: 22,
    paddingTop: 18,
    paddingBottom: 16,
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
  subtitle: {
    fontSize: 13,
    color: 'rgba(245, 230, 211, 0.6)',
    marginTop: 4,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 110,
    gap: 12,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#23150E',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(200, 162, 122, 0.16)',
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
  iconCircle: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: 'rgba(200, 162, 122, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(200, 162, 122, 0.2)',
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.cream,
  },
  cardSubtitle: {
    fontSize: 12,
    color: 'rgba(245, 230, 211, 0.55)',
    marginTop: 2,
  },
  cardPrice: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.latte,
    marginTop: 6,
  },
  actions: {
    alignItems: 'flex-end',
    gap: 10,
  },
  heartButton: {
    padding: 4,
  },
  reorderButton: {
    backgroundColor: COLORS.latte,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 12,
  },
  reorderButtonText: {
    color: COLORS.espresso,
    fontSize: 12,
    fontWeight: '800',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    paddingBottom: 80,
  },
  emptyIconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(200, 162, 122, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(200, 162, 122, 0.2)',
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.cream,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 13,
    color: 'rgba(245, 230, 211, 0.6)',
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default FavoritesScreen;
