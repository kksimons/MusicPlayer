import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const FAQFormScreen = ({ navigation }) => {
  const [question, setQuestion] = useState('');

  const handleSubmit = async () => {
    try {
      await firestore().collection('questions').add({
        question,
        answered: false,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });
      Alert.alert('Success', 'Your question has been submitted.');
      setQuestion('');
    } catch (error) {
      console.error('Error adding question: ', error);
      Alert.alert('Error', 'There was an error submitting your question.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>FAQ Form</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your question"
        value={question}
        onChangeText={setQuestion}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ADMIN')}>
        <Text style={styles.buttonText}>Go to Admin</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FAQFormScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 15,
    borderRadius: 5,
    backgroundColor: '#eee',
    marginVertical: 10,
  },
  button: {
    padding: 15,
    borderRadius: 5,
    backgroundColor: '#007bff',
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
});
