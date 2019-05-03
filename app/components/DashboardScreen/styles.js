import { StyleSheet, Dimensions } from "react-native";

const ITEM_WIDTH = Dimensions.get("window").width;
const styles: any = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        height:80,
        backgroundColor: "#263238",
        borderBottomColor: "white",
        borderBottomWidth: 5,
        marginBottom: 2
    },
    gridcont: {
        flex:1,
        width:(ITEM_WIDTH-30)/2,
        height: "100%",
    },
});
export default styles;
