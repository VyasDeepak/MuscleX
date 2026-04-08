import axiosInstance from "../client";
import { ENDPOINTS } from "../endpoints";

class AuthService {
  /**
   * Login with phone number
   * @param {string} phoneNumber - User's phone number
   * @returns {Promise} Response containing OTP session data
   */
  async login(params) {
    try {
      const response = await axiosInstance.post(ENDPOINTS.LOGIN, params);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Verify OTP and get authentication token
   * @param {string} phoneNumber - User's phone number
   * @param {string} otp - OTP code from SMS
   * @returns {Promise} Response containing user data and auth tokens
   * Expected response structure:
   * {
   *   success: true,
   *   message: string,
   *   accessToken: string,
   *   refreshToken: string,
   *   sessionId: string,
   *   expiresAt: string,
   *   user: { id, phoneNumber, name, email, ... }
   * }
   */
  async verifyOtp(params) {
    try {
      const response = await axiosInstance.post(ENDPOINTS.VERIFYOTP, params);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Get current user profile
   * @returns {Promise} User profile data
   */
  async getUser() {
    try {
      const response = await axiosInstance.get(ENDPOINTS.GET_USER);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Update user profile
   * @param {object} data - User profile data to update (name, email, about, location, etc.)
   * @returns {Promise} Updated user profile data
   */
  async updateProfile(data) {
    try {
      const response = await axiosInstance.patch(ENDPOINTS.UPDATE_USER, data);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Handle API errors
   * @param {Error} error - Axios error object
   * @returns {Error} Formatted error message
   */
  handleError(error) {
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      "An error occurred. Please try again.";

    const customError = new Error(message);
    customError.status = error.response?.status;
    return customError;
  }
}

export default new AuthService();
