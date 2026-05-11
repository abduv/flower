import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  FlatList,
  StatusBar,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {categories, flowers, Flower} from '../data/flowers';
import FlowerCard from '../components/FlowerCard';
import {useCart} from '../data/CartContext';

type RootStackParamList = {
  MainTabs: undefined;
  FlowerDetail: {flower: Flower};
};

export default function HomeScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {totalItems} = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFlowers = flowers.filter(f => {
    const matchesCategory = selectedCategory
      ? f.category === selectedCategory
      : true;
    const matchesSearch = f.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const popularFlowers = flowers
    .sort((a, b) => b.reviews - a.reviews)
    .slice(0, 4);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAFAFA" />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Добро пожаловать 👋</Text>
            <Text style={styles.title}>Bloom & Petals</Text>
          </View>
          <TouchableOpacity style={styles.cartBadge}>
            <Text style={styles.cartIcon}>🛒</Text>
            {totalItems > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{totalItems}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Search */}
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Найти цветы..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Banner */}
        <View style={styles.banner}>
          <View style={styles.bannerContent}>
            <Text style={styles.bannerTitle}>Весенняя распродажа</Text>
            <Text style={styles.bannerSubtitle}>Скидки до 30% на букеты</Text>
            <TouchableOpacity style={styles.bannerButton}>
              <Text style={styles.bannerButtonText}>Смотреть</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.bannerEmoji}>🌸</Text>
        </View>

        {/* Categories */}
        <Text style={styles.sectionTitle}>Категории</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesScroll}>
          <TouchableOpacity
            style={[
              styles.categoryChip,
              !selectedCategory && styles.categoryChipActive,
            ]}
            onPress={() => setSelectedCategory(null)}>
            <Text style={styles.categoryIcon}>✨</Text>
            <Text
              style={[
                styles.categoryName,
                !selectedCategory && styles.categoryNameActive,
              ]}>
              Все
            </Text>
          </TouchableOpacity>
          {categories.map(cat => (
            <TouchableOpacity
              key={cat.id}
              style={[
                styles.categoryChip,
                {backgroundColor: cat.color},
                selectedCategory === cat.id && styles.categoryChipActive,
              ]}
              onPress={() =>
                setSelectedCategory(
                  selectedCategory === cat.id ? null : cat.id,
                )
              }>
              <Text style={styles.categoryIcon}>{cat.icon}</Text>
              <Text
                style={[
                  styles.categoryName,
                  selectedCategory === cat.id && styles.categoryNameActive,
                ]}>
                {cat.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Popular section (only when no filters) */}
        {!selectedCategory && !searchQuery && (
          <>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Популярное</Text>
              <TouchableOpacity>
                <Text style={styles.seeAll}>Все →</Text>
              </TouchableOpacity>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.popularScroll}>
              {popularFlowers.map(flower => (
                <TouchableOpacity
                  key={flower.id}
                  style={styles.popularCard}
                  onPress={() =>
                    navigation.navigate('FlowerDetail', {flower})
                  }>
                  <View style={styles.popularImageContainer}>
                    <View style={styles.popularImagePlaceholder}>
                      <Text style={styles.popularEmoji}>
                        {flower.category === '1'
                          ? '🌹'
                          : flower.category === '2'
                          ? '🌷'
                          : flower.category === '4'
                          ? '🪴'
                          : '💐'}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.popularName} numberOfLines={1}>
                    {flower.name}
                  </Text>
                  <Text style={styles.popularPrice}>
                    {flower.price.toLocaleString('ru-RU')} ₽
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </>
        )}

        {/* All flowers grid */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            {selectedCategory
              ? categories.find(c => c.id === selectedCategory)?.name
              : 'Каталог'}
          </Text>
          <Text style={styles.count}>{filteredFlowers.length} шт.</Text>
        </View>
        <View style={styles.grid}>
          {filteredFlowers.map(flower => (
            <FlowerCard
              key={flower.id}
              flower={flower}
              onPress={() => navigation.navigate('FlowerDetail', {flower})}
            />
          ))}
        </View>

        {filteredFlowers.length === 0 && (
          <View style={styles.empty}>
            <Text style={styles.emptyEmoji}>🔍</Text>
            <Text style={styles.emptyText}>Ничего не найдено</Text>
          </View>
        )}

        <View style={{height: 20}} />
      </ScrollView>
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
  greeting: {
    fontSize: 14,
    color: '#888',
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1a1a2e',
    marginTop: 2,
  },
  cartBadge: {
    position: 'relative',
  },
  cartIcon: {
    fontSize: 28,
  },
  badge: {
    position: 'absolute',
    top: -6,
    right: -8,
    backgroundColor: '#E91E63',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '700',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 14,
    marginHorizontal: 20,
    marginBottom: 20,
    paddingHorizontal: 16,
    height: 48,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#1a1a2e',
  },
  banner: {
    flexDirection: 'row',
    backgroundColor: '#E91E63',
    borderRadius: 20,
    marginHorizontal: 20,
    marginBottom: 24,
    padding: 20,
    alignItems: 'center',
    overflow: 'hidden',
  },
  bannerContent: {
    flex: 1,
  },
  bannerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 4,
  },
  bannerSubtitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.85)',
    marginBottom: 12,
  },
  bannerButton: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 8,
    alignSelf: 'flex-start',
  },
  bannerButtonText: {
    color: '#E91E63',
    fontWeight: '700',
    fontSize: 13,
  },
  bannerEmoji: {
    fontSize: 64,
    marginLeft: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a2e',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 20,
    marginTop: 8,
  },
  seeAll: {
    fontSize: 14,
    color: '#E91E63',
    fontWeight: '600',
  },
  count: {
    fontSize: 13,
    color: '#999',
  },
  categoriesScroll: {
    paddingLeft: 20,
    marginBottom: 20,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 10,
  },
  categoryChipActive: {
    backgroundColor: '#E91E63',
  },
  categoryIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  categoryName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#555',
  },
  categoryNameActive: {
    color: '#fff',
  },
  popularScroll: {
    paddingLeft: 20,
    marginBottom: 16,
  },
  popularCard: {
    width: 130,
    marginRight: 12,
  },
  popularImageContainer: {
    marginBottom: 8,
  },
  popularImagePlaceholder: {
    width: 130,
    height: 130,
    borderRadius: 16,
    backgroundColor: '#FFF0F3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popularEmoji: {
    fontSize: 48,
  },
  popularName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1a1a2e',
    marginBottom: 2,
  },
  popularPrice: {
    fontSize: 14,
    fontWeight: '700',
    color: '#E91E63',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  empty: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyEmoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
  },
});
