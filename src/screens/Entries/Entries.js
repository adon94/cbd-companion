import React, { useEffect, useState, useRef } from 'react';
import {
  StyleSheet,
  Animated,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Platform,
  StatusBar,
  Text,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { getMoodsBySymptom, getSymptoms } from '../../api/database';
import { signOut } from '../../api/auth';

import Layout from '../../components/Layout';

import EntryItem from './EntryItem';
import SelectSymptom from './SelectSymptom';

const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
const screenWidth = Dimensions.get('window').width;

const HEADER_MAX_HEIGHT = 210;
const HEADER_MIN_HEIGHT = 60;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const Entries = ({ navigation }) => {
  const [moods, setMoods] = useState([]);
  const [symptomsList, setSymptomsList] = useState([]);
  const [symptomIndex, setSymptomIndex] = useState(0);
  const [titleWidth, setTitleWidth] = useState(0);

  useEffect(() => {
    async function fetchSymptoms() {
      const symptomsData = await getSymptoms();
      if (symptomsData && symptomsData.length > 0) {
        setSymptomsList(symptomsData);
        setSymptomIndex(0);
        fetchMoods(symptomsData[0].name);
      }
    }
    fetchSymptoms();
  }, []);

  async function fetchMoods(symptomName) {
    const moodData = await getMoodsBySymptom(symptomName);
    setMoods(moodData);
  }

  useEffect(() => {
    if (symptomsList.length > 0) {
      fetchMoods(symptomsList[symptomIndex].name);
    }
  }, [symptomIndex, symptomsList]);

  const logout = () => {
    signOut();
  };

  const scrollY = useRef(new Animated.Value(0)).current;
  // change header title size from 1 to 0.9
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });
  // change header title y-axis
  const titleTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -235],
    extrapolate: 'clamp',
  });
  const titleTranslateX = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, (screenWidth - titleWidth) / 4],
    extrapolate: 'clamp',
  });

  return (
    <Layout>
      <TouchableOpacity onPress={logout} style={styles.settingsButton}>
        <Ionicons name="person" size={30} color="#ffffff" />
      </TouchableOpacity>
      <Animated.View
        style={[
          styles.headerContainer,
          {
            transform: [{ translateY: titleTranslateY }],
          },
        ]}>
        <Animated.Text style={[styles.title, { opacity: headerOpacity }]}>
          My CBD Journey
        </Animated.Text>
        <Animated.View
          style={[
            {
              transform: [{ translateX: titleTranslateX }],
            },
          ]}>
          {symptomsList[symptomIndex] && (
            <SelectSymptom
              selected={symptomIndex}
              setSelected={setSymptomIndex}
              options={symptomsList}
              onLayout={(e) => {
                if (titleWidth === 0) {
                  console.log(e.nativeEvent.layout.width);
                  setTitleWidth(e.nativeEvent.layout.width);
                }
              }}
            />
          )}
        </Animated.View>
      </Animated.View>
      <SafeAreaView style={styles.container}>
        <Animated.FlatList
          ListHeaderComponent={() => <Text>This week graph</Text>}
          data={moods}
          renderItem={({ item }) => (
            <EntryItem
              item={item}
              navigation={navigation}
              symptomName={symptomsList[symptomIndex].name}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.flatList}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }], // event.nativeEvent.contentOffset.x to scrollX
            { useNativeDriver: true }, // use native driver for animation
          )}
        />
      </SafeAreaView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  settingsButton: {
    position: 'absolute',
    top: 40,
    right: 0,
    alignSelf: 'flex-end',
    margin: 20,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: HEADER_MIN_HEIGHT,
  },
  headerContainer: {
    marginTop: 85 + STATUS_BAR_HEIGHT,
    paddingHorizontal: 20,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    overflow: 'hidden',
    height: HEADER_MAX_HEIGHT,
    zIndex: 100,
  },
  title: {
    color: '#fff',
    fontSize: 60,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  flatList: {
    paddingTop: HEADER_MAX_HEIGHT + 25,
  },
});

export default Entries;
