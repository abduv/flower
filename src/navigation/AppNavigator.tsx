import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import FlowerDetailScreen from '../screens/FlowerDetailScreen';
import CartScreen from '../screens/CartScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import ProfileScreen from '../screens/ProfileScreen';
import {useCart} from '../data/CartContext';
import {Flower} from '../data/flowers';

type RootStackParamList = {
  MainTabs: undefined;
  FlowerDetail: {flower: Flower};
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

function TabIcon({icon, focused}: {icon: string; focused: boolean}) {
  return (
    <View style={[styles.tabIcon, focused && styles.tabIconActive]}>
      <Text style={styles.tabIconText}>{icon}</Text>
    </View>
  );
}

function CartTabIcon({focused}: {focused: boolean}) {
  const {totalItems} = useCart();
  return (
    <View style={[styles.tabIcon, focused && styles.tabIconActive]}>
      <Text style={styles.tabIconText}>🛒</Text>
      {totalItems > 0 && (
        <View style={styles.tabBadge}>
          <Text style={styles.tabBadgeText}>{totalItems}</Text>
        </View>
      )}
    </View>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#E91E63',
        tabBarInactiveTintColor: '#999',
        tabBarLabelStyle: styles.tabLabel,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Главная',
          tabBarIcon: ({focused}) => <TabIcon icon="🏠" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          tabBarLabel: 'Избранное',
          tabBarIcon: ({focused}) => <TabIcon icon="❤️" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarLabel: 'Корзина',
          tabBarIcon: ({focused}) => <CartTabIcon focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Профиль',
          tabBarIcon: ({focused}) => <TabIcon icon="👤" focused={focused} />,
        }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="MainTabs" component={MainTabs} />
        <Stack.Screen
          name="FlowerDetail"
          component={FlowerDetailScreen}
          options={{
            animation: 'slide_from_right',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 85,
    paddingTop: 8,
    paddingBottom: 28,
    backgroundColor: '#fff',
    borderTopWidth: 0,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -4},
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 8,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 2,
  },
  tabIcon: {
    position: 'relative',
  },
  tabIconActive: {
    transform: [{scale: 1.1}],
  },
  tabIconText: {
    fontSize: 22,
  },
  tabBadge: {
    position: 'absolute',
    top: -4,
    right: -10,
    backgroundColor: '#E91E63',
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 3,
  },
  tabBadgeText: {
    color: '#fff',
    fontSize: 9,
    fontWeight: '700',
  },
});
