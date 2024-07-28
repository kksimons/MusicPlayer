import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const AdminScreen = ({ navigation }) => {
  const [questions, setQuestions] = useState([]);
  const [response, setResponse] = useState('');

  useEffect(() => {
    const unsubscribe = firestore().collection('questions')
      .orderBy('createdAt', 'desc')
      .onSnapshot(snapshot => {
        const questionsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setQuestions(questionsData);
      });

    return () => unsubscribe();
  }, []);

  const handleRespond = async (questionId) => {
    try {
      await firestore().collection('questions').doc(questionId).update({
        response,
        answered: true,
      });
      setResponse('');
      Alert.alert('Success', 'Your response has been submitted.');
    } catch (error) {
      console.error('Error responding to question: ', error);
      Alert.alert('Error', 'There was an error submitting your response.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Panel</Text>
      <FlatList
        data={questions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>{item.question}</Text>
            {item.answered ? (
              <Text style={styles.answerText}>Answer: {item.response}</Text>
            ) : (
              <View style={styles.responseContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your response"
                  value={response}
                  onChangeText={setResponse}
                />
                <TouchableOpacity style={styles.button} onPress={() => handleRespond(item.id)}>
                  <Text style={styles.buttonText}>Respond</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('HOME_SCREEN')}>
                  <Text style={styles.buttonText}>Go to Home</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
      />
    </View>
  );
};

export default AdminScreen;

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
  questionContainer: {
    marginBottom: 20,
    padding: 15,
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
  },
  questionText: {
    fontSize: 18,
    marginBottom: 10,
  },
  answerText: {
    fontSize: 16,
    color: 'green',
  },
  responseContainer: {
    marginTop: 10,
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
    alignItems: 'center',
    marginTop: 10,  // Added marginTop to separate buttons
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});
