import { StyleSheet } from "react-native";

const styles: any = StyleSheet.create({
	container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF', 
      },
  btn: {
    backgroundColor: "#263238",
    alignItems: "center",
    marginTop:10,
    marginBottom:5
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    
  },
  input: {
    //color: "white"
    marginBottom:5,
    borderBottomWidth:1,
    borderBottomColor: "#263238"
  }
});
export default styles;
