import React from 'react';
import { View, Text, Button, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';

const OrderSummaryScreen = ({ route, navigation }) => {
  const { order, name, totalPrice } = route.params;

  const handleConfirmOrder = () => {
    const pedido = {
      customerName: name,
      totalPrice: totalPrice,
      products: Object.values(order).map(item => ({
        productId: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      }))
    };

    console.log('Datos enviados:', pedido); 

    fetch('http://10.0.0.6:3000/guardarOrden', {  
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(pedido)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      if (data.status === 'Success') {
        alert("Pedido realizado correctamente");
      } else {
        alert("Pedido realizado correctamente");
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Pedido de {name}</Text>
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
      <TouchableOpacity style={styles.modifyButton} onPress={() => navigation.navigate('Menu')}>
        <Text style={styles.buttonText}>Cambiar Pedido</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmOrder}>
        <Text style={styles.buttonText}>Confirmar Pedido</Text>
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
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
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
  modifyButton: {
    backgroundColor: '#e74c3c',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
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

export default OrderSummaryScreen;
