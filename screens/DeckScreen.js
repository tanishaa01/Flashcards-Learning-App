import  { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, TextInput } from 'react-native';

export default function DeckScreen({ route, navigation }) {
  const { deck } = route.params;
  const [cards, setCards] = useState([]);
  const [newCard, setNewCard] = useState({ question: '', answer: '' });

  useEffect(() => {
    const loadCards = async () => {
      const storedCards = await AsyncStorage.getItem(deck.id);
      if (storedCards) setCards(JSON.parse(storedCards));
    };
    loadCards();
  }, [deck.id]);

  const saveCards = async (updatedCards) => {
    setCards(updatedCards);
    await AsyncStorage.setItem(deck.id, JSON.stringify(updatedCards));
  };

  const addCard = () => {
    if (newCard.question && newCard.answer) {
      const updatedCards = [...cards, newCard];
      saveCards(updatedCards);
      setNewCard({ question: '', answer: '' });
    }
  };

  return (
    <View>
      <Text>{deck.name}</Text>
      <FlatList
        data={cards}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.question}</Text>
          </View>
        )}
      />
      <TextInput
        placeholder="Question"
        value={newCard.question}
        onChangeText={(text) => setNewCard({ ...newCard, question: text })}
      />
      <TextInput
        placeholder="Answer"
        value={newCard.answer}
        onChangeText={(text) => setNewCard({ ...newCard, answer: text })}
      />
      <Button title="Add Card" onPress={addCard} />
      <Button title="Start Quiz" onPress={() => navigation.navigate('Quiz', { cards })} />
    </View>
  );
}
