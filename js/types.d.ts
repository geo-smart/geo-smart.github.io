declare module "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js" {
  export const initializeApp: (config: any) => any;
}

declare module "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js" {
  export const getFirestore: (app: any) => any;
}

declare module "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js" {
  export const collection: (...args: any) => any;
  export const getDocs: (docs: any) => any;
}

declare type Timestamp = {
  seconds: number;
  nanoseconds: number;
}

declare type Post = {
  title: string,
  body: string,
  link: string,
  blurb?: string,
  date: Timestamp,
}

declare type EventDocument = {
  name: string,
  title: string,
  link: string,
  start: Timestamp,
  end: Timestamp,
}

declare type RemainingTime = {
  units: "weeks" | "days" | "hours",
  time: number,
}