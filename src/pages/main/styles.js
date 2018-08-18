import { StyleSheet } from 'react-native';
import { colors, metrics } from 'styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  map: {
    // flex: 1,
    ...StyleSheet.absoluteFillObject,
  },

  annotationContainer: {
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    borderRadius: 21,
    borderWidth: 5,
    borderColor: colors.white,
  },

  annotationImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },

  modal: {
    flex: 1,
    backgroundColor: colors.darkTransparent,
    alignItems: 'center',
    justifyContent: 'center',
  },

  modalBox: {
    marginHorizontal: metrics.basePadding,
    padding: metrics.basePadding,
    backgroundColor: colors.white,
    borderRadius: metrics.baseRadius,
    alignSelf: 'stretch',
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.darker,
    textAlign: 'center',
  },

  modalInput: {
    height: 42,
    marginTop: metrics.basePadding,
    paddingHorizontal: metrics.basePadding,
    borderWidth: 1,
    color: colors.regular,
    borderColor: colors.light,
    borderRadius: metrics.baseRadius,
  },

  modalButtonsContainer: {
    marginTop: metrics.baseMargin,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  modalButton: {
    flex: 1,
    height: 42,
    borderRadius: metrics.baseRadius,
    alignItems: 'center',
    justifyContent: 'center',
  },

  modalButtonText: {
    color: colors.white,
    fontWeight: 'bold',
    fontFamily: 'sans-serif',
  },

  cancelButton: {
    marginRight: 7.5,
    backgroundColor: colors.gray,
  },

  saveButton: {
    marginLeft: 7.5,
    backgroundColor: colors.success,
  },

  loading: {
    position: 'absolute',
    top: metrics.basePadding,
    left: metrics.basePadding,
    color: colors.regular,
  },

  error: {
    padding: metrics.baseMargin,
    backgroundColor: colors.danger,
    color: colors.white,
    textAlign: 'center',
  },
});

export default styles;
