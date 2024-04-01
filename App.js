import React, {useEffect} from 'react';
import messaging from '@react-native-firebase/messaging';
import {SafeAreaView, StyleSheet, Text} from 'react-native';

function App() {
  useEffect(() => {
    getToken();
    unsubscribe();
  }, []);

  const getToken = async () => {
    await messaging().registerDeviceForRemoteMessages();
    const token = await messaging().getToken();
    console.log(token);
  };
  const unsubscribe = messaging().onNotificationOpenedApp(remoteMessage => {
    const url = buildDeepLinkFromNotificationData(remoteMessage.data);
    if (typeof url === 'string') {
      listener(url);
    }
  });
  return (
    <SafeAreaView
      style={{
        justifyContent: 'center',
        display: 'flex',
        alignItems: 'center',
      }}>
      <Text>push notification</Text>
    </SafeAreaView>
  );
}

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
