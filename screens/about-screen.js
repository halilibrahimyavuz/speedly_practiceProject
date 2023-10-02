import { Linking, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button, Card, List } from 'react-native-paper'
import imgAbout from "../assets/about.jpg";
import colors from "../utils/constants/colors";
import about from "../utils/data/about.json";

const AboutScreen = () => {

  const callUs = () => {
    Linking.openURL("tel:+9056581585");
  }

  const visitWeb = () => {
    Linking.openURL("https://google.com");
  }

  return (
   
      <View>      
             <Card>
        <Card.Cover source={imgAbout} theme={{ roundness: 0 }} />

        {/* gorsel ve buton */}
        <Card.Content style={styles.cardContent}>
          <Button 
          mode="contained" 
          onPress={callUs}
          >
          Call Us
          </Button>

          <Button 
          mode="contained" 
          onPress={visitWeb}
          >
          Visit Web
          </Button>
        </Card.Content>
      </Card>



      {/*  sırket hakkında kı maddeler */}

      <ScrollView>
      <View style={styles.itemList}>
        {about.map((item, index) => (
          <List.Item
            key={index}
            title={item.title}
            titleStyle={{ fontWeight: "bold" }}
            description={item.desc}
            left={() => <List.Icon icon={"target"} color={colors.color1} />}
          />
        ))}
      </View>
    </ScrollView>
    </View>
  );
};

export default AboutScreen;

const styles = StyleSheet.create({
  cardContent: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 15,
  },
  itemList: {
    padding: 15,
  },
});
