import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "./auth";

export const updateTasks = async (userUID, id, name, date) => {
  try {
    const docRef = await addDoc(collection(db, "tasks"), {
      uid: userUID,
      name: name,
      date: date,
      isCompleted: false,
    });
    await updateDoc(docRef, { docID: docRef.id, id: id });
  } catch (err) {
    console.log(err);
  }
};

export const editTask = async (docID, name) => {
  try {
    const taskRef = doc(db, "tasks", docID);
    await updateDoc(taskRef, { name: name });
  } catch (err) {
    console.error(err);
  }
};

export const getTasks = async (userUID) => {
  try {
    const q = query(collection(db, "tasks"), where("uid", "==", userUID));
    const querySnapShot = await getDocs(q);
    const tasks = querySnapShot.docs.map((doc) => ({
      docID: doc.data().docID,
      id: doc.data().id,
      name: doc.data().name,
      date: doc.data().date,
      isCompleted: doc.data().isCompleted,
    }));
    return tasks;
  } catch (err) {
    console.log(err);
  }
};
