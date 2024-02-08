"use strict";

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDtv_mjLaZQImF4KoKy6s-moer6TtOVJiI",
  authDomain: "geosmart-uw.firebaseapp.com",
  projectId: "geosmart-uw",
  storageBucket: "geosmart-uw.appspot.com",
  messagingSenderId: "244030791746",
  appId: "1:244030791746:web:f6c34ef4b145ab7d1a8ddb",
  measurementId: "G-9L9TCCS7HD"
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/**
 * If cached data exists for the provided itemName in localStorage,
 * returns that. Otherwise queries the firebase backend for all documents
 * in the target collection, then stores that data to localStorage.
 * 
 * @param {string} collectionName Name of the target firestore colection.
 * @returns {Promise<any[]>} The retrieved collection data.
 */
export function useCachedOrLoad(collectionName) {
  const cd = new CollectionDescriptor(collectionName);

  // We don't want cached data to last forever
  const cachedTime = localStorage.getItem(cd.cachedTimeName);
  if (cachedTime && timeDifferenceInHours(new Date(cachedTime)) > 1) {
    console.log(`Cached data items for "${cd.firebaseName}" expired, clearing...`);
    localStorage.removeItem(cd.localStorageName);
    localStorage.removeItem(cd.cachedTimeName);
  }

  const cachedData = localStorage.getItem(cd.localStorageName);
  if (!cachedData) return loadCollection(collectionName);

  const data = JSON.parse(cachedData);
  console.log(`Loaded ${data.length} cached data items for "${cd.firebaseName}".`);
  return new Promise((resolve, reject) => resolve(data));
}

/**
 * Queries the firebase backend for all documents in the target collection,
 * then stores that data to localStorage.
 * 
 * @param {string} collectionName Name of the target firestore colection.
 * @returns {Promise<any[]>} The retrieved collection data.
 */
export async function loadCollection(collectionName) {
  const cd = new CollectionDescriptor(collectionName);

  console.log(`Loading "${cd.firebaseName}" collection from server...`);
  const querySnapshot = await getDocs(collection(db, cd.firebaseName));

  const data = [];
  querySnapshot.forEach((doc) => {
    // Method doc.data() is never undefined for query doc snapshots
    data.push({ ...doc.data(), id: doc.id });
  });
  data.reverse();

  localStorage.setItem(cd.localStorageName, JSON.stringify(data));
  localStorage.setItem(cd.cachedTimeName, new Date().toISOString());

  console.log(`Loaded ${data.length} events from server.`);
  return data;
}

class CollectionDescriptor {
  constructor(name) {
    this.firebaseName = name;
    this.localStorageName = "cached" + capitalizeFirstLetter(name);
    this.cachedTimeName = this.localStorageName + "FetchTime";
  }
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * @param {Date} date 
 * @returns {number} The time difference in hours since the provided date.
 */
function timeDifferenceInHours(date) {
  var currentTime = new Date();  // Get the current date and time
  var timeDifference = currentTime.getTime() - date.getTime();  // Calculate the time difference in milliseconds
  return timeDifference / (1000 * 60 * 60);  // Convert milliseconds to hours
}