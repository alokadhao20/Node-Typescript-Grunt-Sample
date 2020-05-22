const MongoClient = require('mongodb').MongoClient;
export class Mongodb {
    private mongoUrl: string;
    private dbName: string;
    private db: any;
    private userCollection: any;

    constructor(mongoUrl: string, dbName: string) {
        this.mongoUrl = mongoUrl;
        this.dbName = dbName;
    }

    init(): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                const url =  this.mongoUrl;
                const client = await MongoClient.connect(url, {
                    useUnifiedTopology: true,
                    useNewUrlParser: true,
                });
                this.db = client.db(this.dbName);
                this.userCollection = this.db.collection('user');
                resolve();
            } catch (error) {
                console.log("Error in mongoInit:");
                return reject(error);
            }
        });
    }

    register() {
        return new Promise(async (resolve, reject) => {
            try {
                const userDetails = {
                    userName: 'Alok Adhao',
                    email: 'alokadhao@gmail.com'
                }
                const userAdded = await this.userCollection.insertOne({userDetails});
                resolve(userAdded);
            } catch(err) {
                return reject(err);
            }
        });
    }
}