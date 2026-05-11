import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import {useCart} from '../data/CartContext';

export default function CartScreen() {
  const {items, removeFromCart, updateQuantity, totalPrice, clearCart} =
    useCart();

  const handleCheckout = () => {
    if (items.length === 0) {
      Alert.alert('Корзина пуста', 'Добавьте цветы в корзину для оформления заказа');
      return;
    }
    Alert.alert(
      'Заказ оформлен! 🎉',
      `Сумма: ${totalPrice.toLocaleString('ru-RU')} ₽\nДоставка в течение 1-3 часов`,
      [{text: 'Отлично!', onPress: clearCart}],
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Корзина</Text>
        {items.length > 0 && (
          <TouchableOpacity onPress={clearCart}>
            <Text style={styles.clearText}>Очистить</Text>
          </TouchableOpacity>
        )}
      </View>

      {items.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyEmoji}>🛒</Text>
          <Text style={styles.emptyTitle}>Корзина пуста</Text>
          <Text style={styles.emptySubtitle}>
            Добавьте цветы из каталога
          </Text>
        </View>
      ) : (
        <>
          <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
            {items.map(item => (
              <View key={item.flower.id} style={styles.cartItem}>
                <Image
                  source={{uri: item.flower.image}}
                  style={styles.itemImage}
                />
                <View style={styles.itemInfo}>
                  <Text style={styles.itemName} numberOfLines={2}>
                    {item.flower.name}
                  </Text>
                  <Text style={styles.itemPrice}>
                    {item.flower.price.toLocaleString('ru-RU')} ₽
                  </Text>
                  <View style={styles.itemActions}>
                    <View style={styles.quantityRow}>
                      <TouchableOpacity
                        style={styles.qtyBtn}
                        onPress={() =>
                          updateQuantity(item.flower.id, item.quantity - 1)
                        }>
                        <Text style={styles.qtyBtnText}>−</Text>
                      </TouchableOpacity>
                      <Text style={styles.qty}>{item.quantity}</Text>
                      <TouchableOpacity
                        style={styles.qtyBtn}
                        onPress={() =>
                          updateQuantity(item.flower.id, item.quantity + 1)
                        }>
                        <Text style={styles.qtyBtnText}>+</Text>
                      </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                      onPress={() => removeFromCart(item.flower.id)}>
                      <Text style={styles.removeText}>🗑</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
            <View style={{height: 20}} />
          </ScrollView>

          {/* Summary */}
          <View style={styles.summary}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Товары</Text>
              <Text style={styles.summaryValue}>
                {totalPrice.toLocaleString('ru-RU')} ₽
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Доставка</Text>
              <Text style={[styles.summaryValue, styles.freeDelivery]}>
                Бесплатно
              </Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.summaryRow}>
              <Text style={styles.totalLabel}>Итого</Text>
              <Text style={styles.totalValue}>
                {totalPrice.toLocaleString('ru-RU')} ₽
              </Text>
            </View>
            <TouchableOpacity
              style={styles.checkoutButton}
              onPress={handleCheckout}>
              <Text style={styles.checkoutText}>Оформить заказ</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1a1a2e',
  },
  clearText: {
    fontSize: 14,
    color: '#E91E63',
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a2e',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 15,
    color: '#999',
  },
  list: {
    flex: 1,
    paddingHorizontal: 20,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  itemImage: {
    width: 90,
    height: 90,
    borderRadius: 12,
    resizeMode: 'cover',
  },
  itemInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  itemName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1a1a2e',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#E91E63',
  },
  itemActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
  },
  qtyBtn: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyBtnText: {
    fontSize: 18,
    color: '#1a1a2e',
    fontWeight: '600',
  },
  qty: {
    fontSize: 14,
    fontWeight: '700',
    minWidth: 20,
    textAlign: 'center',
    color: '#1a1a2e',
  },
  removeText: {
    fontSize: 20,
  },
  summary: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 34,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -4},
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 8,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  summaryLabel: {
    fontSize: 15,
    color: '#888',
  },
  summaryValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1a1a2e',
  },
  freeDelivery: {
    color: '#4CAF50',
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginVertical: 10,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a2e',
  },
  totalValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#E91E63',
  },
  checkoutButton: {
    backgroundColor: '#E91E63',
    borderRadius: 14,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  checkoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
