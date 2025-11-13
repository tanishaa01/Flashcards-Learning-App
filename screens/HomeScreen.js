import { useState, useEffect } from 'react';
import { View, Button, FlatList, TextInput } from 'react-native';

export default function HomeScreen({ navigation }) {
  const [decks, setDecks] = useState([]);
  const [newDeckName, setNewDeckName] = useState('');

  useEffect(() => {
    const loadDecks = async () => {
      const storedDecks = await AsyncStorage.getItem('decks');
      if (storedDecks) setDecks(JSON.parse(storedDecks));
    };
    loadDecks();
  }, []);

  const saveDecks = async (updatedDecks) => {
    setDecks(updatedDecks);
    await AsyncStorage.setItem('decks', JSON.stringify(updatedDecks));
  };

  const addDeck = () => {
    if (newDeckName) {
      const updatedDecks = [...decks, { id: Date.now().toString(), name: newDeckName }];
      saveDecks(updatedDecks);
      setNewDeckName('');
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Enter Deck Name"
        value={newDeckName}
        onChangeText={setNewDeckName}
      />
      <Button title="Add Deck" onPress={addDeck} />
      <FlatList
        data={decks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Button
            title={item.name}
            onPress={() => navigation.navigate('Deck', { deck: item })}
          />
        )}
      />
    </View>
  );
}
