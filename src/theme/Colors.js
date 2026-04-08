// FITFLOW Color System
export const Colors = {
  // Primary
  primary: '#b5f23a', // Lime green - FITFLOW accent
  accent2: '#7ee8a2', // Secondary green
  accent3: '#f2a23a', // Orange accent
  
  // Backgrounds
  BG_COLOR: '#0f0f0f', // Very dark background
  background: '#0f0f0f',
  surface: '#1a1a1a', // Dark surface
  surface2: '#242424', // Slightly lighter surface
  
  // Text
  text: '#f0f0f0', // Off-white primary text
  secondaryText: '#888', // Muted grey
  BLACK: '#0f0f0f',
  black: '#0f0f0f',
  WHITE: '#f0f0f0',
  
  // Category Colors
  cardio: '#FF6B6B', // Red
  strength: '#4ECDC4', // Teal
  endurance: '#FFB800', // Gold
  more: '#A78BFA', // Purple
  
  // UI Elements
  border: '#2e2e2e',
  overlay: 'rgba(0,0,0,0.3)',
  
  // Deprecated (kept for compatibility)
  light_gray: '#888',
};



export const fonts = {
  robot_bold: 'Roboto-Bold',
  robot_semi_bold: 'Roboto-SemiBold',
  robot_medium: 'Roboto-Medium',
  robot_regular: 'Roboto-Regular',
  font_size_24: 24,
  font_size_18: 18,
  font_size_15: 15,
  font_size_14: 14,
  font_size_13: 13,
  font_size_12: 12,
  font_size_11: 11,
};

export default {
  ...Colors,
};
