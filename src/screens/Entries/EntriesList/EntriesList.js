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
import { useSelector, useDispatch } from 'react-redux';

import { signOut } from '../../../api/auth';
import { fetchSymptomsWithMoods } from '../../../reducers/symptomsReducer';

import Layout from '../../../components/Layout';

import EntryItem from '../../../components/Entries/EntryItem';
import SelectSymptom from '../../../components/Entries/SelectButton';
import HomeGraph from '../../../components/Entries/HomeGraph';
import LoadingScreen from '../../LoadingScreen';
import LinearGradient from 'react-native-linear-gradient';

const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const HEADER_MAX_HEIGHT = 210;
const HEADER_MIN_HEIGHT = 60;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const Entries = ({ navigation }) => {
  const viewingSymptom = useSelector((state) => state.viewingSymptom);
  const symptoms = useSelector((state) => state.symptoms.symptoms);
  const moods = useSelector((state) => state.moods.moods);

  const symptomsStatus = useSelector((state) => state.symptoms.status);
  const moodsStatus = useSelector((state) => state.moods.status);

  const dispatch = useDispatch();

  const [titleWidth, setTitleWidth] = useState(0);
  const [headingHeight, setHeadingHeight] = useState(0);

  useEffect(() => {
    dispatch(fetchSymptomsWithMoods());
  }, [dispatch]);

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
    outputRange: [0, -headingHeight],
    extrapolate: 'clamp',
  });
  const titleTranslateX = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, (screenWidth - titleWidth - 40) / 2],
    extrapolate: 'clamp',
  });

  if (symptomsStatus === 'loading' || moodsStatus === 'loading') {
    return <LoadingScreen />;
  }

  return (
    <Layout>
      <TouchableOpacity onPress={logout} style={styles.settingsButton}>
        {/* <Ionicons name="person" size={30} color="#ffffff" /> */}
        <Text style={styles.logout}>Log out</Text>
      </TouchableOpacity>
      <Animated.View
        style={[
          styles.headerContainer,
          {
            transform: [{ translateY: titleTranslateY }],
          },
        ]}
        onLayout={(e) => {
          if (headingHeight === 0) {
            setHeadingHeight(e.nativeEvent.layout.height);
          }
        }}>
        <Animated.Text style={[styles.title, { opacity: headerOpacity }]}>
          My CBD Journal
        </Animated.Text>
        <Animated.View
          style={[
            {
              transform: [{ translateX: titleTranslateX }],
            },
          ]}>
          {symptoms[viewingSymptom] && (
            <SelectSymptom
              onPress={() => navigation.navigate('SelectSymptom')}
              onLayout={(e) => {
                if (titleWidth === 0) {
                  setTitleWidth(e.nativeEvent.layout.width);
                }
              }}>
              {symptoms[viewingSymptom].displayName}
            </SelectSymptom>
          )}
        </Animated.View>
      </Animated.View>
      <SafeAreaView style={styles.container}>
        <Animated.FlatList
          ListHeaderComponent={() => <HomeGraph moods={moods} />}
          data={moods}
          renderItem={({ item }) => (
            <EntryItem
              item={item}
              navigation={navigation}
              symptomName={symptoms[viewingSymptom].displayName}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.flatList}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }], // event.nativeEvent.contentOffset.x to scrollX
            { useNativeDriver: true }, // use native driver for animation
          )}
        />
        <LinearGradient style={styles.fade} colors={['#a8e06300', '#a8e063']} />
      </SafeAreaView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  settingsButton: {
    position: 'absolute',
    top: screenHeight / 33,
    right: 0,
    alignSelf: 'flex-end',
    margin: 20,
  },
  fade: {
    height: 10,
    width: screenWidth,
    position: 'absolute',
    bottom: 0,
  },
  container: {
    flex: 1,
    marginTop: HEADER_MIN_HEIGHT,
  },
  headerContainer: {
    marginTop: screenHeight / 10.5 + STATUS_BAR_HEIGHT,
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
    paddingHorizontal: 20,
  },
  logout: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Entries;
