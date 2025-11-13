import { useState } from 'react';
import { View, Text, Button } from 'react-native';

export default function QuizScreen({ route }) {
  const { cards } = route.params;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const handleNext = () => {
    setShowAnswer(false);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };

  if (cards.length === 0) {
    return <Text>No cards available</Text>;
  }

  const currentCard = cards[currentIndex];
  return (
    <View>
      <Text>{showAnswer ? currentCard.answer : currentCard.question}</Text>
      <Button title="Show Answer" onPress={() => setShowAnswer(!showAnswer)} />
      <Button title="Next" onPress={handleNext} />
    </View>
  );
}
