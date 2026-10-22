import React from 'react';
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

export interface CartItem {
  id: string;
  name: string;
  roast: string;
  size: string;
  price: number;
  quantity: number;
}

interface CartScreenProps {
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onCheckout?: () => void;
}

export const CartScreen: React.FC<CartScreenProps> = ({
  items,
  onUpdateQuantity,
  onCheckout,
}) => {
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * 0.08;
  const total = subtotal > 0 ? subtotal + tax : 0;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.eyebrow}>CURRENT ORDER</Text>
          <Text style={styles.title}>Your Coffee Bag</Text>
        </View>
        <View style={styles.pillCount}>
          <Text style={styles.pillCountText}>{items.length} items</Text>
        </View>
      </View>

      {items.length === 0 ? (
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIconCircle}>
            <Ionicons name="bag-outline" size={44} color={COLORS.latte} />
          </View>
          <Text style={styles.emptyTitle}>Your bag is empty</Text>
          <Text style={styles.emptySubtitle}>
            Browse our artisanal menu and add your favorite specialty coffee or freshly baked pastry.
          </Text>
        </View>
      ) : (
        <>
          <FlatList
            data={items}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={styles.cartCard}>
                <View style={styles.cupIconBox}>
                  <Ionicons name="cafe" size={24} color={COLORS.latte} />
                </View>

                <View style={styles.itemInfo}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemMeta}>
                    {item.size} · {item.roast}
                  </Text>
                  <Text style={styles.itemPrice}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </Text>
                </View>

                {/* Quantity Controls */}
                <View style={styles.quantityBox}>
                  <TouchableOpacity
                    onPress={() => onUpdateQuantity(item.id, -1)}
                    style={styles.qtyBtn}
                    activeOpacity={0.7}
                  >
                    <Ionicons
                      name={item.quantity === 1 ? 'trash-outline' : 'remove'}
                      size={14}
                      color={item.quantity === 1 ? '#E05A47' : COLORS.cream}
                    />
                  </TouchableOpacity>

                  <Text style={styles.qtyText}>{item.quantity}</Text>

                  <TouchableOpacity
                    onPress={() => onUpdateQuantity(item.id, 1)}
                    style={styles.qtyBtn}
                    activeOpacity={0.7}
                  >
                    <Ionicons name="add" size={14} color={COLORS.cream} />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />

          {/* Checkout Footer Bar */}
          <View style={styles.footer}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Estimated Tax</Text>
              <Text style={styles.summaryValue}>${tax.toFixed(2)}</Text>
            </View>
            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
            </View>

            <TouchableOpacity
              activeOpacity={0.85}
              style={styles.checkoutButton}
              onPress={onCheckout}
            >
              <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
              <Ionicons name="arrow-forward" size={18} color={COLORS.espresso} />
            </TouchableOpacity>
          </View>
        </>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  pillCount: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: 'rgba(200, 162, 122, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(200, 162, 122, 0.25)',
  },
  pillCountText: {
    fontSize: 12,
    color: COLORS.latte,
    fontWeight: '700',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 220,
    gap: 12,
  },
  cartCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#23150E',
    borderRadius: 20,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(200, 162, 122, 0.16)',
    gap: 12,
  },
  cupIconBox: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: 'rgba(200, 162, 122, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.cream,
  },
  itemMeta: {
    fontSize: 12,
    color: 'rgba(245, 230, 211, 0.55)',
    marginTop: 2,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.latte,
    marginTop: 4,
  },
  quantityBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderRadius: 12,
    paddingHorizontal: 4,
    paddingVertical: 2,
    gap: 8,
  },
  qtyBtn: {
    padding: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.cream,
    minWidth: 14,
    textAlign: 'center',
  },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 84, // position above bottom nav bar
    backgroundColor: '#1E120B',
    paddingHorizontal: 22,
    paddingVertical: 14,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(200, 162, 122, 0.2)',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.35,
        shadowRadius: 10,
      },
      android: {
        elevation: 10,
      },
    }),
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  summaryLabel: {
    fontSize: 12,
    color: 'rgba(245, 230, 211, 0.6)',
  },
  summaryValue: {
    fontSize: 12,
    color: COLORS.cream,
    fontWeight: '600',
  },
  totalRow: {
    marginTop: 4,
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.08)',
  },
  totalLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.cream,
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.latte,
  },
  checkoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.latte,
    paddingVertical: 12,
    borderRadius: 16,
    marginTop: 10,
    gap: 8,
  },
  checkoutButtonText: {
    color: COLORS.espresso,
    fontSize: 15,
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

export default CartScreen;
