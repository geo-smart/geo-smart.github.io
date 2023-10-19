"use strict";import{initializeApp}from"https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";import{getFirestore}from"https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";import{collection,getDocs}from"https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";const firebaseConfig={apiKey:"AIzaSyDtv_mjLaZQImF4KoKy6s-moer6TtOVJiI",authDomain:"geosmart-uw.firebaseapp.com",projectId:"geosmart-uw",storageBucket:"geosmart-uw.appspot.com",messagingSenderId:"244030791746",appId:"1:244030791746:web:f6c34ef4b145ab7d1a8ddb",measurementId:"G-9L9TCCS7HD"},app=initializeApp(firebaseConfig),db=getFirestore(app);export function useCachedOrLoad(e){const t=new CollectionDescriptor(e),o=localStorage.getItem(t.cachedTimeName);o&&timeDifferenceInHours(new Date(o))>1&&(console.log(`Cached data items for "${t.firebaseName}" expired, clearing...`),localStorage.removeItem(t.localStorageName),localStorage.removeItem(t.cachedTimeName));const a=localStorage.getItem(t.localStorageName);if(!a)return loadCollection(e,t.localStorageName);const r=JSON.parse(a);return console.log(`Loaded ${r.length} cached data items for "${t.firebaseName}".`),new Promise(((e,t)=>e(r)))}export async function loadCollection(e){const t=new CollectionDescriptor(e);console.log(`Loading "${t.firebaseName}" collection from server...`);const o=await getDocs(collection(db,t.firebaseName)),a=[];return o.forEach((e=>{a.push({...e.data(),id:e.id})})),a.reverse(),localStorage.setItem(t.localStorageName,JSON.stringify(a)),localStorage.setItem(t.cachedTimeName,(new Date).toISOString()),console.log(`Loaded ${a.length} events from server.`),a}class CollectionDescriptor{constructor(e){this.firebaseName=e,this.localStorageName="cached"+capitalizeFirstLetter(e),this.cachedTimeName=this.localStorageName+"FetchTime"}}function capitalizeFirstLetter(e){return e.charAt(0).toUpperCase()+e.slice(1)}function timeDifferenceInHours(e){return((new Date).getTime()-e.getTime())/36e5}