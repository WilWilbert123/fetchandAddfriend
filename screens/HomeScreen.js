import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchText, setSearchText] = useState("")
    const [filteredData, setFilteredData] = useState([])
    const [selectedItem, setSelectedItem] = useState(null)
    const [modalVisible, setModalVisible] = useState(false)
    const [selectedFriend, setSelectedFriend] = useState(null);

    const baseURL = 'https://jsonplaceholder.typicode.com';

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        setFilteredData(data);
    }, [data]);

    const fetchData = async () => {
        try {
            const response = await fetch(`${baseURL}/users`);
            const jsonData = await response.json();
            setData(jsonData);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setIsLoading(false);
        }
    };



    const handleSearch = (text) => {
        setSearchText(text);
        const filteredUsers = data.filter((user) => {
            const name = user.name.toLowerCase();
            return name.includes(text.toLowerCase());
        });

        setFilteredData(filteredUsers);

    };
    const openModal = (item) => {
        setSelectedItem(item);
        setModalVisible(true);
        setSelectedFriend(item)
    };



    const closeModal = () => {
        setModalVisible(false);
    };
    const addFriend = async () => {
        try {
          console.log("Selected Friend:", selectedFriend);
      
          const existingFriends = await AsyncStorage.getItem('data');
          let friendsArray = [];
      
          if (existingFriends) {
            friendsArray = JSON.parse(existingFriends);
          }
      
          friendsArray.unshift(selectedFriend); 
      
          await AsyncStorage.setItem('data', JSON.stringify(friendsArray));
          closeModal();
          console.log("Updated Friends Array:", friendsArray);
          const arrayLength = friendsArray.length;
          console.log("Array Length:", arrayLength);
        } catch (error) {
          console.error('Error adding friend:', error);
        }
      };
      
    const Friend = async () => {
        try {
          console.log("Selected Friend:", selectedFriend);
    
          const existingFriends = await AsyncStorage.getItem('data');
          let friendsArray = [];
    
          if (existingFriends) {
            friendsArray = JSON.parse(existingFriends);
          }
    
          friendsArray.push(selectedFriend);
    
          await AsyncStorage.setItem('data', JSON.stringify(friendsArray));
          closeModal();
          console.log("Updated Friends Array:", friendsArray);
          const arrayLength = friendsArray.length;
          console.log("Array Length:", arrayLength);
        } catch (error) {
          console.error('Error adding friend:', error);
        }
      };
    
      const navigation = useNavigation(); 
    
      const handleAddFriend = () => {
        navigation.navigate('AddFriendScreen');
      };


    return (
        <View style={styles.container}>

            <View style={{ marginBottom: -35, marginRight: 70, borderRadius: 15, borderColor: "black", borderWidth: 1, height: 40, justifyContent: "center" }}>

                <TextInput
                    value={searchText}
                    onChangeText={handleSearch} marginLeft={10} fontSize={18} placeholder='Search'></TextInput>

            </View>

            <TouchableOpacity style={{ marginLeft: 320 }} onPress={handleAddFriend}>
                <Ionicons name="person-add" size={40} color="black" />
            </TouchableOpacity>


            <ScrollView showsVerticalScrollIndicator={false}>
                {isLoading ? (
                    <Text>Loading...</Text>

                ) : (
                    filteredData.map((user, i) => (
                        <View key={i} style={{ borderColor: "black", borderRadius: 15, backgroundColor: '#FFFDD0', borderWidth: 1, marginVertical: 20 }}>
                            <TouchableOpacity onPress={() => openModal(user)}>
                                <View style={{ margin: 10 }}>
                                    <Text>Name: {user.name}</Text>
                                    <Text>Username: {user.username}</Text>
                                    <Text>Email: {user.email}</Text>
                                    <Text>Phone: {user.phone}</Text>
                                    <Text>Website: {user.website}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    ))
                )}
            </ScrollView>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={closeModal}
            >
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    {selectedItem && (
                        <View style={{ borderColor: "red", borderWidth: 1, borderRadius: 15, backgroundColor: "#FFE5B4", width: 330, height: 580 }}>
                            <Text style={styles.modalText}>Name: {selectedItem.name}</Text>
                            <Text style={styles.modalText}>Username: {selectedItem.username}</Text>
                            <Text style={styles.modalText}>Email: {selectedItem.email}</Text>
                            <Text style={styles.modalText}>Address:</Text>
                            <Text style={styles.modalText}>        Street: {selectedItem.address.street}</Text>
                            <Text style={styles.modalText}>        Suite: {selectedItem.address.suite}</Text>
                            <Text style={styles.modalText}>        city: {selectedItem.address.city}</Text>
                            <Text style={styles.modalText}>        zipcode: {selectedItem.address.zipcode}</Text>
                            <Text style={styles.modalText}>         geo:</Text>
                            <Text style={styles.modalText}>               lat: {selectedItem.address.geo.lat}</Text>
                            <Text style={styles.modalText}>               lng: {selectedItem.address.geo.lng}</Text>
                            <Text style={styles.modalText}>Phone: {selectedItem.phone}</Text>
                            <Text style={styles.modalText}>Website: {selectedItem.website}</Text>
                            <Text style={styles.modalText}>Company:</Text>
                            <Text style={styles.modalText}>    Name: {selectedItem.company.name}</Text>
                            <Text style={styles.modalText}>    catchPhrase: {selectedItem.company.catchPhrase}</Text>
                            <Text style={styles.modalText}>    bs: {selectedItem.company.bs}</Text>
                            <View style={{ flexDirection: "row" }}>
                                <TouchableOpacity style={{ backgroundColor: "#F9F6EE", borderRadius: 10, height: 25, width: 100, marginLeft: 50, alignItems: "center", borderWidth: 1, marginTop: 20, borderColor: "black" }} onPress={closeModal}>
                                    <Text style={{ fontWeight: "bold" }}>Close</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={addFriend} style={{ backgroundColor: "#F9F6EE", borderRadius: 10, height: 25, width: 100, marginLeft: 20, alignItems: "center", borderWidth: 1, marginTop: 20, borderColor: "black" }}>
                                    <Text style={{ fontWeight: "bold" }}>Add friend</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                </View>
            </Modal>
        </View>
    );
};

export default HomeScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
    },
    modalText: {
        marginLeft: 10,
        marginTop: 10,
        fontStyle: "italic"
    }
});


