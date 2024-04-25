# Create a server on NodeJs and create two collections in mongodb (don’t use mongoose) Users and UsersProfile
## Task 1 
### Users should have following keys
first name
Last name	
email	
password (this should be encrypted using md5)


## UsersProfile will have following keys

user_id (this will be the mongodbid object from users table)
dob 	
Mobile_no


1. Write a code in node to insert 5 users. Take json of dummy data for users.
Basically make an array of JSON of user data and loop over it and insert the data.
2. It’s important to fill in user_id properly.

## Task 2
After you do the above, i.e insert data into users and userprofile collection.

1. Create a GET API in nodejs that will find the average age of all users and return the result.
 	
2. Create another GET API that will find and delete users who’s age is more than 25 yrs from the database, deleted data needs to be deleted from .
