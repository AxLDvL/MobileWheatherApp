
import {StatusBar, ActivityIndicator, StyleSheet, Text, View, ImageBackground} from 'react-native';
import {useEffect, useState} from "react";
import * as Location from "expo-location";
import CurrentWeather from "./Component/currentWeather";
import Forecast from "./Component/Forecast";

const API_URL = (lat , lon) => `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=1989238b331f6165f5602ceb0709ebdf&units=metric&lang=fr`

export default function App() {
  // récupérer les coordonnées utilisateurs
  const [data, setData] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCoordinates = async () => {
      const {status} = await Location.requestForegroundPermissionsAsync();
      if (status !=="granted"){
        setErrorMsg('Permission to access location was denied');
        return;
      }
      let userLocation = await Location.getCurrentPositionAsync({});

      console.log("userLocation",userLocation);
      getWeather(userLocation );
    }
    getCoordinates();

  }, [])

  //réaliser les requêtes
  // ville
  const getWeather = async (location) => {
    try{
      const response = await fetch(API_URL(location.coords.latitude, location.coords.longitude));
      const dataResp = await response.json()
      setData(dataResp);
      setLoading(false);

      //console.log("dataResp",dataResp);
    } catch (e) {
      setErrorMsg("une erreur s'est produite lors de l'identification de votre ville."+e)
    }
  }

      if(loading){
        return  (
            <View style={styles.container}>
              {errorMsg && <Text style={styles.paragraph}>errorMsg</Text>}
            <ActivityIndicator />
            </View>)
      }return (
      <View style={styles.container}>

        <ImageBackground source={require('./assets/tree.jpg')} resizeMode="cover" style={styles.image}>
        <StatusBar style="auto" />
          <CurrentWeather data = {data} />

          <Forecast data = {data} />

        </ImageBackground>
      </View>)
  ;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

  },
  title:{
    fontWeight:"bold",
    fontSize:40,
  },
  paragraph:{
    fontWeight:"normal",
    fontSize:12,
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  }
});
