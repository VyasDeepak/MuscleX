import NetInfo from '@react-native-community/netinfo';
  export const isNetworkAvailable = async () => {
    return await NetInfo.fetch().then(state => {
      console.log('NetInfo-------------',state.isConnected)
      return state.isConnected
    }).catch(error => {
      return false
    });
  }
