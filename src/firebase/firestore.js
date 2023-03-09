import {
  collection,
  getDocs,
  addDoc,
  where,
  query,
  doc,
  deleteDoc,
} from 'firebase/firestore';
import { db } from './auth';

export const updateTasks = async (userUID, id, name, date) => {
  try {
    await addDoc(collection(db, 'tasks'), {
      id: id,
      uid: userUID,
      name: name,
      date: date,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getTasks = async (userUID) => {
  try {
    const q = query(collection(db, 'tasks'), where('uid', '==', userUID));
    const querySnapShot = await getDocs(q);
    const tasks = querySnapShot.docs.map((doc) => ({
      id: doc.data().id,
      name: doc.data().name,
      date: doc.data().date,
    }));
    return tasks;
  } catch (err) {
    console.log(err);
  }
};
