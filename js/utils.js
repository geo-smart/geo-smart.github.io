/**
 * Creates an intersection observer which triggers animations for
 * some elements when they scroll onto the page by modifying their class.
 */
export function addAnimationObserver(target_items) {
  const animated_items = target_items || document.querySelectorAll(".animated-item");
  // animated_items.forEach(item => item.classList.add("pre-anim"));

  const mainObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.remove("pre-anim");
      }
    });
  }, {
    root: null,
    rootMargin: "0px",
    threshold: 0.45
  });

  const mobileObserver = new IntersectionObserver((entries) => {
    if (window.innerWidth > 479) return;
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.remove("pre-anim");
      }
    });
  }, {
    root: null,
    rootMargin: "0px",
    threshold: 0.1
  });

  animated_items.forEach((element) => mainObserver.observe(element));
  animated_items.forEach((element) => mobileObserver.observe(element));
}

/**
 * @param {Timestamp} dateObj 
 * @param {boolean} includeYear
 */
export function formatDate(dateObj, includeYear = true) {
  const { seconds, nanoseconds } = dateObj;
  const milliseconds = seconds * 1000 + Math.floor(nanoseconds / 1000000);
  const date = new Date(milliseconds);
  const formattedDate = date.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: includeYear ? "numeric" : undefined,
  });
  return formattedDate;
}