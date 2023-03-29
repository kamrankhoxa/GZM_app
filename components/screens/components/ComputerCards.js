import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView } from "react-native";

import {
  Card,
  CardImage,
  CardTitle,
  CardContent,
  CardAction,
} from "react-native-card-view";

// import Moment from "react-moment";
// import "moment-timezone";
// import moment from "moment";
import { useNavigation } from "@react-navigation/native";

import {
  Button,
  TextInput,
  Searchbar,
  BottomNavigation,
  Text,
} from "react-native-paper";
import CountDown from "react-native-countdown-component";
import { useTheme } from "react-native-paper";
export default function ComputerCards(props) {
  const navigation = useNavigation();
  const theme = useTheme();
  useEffect(()=>{
    console.log(props?.price);
  })
  const [counterData, setCounterData] = React.useState(null);
  const CountDownComponent = () => {
    if (props.reservations_end) {
      return (
        <>
          <CountDown
            style={{ flex:0.2, height: 60, backgroundColor: "transparent" }}
            // id={props?.id}
            until={props?.reservations_end}
            size={20}
            digitStyle={{ backgroundColor: `${theme.colors.primary}` }}
            digitTxtStyle={{ color: `${theme.colors.onPrimary}` }}
            timeToShow={["H", "M", "S"]}
            timeLabels={{ d: "Days", h: "Hours", m: "Minutes", s: "Seconds" }}
            onFinish={() => alert("finished")}
            onChange={(e)=>{setCounterData(e)}}
            onPress={() => alert(props?.title)}
          />
        </>
      );
    } else {
      return <Text style={{ fontSize: 28 }}>This computer is free now!</Text>;
    }
  };
  const PriceComponent = () => {
    if (props.price && props.reservations_end) {
      // console.log(props.price)
      return <Text>Price: {props?.price} Rps</Text>;
    } else if (!props.reservations_end) {
      return <Text>Last Price: {props?.price} Rps</Text>;
    }
  };

  const ReserveComponent = () => {
    if (props.reservations_start && props.reservations_end) {
      return (
        <>
          <Text>Reserve On: {props?.reservations_start}</Text>
          <Button style={styles.button} onPress={() => {}}>
            TimeOut!
          </Button>
        </>
      );
    } else if (!props.reservations_end) {
      return (
        <>
          <Text>Last Reserved: {props?.reservations_start}</Text>
          <Button style={styles.button} onPress={() => {}}>
            Reserve Now!
          </Button>
        </>
      );
    }
  };

  const card = { card: { width: -1, height: 210 } };
  return (
    <>
      <Card styles={card}>
        <CardTitle>
          {/* <Text style={styles.title}>Name: </Text> */}
          <Button
            labelStyle={{ fontSize: 18 }}
            mode="contained-tonal"
            buttonColor={theme.colors.primary}
            textColor={theme.colors.onPrimary}
            style={styles.button_title}
            contentStyle={{flexDirection: 'row-reverse', textAlignVertical:'center'}}
            onPress={() => {
              navigation.navigate("SingleComputer", {
                name: `History of ${props?.title}`,
                itemId: props?.id,
              });
            }}
          >
            {props?.title}
          </Button>
        </CardTitle>
        <CardContent>{CountDownComponent()}</CardContent>
        {PriceComponent()}
        <CardAction>{ReserveComponent()}</CardAction>
      </Card>
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    backgroundColor: "transparent",
  },
  button_title: {
    textAlignVertical:"center",
    textAlign:"center",
    flex:0.15,
    width:15,
    height:36,
    marginRight: 10,
  },
  button: {
    marginRight: 10,
  },
});
