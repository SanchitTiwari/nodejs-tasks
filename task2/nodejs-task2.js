const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://127.0.0.1/';
const dbName = 'mydb';

const app = express();
const port = 3000;

app.use(express.json());

MongoClient.connect(url, function(err, client) {
    if (err) {
        console.error("Failed to connect to MongoDB:", err);
        return;
    }
    console.log("Connected successfully to MongoDB");

    const db = client.db(dbName);
    const usersCollection = db.collection('Users');

    app.get('/averageAge', (req, res) => {
        usersCollection.aggregate([
            {
                $project: {
                    age: {
                        $floor: {
                            $divide: [
                                {
                                    $subtract: [new Date(), "$dob"]
                                },
                                31557600000
                            ]
                        }
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    averageAge: {
                        $avg: "$age"
                    }
                }
            }
        ]).toArray((err, result) => {
            if (err) {
                console.error("Failed to find average age:", err);
                res.status(500).send("Internal Server Error");
                return;
            }
            res.json({ averageAge: result[0].averageAge });
        });
    });

    app.get('/deleteOldUsers', (req, res) => {
        usersCollection.find({ dob: { $lt: new Date(new Date() - 25 * 31557600000) } }).toArray((err, users) => {
            if (err) {
                console.error("Failed to find old users:", err);
                res.status(500).send("Internal Server Error");
                return;
            }
            const userIdsToDelete = users.map(user => user._id);
            usersCollection.deleteMany({ _id: { $in: userIdsToDelete } }, (err, result) => {
                if (err) {
                    console.error("Failed to delete old users:", err);
                    res.status(500).send("Internal Server Error");
                    return;
                }
                res.json({ deletedCount: result.deletedCount });
            });
        });
    });

    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
});
