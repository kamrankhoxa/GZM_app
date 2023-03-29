import React from "react";
import { View, StyleSheet, Image, ScrollView } from "react-native";
import { useEffect, useState } from "react";

import {
  Button,
  TextInput,
  Searchbar,
  BottomNavigation,
  Text,
} from "react-native-paper";
import axios from "axios";
import useAsyncStorage from "../services/useAsyncStorage";
import { useTheme } from "react-native-paper";
//computers cards
import ComputerCards from "./components/ComputerCards";
import AsyncStorage from '@react-native-async-storage/async-storage';
//time moment
import Moment from "react-moment";
import "moment-timezone";
import moment from "moment";
import { FAB } from 'react-native-paper';
import API from '../api/APIKit';
export default function DashboardScreen({ navigation }) {
  const [jwtAuth, updatejwtAuth, clearjwtAuth] = useAsyncStorage("@jwt:token");
  const [userData, updateuserData, clearuserData] = useAsyncStorage("userdata");
  const [computersData, setComputersData] = React.useState([]);
  // let moment = require('moment');

  const theme = useTheme();

  const _logout = () => {
    clearjwtAuth();
    clearuserData();
    navigation.replace("Login");
  };

  async function _getCurrentlogComputers() {
    // let token = await JSON.parse(jwtAuth);
    var data = await AsyncStorage.getItem("@jwt:token");
    var data = JSON.parse(data);
    await axios
      .get(API.url+':'+API.port+"/api/computers?populate=current_log", {
        headers: { Authorization: `Bearer ${data}` },
      })
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setComputersData(response.data.data);
        // setCComputersData(response.data.data.attributes.current_log.attributes.data);
      })
      .catch((err) => console.log("error " + err));
  }
  function _getTimeout(e){
    if(e){
    var now = new Date().toDateString();
      var remaining = moment(e).format("MMMM Do YYYY, h:mm:ss a");
      now = moment().format("MMMM Do YYYY, h:mm:ss a");
      let diff = moment(remaining, "MMMM Do YYYY, h:mm:ss a").diff(
        moment(now, "MMMM Do YYYY, h:mm:ss a")
      );
      let duration = moment.duration(diff);
      let result = duration.format("ss");
      result = (parseInt(result.replace(/,/g, "")));
      if(result<= 0){
        return null;
      }else{
      return result;
    }
    }else{
      return null;
    }
  }
  function _getTimestart(e,timeout){
    if(e){
      return moment(e).format("MMMM Do YYYY, h:mm:ss a");
    }else{
      return null;
    }
  }
  function _getprice(e){
    if(e){
      return e;
    }else{
      return null;
    }
  }
  useEffect(() => {
    Promise.all(_getCurrentlogComputers()).catch((err) =>
      console.log("error " + err)
    );
  }, []);

  return (
    <>
      <View style={{ marginTop: 25 }}>
        <Text>Welcome Mr/Mrs </Text>
        <Button
          buttonColor={theme.colors.onPrimary}
          icon="account"
          textColor={theme.colors.primary}
          mode="contained"
          onPress={_logout}
        >
          Logout
        </Button>
      </View>
      <ScrollView
        vertical={true}
        showsverticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 8 }}
      >
      {computersData&&computersData.map(({ id, attributes }) => (
        <ComputerCards
          key={`CC-${id}`}
          id={parseInt(id)}
          title={attributes?.name}
          // {.map(({ id, attributes }) => (
            // price={attributes.current_log.data.attributes.price}
            price={_getprice(attributes?.current_log?.data?.attributes?.price)}
            reservations_start={_getTimestart(attributes?.current_log?.data?.attributes?.reservations_start)}
            reservations_end={_getTimeout(attributes?.current_log?.data?.attributes?.reservations_end)}
            
          // ))}
        />

      ))}
      </ScrollView>
      <FAB
    icon="plus"
    mode='elevated'
    style={{position: 'absolute',
    backgroundColor: theme.colors.primary,
    margin: 16,
    right: 0,
    bottom: 0,}}
    color={theme.colors.onPrimary}
   
    onPress={() => alert('Coming Soon')}
  />
    </>
  );
}

const styles = StyleSheet.create({
  
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  paragraph: {
    margin: 24,
    marginTop: 0,
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  logo: {
    height: 128,
    width: 128,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
