import 'react-native-gesture-handler';
import * as React from 'react';
import { Image } from 'react-native'; // Importa Image para el logo
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import MenuScreen from './screens/MenuScreen';
import ConfirmOrderScreen from './screens/ConfirmOrderScreen';
import OrderSummaryScreen from './screens/OrderSummaryScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#f4511e', // Cambia el color de fondo del header
          },
          headerTintColor: '#fff', // Cambia el color del texto del header
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerLeft: () => (
            <Image
              source={require('./assets/logo.png')} // Asegúrate de tener esta imagen en tu carpeta assets
              style={{ width: 40, height: 40, marginLeft: 10 }}
            />
          ),
          headerBackTitle: 'Home', // Cambia el texto del botón de retroceso
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Menu" component={MenuScreen} />
        <Stack.Screen name="ConfirmarOrden" component={ConfirmOrderScreen} />
        <Stack.Screen name="ResumenDelPedido" component={OrderSummaryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
