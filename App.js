import React from 'react';
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import * as LocalAuthentication from 'expo-local-authentication';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [isBiometricSupported, setIsBiometricSupported] = React.useState(false);
  const [isBiometricEnrolled, setIsBiometricEnrolled] = React.useState(false);
  const [biometricAuth, setBiometricAuth] = React.useState({});

  React.useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      console.log('biometric compatible::', compatible);
      setIsBiometricSupported(compatible);
    })();
  });

  React.useEffect(() => {
    if (isBiometricSupported) {
      (async () => {
        const compatible = await LocalAuthentication.isEnrolledAsync();
        console.log('biometric enroll::', compatible);
        setIsBiometricEnrolled(compatible);
      })();
    }
  }, [isBiometricSupported]);

  const handleBiometricAuth = async () => {
    const response = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Login with Biometrics',
      disableDeviceFallback: true,
    });
    setBiometricAuth(response);
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <View style={styles.sectionContainer}>
        <Text>
          {'-------------------------------- '}
          {isBiometricSupported
            ? 'Compatible with Biometrics'
            : 'Face or Fingerprint scanner is not available on this device'}
        </Text>

        <Text>
          {'-------------------------------- '}
          {isBiometricEnrolled ? 'enrolled with Biometrics' : 'not enrolled'}
        </Text>
      </View>
      <Button title={'Check Auth'} onPress={handleBiometricAuth} />

      <Text>{JSON.stringify(biometricAuth)}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
