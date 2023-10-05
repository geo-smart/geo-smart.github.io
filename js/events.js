"use strict";
import { useCachedOrLoad } from "./firebase.js";

/**
 * @param {HTMLElement} insert 
 */
export async function setUpToastContent(insert) {
  const target = insert.getAttribute("data-event");
  const events = await useCachedOrLoad("events");
  
  const event = events.find(item => item.id === target);
  const end = calculateRemainingTime(event.end);
  if (!event || !end) return; // end will be null if the event has passed

  const toast = createToastElement(event);
  insert.parentElement.insertBefore(toast, insert);
  insert.parentElement.removeChild(insert);

  setUpToastOnClick(toast);
  toast.classList.add("show");
}

function createToastElement(event) {
  const toast = document.createElement("a");
  toast.classList.add("rich-text");
  toast.id = "toast";

  toast.href = event.link;
  toast.target = "_blank";
  const displayName = startsWithVowel(event.name) ? "an " + event.name : "a " + event.name;
  
  const timeUntilStart = calculateRemainingTime(event.start);
  const timeUntilEnd = calculateRemainingTime(event.end);
  
  const timeDescriptor = timeUntilStart ? "happening" : "ending";
  const useTime = timeUntilStart || timeUntilEnd;
  const remainingTime = useTime.time + " " + useTime.units;

  toast.innerHTML = `
    <img src="assets/info-icon.svg"/>
    <p>
      There is <span class="event-name">${displayName}</span> ${timeDescriptor} in <span class="event-time">${remainingTime}</span>! 
      Click to learn more.
    </p>
  `;

  return toast;
}

/**
 * Customizes the click event for the toast to wait
 * until the animation to open its link.
 * @param {Element} toast 
 */
function setUpToastOnClick(toast) {
  toast.addEventListener("click", (evt) => {
    evt.preventDefault();
    toast.classList.add("hide");

    setTimeout(() => {
      const link = toast.getAttribute("href");
      window.open(link, "_blank");
    }, 500); // match to toast hide animation
  });
}

function startsWithVowel(word){
  var vowels = ("aeiouAEIOU"); 
  return vowels.indexOf(word[0]) !== -1;
}

/**
 * interface remainingTime {
 *    units: "weeks" | "days" | "hours",
 *    time: number,
 * }
 */
function calculateRemainingTime(timestamp) {
  const { seconds, nanoseconds } = timestamp;
  const milliseconds = seconds * 1000 + Math.floor(nanoseconds / 1000000);
  const targetDate = new Date(milliseconds);
  const now = new Date();

  const timeDifference = targetDate - now;
  const millisecondsInHour = 60 * 60 * 1000;
  const millisecondsInDay = 24 * millisecondsInHour;
  const millisecondsInWeek = 7 * millisecondsInDay;

  if (timeDifference >= millisecondsInWeek) {
    const weeks = Math.floor(timeDifference / millisecondsInWeek);
    return { units: "weeks", time: weeks };
  
  } else if (timeDifference >= millisecondsInDay) {
    const days = Math.floor(timeDifference / millisecondsInDay);
    return { units: "days", time: days };
  
  } else if (timeDifference >= millisecondsInHour) {  
    const hours = Math.floor(timeDifference / millisecondsInHour);
    return { units: "hours", time: hours };
  
  } else {
    return null;
  }
}