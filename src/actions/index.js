export const addNewSymptom = (payload) => ({
  type: 'symptoms/add',
  payload,
});

export const setNewSymptoms = (payload) => ({
  type: 'symptoms/setAllSymptoms',
  payload,
});

export const setCurrentSymptom = (payload) => ({
  type: 'SET_CURRENT_SYMPTOM',
  payload,
});

export const setUser = (payload) => ({
  type: 'SET_USER',
  payload,
});

export const setOnboarded = (payload) => ({
  type: 'SET_ONBOARDED',
  payload,
});

// export const getSymptoms = () => {
//   return (dispatch, getState) => {
//     return fetchSymptoms().then(
//       (symptoms) => dispatch(setNewSymptoms(symptoms)),
//       (error) => console.log('error', error),
//     );
//   };
// };

// export const getSymptomsAndMoods = () => {
//   return (dispatch, getState) => {
//     dispatch(addLoading());
//     return fetchSymptoms()
//       .then(
//         (symptoms) => dispatch(setNewSymptoms(symptoms)),
//         (error) => console.log('error', error),
//       )
//       .then(({ payload: symptoms }) => {
//         if (symptoms && symptoms.length > 0) {
//           dispatch(getMoods(symptoms[0].displayName));
//         }
//         dispatch(removeLoading());
//       });
//   };
// };

// export const getMoods = (symptomName) => {
//   return (dispatch) => {
//     return getMoodsBySymptom(symptomName).then(
//       (moods) => dispatch(setAllMoods(moods)),
//       (error) => console.log('error', error),
//     );
//   };
// };

// export const setMoods = (payload) => ({
//   type: 'moods/setAllMoods',
//   payload,
// });

// export const addMood = (symptoms) => {
//   return (dispatch) => {
//     return postMood(symptoms).then(
//       (response) => dispatch(getSymptoms()),
//       (error) => console.log('error', error),
//     );
//   };
// };

// export const setLoaded = (payload) => ({
//   type: 'SET_LOADED',
//   payload,
// });

// export const addLoading = () => ({
//   type: 'ADD_LOADING',
// });

// export const removeLoading = () => ({
//   type: 'REMOVE_LOADING',
// });
