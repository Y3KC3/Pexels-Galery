import { TouchableOpacity, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const CardImage = ({ image }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={style.cardImage}
      onPress={() => navigation.navigate('ImageScreen', { image })}
    >
      <Image
        source={{
          uri: image.src.portrait
            ? image.src.portrait
            : "https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg",
        }}
        style={{ height: 180, width: "100%" }}
      />
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  cardImage: {
    display: "flex",
    width: "48%",
    margin: 4,
    justifyContent: "space-between",
    backgroundColor: "#2c292c",
    borderWidth: 0,
    borderRadius: 5,
  },
});

export default CardImage;
