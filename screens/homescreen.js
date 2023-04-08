import * as React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Header } from 'react-native-elements';
import dictionary from '../database'


export default class HomeScreen extends React.Component {
  constructor(){
    super()
    this.state={
    text: '', 
    isSearchedPressed: false,
    word: '',
    lexicalCategory: '',
    examples: [],
    definition: ""
    }
  }
  getWord=(text)=>{
    text=text.toLowerCase()
    try{
        var word =dictionary[text]["word"]
        var lexicalCategory= dictionary[text]["lexicalCategory"]
        var definition= dictionary[text]["definition"]
        this.setState({
              "word": word,
              "definition": definition,
              "lexicalCategory": lexicalCategory
        })
          }
    catch(err){
            this.setState({
            "word": text,
            "definition": "Not Found",
            "lexicalCategory": "Not Found"
          })
      
    }
  }
  



  render() {
    return (
      <View style={styles.container}>
      <Header
      backgroundColor="blue"
      centerComponent={{
        text: 'Dictionary', 
        style: {color: 'white', fontSize: 20}
      }}
      />

    <TextInput
    style={styles.inputBox}
      onChangeText={(text)=>{
        this.setState({
            text:text,
            isSearchedPressed: false,
            word: "Loading... ",
            lexicalCategory: "Loading... ",
            examples :[],
            definition: "Loading... "
        })
      }}
      value={this.state.text}
    />

      <TouchableOpacity style= {styles.searchButton}
      onPress= {()=>{
        this.setState({isSearchedPressed: true})
        this.getWord(this.state.text)
      }}>
      <Text style={{color: "white", fontSize: 20}}>Go</Text>
      </TouchableOpacity>



        <View style={{flexDirection: 'row',flexWrap: 'wrap'}}>
      <Text style={styles.detailsTitle}>Word:{""}</Text>
      <Text style={styles.detailsText}>{this.state.word}</Text>
       </View> 
        <View style={{flexDirection: 'row',flexWrap: 'wrap', marginTop: 50}}>
      <Text style={styles.detailsTitle}>Type:{""}</Text>
        <Text style={styles.detailsText}>{this.state.lexicalCategory}</Text> 
       </View> 
  <View style={{flexDirection: 'row',flexWrap: 'wrap', marginTop: 50}}>
          <Text style={styles.detailsTitle}>Definition: {""}</Text>
          <Text style={styles.detailsText}>{this.state.definition}</Text>
      </View> 
      </View>
    );
  }
}

const styles = StyleSheet.create({
 container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  inputBox: {
    width: '80%',
    height: 50,
    marginTop: 100,
    alignSelf: 'center',
    textAlign:'center',
    borderWidth: 2,
    backgroundColor: 'white'
  },
  searchButton:{
    width: 150,
    height: 30,
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 50,
    backgroundColor: 'blue',
    borderRadius: 25

  },
  detailsText:{
    fontSize: 18,
    color: 'black',
    textAlign:'center',
    marginTop: 15,
    marginLeft: 5
  },
  detailsTitle: {
    fontSize: 32,
    textAlign: 'center',
    color: 'black', 
    marginTop: 5,
    marginLeft: 5
  }

});
