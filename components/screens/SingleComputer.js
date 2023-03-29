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
import AsyncStorage from "@react-native-async-storage/async-storage";
//time moment
import Moment from "react-moment";
import "moment-timezone";
import moment from "moment";

import { DataTable } from "react-native-paper";
import API from '../api/APIKit';
export default function SingleComputer({ navigation, route }) {
  const { itemId } = route.params;
  const [computersData, setComputersData] = React.useState([]);
  const [logsData, setLogsData] = React.useState([]);

  async function _getLogsComputer() {
    // let token = await JSON.parse(jwtAuth);
    var data = await AsyncStorage.getItem("@jwt:token");
    var data = JSON.parse(data);
    await axios
      .get(
        API.url+':'+API.port+`/api/computers/${itemId}/?populate[logs]=*`,
        {
          headers: { Authorization: `Bearer ${data}` },
        }
      )
      .then((response) => {
        console.log(JSON.stringify(response.data.data));
        setComputersData(response.data.data);
        //logs
        console.log(JSON.stringify(response.data.data.attributes.logs.data));
        setLogsData(response.data.data.attributes.logs.data);
        // setCComputersData(response.data.data.attributes.current_log.attributes.data);
      })
      .catch((err) => console.log("error " + err));
  }
  useEffect(() => {
    Promise.all(_getLogsComputer()).catch((err) => console.log("error " + err));
  }, []);

  function _getTimeout(e) {
    if (e) {
      var now = new Date().toDateString();
      var remaining = moment(e).format("MMMM Do YYYY, h:mm:ss a");
      now = moment().format("MMMM Do YYYY, h:mm:ss a");
      let diff = moment(remaining, "MMMM Do YYYY, h:mm:ss a").diff(
        moment(now, "MMMM Do YYYY, h:mm:ss a")
      );
      let duration = moment.duration(diff);
      let result = duration.format("ss");
      result = parseInt(result.replace(/,/g, ""));
      return remaining;
    }
  }
  function _getTimestart(e, timeout) {
    if (e) {
      return moment(e).format("MMMM Do YYYY, h:mm:ss a");
    } else {
      return null;
    }
  }

  const MyComponent = (props) => <></>;

  return (
    <>
      <View style={{ width: "99%", alignSelf: "center" }}>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title sortDirection="ascending">ID</DataTable.Title>
            <DataTable.Title style={{ flex: 3 }}>Start</DataTable.Title>
            {/* <DataTable.Title>End</DataTable.Title> */}
            <DataTable.Title>Price</DataTable.Title>
            <DataTable.Title>Note</DataTable.Title>
          </DataTable.Header>
          {logsData &&
            logsData.map(({ id, attributes }) => (
              <DataTable.Row key={id}>
                <DataTable.Cell style={{ flex: 0.3 }}>
                  {parseInt(id)}
                </DataTable.Cell>
                <DataTable.Cell style={{ flex: 1 }}>
                  {_getTimeout(attributes.reservations_start)}
                </DataTable.Cell>
                {/* <DataTable.Cell>
                  {_getTimeout(attributes.reservations_end)}
                </DataTable.Cell> */}
                <DataTable.Cell style={{ flex: 0.3 }}>{attributes.price}</DataTable.Cell>
                <DataTable.Cell style={{ flex: 0.4 }}>
                  {attributes.note}
                </DataTable.Cell>
              </DataTable.Row>
            ))}
        </DataTable>
      </View>
      {/* {logsData&&logsData.map(({ id, attributes }) => (
    <MyComponent key={id} id={id} price={attributes.reservations_start} start={attributes.reservations_end} end={attributes.price} note={attributes.note}></MyComponent>
    ))} */}
    </>
  );
}
