import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export default function ProductItem({ product, onQuantityChange }) {
  const [quantity, setQuantity] = useState(0);

  const increment = () => {
    setQuantity(quantity + 1);
    onQuantityChange(product, quantity + 1);
  };

  const decrement = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
      onQuantityChange(product, quantity - 1);
    }
  };

  return (
    <View style={styles.container}>
      <Text>{product.name}</Text>
      <View style={styles.counter}>
        <Button title="-" onPress={decrement} />
        <Text>{quantity}</Text>
        <Button title="+" onPress={increment} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  counter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
