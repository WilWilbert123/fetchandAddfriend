import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddFriendScreen = () => {
    const [friendsArray, setFriendsArray] = useState([]);

    useEffect(() => {
        getFriendsData();
    }, []);

    const getFriendsData = async () => {
        try {
            const friendsData = await AsyncStorage.getItem('data');

            if (friendsData) {
                const parsedFriendsData = JSON.parse(friendsData);
                setFriendsArray(parsedFriendsData);
            }
        } catch (error) {
            console.error('Error fetching friends data:', error);
        }
    };
    const unfollowFriend = async (index) => {
        try {
          const updatedFriendsArray = [...friendsArray];
          updatedFriendsArray.splice(index, 1);
          await AsyncStorage.setItem('data', JSON.stringify(updatedFriendsArray));
          setFriendsArray(updatedFriendsArray);
        } catch (error) {
          console.error('Error removing friend:', error);
        }
      };

    return (
        <View style={{ marginLeft: 10, marginRight: 20, marginTop: 10}}>
            <ScrollView showsVerticalScrollIndicator={false} >
                {friendsArray.map((friend, index) => (
                    <View key={index} style={{ borderWidth: 1, marginBottom: 10, borderRadius:15,backgroundColor:"#FFFDD0"}}>
                        <View style={{margin:8 }}>
                            <Text>Name: {friend && friend.name}</Text>
                            <Text>Username: {friend && friend.username}</Text>
                            <Text>Email: {friend && friend.email}</Text>
                            <Text>Phone: {friend && friend.phone}</Text>
                            <Text>Website: {friend && friend.website}</Text>
                            <TouchableOpacity onPress={() => unfollowFriend(index)}>
                                <View style={{backgroundColor:"orange",marginLeft:270, borderWidth:1,borderColor:"black", alignItems:"center",borderRadius:10}}>
                                <Text>Unfollow</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

export default AddFriendScreen;
