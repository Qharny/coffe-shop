import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { BottomNavBar, TabId } from './BottomNavBar';
import HomeScreen from '../screen/home/Home';
import MenuScreen from '../screen/menu/MenuScreen';
import FavoritesScreen from '../screen/favorites/FavoritesScreen';
import CartScreen, { CartItem } from '../screen/cart/CartScreen';
import ProfileScreen from '../screen/profile/ProfileScreen';
import { COLORS } from '../constant/colors';

const INITIAL_CART: CartItem[] = [
  {
    id: 'c1',
    name: 'Espresso Romano',
    roast: 'Dark Roast',
    size: 'Double',
    price: 4.5,
    quantity: 1,
  },
  {
    id: 'c2',
    name: 'Cold Drip Nitro',
    roast: 'Light Roast',
    size: '16 oz',
    price: 6.2,
    quantity: 1,
  },
];

export const MainNavigator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>('home');
  const [cartItems, setCartItems] = useState<CartItem[]>(INITIAL_CART);

  const cartTotalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const handleAddToCart = () => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === 'c1');
      if (existing) {
        return prev.map((item) =>
          item.id === 'c1' ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: 'c1',
          name: 'Espresso Romano',
          roast: 'Dark Roast',
          size: 'Double',
          price: 4.5,
          quantity: 1,
        },
      ];
    });
  };

  const renderScreen = () => {
    switch (activeTab) {
      case 'home':
        return (
          <HomeScreen
            onNavigateToMenu={() => setActiveTab('menu')}
            onAddToCart={handleAddToCart}
          />
        );
      case 'menu':
        return <MenuScreen onAddToCart={handleAddToCart} />;
      case 'favorites':
        return <FavoritesScreen />;
      case 'cart':
        return (
          <CartScreen
            items={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onCheckout={() => alert('Order Placed Successfully! ☕')}
          />
        );
      case 'profile':
        return <ProfileScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Screen Body */}
      <View style={styles.screenWrapper}>{renderScreen()}</View>

      {/* Floating Modern Coffee Bottom Navigation Bar */}
      <BottomNavBar
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab)}
        cartCount={cartTotalQuantity}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.espresso,
  },
  screenWrapper: {
    flex: 1,
  },
});

export default MainNavigator;
