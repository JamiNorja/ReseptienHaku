import React, { useState, useRef } from 'react';
import { Alert, StyleSheet, Text, View, Button, TextInput, FlatList, StatusBar, Image } from 'react-native';

export default function App() {
  const [keyword, setKeyword] = useState('');
  const [repositories, setRepositories] = useState([]);
  const keywordInputRef = useRef(null); // Create a ref for the TextInput

  const getRepositories = async () => {
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${keyword}`);
      const data = await response.json();
      if (data.meals) {
        setRepositories(data.meals);
      } else {
        Alert.alert('Error', 'No meals found');
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      keywordInputRef.current.blur();
    }
  }

  const listSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "80%",
          backgroundColor: "#CED0CE",
          marginLeft: "10%"
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) =>
          <View>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>{item.strMeal}</Text>
            <Image
              source={{ uri: item.strMealThumb }}
              style={{ width: 100, height: 100 }}
            />
          </View>}
        data={repositories}
        ItemSeparatorComponent={listSeparator} />
      <View style={styles.search}>
        <TextInput
          ref={keywordInputRef}
          style={{ fontSize: 18, width: 200 }}
          placeholder='keyword'
          value={keyword}
          onChangeText={text => setKeyword(text)}
        />
        <Button title="Find" onPress={getRepositories} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingLeft: '5%'
  },
  search: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
