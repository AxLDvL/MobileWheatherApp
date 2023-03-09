import {Image,StyleSheet} from "react-native";


export default function ShowIcon ({iconName, resolution, size}){
    let IconUrl =  `http://openweathermap.org/img/wn/${iconName}@${resolution}.png`

        return (
            <Image source = {{uri: IconUrl }}
            style = {[styles.icon, {width: size,height:size}]}
            />
            )
}

const styles = StyleSheet.create ({
    icon: {
        backgroundColor:'rgba(255,255,255,0.4)',
        borderRadius:90,
        marginTop:30

    }
}
)

