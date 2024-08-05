import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';

const ConfirmOrderScreen = ({ route, navigation }) => {
  const [name, setName] = useState('');
  const { order } = route.params;

  const totalPrice = Object.values(order).reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <View style={styles.container}>
      <FlatList
        data={Object.values(order)}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Image source={item.image} style={styles.itemImage} />
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemQuantity}>x{item.quantity}</Text>
            </View>
          </View>
        )}
      />
      <Text style={styles.totalPrice}>Total: ${totalPrice}</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre del pedido"
        value={name}
        onChangeText={setName}
      />
      <TouchableOpacity style={styles.confirmButton} onPress={() => navigation.navigate('ResumenDelPedido', { order, name, totalPrice })}>
        <Text style={styles.buttonText}>Confirmar Nombre</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 5,
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemQuantity: {
    fontSize: 16,
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
  confirmButton: {
    backgroundColor: '#e74c3c',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ConfirmOrderScreen;
