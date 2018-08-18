import Toast from '@rimiti/react-native-toastify';

const toastMiddleware = () => next => (action) => {
  if (action.toast) {
    Toast.show(action.toast.message, 400);
  }
  return next(action);
};

export default toastMiddleware;
