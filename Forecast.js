import {ScrollView, StyleSheet, Text, View} from "react-native";
import {useEffect, useState} from "react";
import {format} from "date-fns"
import {fr} from "date-fns/locale"
import Weather from "./Weather";


export default function Forecast ({data}) {
const [forecasts, setForecasts] = useState([])

  useEffect(() => {
      //j'enlève la première prévision qui est déjà affichée dans currentweather
        data.list.splice(0,1);
        const forecastsData = data.list.map(f => {
            const dt =  new Date(f.dt*1000)
           return ({
               date : dt,
               hour: dt.getHours(),
               temp: Math.round(f.main.temp),
               icon: f.weather[0].icon,
               name: format(dt,"EEEE", {locale:fr})
           })
        })
      //logique pour grouper les éléments par journée
     let days = forecastsData.map(f =>{
         return (f.name)
     })
      let daysGrouped = days.filter((day, index, tableau) =>{
              return tableau.indexOf(day) === index
      } )

      let forecastsgrouped = daysGrouped.map(d =>{
         const datas = forecastsData.filter(e => e.name === d);
         return ({
             day: d,
             data: datas
         })
      })

      forecastsgrouped[0].day = "Aujourd'hui";
      forecastsgrouped[1].day = "Demain";
      console.log("forecastsgrouped",forecastsgrouped);
        setForecasts (forecastsgrouped);
    },[data])

    return (
        <ScrollView
            contentContainerStyle={styles.scrollContainer}
            horizontal={true}
            showsHorizontalScrollIndicator={true}
            style = {styles.scroll}>
            {forecasts.map((f,index) => (
                <View key={index} style={ {backgroundColor:'rgba(255,255,255,0.4)',marginBottom:50,flex:1,marginHorizontal:5}}>
                    <Text style = {styles.day}>{f.day.toUpperCase()}</Text>
                    <View style = {styles.container}>
                    {f.data.map((d,index) => (
                            <Weather key={index} forecast = {d}/>
                            ))
                    }
                    </View>
                </View>
            ))}
        </ScrollView>
    )
}


const styles = StyleSheet.create ({
    scroll:{
        flex:1,
        width:'100%',
        height:'35%'
    },
    /*scrollContainer: {
        width: '300%',
        height: '100%',
    },*/
    day:{
        fontSize:16,
        fontWeight:"700",
        marginBottom:10,
        marginLeft:5
    },
    container:{
    flexDirection:"row",
        marginLeft:5,
        marginRight:15
    }
})