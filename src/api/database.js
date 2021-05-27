import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import { getMonday, getDateString, sameDay } from '../core/utils';

// potentially a brands ref
const usersRef = firestore().collection('Users');

/* TODO
- Edit a previously input "mood"
  - Don't forget to decrement the previous LF counts
- Input for a specific day
- Split dosage and mood
- Ask mood 6 hours later
*/
async function addMood(
  symptoms,
  lifestyleFactors,
  selectedDate = new Date().toISOString(),
) {
  const date = new Date(selectedDate);
  // date.setDate(date.getDate() - 3);
  // const timestamp = firestore.FieldValue.serverTimestamp();
  const timestamp = date.toISOString();
  const dateString = getDateString(date);

  const user = auth().currentUser;
  const userDayRef = usersRef.doc(user.uid).collection('days').doc(dateString);

  const batch = firestore().batch();
  const increment = firestore.FieldValue.increment(1);

  // add each symptom for date and the current time with it's rating
  symptoms.forEach((symptom, i) => {
    const baseRef = usersRef
      .doc(user.uid)
      .collection('symptoms')
      .doc(symptom.displayName);

    const daysRef = baseRef.collection('days').doc(dateString);

    batch.set(
      daysRef,
      {
        ...symptom,
        timestamp,
      },
      { merge: true },
    );

    const daySymptomsRef = userDayRef
      .collection('symptoms')
      .doc(symptom.displayName);

    batch.set(daySymptomsRef, {
      ...symptom,
      timestamp,
    });

    const ratingsRef = baseRef.collection('ratings').doc(`${symptom.rating}`);

    // converts the array to an object with an increment value
    const factorsObj = lifestyleFactors.reduce(
      (map, obj) => (
        obj.rating === 2 && (map[obj.displayName] = increment), map
      ),
      {},
    );

    batch.set(
      ratingsRef,
      {
        ...factorsObj,
      },
      { merge: true },
    );
  });

  const factorsObj = {};

  // add each lifestyle factor for today with it's value
  lifestyleFactors.forEach((factor, i) => {
    const ref = usersRef
      .doc(user.uid)
      .collection('lifestyleFactors')
      .doc(factor.displayName)
      .collection('days')
      .doc(dateString);

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

async function getFactorsCountByRating(rating, symptomName) {
  const user = auth().currentUser;
  return usersRef
    .doc(user.uid)
    .collection('symptoms')
    .doc(symptomName)
    .collection('ratings')
    .doc(`${rating}`)
    .get()
    .then((dataSnapshot) => {
      return dataSnapshot.data();
    });
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

async function addDose(dose, ogLastDosedAt, symptomNames) {
  const { dosedAt } = dose;
  const batch = firestore().batch();
  const user = auth().currentUser;
  const userRef = usersRef.doc(user.uid);
  const date = new Date(dosedAt);
  const dateString = getDateString(date);
  const userDayRef = userRef.collection('days').doc(dateString);

  batch.set(userDayRef, dose, { merge: true });

  symptomNames.forEach((sName) => {
    const ref = usersRef
      .doc(user.uid)
      .collection('symptoms')
      .doc(sName)
      .collection('days')
      .doc(dateString);

    batch.set(ref, dose, { merge: true });
  });

  if (dosedAt > ogLastDosedAt || sameDay(ogLastDosedAt, dosedAt)) {
    batch.set(
      userRef,
      {
        lastDosedAt: dosedAt,
        lastBrand: dose.brand,
        lastProduct: dose.product,
        lastDoseAmount: dose.doseAmount || '1 drop',
      },
      { merge: true },
    );
  }

  await batch.commit();
}

async function getDoseInfo(selectedDate = new Date()) {
  const date = getDateString(selectedDate);
  const user = auth().currentUser;
  return usersRef
    .doc(user.uid)
    .collection('days')
    .doc(date)
    .get()
    .then((documentSnapshot) => {
      return documentSnapshot.data();
    });
}

async function getLastDoseInfo() {
  const user = auth().currentUser;
  return usersRef
    .doc(user.uid)
    .get()
    .then((documentSnapshot) => {
      return documentSnapshot.data();
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

  batch.set(userRef, {
    ...cbdDetails,
    lastMg: cbdDetails.mg,
    lastMl: cbdDetails.ml,
    lastBrand: cbdDetails.brand,
    lastProduct: cbdDetails.product,
    lastDoseAmount: cbdDetails.doseAmount,
    onboarded: true,
  });

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
  getFactorsCountByRating,
  addDose,
  getLastDoseInfo,
  getDoseInfo,
};
