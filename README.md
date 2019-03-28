# Elenchus

[Los Altos Hacks Winner: Best Use
of Snap Kit](https://devpost.com/software/elenchus).

## Inspiration

Every day, thousands of students stay up late, struggling to finish their homework and understand the concepts taught at school. Their resources are limited to online forums, videos, and their friends, rather than other classmates who have worked on the same problems and had the same questions. We, as high school students, understand the causes of this problem and the possible solutions. These students need a platform where they are able to understand these difficult concepts through the help of their peers.

## What it does

Elenchus accounts for students through various platforms such as Snapchat and Google to help them collaborate in the same "classroom." It has live chat-rooms for students to ask different questions to their peers and get help with questions such as "did we need balanced chemical equations for the prelab?" or "what sources are relevant for this essay?" without bothering the teacher at night. The web application also prevents cheating by having all the students in the classroom rather than just a small group of friends, where all students have access to what other students discuss and can report inappropriate behavior or plagiarism. It also has a live whiteboard which multiple students can edit at the same time, useful for discussing and solving STEM-related questions. The final component is the calendar. The calendar lets students add upcoming due dates or important events such as rallies or tests.

## How we built it

In order to effectively compile our ideas onto an actual project, we used Visual Studio Live Share which allowed all the members of our team to work on some part of the website. Visual Studio allowed us to create a development environment that supported all coding languages such as Javascript, HTML/CSS and to start the Firebase server locally for testing. During the process, we first started off with a rough idea and created a simple interface that gave us an idea of how the website would look. As we started to finish making our basic interface, we started integrating specific features such as using Google and Snapchat (using Snap Kit) to sign in, as well as making whiteboards that can be used by multiple people at the same time.

## Challenges we ran into

Throughout the project, a challenge we ran into was using Firestore to create entries for which classes students were associated with and retrieving those entries. This was particularly difficult as the task was done asynchronously, so a number of functions had to be used to effectively create a class inventory system.

## Accomplishments that we're proud of

We're proud of completing a full web application that has a database, is hosted and has a domain, and creates a solid user experience. Without extensively working with Firebase before, we were proud of making the web app utilize many of its features.

## What's next for Elenchus

Although Elenchus is functional, we want to add more integration with Snap Kit to allow our website to seamlessly retrieve information about a user's Snapchat profile. We also plan to create a fully functional forum where students can post specific questions and threads can be created to discuss and respond to them.

## The Web App

With the .com domain:
[https://elenchus-ed.com/](https://elenchus-ed.com/).

The Firebase app:
[https://elenchus-6588a.firebaseapp.com/](https://elenchus-6588a.firebaseapp.com/).
