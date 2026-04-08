import axiosInstance from "../client";
import { ENDPOINTS } from "../endpoints";
import axios from "axios";

class HomeService {
  async createPost(params) {
    return axiosInstance.post(ENDPOINTS.CREATE_POST, params);
  }

  async getPosts(params) {
    return axiosInstance.get(ENDPOINTS.GET_POSTS, { params });
  }

  async assignMediaToPost(params) {
    return axiosInstance.post(`api/v1/media/presign`, params);
  }

  async hitUploadComplete(url, formData) {
    // Use axios directly for S3 upload to avoid auth interceptors and bearer token
    // React Native FormData will automatically set Content-Type with proper boundary
    return axios.put(url, formData, {
      headers: {
        // ✅ Required for S3 presigned URLs with signature
        "Content-Type": 'multipart/form-data',
        ...formData.getHeaders?.(), // In case getHeaders is available (e.g. in Node.js), it will include the correct Content-Type with boundary
        // "x-amz-content-sha256": "UNSIGNED-PAYLOAD",
      },
     
    });
  }
}

export default new HomeService();
