import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {Flower} from '../data/flowers';
import {useCart} from '../data/CartContext';

const {width} = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2;

interface Props {
  flower: Flower;
  onPress: () => void;
}

export default function FlowerCard({flower, onPress}: Props) {
  const {addToCart} = useCart();

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <Image source={{uri: flower.image}} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={2}>
          {flower.name}
        </Text>
        <View style={styles.ratingRow}>
          <Text style={styles.star}>★</Text>
          <Text style={styles.rating}>{flower.rating}</Text>
          <Text style={styles.reviews}>({flower.reviews})</Text>
        </View>
        <View style={styles.priceRow}>
          <Text style={styles.price}>{flower.price.toLocaleString('ru-RU')} ₽</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={e => {
              e.stopPropagation();
              addToCart(flower);
            }}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: CARD_WIDTH,
    resizeMode: 'cover',
  },
  info: {
    padding: 12,
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a2e',
    marginBottom: 4,
    lineHeight: 18,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  star: {
    color: '#FFB800',
    fontSize: 14,
  },
  rating: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1a1a2e',
    marginLeft: 2,
  },
  reviews: {
    fontSize: 11,
    color: '#999',
    marginLeft: 4,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: '#E91E63',
  },
  addButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E91E63',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 22,
  },
});
