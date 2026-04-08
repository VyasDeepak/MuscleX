import { Platform } from 'react-native';
import { showMessage, positionStyle } from 'react-native-flash-message';
import { Colors, fonts } from '../theme/Colors';

const getToastColor = (type) => {
  if (type === 'success') return Colors.green;
  if (type === 'warning') return Colors.orange;
  if (type === 'info') return Colors.blue;
  return Colors.red;
};

function showToastMessage(message, type = 'danger') {
  showMessage({
    message: message,
    type: type,
    style: {
      paddingTop: Platform.OS === 'ios' ? 8 : 20,
      paddingBottom: 16,
      backgroundColor: getToastColor(type),
      height: 80,
       
    },
    titleStyle: {
      color: Colors.WHITE,
      fontFamily: fonts.robot_medium,
      fontSize: fonts.font_size_14,
      paddingTop: 20
    },
  });
}

export { showToastMessage };


