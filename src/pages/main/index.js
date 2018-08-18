import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import {
  View,
  Modal,
  TouchableOpacity,
  Text,
  TextInput,
  Image,
  ActivityIndicator,
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as UserActions } from 'store/ducks/users';

import MapboxGL from '@mapbox/react-native-mapbox-gl';

import styles from './styles';

MapboxGL.setAccessToken(
  'pk.eyJ1IjoidmluaWNpdXNzYW50b3MiLCJhIjoiY2prbmRnbnBxMG5yejNrcXI5MTJraGdtMSJ9.7SVafmNaewKfa0tUzuKspg',
);

class Main extends Component {
  static propTypes = {
    users: PropTypes.shape({
      data: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          avatar_url: PropTypes.string,
          name: PropTypes.string,
          bio: PropTypes.string,
        }),
      ),
      loading: PropTypes.bool.isRequired,
    }).isRequired,
    addUserRequest: PropTypes.func.isRequired,
  };

  state = {
    userInput: '',
    modalVisible: false,
    coords: [],
  };

  addUser = () => {
    const { userInput, coords } = this.state;
    const { addUserRequest } = this.props;

    if (!userInput.length) {
      return;
    }

    addUserRequest({ user: userInput, coords });

    this.setState({ modalVisible: false, userInput: '' });
  };

  renderAnnotations = () => {
    const { users } = this.props;

    return users.data.map(user => (
      <MapboxGL.PointAnnotation key={user.id} id={String(user.id)} coordinate={user.coords}>
        <View style={styles.annotationContainer}>
          <Image style={styles.annotationImage} source={{ uri: user.avatar_url }} />
        </View>
        <MapboxGL.Callout title={`${user.name} (${user.bio || 'No bio'})`} />
      </MapboxGL.PointAnnotation>
    ));
  };

  render() {
    const { modalVisible, userInput } = this.state;
    const { users } = this.props;

    return (
      <View style={styles.container}>
        <MapboxGL.MapView
          centerCoordinate={[-49.6451598, -27.2177659]}
          latitudeDelta={0.0042}
          longitudeDelta={0.0031}
          style={styles.map}
          onLongPress={(event) => {
            this.setState({ modalVisible: true, coords: event.geometry.coordinates });
          }}
        >
          {this.renderAnnotations()}
        </MapboxGL.MapView>

        {users.loading && (
          <ActivityIndicator size="small" color={styles.loading.color} style={styles.loading} />
        )}

        <Modal transparent={false} visible={modalVisible} onRequestClose={() => {}}>
          <View style={styles.modal}>
            <View style={styles.modalBox}>
              <Text style={styles.modalTitle}>Adicionar novo local</Text>

              <View style={styles.modalForm}>
                <TextInput
                  style={styles.modalInput}
                  autoCapitalize="none"
                  autoFocus
                  autoCorrect={false}
                  placeholder="Usuário no Github"
                  underlineColorAndroid="transparent"
                  value={userInput}
                  onChangeText={user => this.setState({ userInput: user })}
                />

                <View style={styles.modalButtonsContainer}>
                  <TouchableOpacity
                    style={[styles.modalButton, styles.cancelButton]}
                    activeOpacity={0.6}
                    onPress={() => {
                      this.setState({ modalVisible: false, userInput: '' });
                    }}
                  >
                    <Text style={styles.modalButtonText}>Cancelar</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.modalButton, styles.saveButton]}
                    activeOpacity={0.6}
                    onPress={this.addUser}
                  >
                    <Text style={styles.modalButtonText}>Salvar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users,
});

const mapDispatchToProps = dispatch => bindActionCreators(UserActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main);
