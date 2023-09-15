# Twitter Clone

### FrontEnd Deployed Link
`https://twitter-fe-clone.vercel.app/`
### BackEnd Deployed Link
`https://twitter-clone-be.vercel.app/`

Ps: In the Backend Deployed link, There is some Potential CORS error (will fix it), run in your Local for Smooth Functioning.

## This is the Full Stack Twitter mini Clone built using: 
* MERN Stack
* MongoDB as Database
* JWT for Authentication & Authorization
* bcryptjs for Password Hashing
* JOI for Validatoins
* aws-sdk for using S3 bucket in AWS


## Installation

- Clone the Git Repository

```
$ git clone https://github.com/Naveen-Karanamu/Twitter-Clone
```

### Run the FrontEnd

- Navigate to client folder

```
$ cd client
```

#### Intall the packages
- yarn 
```
$ yarn install
```
- npm 
```
$ npm install
```

#### Run the Frontend
- yarn 
```
$ yarn start
```
- npm 
```
$ npm start
```

### Run the Backend

- Navigate to Server folder

```
$ cd server
```

#### Intall the packages
- yarn 
```
$ yarn install
```
- npm 
```
$ npm install
```

#### Run the Backend
- yarn 
```
$ yarn dev
```
- npm 
```
$ npm dev
```

#### Set the ENV VARIABLES (Root Dir)

- server

```
MONGODB_URL = ""
AWS_ACCESS_KEY_ID = ""
AWS_SECRET_ACCESS_KEY = ""
```

## Page Functionality with Routes

### Page 1 : (SignUp Page)
* Sign up if you are a new User
* Then you should Sign In again for security purpose
* If you are already an existing user, then you can navigate to `/signin` by clicking "Sign In"
Route :
```
/signup
```
### Page 2 : (SignIn Page)
* If you are already an existing user
* If you are a new user then navigate to `/signup` by clicking "Sign Up"

Route : 
```
/signin
```
### Page 3 : (Common Home Page) /Posts
* Home Page with all the tweet's along with your's

Route : 
```
/home/posts
```

### Page 4 : (Specific Home Page for the current user) /Following
* Here you will only see the tweets from the users you follow

Route : 
```
/home/folowtweets
```

### Page 5 : (Profile Page)
* Here you can SEE, EDIT, DELETE your posts

* Edit : 
Click on 'Edit' to edit your existing tweet

* Delete : Click on 'Delete' to delete your tweet

* Cancel : Click on 'Cancel' to stop the editing

* Update : After editing your tweet, click on 'Update' to save the changes made to your tweet

Route : 
```
/profile
```

### Page 6 : (All Users Page) /User List
* In this page you will see all the users who are authorized and authenticated to use our mini twitter
* Here you can follow any new user you want

Route : 
```
/people/users
```
### Page 7 : (People you follow Page) /Following
* In this page you will see all the users you follow
* You can unfollow any user you follow

Route : 
```
/people/following
```

## Button's functionality

### Log Out 
* You can log out from your account anytime you want to
* You will be redirected to the SignIn/SignUp page to again login

### Tweet
* You can click on the Tweet button to POST any new tweet 

## MongoDB Usage
* Create a .env file in the root dir of /server
* Create a Database in the mongodb and replace the empty "" in the `.env` as the value for `MONGODB_URL` as string.

## AWS Usage 
* Create a AWS S3 bucket
* Navigate to `/server/API/Image/index.js/Router.post("/")`
* Replace value of `Bucket`'s value with `your_bucket_name` in `bucketOptions`
* Navigate to `.env` and add your `AWS_ACCESS_KEY_ID` & `AWS_SECRET_ACCESS_KEY` as the string values of these variables 
