import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import { getMonday, getTodayString } from '../core/utils';

const usersRef = firestore().collection('Users');

async function addMood(symptoms, lifestyleFactors) {
  const date = new Date();

  // date.setDate(date.getDate() - 1);
  // const timestamp = firestore.FieldValue.serverTimestamp();
  const timestamp = date.toISOString();
  const today = getTodayString(date);

  const user = auth().currentUser;
  const userDayRef = usersRef.doc(user.uid).collection('days').doc(today);

  const batch = firestore().batch();

  // add each symptom for today and the current time with it's rating
  symptoms.forEach((symptom) => {
    const ref = usersRef
      .doc(user.uid)
      .collection('symptoms')
      .doc(symptom.displayName)
      .collection('days')
      .doc(today);

    batch.set(ref, {
      ...symptom,
      timestamp,
    });

    const daySymptomsRef = userDayRef
      .collection('symptoms')
      .doc(symptom.displayName);

    batch.set(daySymptomsRef, {
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

    const dayLifestyleRef = userDayRef
      .collection('lifestyleFactors')
      .doc(factor.displayName);

    batch.set(dayLifestyleRef, {
      ...factor,
      timestamp,
    });
  });

  await batch.commit();
}

async function getMoodsBySymptom(symptomName) {
  const moods = [];
  const user = auth().currentUser;
  return usersRef
    .doc(user.uid)
    .collection('symptoms')
    .doc(symptomName)
    .collection('days')
    .orderBy('timestamp', 'desc')
    .get()
    .then((querySnapshot) => {
      if (querySnapshot.size > 0) {
        querySnapshot.forEach((documentSnapshot) => {
          const el = documentSnapshot.data();
          moods.push({ ...el, id: documentSnapshot.id });
        });
      }
      return moods.reverse();
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
    .orderBy('timestamp', 'desc')
    .limit(7)
    .get()
    .then((querySnapshot) => {
      if (querySnapshot.size > 0) {
        querySnapshot.forEach((documentSnapshot) => {
          const el = documentSnapshot.data();
          const notThisWeek = new Date(el.timestamp) < monday;
          if (!notThisWeek) {
            moods.push({ ...el, id: documentSnapshot.id });
          }
        });
      }
      return moods.reverse();
    });
}

async function getFactorsOnDay(date) {
  const lifestyleFactors = [];
  const user = auth().currentUser;

  const dayRef = usersRef.doc(user.uid).collection('days').doc(date);

  return await dayRef
    .collection('lifestyleFactors')
    .get()
    .then((querySnapshot) => {
      if (querySnapshot.size > 0) {
        querySnapshot.forEach((documentSnapshot) => {
          lifestyleFactors.push({
            ...documentSnapshot.data(),
            id: documentSnapshot.id,
          });
        });
      }
      return lifestyleFactors;
    });
}

async function getSymptomsOnDay(date) {
  const symptoms = [];
  const user = auth().currentUser;

  const dayRef = usersRef.doc(user.uid).collection('days').doc(date);

  return await dayRef
    .collection('symptoms')
    .get()
    .then((querySnapshot) => {
      if (querySnapshot.size > 0) {
        querySnapshot.forEach((documentSnapshot) => {
          symptoms.push({
            ...documentSnapshot.data(),
            id: documentSnapshot.id,
          });
        });
      }
      return symptoms;
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
  getFactorsOnDay,
  getSymptomsOnDay,
};
