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
} from 'react-native';
import {Header} from 'react-native-elements';
import db from '../config';
import firebase from 'firebase';

export default class WriteStoryScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      titleOfStory: '',
      authorOfStory: '',
      storyInput: '',
    };
  }

  submitStory = async () => {
    db.collection('story').add({
      author: this.state.authorOfStory,
      title: this.state.titleOfStory,
      story: this.state.storyInput,
    });
  };
  render() {
    return (
      <View>
        <KeyboardAvoidingView>
          <Header
            backgroundColor={'#007bff'}
            centerComponent={{
              text: 'Write Your Story',
              style: { color: 'azure', fontSize: 20 },
            }}
          />
          <TextInput
            style={styles.titleInput}
            placeholder="Title"
            onChangeText={(text) => {
              this.setState({
                titleOfStory: text,
              });
            }}
          />
          <TextInput
            style={styles.authorInput}
            placeholder="Author"
            onChangeText={(text) => {
              this.setState({
                authorOfStory: text,
              });
            }}
          />
          <TextInput
            style={styles.storyInput}
            placeholder="Type your story here"
            multiline={true}
            onChangeText={(text) => {
              this.setState({
                storyInput: text,
              });
            }}
          />
          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => {
              ToastAndroid.show(
                'Story Submitted Successfully',
                ToastAndroid.SHORT
              );
              this.submitStory();
            }}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  titleInput: {
    width: 250,
    height: 40,
    borderWidth: 1.5,
    fontSize: 20,
    margin: 10,
    paddingLeft: 10,
    borderColor: 'yellow',
  },
  authorInput: {
    width: 250,
    height: 40,
    borderWidth: 1.5,
    fontSize: 20,
    margin: 10,
    paddingLeft: 10,
    borderColor: 'teal',
  },
  storyInput: {
    width: 800,
    height: 200,
    borderWidth: 1.5,
    fontSize: 20,
    margin: 10,
    paddingLeft: 10,
    borderColor: 'orange',
  },
  submitButton: {
    backgroundColor: '#FBC02D',
    width: 100,
    height: 50,
    display:"flex",
    align:"center",
  },
  submitButtonText: {
    padding: 10,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
});
