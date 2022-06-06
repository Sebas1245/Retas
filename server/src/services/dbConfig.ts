
   
import mongoose from "mongoose";

function setupMongoDB() {    
    mongoose.connect(getMongoDBURI())
        .then(() => console.log('Connection successful'))
        .catch(err => console.log('Error in connection to db :', err))

    mongoose.connection.on('error', error => console.log(`Connection to database failed: ${error}`));
    mongoose.connection.on('connected', () => console.log(`Connected to database`));
    mongoose.connection.on('disconnected', () => console.log(`Disconnected from database`));
}

function getMongoDBURI() : string {
    if (process.env.NODE_ENV === 'test' && process.env.MONGODB_URI_TEST) 
        return process.env.MONGODB_URI_TEST
    else if (process.env.NODE_ENV === 'dev' && process.env.MONGODB_URI_DEV) 
        return process.env.MONGODB_URI_DEV
    else if (process.env.NODE_ENV === 'prod'  && process.env.MONGODB_URI_PROD) 
        return process.env.MONGODB_URI_PROD;
    return 'No URI can be defined';
}

export default setupMongoDB;