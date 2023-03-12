import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  deleteDoc,
  where,
} from 'firebase/firestore';
import { db } from './auth';
export const updateTasks = async (
  userUID,
  id,
  name,
  date,
  dueDate,
  tag = null
) => {
  try {
    const docRef = await addDoc(collection(db, 'tasks'), {
      uid: userUID,
      name,
      date,
      dueDate,
      tag,
      isCompleted: false,
      isFavourited: false,
    });
    await updateDoc(docRef, { docID: docRef.id, id });
  } catch (err) {
    console.log(err);
  }
};

export const editTask = async (docID, name, dueDate, tag) => {
  try {
    const taskRef = doc(db, 'tasks', docID);
    await updateDoc(taskRef, { name, dueDate, tag });
  } catch (err) {
    console.error(err);
  }
};

export const deleteTask = async (docID) => {
  try {
    const taskRef = doc(db, 'tasks', docID);
    await deleteDoc(taskRef);
  } catch (err) {
    console.error(err);
  }
};

export const getTasks = async (userUID) => {
  try {
    const q = query(collection(db, 'tasks'), where('uid', '==', userUID));
    const querySnapShot = await getDocs(q);
    const tasks = querySnapShot.docs.map((doc) => ({
      docID: doc.data().docID,
      id: doc.data().id,
      name: doc.data().name,
      date: doc.data().date,
      dueDate: doc.data().dueDate,
      tag: doc.data().tag,
      isCompleted: doc.data().isCompleted,
      isFavourited: doc.data().isFavourited,
    }));
    return tasks;
  } catch (err) {
    console.log(err);
  }
};

export const toggleComplete = async (todo) => {
  try {
    const taskRef = doc(db, 'tasks', todo.docID);
    await updateDoc(taskRef, { isCompleted: !todo.isCompleted });
  } catch (err) {
    console.error(err);
  }
};

export const toggleFavourite = async (todo) => {
  try {
    const taskRef = doc(db, 'tasks', todo.docID);
    await updateDoc(taskRef, { isFavourited: !todo.isFavourited });
  } catch (err) {
    console.error(err);
  }
};
