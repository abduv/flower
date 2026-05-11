import React from 'react';
import {CartProvider} from './src/data/CartContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App(): React.JSX.Element {
  return (
    <CartProvider>
      <AppNavigator />
    </CartProvider>
  );
}
