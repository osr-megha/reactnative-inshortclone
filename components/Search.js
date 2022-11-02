import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, {useContext, useState} from 'react'
import { NewsContext } from '../API/Context'
import { Entypo } from '@expo/vector-icons'; 
import SingleNews from './SingleNews';

const Search = () => {

 const [searchResults, setSearchResults] = useState([]);
 const [modalVisible, setModalVisible] = useState(false);
 const [currentNews, setCurrentNews] = useState();

 
 const handleModal = (n) => {
    setModalVisible(true);
    setCurrentNews(n);
 }

    const {
        news:{articles},
        darkTheme,
    } = useContext(NewsContext);

    const handleSearch = (text) =>{
        if(!text){
            setSearchResults([]);
            return;
        }
        setSearchResults(articles.filter((query) => query.title.includes(text)));
    }

  return (
    <View style={{width:'100%', position:'relative'}}>
      <TextInput 
      style={{
        ...styles.search, 
        backgroundColor:darkTheme ? 'black' : 'lightgrey' ,
        color: darkTheme ? 'white' : 'black' }}
        onChangeText = {(text) => handleSearch(text)}
        placeholder='Search for news'
        placeholderTextColor={darkTheme ? 'white' : 'grey'}
        />

        <View style={styles.searchResults}>
        {
            searchResults.slice(0,10).map((n)=>(
                <TouchableOpacity
                key={n.title}
                activeOpacity={0.7}
                onPress={() => handleModal(n)}
                >
                <Text
                style={{...styles.singleResult, backgroundColor:darkTheme ? 'black' : 'white', color:darkTheme ? 'white' : 'black'}}
                >{n.title}</Text>
                </TouchableOpacity>
            ))
        }
        </View>
        {/** place for modal */}
        <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={()=>{
            setModalVisible(!modalVisible);
        }}
        >
        <TouchableOpacity
        onPress={()=>setModalVisible(!modalVisible)}
        style={{
            position:'absolute',
            zIndex:2,
            right:0,
            margin:20,
            marginTop:50,
        }}
        >
        <Entypo name="circle-with-cross" size={30} color="white" />
        </TouchableOpacity>
        <View style={{height:'100%', transform:[{scaleY:-1}]}}>
        <SingleNews item={currentNews} />
        </View>
        </Modal>
    </View>
  );
}

export default Search

const styles = StyleSheet.create({
    search:{
    paddingHorizontal:15,
    paddingVertical:10,
    borderRadius:10,
    fontSize:15,
    marginBottom:15,
},
searchResults:{
    position:'absolute',
    zIndex:1,
    top:50,
},
singleResult:{
borderRadius:5,
padding:10,
margin:0.5,
shadowColor:'black',
elevation:5,
},

})