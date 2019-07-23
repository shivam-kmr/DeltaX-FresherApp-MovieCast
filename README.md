# DeltaX-FresherApp-MovieCast-IMDB
I was given an assignment by DeltaX for creating a IMDB.com like website with basic CRUD and movie listings using an MVC web-framework so i used MEAN stack in my project.

# Actor: 
Name, Sex, DOB, Bio, ActorImage
# Movie:
Name, Year of Release, Plot, MoviePoster

  
# Installation

1. Create a folder to hold your installation: mkdir deltaX
2. FTP/Copy the contents of the zip to your newly created folder
3. Enter folder: cd deltaX
4. Install dependencies: npm install
5. Configure MongoDB (open two terminal issue command mongod and mongo for both) as creating a database name imdb and imdbs as collection.
6. Start application: nodemon server.js
7. Visit http://localhost:3000/imdb/list in your browser to get the Movie List.


# Demo Images 
<img width="900" alt="Screenshot 2019-07-23 at 2 43 36 PM" src="https://user-images.githubusercontent.com/32235795/61699362-66817c00-ad58-11e9-9cc4-34de1c5e4db3.png">
<img width="900" alt="Screenshot 2019-07-23 at 2 43 50 PM" src="https://user-images.githubusercontent.com/32235795/61699364-66817c00-ad58-11e9-8253-3f6e9fa1fc65.png">
<img width="900" alt="Screenshot 2019-07-23 at 2 43 59 PM" src="https://user-images.githubusercontent.com/32235795/61699365-671a1280-ad58-11e9-928c-2fc3c2e6bfb5.png">
<img width="900" alt="Screenshot 2019-07-23 at 2 44 10 PM" src="https://user-images.githubusercontent.com/32235795/61699367-671a1280-ad58-11e9-8483-7f11d0f168ec.png">
<img width="900" alt="Screenshot 2019-07-23 at 2 44 17 PM" src="https://user-images.githubusercontent.com/32235795/61699368-671a1280-ad58-11e9-93c9-4219380790b2.png">
<img width="900" alt="Screenshot 2019-07-23 at 2 44 20 PM" src="https://user-images.githubusercontent.com/32235795/61699369-67b2a900-ad58-11e9-8e70-cc33eb86c870.png">

<img width="900" alt="Screenshot 2019-07-23 at 3 06 11 PM" src="https://user-images.githubusercontent.com/32235795/61701214-6cc52780-ad5b-11e9-83e0-766b9708fd29.png">
<img width="900" alt="Screenshot 2019-07-23 at 3 05 58 PM" src="https://user-images.githubusercontent.com/32235795/61701217-6d5dbe00-ad5b-11e9-833d-1da6b70aca71.png">

<img width="900" alt="Screenshot 2019-07-23 at 2 27 31 PM" src="https://user-images.githubusercontent.com/32235795/61699139-f70b8c80-ad57-11e9-890d-457bae487a5a.png">

<img width="900" alt="Screenshot 2019-07-23 at 2 27 22 PM" src="https://user-images.githubusercontent.com/32235795/61699140-f70b8c80-ad57-11e9-8311-233d22c9dfa5.png">

# Notes:

1. Adding of new movies is done via http://localhost:3000/imdb
2. Adding of new actor is done via http://localhost:3000/imdb/editactor
3. Only jpeg, jpg,png file format supported for image of actor or movie poster.

# Validations:
1. All the fields are needed to be filled as they are set to be required.
2. Multer was not able to find file when posted with form so used multipart/form-data as encoded format.
3. Editing the previous filled data is done by referncing the _id.

# Known Bugs:
1. Image does not update after being updated.

# Database 
This app uses a MongoDB for storing all the data. Setting of the database connection string is done through the /db.js file. There are two properties relating to the database connection:

-----code starts below-----/db.js

 const mongoose = require('mongoose');

 mongoose.connect('mongodb://localhost:27017/imdb',{useNewUrlParser:true},(err)=>{
    if(!err){console.log("Mongo db Connection Success!")}
    else{console.log("Opps! Error in DB Connection :"+err)}
 });

 require('./movie.model');
 require('./actor.model');

------code ends above------/db.js

Thank you for Your Time!






