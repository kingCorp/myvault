import { StyleSheet } from "react-native";

const styles: any = StyleSheet.create({
	container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        
      },
  btn: {
    backgroundColor: "#263238",
    alignItems: "center",
    marginTop:10,
    marginBottom:5
  },
  btnText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14
  },
  input: {
    //color: "white"
    marginBottom:5,
    borderBottomWidth:1,
    borderBottomColor: "#263238"
  },
  indicator: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      height: 80
    }
});
export default styles;
