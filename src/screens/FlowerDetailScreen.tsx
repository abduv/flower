import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
} from 'react-native';
import {useRoute, useNavigation, RouteProp} from '@react-navigation/native';
import {Flower} from '../data/flowers';
import {useCart} from '../data/CartContext';

type RouteParams = {
  FlowerDetail: {flower: Flower};
};

const {width} = Dimensions.get('window');

export default function FlowerDetailScreen() {
  const route = useRoute<RouteProp<RouteParams, 'FlowerDetail'>>();
  const navigation = useNavigation();
  const {flower} = route.params;
  const {addToCart} = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(flower);
    }
    Alert.alert('Добавлено в корзину!', `${flower.name} x${quantity}`, [
      {text: 'OK'},
    ]);
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Image */}
        <View style={styles.imageContainer}>
          <Image source={{uri: flower.image}} style={styles.image} />
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={() => setIsFavorite(!isFavorite)}>
            <Text style={styles.favoriteIcon}>
              {isFavorite ? '❤️' : '🤍'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Content */}
        <View style={styles.content}>
          <View style={styles.titleRow}>
            <Text style={styles.name}>{flower.name}</Text>
          </View>

          <View style={styles.ratingRow}>
            <Text style={styles.stars}>
              {'★'.repeat(Math.floor(flower.rating))}
              {flower.rating % 1 >= 0.5 ? '★' : ''}
            </Text>
            <Text style={styles.ratingText}>{flower.rating}</Text>
            <Text style={styles.reviewsText}>({flower.reviews} отзывов)</Text>
          </View>

          <Text style={styles.price}>
            {flower.price.toLocaleString('ru-RU')} ₽
          </Text>

          <View style={styles.divider} />

          <Text style={styles.descTitle}>Описание</Text>
          <Text style={styles.description}>{flower.description}</Text>

          <View style={styles.divider} />

          {/* Features */}
          <Text style={styles.descTitle}>Детали</Text>
          <View style={styles.features}>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>🚚</Text>
              <Text style={styles.featureText}>Доставка{'\n'}1-3 часа</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>💧</Text>
              <Text style={styles.featureText}>Свежие{'\n'}цветы</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>📦</Text>
              <Text style={styles.featureText}>Красивая{'\n'}упаковка</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>💌</Text>
              <Text style={styles.featureText}>Открытка{'\n'}бесплатно</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom bar */}
      <View style={styles.bottomBar}>
        <View style={styles.quantitySelector}>
          <TouchableOpacity
            style={styles.qtyButton}
            onPress={() => setQuantity(q => Math.max(1, q - 1))}>
            <Text style={styles.qtyButtonText}>−</Text>
          </TouchableOpacity>
          <Text style={styles.qtyText}>{quantity}</Text>
          <TouchableOpacity
            style={styles.qtyButton}
            onPress={() => setQuantity(q => q + 1)}>
            <Text style={styles.qtyButtonText}>+</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
          <Text style={styles.addToCartText}>
            В корзину · {(flower.price * quantity).toLocaleString('ru-RU')} ₽
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: width,
    height: width * 0.9,
    resizeMode: 'cover',
  },
  backButton: {
    position: 'absolute',
    top: 54,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  backIcon: {
    fontSize: 22,
    color: '#1a1a2e',
  },
  favoriteButton: {
    position: 'absolute',
    top: 54,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  favoriteIcon: {
    fontSize: 20,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -20,
    backgroundColor: '#fff',
  },
  titleRow: {
    marginBottom: 8,
  },
  name: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1a1a2e',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  stars: {
    color: '#FFB800',
    fontSize: 16,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1a1a2e',
    marginLeft: 6,
  },
  reviewsText: {
    fontSize: 13,
    color: '#999',
    marginLeft: 6,
  },
  price: {
    fontSize: 28,
    fontWeight: '800',
    color: '#E91E63',
    marginBottom: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginVertical: 16,
  },
  descTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a2e',
    marginBottom: 10,
  },
  description: {
    fontSize: 15,
    color: '#666',
    lineHeight: 22,
  },
  features: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 100,
  },
  featureItem: {
    alignItems: 'center',
    flex: 1,
  },
  featureIcon: {
    fontSize: 28,
    marginBottom: 6,
  },
  featureText: {
    fontSize: 11,
    color: '#888',
    textAlign: 'center',
    lineHeight: 16,
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 34,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -4},
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 8,
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    marginRight: 12,
  },
  qtyButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyButtonText: {
    fontSize: 20,
    color: '#1a1a2e',
    fontWeight: '600',
  },
  qtyText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a2e',
    minWidth: 24,
    textAlign: 'center',
  },
  addToCartButton: {
    flex: 1,
    backgroundColor: '#E91E63',
    borderRadius: 14,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addToCartText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
});
