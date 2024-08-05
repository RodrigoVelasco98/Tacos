import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import * as BarcodeScanner from 'expo-barcode-scanner';

const QRScanner = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [data, setData] = useState('');

  useEffect(() => {
    (async () => {
      const { status } = await BarcodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    setData(data);

    try {
      // Resolución del enlace corto
      const response = await fetch(data, { method: 'HEAD', redirect: 'follow' });
      const resolvedURL = response.url;

      // Extraer el token de la URL resuelta
      const token = new URL(resolvedURL).searchParams.get('token');
      
      if (token) {
        const verifyResponse = await fetch(`https://f6b7-177-249-162-83.ngrok-free.app/verify?token=${token}`);
        const result = await verifyResponse.json();

        if (verifyResponse.ok && result.success) {
          Alert.alert('Código QR Autenticado', result.message, [
            { text: 'OK', onPress: () => navigation.navigate('Menu') }
          ]);
        } else {
          Alert.alert('Error', result.message || 'Código QR no válido.');
        }
      } else {
        Alert.alert('Error', 'Token no encontrado en la URL.');
      }
    } catch (error) {
      Alert.alert('Error', 'Hubo un problema al verificar el código QR.');
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarcodeScanner.BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />
      )}
      <Text>{data}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default QRScanner;
