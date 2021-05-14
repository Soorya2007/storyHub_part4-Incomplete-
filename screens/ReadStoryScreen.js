import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  Alert,
  ToastAndroid,
  FlatList
} from 'react-native';
import {Header,SearchBar} from 'react-native-elements';
import db from '../config';
import firebase from 'firebase';

export default class ReadStoryScreen extends React.Component {
  constructor(){
    super();
    this.state={
      allTitles:'',
      search:'',
      lastTitle:'',
      author:'',
      title:'',
      story:''
    }
  }
  updateSearch=(search)=>{
    this.setState({search})
  }
      fetchMoreTitles = async ()=>{
      var text = this.state.search.toUpperCase()
      var enteredText = text.split("")

      
      if (enteredText[0].toUpperCase() === this.state.author){
      const query = await db.collection("transactions").where('author','==',text).startAfter(this.state.lastTitle).limit(10).get()
      query.docs.map((doc)=>{
        this.setState({
          allTitles: [...this.state.allTitles, doc.data()],
          lastTitle: doc
        })
      })
    }
      else if(enteredText[0].toUpperCase() === this.state.title){
        const query = await db.collection("story").where('title','==',text).startAfter(this.state.lastTitle).limit(10).get()
        query.docs.map((doc)=>{
          this.setState({
            allTitles: [...this.state.allTitles, doc.data()],
            lastTitle: doc
          })
        })
      }
  }
  SearchTitles= async(text) =>{
      var enteredText = text.split("")  
      if (enteredText[0].toUpperCase() ===db.collection("story").title){
        const title =  await db.collection("story").where('title','==',text).get()
        title.docs.map((doc)=>{
          this.setState({
            allTitles:[...this.state.allTitles,doc.data()],
            lastTitle: doc
          })
        })
      }
      else if(enteredText[0].toUpperCase() === db.collection("story").author){
        const author = await db.collection('story').where('author','==',text).get()
        author.docs.map((doc)=>{
          this.setState({
            allTitles:[...this.state.allTitles,doc.data()],
            lastTitle: doc
          })
        })
      }
    }

    componentDidMount = async ()=>{
      const query = await db.collection("allStories").limit(10).get()
      query.docs.map((doc)=>{
        this.setState({
          allTitles: [],
          lastTitle: doc
        })
      })
    }
  render(){
    return(
  <View style={styles.container}>
          <View style={styles.searchBar}>
        <TextInput 
          style ={styles.bar}
          placeholder = "Enter Story or Author Name"
          onChangeText={(text)=>{this.setState({search:text})}}/>
          <TouchableOpacity
            style = {styles.searchButton}
            onPress={()=>{this.SearchTitles(this.state.search)}}
          >
            <Text>Search</Text>
          </TouchableOpacity>
          </View>
        <FlatList
          data={this.state.allTitles}
          renderItem={({item})=>(
            <View style={{borderBottomWidth: 2}}>
              <Text>{"Title: " + item.title}</Text>
              <Text>{"Author: " + item.author}</Text>
              <Text>{"Story: " + item.story}</Text>
              <Text>{"Date: " + item.date.toDate()}</Text>
            </View>
          )}
          keyExtractor= {(item, index)=> index.toString()}
          onEndReached ={this.fetchMoreTitles}
          onEndReachedThreshold={0.7}
        /> 
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 20
    },
    searchBar:{
      flexDirection:'row',
      height:40,
      width:'auto',
      borderWidth:0.5,
      alignItems:'center',
      backgroundColor:'grey',
  
    },
    bar:{
      borderWidth:2,
      height:30,
      width:300,
      paddingLeft:10,
    },
    searchButton:{
      borderWidth:1,
      height:30,
      width:50,
      alignItems:'center',
      justifyContent:'center',
      backgroundColor:'green'
    }
  })
