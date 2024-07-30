import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { iconSizes, spacing, fontSize, fontFamilies } from '../constants/dimensions';

const faqs = [
  {
    question: 'StreamSonic skipping',
    answer: 'If your StreamSonic is skipping, please check your internet connection. Ensure you have a stable connection.'
  },
  {
    question: 'How do I add a song to a playlist?',
    answer: 'To add a song to a playlist, go to the song, tap on the plus sign, and there should be alert allowing you to create a playlist.'
  },
  {
    question: 'How can I update my user name?',
    answer: 'To update your username, go to settings and tap on "Profile" you can update user name there.'
  },
  {
    question: 'How do I delete a playlist?',
    answer: 'To delete a playlist, go to the playlist, there is an icon of a bin , which should delete the playlist.'
  },
  {
    question: 'How do I change my password?',
    answer: 'To change your password, go to settings and tap on "Profile" you can update password there.'
  },
  {
    question: 'How do I follow people?',
    answer: 'To follow people, go to their profile using their user name  and tap on the follow button.',
  },
  {
    question: 'How do I share my playlist?',
    answer: 'To share your playlist, go to the playlist and make sure that the visibility is public , which should make the playlist public allowing people who follow you see the playlist.'
  },
  {
    question: 'How do I search for a song?',
    answer: 'To search for a song, go to the search bar and type in the name of the song.'
  },
  {
    question: 'How do I see featured artists?',
    answer: 'To see featured artists go to the home page at the bottom there should be a list of all the featured artists.'
  },
  {
    question: 'How do I change to dark/light mode ?',
    answer: 'To change to dark/light mode go to the navigation on the side at the top there is a button with a moon or sun depending on your current mode,That should change the mode.'
  },
  // Add more FAQs here...
];

const FAQFormScreen = () => {
  const [selectedFAQ, setSelectedFAQ] = useState(null);
  const navigation = useNavigation();
  const { colors } = useTheme();

  const handleQuestionSelect = faq => {
    setSelectedFAQ(faq);
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={handleGoBack}>
          <AntDesign name={"arrowleft"} color={colors.iconPrimary} size={iconSizes.md} />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>FAQ</Text>
      <FlatList
        data={faqs}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleQuestionSelect(item)}>
            <Text style={styles.questionText}>{item.question}</Text>
          </TouchableOpacity>
        )}
      />
      {selectedFAQ ? (
        <View style={styles.answerContainer}>
          <Text style={styles.answerTitle}>Answer:</Text>
          <Text style={styles.answerText}>{selectedFAQ.answer}</Text>
        </View>
      ) : null}
    </View>
  );
};

export default FAQFormScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: spacing.md,
    paddingHorizontal: spacing.md,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    padding: spacing.lg,
  },
  questionText: {
    fontSize: 18,
    padding: 10,
    backgroundColor: '#f1f1f1',
    marginVertical: 5,
    borderRadius: 5,
  },
  answerContainer: {
    marginTop: 30,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  answerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  answerText: {
    fontSize: 20,
    marginTop: 5,
  },
 
});
