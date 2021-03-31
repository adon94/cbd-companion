import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import { getMonday } from '../core/utils';

const usersRef = firestore().collection('Users');

async function addMood(symptoms, lifestyleFactors) {
  const date = new Date();

  // date.setDate(date.getDate() - 3);
  // const timestamp = firestore.FieldValue.serverTimestamp();
  const timestamp = date.toISOString();
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  let dt = date.getDate();

  if (dt < 10) {
    dt = '0' + dt;
  }
  if (month < 10) {
    month = '0' + month;
  }

  const today = `${year}-${month}-${dt}`;
  const user = auth().currentUser;

  const batch = firestore().batch();

  // add each symptom for today and the current time with it's rating
  symptoms.forEach((symptom) => {
    const ref = usersRef
      .doc(user.uid)
      .collection('symptoms')
      .doc(symptom.displayName)
      .collection('days')
      .doc(today)
      .collection('moods')
      .doc(timestamp);

    batch.set(ref, {
      ...symptom,
      timestamp,
    });
  });

  const factorsObj = {};

  // add each lifestyle factor for today with it's value
  lifestyleFactors.forEach((factor) => {
    const ref = usersRef
      .doc(user.uid)
      .collection('lifestyleFactors')
      .doc(factor.displayName)
      .collection('days')
      .doc(today);

    factorsObj[factor.displayName] = factor.rating === 2;

    batch.set(ref, {
      ...factor,
      timestamp,
    });
  });

  await batch.commit();

  const batch2 = firestore().batch();

  // for each symptom tracked today, set the average rating
  for (const symptom of symptoms) {
    if (symptom.rating) {
      const todaysMoods = await usersRef
        .doc(user.uid)
        .collection('symptoms')
        .doc(symptom.displayName)
        .collection('days')
        .doc(today)
        .collection('moods')
        .get();

      let totalRating = 0;

      todaysMoods.forEach((documentSnapshot) => {
        const day = documentSnapshot.data();

        totalRating += day.rating;

        const ref = usersRef
          .doc(user.uid)
          .collection('symptoms')
          .doc(symptom.displayName)
          .collection('days')
          .doc(today);

        batch2.set(ref, {
          ...factorsObj,
          rating: totalRating / todaysMoods.size,
          date: today,
          // add lifestyle factors here too to make it easier for graphs
        });
      });
    }
  }

  await batch2.commit();
}

async function getMoodsBySymptom(symptomName) {
  const moods = [];
  const user = auth().currentUser;
  return usersRef
    .doc(user.uid)
    .collection('symptoms')
    .doc(symptomName)
    .collection('days')
    .orderBy('date', 'desc')
    .get()
    .then((querySnapshot) => {
      if (querySnapshot.size > 0) {
        querySnapshot.forEach((documentSnapshot) => {
          moods.push({ ...documentSnapshot.data(), id: documentSnapshot.id });
        });
      }
      return moods;
    });
}

async function getWeeklyMoods(symptomName) {
  const moods = [];
  const user = auth().currentUser;
  const monday = getMonday();
  return usersRef
    .doc(user.uid)
    .collection('symptoms')
    .doc(symptomName)
    .collection('days')
    .orderBy('date', 'desc')
    .limit(7)
    .get()
    .then((querySnapshot) => {
      if (querySnapshot.size > 0) {
        querySnapshot.forEach((documentSnapshot) => {
          const docData = documentSnapshot.data();
          const isThisWeek = new Date(docData.date) >= monday;
          if (isThisWeek) {
            moods.push({ ...documentSnapshot.data(), id: documentSnapshot.id });
          }
        });
      }
      return moods;
    });
}

async function getMoodsBySymptomOnDay(symptomName, date) {
  const moods = [];
  const user = auth().currentUser;

  const dayInfo = await usersRef
    .doc(user.uid)
    .collection('symptoms')
    .doc(symptomName)
    .collection('days')
    .doc(date)
    .get()
    .then((documentSnapshot) => {
      return documentSnapshot.data();
    });

  await usersRef
    .doc(user.uid)
    .collection('symptoms')
    .doc(symptomName)
    .collection('days')
    .doc(date)
    .collection('moods')
    .get()
    .then((querySnapshot) => {
      if (querySnapshot.size > 0) {
        querySnapshot.forEach((documentSnapshot) => {
          moods.push({ ...documentSnapshot.data(), id: documentSnapshot.id });
        });
      }
      return moods;
    });

  return { moods, dayInfo };
}

async function addOnboardInfo(symptoms, cbdDetails) {
  const user = auth().currentUser;

  const batch = firestore().batch();

  const userRef = usersRef.doc(user.uid);

  batch.set(userRef, { ...cbdDetails, onboarded: true });

  symptoms.forEach((symptom) => {
    const symptomsRef = userRef.collection('symptoms').doc(symptom.displayName);

    batch.set(symptomsRef, symptom);
  });

  await batch.commit();
}

async function changeMultipleSymptoms(toAdd, toRemove) {
  const user = auth().currentUser;

  const batch = firestore().batch();

  const userRef = usersRef.doc(user.uid);

  toAdd.forEach(({ displayName }) => {
    const symptomsRef = userRef.collection('symptoms').doc(displayName);

    batch.set(symptomsRef, { displayName });
  });

  toRemove.forEach(({ displayName }) => {
    const symptomsRef = userRef.collection('symptoms').doc(displayName);

    batch.delete(symptomsRef, { displayName });
  });

  await batch.commit();
}

async function isOnboarded() {
  const user = auth().currentUser;
  if (user) {
    return await usersRef
      .doc(user.uid)
      .get()
      .then((querySnapshot) => {
        return querySnapshot.data();
      });
  }
}

async function addSymptom(symptom) {
  const user = auth().currentUser;
  await usersRef.doc(user.uid).collection('symptoms').doc(symptom).set({
    displayName: symptom,
  });
}

async function getSymptoms() {
  const user = auth().currentUser;
  const symptoms = [];
  return await usersRef
    .doc(user.uid)
    .collection('symptoms')
    .get()
    .then((querySnapshot) => {
      if (querySnapshot.size > 0) {
        querySnapshot.forEach((documentSnapshot) => {
          symptoms.push(documentSnapshot.data());
        });
      }
      return symptoms;
    });
}

async function addLifestyle(lifestyleFactor) {
  const user = auth().currentUser;
  await usersRef
    .doc(user.uid)
    .collection('lifestyleFactors')
    .doc(lifestyleFactor)
    .set({
      displayName: lifestyleFactor,
    });
}

async function getLifestyle() {
  const user = auth().currentUser;
  const lifestyle = [];
  return await usersRef
    .doc(user.uid)
    .collection('lifestyleFactors')
    .get()
    .then((querySnapshot) => {
      if (querySnapshot.size > 0) {
        querySnapshot.forEach((documentSnapshot) => {
          lifestyle.push(documentSnapshot.data());
        });
      }
      return lifestyle;
    });
}

async function changeMultipleLifestyles(toAdd, toRemove) {
  const user = auth().currentUser;

  const batch = firestore().batch();

  const userRef = usersRef.doc(user.uid);

  toAdd.forEach(({ displayName }) => {
    const lifestyleRef = userRef
      .collection('lifestyleFactors')
      .doc(displayName);

    batch.set(lifestyleRef, { displayName });
  });

  toRemove.forEach(({ displayName }) => {
    const lifestyleRef = userRef
      .collection('lifestyleFactors')
      .doc(displayName);

    batch.delete(lifestyleRef, { displayName });
  });

  await batch.commit();
}

export {
  addMood,
  getMoodsBySymptom,
  addSymptom,
  getSymptoms,
  getMoodsBySymptomOnDay,
  addOnboardInfo,
  isOnboarded,
  changeMultipleSymptoms,
  getLifestyle,
  addLifestyle,
  changeMultipleLifestyles,
  getWeeklyMoods,
};
