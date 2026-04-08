// import { getData, removeItemValue, setData } from "../api/keyChain";

let globalLoader = null;

export const loaderRef = ref => {
  globalLoader = ref;
};

export const addReferenceToLoader = ref => {
  globalLoader = ref;
};

export const showLoader = () => {
  globalLoader?.showLoader();
};

export const hideLoader = () => {
  globalLoader?.hideLoader();
};



// export const logout = async (key) => {
//   setUserData('')
//   setGlobalUserToken('')
//   let removeUser = await removeItemValue('user_data');
//   let removetokne = await removeItemValue('user_token');
//   console.log('removeUser----->', removeUser);
//   console.log('removetokne----->', removetokne);
  
//   return true
// };





export const setDefaultValues = navigation => {
    global.navRef = navigation;
};  
  
const setUserData = data => {
  global.userData = data;
};

const setGlobalUserToken = token => {
  global.userToken = token;
};

 

// export const saveUserData = response => {
//   setData('user_data', response);
//   setUserData(response);
//   if (response?.access_token) {
//     global.userToken = response?.access_token;
//     console.log('response.token====>222222', response?.access_token);
//     setData('user_token', response?.access_token);
//     setGlobalUserToken(response?.access_token);
//   }
// };



export {setGlobalUserToken, setUserData};

