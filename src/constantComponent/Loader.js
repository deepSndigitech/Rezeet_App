import React from 'react';
import { View, ActivityIndicator, StyleSheet, Modal } from 'react-native';
import { color } from '../../constant';

const Loader = ({ isLoading }) => (
    <Modal transparent={true} animationType="none" visible={isLoading}>
        <View style={styles.overlay}>
            <ActivityIndicator size="large" color={"#FFF"} />
        </View>
    </Modal>
);

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});

export default Loader;