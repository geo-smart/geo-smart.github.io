/*
 * << HOW TO ADD BLOG POSTS >>
 * 
 * IMPORTANT: Read all of the instructions before making ANY changes!!
 * 
 * The const below contains a list of javascript objects. Each object represents a blog post,
 * and contains the following properties:
 *
 * "title" - The title of the blog post.
 * "date" - The date the blog post was posted (so today if you are adding one).
 * "body" - The actual text content of the blog post, shown once the post is clicked on.
 * "link" - Most of these blog posts just link to articles on other sites, so this is the link.
 * "blurb" - A short version of the post content to be displayed on the main news page. Omit this
 * entirely to use the body as the blurb. (not just "blurb": null, literally delete the line).
 *
 * The blog posts are displayed in the order they are listed in the const. You can re-order them
 * if you'd like.
 * 
 * Copy and past the below template into the posts list to get started if you are adding a 
 * new blog post, then fill out its properties. Please add to the bottom of the list, as the
 * list is reversed such that the most recent (closest to the bottom) are shown first on the page.
 * 
 * TEMPLATE:

  {
    "title": "TITLE_HERE",
    "date": "Month, 00, 0000",
    "body": "BODY_HERE",
    "link": "about:blank",
    "blurb": "BLURB_HERE",
  },

 */

const posts = [
  {
    "title": "A Review Of Earth Artificial Intelligence",
    "date": "Feb 21, 2022",
    "body": "Researchers Cristea and Sun talk about collaborating on the GeoSMART project, machine learning and how the ESIP Lab connected them and opened up opportunities to address gaps in machine learning education for geoscientists.",
    "link": "https://www.sciencedirect.com/science/article/pii/S0098300422000036",
  },
  {
    "title": "Funding Opportunities For ML Tutorials",
    "date": "Feb 20, 2022",
    "body": "Contribute to the GeoSMART curriculum by developing a tutorial notebook! Earth Science Information Partners (ESIP) and GeoSMART are requesting researchers transitioning their machine learning (ML) workflows into well-documented, interactive, and shareable tutorials to submit a proposal. We seek tutorials related to hydrology, seismology, and/or the cryosphere.",
    "link": "https://www.esipfed.org/lab/funding-opportunities/ml-rfp",
  },
  {
    "title": "Q&A: Weaving ML in Earth Science",
    "date": "May 15, 2022",
    "body": "Researchers Cristea and Sun talk about collaborating on the GeoSMART project, machine learning and how the ESIP Lab connected them and opened up opportunities to address gaps in machine learning education for geoscientists.",
    "link": "https://www.esipfed.org/merge/esip-lab-update/ml-in-earth-science",
  },
  {
    "title": "The eScience Institute Seeks ML Specialists",
    "date": "July 19, 2022",
    "body": "The eScience Institute is seeking outstanding candidates for the position of Machine Learning Specialist. The ML Specialist will work collaboratively towards sustaining the eScience Institute as a valuable data science educational resource at the UW, serving users that include faculty, students, researchers, and staff spanning all schools and departments. The ML Specialist will create and manage ML-related technical content for eScience educational programs and services, including GeoSMART. Click the 'read article' link below for the application and more information.",
    "link": "https://uwhires.admin.washington.edu/ENG/Candidates/default.cfm?szCategory=jobprofile&szOrderID=209343",
    "blurb": "The eScience Institute is seeking outstanding candidates for the position of Machine Learning Specialist who will work collaboratively towards sustaining the eScience Institute as a valuable data science educational resource at the UW."
  },
];
posts.reverse();