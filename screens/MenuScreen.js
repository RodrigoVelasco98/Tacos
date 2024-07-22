import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, FlatList, Image, Dimensions, TouchableOpacity } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

const initialLayout = { width: Dimensions.get('window').width };

const tacosItems = [
  { id: '1', name: 'Papas con chorizo', price: 25, image: require('../assets/tacos/papas_con_chorizo.png') },
  { id: '2', name: 'Chicharrón prensado', price: 25, image: require('../assets/tacos/chicharron_prensado.png') },
  { id: '3', name: 'Deshebrada', price: 25, image: require('../assets/tacos/deshebrada.png') },
  { id: '4', name: 'Huevo a la mexicana', price:25, image: require('../assets/tacos/huevo_a_la_mexicana.png') },
  { id: '5', name: 'Frijoles con chipotle', price:25, image: require('../assets/tacos/frijoles_con_chipotle.png') },
];

const bebidasItems = [
  { id: '6', name: 'Horchata', price: 20, image: require('../assets/bebidas/horchata.png') },
  { id: '7', name: 'Jamaica', price: 20, image: require('../assets/bebidas/jamaica.png') },
  { id: '8', name: 'Refrescos', price: 20, image: require('../assets/bebidas/refresco.png') },
];

const postresItems = [
  { id: '9', name: 'Rebanada de pastel', price: 35, image: require('../assets/postres/pastel.png') },
  { id: '10', name: 'Hojarascas', price: 35, image: require('../assets/postres/hojarascas.png') },
  { id: '11', name: 'Empanadas', price: 35, image: require('../assets/postres/empanadas.png') },
];

const ItemList = ({ items, order, updateOrder }) => (
  <FlatList
    data={items}
    keyExtractor={item => item.id}
    renderItem={({ item }) => (
      <View style={styles.itemContainer}>
        <Image source={item.image} style={styles.itemImage} />
        <View style={styles.itemDetails}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemPrice}>${item.price}</Text>
          <View style={styles.counter}>
            <TouchableOpacity style={styles.button} onPress={() => updateOrder(item, 'remove')}>
              <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantity}>{order[item.id]?.quantity || 0}</Text>
            <TouchableOpacity style={styles.button} onPress={() => updateOrder(item, 'add')}>
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )}
  />
);

const TacosRoute = ({ order, updateOrder }) => (
  <ItemList items={tacosItems} order={order} updateOrder={updateOrder} />
);

const BebidasRoute = ({ order, updateOrder }) => (
  <ItemList items={bebidasItems} order={order} updateOrder={updateOrder} />
);

const PostresRoute = ({ order, updateOrder }) => (
  <ItemList items={postresItems} order={order} updateOrder={updateOrder} />
);

const MenuScreen = ({ navigation }) => {
  const [order, setOrder] = useState({});
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'tacos', title: 'Tacos' },
    { key: 'bebidas', title: 'Bebidas' },
    { key: 'postres', title: 'Postres' },
  ]);

  const updateOrder = (item, action) => {
    setOrder(prevOrder => {
      const currentQuantity = prevOrder[item.id]?.quantity || 0;
      const newQuantity = action === 'add' ? currentQuantity + 1 : currentQuantity - 1;

      if (newQuantity <= 0) {
        const { [item.id]: _, ...rest } = prevOrder;
        return rest;
      }

      return { ...prevOrder, [item.id]: { ...item, quantity: newQuantity } };
    });
  };

  const renderScene = SceneMap({
    tacos: () => <TacosRoute order={order} updateOrder={updateOrder} />,
    bebidas: () => <BebidasRoute order={order} updateOrder={updateOrder} />,
    postres: () => <PostresRoute order={order} updateOrder={updateOrder} />,
  });

  return (
    <View style={styles.container}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        renderTabBar={props => <TabBar {...props} style={styles.tabBar} />}
      />
      <TouchableOpacity style={styles.confirmButton} onPress={() => navigation.navigate('ConfirmarOrden', { order })}>
        <Text style={styles.confirmButtonText}>Confirm Order</Text>
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
  itemPrice: {
    fontSize: 16,
    marginBottom: 5,
  },
  counter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#e74c3c',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  quantity: {
    marginHorizontal: 10,
    fontSize: 16,
  },
  tabBar: {
    backgroundColor: '#e74c3c',
  },
  confirmButton: {
    backgroundColor: '#e74c3c',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default MenuScreen;
