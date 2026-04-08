const BASE_URL = "http://172.16.5.197:5000/";
const IMG_URL = " http://172.16.5.202:3000"


const kInternetError = "You're offline \n Please check internet connection.";
const kSorryError = "Sorry, something wrong.";
const kPost = "post";
const kGet = "get";


const JSON_HEADER = {
  Accept: "application/json",
  "Content-Type": "application/json",
};
const MULTI_PART_HEADER = {
  Accept: "application/json",
  "Content-Type": "multipart/form-data",
};
const API_FAILED = {
  status: "false",
  message: kSorryError,
};
const INTERNET_FAILED = {
  status: "false",
  message: kInternetError,
};



//API ENDPOINT AUTH
const LOGIN = 'login'
const SIGNUP = 'register'
const PROFILE = 'api/users/getUserbyId'

//API ENDPOINT COMMON
const CATEGORIES = 'api/productCategories/getProductCategories';
const GET_PRODUCT = 'api/products/getProducts';
const GET_PRODUCT_DETAILS = 'api/products/getProductById'
const GET_POST = 'api/posts/getPosts';
const GET_BLOG_DETAILS = 'api/posts/getPostById';


export {
  BASE_URL,
  JSON_HEADER,
  MULTI_PART_HEADER,
  INTERNET_FAILED,
  API_FAILED,
  kInternetError,
  kSorryError,
  kPost,
  kGet,
  IMG_URL,
  CATEGORIES,
  GET_PRODUCT,
  GET_POST,
  GET_BLOG_DETAILS,
  GET_PRODUCT_DETAILS,
  LOGIN,
  SIGNUP,
  PROFILE
};


