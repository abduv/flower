import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {flowers, Flower} from '../data/flowers';
import {useCart} from '../data/CartContext';

type RootStackParamList = {
  MainTabs: undefined;
  FlowerDetail: {flower: Flower};
};

export default function FavoritesScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {addToCart} = useCart();
  // Static favorites for demo (top-rated)
  const [favoriteIds, setFavoriteIds] = useState<string[]>([
    '3',
    '4',
    '9',
    '1',
  ]);

  const favoriteFlowers = flowers.filter(f => favoriteIds.includes(f.id));

  const removeFavorite = (id: string) => {
    setFavoriteIds(prev => prev.filter(fid => fid !== id));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Избранное</Text>
        <Text style={styles.count}>{favoriteFlowers.length} шт.</Text>
      </View>

      {favoriteFlowers.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyEmoji}>💝</Text>
          <Text style={styles.emptyTitle}>Список пуст</Text>
          <Text style={styles.emptySubtitle}>
            Нажмите ❤️ на карточке товара
          </Text>
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} style={styles.list}>
          {favoriteFlowers.map(flower => (
            <TouchableOpacity
              key={flower.id}
              style={styles.card}
              activeOpacity={0.8}
              onPress={() => navigation.navigate('FlowerDetail', {flower})}>
              <Image source={{uri: flower.image}} style={styles.cardImage} />
              <View style={styles.cardInfo}>
                <Text style={styles.cardName}>{flower.name}</Text>
                <View style={styles.ratingRow}>
                  <Text style={styles.star}>★</Text>
                  <Text style={styles.rating}>{flower.rating}</Text>
                  <Text style={styles.reviews}>({flower.reviews})</Text>
                </View>
                <Text style={styles.cardPrice}>
                  {flower.price.toLocaleString('ru-RU')} ₽
                </Text>
                <View style={styles.cardActions}>
                  <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => addToCart(flower)}>
                    <Text style={styles.addButtonText}>В корзину</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => removeFavorite(flower.id)}>
                    <Text style={styles.removeIcon}>❤️</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          ))}
          <View style={{height: 20}} />
        </ScrollView>
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
  count: {
    fontSize: 14,
    color: '#999',
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
    paddingHorizontal: 20,
  },
  card: {
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
  cardImage: {
    width: 110,
    height: 110,
    borderRadius: 12,
    resizeMode: 'cover',
  },
  cardInfo: {
    flex: 1,
    marginLeft: 14,
    justifyContent: 'space-between',
  },
  cardName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a2e',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    color: '#FFB800',
    fontSize: 14,
  },
  rating: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1a1a2e',
    marginLeft: 3,
  },
  reviews: {
    fontSize: 12,
    color: '#999',
    marginLeft: 4,
  },
  cardPrice: {
    fontSize: 18,
    fontWeight: '800',
    color: '#E91E63',
  },
  cardActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  addButton: {
    backgroundColor: '#E91E63',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
  removeIcon: {
    fontSize: 22,
  },
});
