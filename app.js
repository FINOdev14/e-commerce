const express = require('express')
const {connect} = require('mongoose')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
dotenv.config()

const db = process.env.MONGOURI ||  'mongodb://localhost:27017/e-commerce'

const connectDb = async () => {
  try {
    await connect(db)
    console.log('DB CONNECTED..');
  } catch (error) {
    console.error('DB CONNECTION ERROR:', error);
  }
}

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`e-commerce ready at port: http://localhost:${PORT}/graphql`);
  connectDb();
})


