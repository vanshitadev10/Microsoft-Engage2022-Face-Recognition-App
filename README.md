# Face Recognition Authentication App

## About
Nowadays many people are becoming increasingly familiar with facial recognition technology due to new unlocking features in phones requiring face ID. This allows the user to have an authorized access to his phone.
Facial recognition is a technology that can match a human face from a digital image or video, against a database of stored faces.
This type of identification is helpful for various commercial and law enforcement applications.


## Resources Used
### Language
React.js

### API
face-api.js

### Database
Firebase


## Working
* The webcam detects and locates a face of the person individually.
* The image of human face is captured, analyzed and transformed into a set of digital information (data) depending on an individual’s facial features.
* The data (of the known faceprints) is then stored in the database (here, Firebase).
* The data is fetched into the Sign-in page. The webcam captures the new image (the image of the person who wants to login).
* The image with the maximum confidence and the maximum detection score, from the database of unknown faceprints, will be taken into consideration and compared with the new captured image. If the image if detected, the person logins successfully else a prompt appears on the screen which says: “No Such User Found”.


## Scope Of Improvement
* The face recognition authentication system made by me is using Firebase as the database which is more popular for smaller applications and not for big data and high-performance use cases. So the database can be changed here in order to increase the efficiency of the system.
* Here I have used Face-api.js as the API for the face-detection system which is not that accurate as compared to Microsoft Computer Vision API, Inferdo, etc. So even that can be replaced to get highly accurate result.
* Also I have used React.js as the frontend language, other languages like Next.js can also be used as they are extremely fast because of the static destinations and server-side rendering.
* Also some code optimization can be done in order to make the web application run faster even for the slower network.
