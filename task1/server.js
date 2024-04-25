const MongoClient = require('mongodb').MongoClient;
const md5 = require('md5');
const url = 'mongodb://localhost:27017';
const usersData = [
    {
        firstName: 'sam',
        lastName: 'doe',
        email: 'john1@example.com',
        password: 'password1',
        dob: '1990-01-01',
        mobileNo: '1234567890'
    },
    {
        firstName: 'will',
        lastName: 'Doe',
        email: 'jane2@example.com',
        password: 'password2',
        dob: '1995-06-15',
        mobileNo: '9876543210'
    },
    {
        firstName: 'adam',
        lastName: 'Doe',
        email: 'jane3@example.com',
        password: 'password3',
        dob: '1995-07-15',
        mobileNo: '9876543210'
    },
    {
        firstName: 'vick',
        lastName: 'Doe',
        email: 'jane4@example.com',
        password: 'password4',
        dob: '1995-08-15',
        mobileNo: '9876543210'
    },
    {
        firstName: 'zach',
        lastName: 'Doe',
        email: 'jane5@example.com',
        password: 'password5',
        dob: '1995-05-15',
        mobileNo: '9876543210'
    }
];

const dbName = 'mydb';

const client = new MongoClient(url);

client.connect(function(err) {
    if (err) {
        console.error("Failed to connect to MongoDB:", err);
        return;
    }
    console.log("Connected successfully to server");

    const db = client.db(dbName);

    const usersCollection = db.collection('Users');
    // Adding whole object array into mongodb collection
    usersCollection.insertMany(usersData, function(err, result) {
        if (err) {
            console.error("Failed to insert users:", err);
            return;
        }
        console.log("Inserted", result.insertedCount, "users into Users collection");

        const userProfileCollection = db.collection('UsersProfile');
        const insertedUsers = result.insertedIds.map((id, index) => ({ _id: id, user: usersData[index] }));
        const userProfileData = usersData.map(user => ({
            user_id: result.insertedIds[usersData.indexOf(user)],
            dob: user.dob,
            Mobile_no: user.mobileNo
        }));
        userProfileCollection.insertMany(userProfileData, function(err, result) {
            if (err) {
                console.error("Failed to insert users' profiles:", err);
                return;
            }
            console.log("Inserted", result.insertedCount, "user profiles into UsersProfile collection");
            client.close();
            
        });
        
    });
    
});
