import { View, Text, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { Input, Button } from "@rneui/themed";

import { getImages } from "../api/pexels";
import ImageList from "../components/ImageList";

const HomeScreen = ({ openSearch }) => {
  const [photos, setPhotos] = useState([]);
  const [searchTerm,setSearchTerm] = useState('');
  const [totalResult,setTotalResult] = useState(0);

  const loadImages = async (searchTerm) => {
    const result = await getImages(searchTerm);
    setPhotos(result.data.photos);
    setTotalResult(result.data.total_results);
  };

  useEffect(() => {
    loadImages();
  }, []);

  const handlerSearch = async () => await loadImages(searchTerm);

  return (
    <>
      {openSearch && (
        <View style={style.searchSection}>
          <Input 
            leftIcon={{ type: 'feather', name: 'search', color: '#FFFFFF' }}
            leftIconContainerStyle={style.searchLeftIcon}
            placeholder="Search a term"
            inputContainerStyle={style.searchInput}
            style={style.input}  
            onChangeText={(value) => setSearchTerm(value)}
          />
          <Button 
            title="Search"
            buttonStyle={style.buttonSearch}  
            onPress={() => handlerSearch()}
          />
        </View>
      )}

      <View style={style.container}>
        <Text style={style.totalResultText}>{totalResult} Resultados</Text>
        <ImageList photos={photos} />
      </View>
    </>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D',
    alignItems: 'center',
    justifyContent: 'center'
  },
  totalResultText: {
    color: "#D0D0D0",
    textAlign: 'right',
    width: '100%',
    paddingTop: 15
  },
  searchSection: {
    backgroundColor: '#0D0D0D',
    width: '100%',
    paddingLeft: 10,
    flex: 1/6,
    flexDirection: 'row',
    paddingRight: 80,
    alignItems: 'center'
  },
  searchInput: {
    backgroundColor: '#2c292c',
    borderBottomWidth: 0,
    paddingHorizontal: 4
  },
  input: {
    color: '#FFFFFF'
  },
  searchLeftIcon: {
    paddingStart: 10,
    marginRight: 7
  },
  buttonSearch: {
    backgroundColor: '#229783',
    marginBottom: 25,
    paddingVertical: 12.5
  }
});

export default HomeScreen;