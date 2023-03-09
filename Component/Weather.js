import { StyleSheet, Text, View} from "react-native";
import ShowIcon from "./Shared/ShowIcon";


export default function Weather ({forecast}){
    return (
        <View style={styles.container}>

            <Text>{forecast.hour}h</Text>
            <ShowIcon
                iconName = {forecast?.icon}
                resolution = {`2x`}
                size = {50}
            />

            <Text style={styles.temp}>{forecast.temp}°C</Text>
        </View>
    )
}


const styles = StyleSheet.create ({
    container:{
        backgroundColor: "white",
        height: 140,
        width: 75,
        paddingVertical:6,
        justifyContent:"center",
        alignItems: "center",
        marginRight: 10,
        borderRadius: 50,
    },
    temp: {
        fontSize: 18,
        fontWeight:700,
    }
})