// src/screens/HomeScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Image } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <ImageBackground 
      source={require('../assets/background.jpg')} // Asegúrate de tener esta imagen en tu carpeta assets
      style={styles.container}
    >
      <View style={styles.innerContainer}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeTextTop}>Bienvenido a Tacos</Text>
          <Text style={styles.welcomeTextBottom}>INTERESTELAR</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Scanner')}>
          <Text style={styles.buttonText}>Order Now</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  welcomeTextTop: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  welcomeTextBottom: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    textTransform: 'uppercase', // Hace que el texto esté en mayúsculas
  },
  button: {
    backgroundColor: '#f4511e', // Color de fondo del botón
    borderRadius: 25, // Redondea las esquinas
    paddingVertical: 15,
    paddingHorizontal: 30,
    shadowColor: '#000', // Sombra del botón
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5, // Para Android
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
