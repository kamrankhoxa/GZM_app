import React from "react";
import { View, StyleSheet, Image, ScrollView, FlatList } from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button, TextInput, Searchbar } from "react-native-paper";
import { BottomNavigation, Text, Card , Title ,Paragraph  } from "react-native-paper";
// import APIKit, { setClientToken, cleartoken } from "../../api/APIKit";
import useAsyncStorage from "../../services/useAsyncStorage";

export const NewsFeed = (props) => {
  const [NewsFeedData, setNewsFeedData] = React.useState([]);
  useEffect(() => {
    console.log(props.data);
    setNewsFeedData(props.data);
  }, [props.data]);

  return (
    <>
      <ScrollView vertical={true} showsverticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 130}}>
        {/* {NewsFeedData?.map(({ id, attributes }) => ( */}
        <Card>
          <Card.Cover
            source={{
              uri: "https://international.lgu.edu.pk/wp-content/uploads/2021/08/cropped-logo-1-453x172.png",
            }}
          />
          <Card.Content>
            <Paragraph>A BSIT Project Under Processing</Paragraph>
          </Card.Content>
          <Card.Actions>
            <Button>Add To Favourites</Button>
          </Card.Actions>
        </Card>
        <Card>
          <Card.Cover
            source={{
              uri: "https://international.lgu.edu.pk/wp-content/uploads/2021/08/cropped-logo-1-453x172.png",
            }}
          />
          <Card.Content>
            <Paragraph>A BSIT Project Under Processing</Paragraph>
          </Card.Content>
          <Card.Actions>
            <Button>Add To Favourites</Button>
          </Card.Actions>
        </Card>
        <Card>
          <Card.Cover
            source={{
              uri: "https://international.lgu.edu.pk/wp-content/uploads/2021/08/cropped-logo-1-453x172.png",
            }}
          />
          <Card.Content>
            <Paragraph>A BSIT Project Under Processing</Paragraph>
          </Card.Content>
          <Card.Actions>
            <Button>Add To Favourites</Button>
          </Card.Actions>
        </Card>
        {/* ))} */}
      </ScrollView>
    </>
  );
};
