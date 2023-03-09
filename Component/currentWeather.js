import {StyleSheet, Text, View} from "react-native";
import {useEffect, useState} from "react";
import ShowIcon from "./Shared/ShowIcon";


export default function CurrentWeather ({data}) {
    const [currentWeather,setCurrentWeather] = useState(null)

    useEffect(() => {
        /*const currentW = data.list.filter(forecast => {
            const today =  new Date().getTime() + Math.abs(data.city.timezone*1000)
            const forecastDate = new Date(forecast.dt * 1000);
            return isSameDay(today,forecastDate)
        })*/

        let currentW = data.list;
        const forecasthour= () =>{

            let dateTime =  new Date(currentW[0].dt*1000);
           // format(dateTime,"p", {locale:fr})
            let h =dateTime.getHours();
            h<10? h = "0"+h.toString(10): h = h.toString(10);
            let m =dateTime.getMinutes();
            m<10? m = "0"+m.toString(10): m = m.toString(10);

         return h+":"+m
        };
        currentW[0].hourly = forecasthour();
        setCurrentWeather(currentW[0]);
        console.log("today",currentW[0])
    },[data])

    return (
        <View
        style = {styles.container}>
            <Text style = {styles.city} >{data?.city?.name}</Text>
            <Text style = {styles.today}>Aujourd'hui à {currentWeather?.hourly}</Text>
            <ShowIcon
                iconName = {currentWeather?.weather[0].icon}
                resolution = {`4x`}
                size = {150}
            />
            <Text style = {styles.temp}>{Math.round(currentWeather?.main.temp)}°C</Text>
            <Text style = {styles.description}>{currentWeather?.weather[0].description}</Text>
        </View>
    )
}

const COLOR = "#fff"

const styles = StyleSheet.create ({
    city: {
        fontSize: 36,
        fontWeight: "500",
        color: COLOR
    },
    bigIcon:{
        width: 150,
        height: 150,
        marginVertical: 20
    },
    today:{
        fontSize: 24,
        fontWeight: "300",
        color: COLOR
    },
    temp: {
        fontSize: 80,
        fontWeight: "300",
        color: COLOR
    },
    description: {
        fontSize: 24,
        fontWeight: "700",
        color: COLOR,
    },
    container:{
        marginTop: 60,
        alignItems:"center",
        height: "65%"
    }

})