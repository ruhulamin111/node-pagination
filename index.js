const express = require('express');
const app = express()
const port = process.env.PORT || 5000;
const cors = require('cors');
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('paginattion server')
})
app.listen(port, () => {
    console.log('pagination server running');
})

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.zjrcntk.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect()
        const pageCollection = client.db('pages').collection('item')
        console.log('database connected');

        app.post('/products', async (req, res) => {
            const product = req.body;
            if (!product.name || !product.price) {
                return res.send({ success: false, error: 'Please provide valid information' })
            }
            const result = await pageCollection.insertOne(product)
            res.send(result)
        })

    }
    catch (error) {
        console.log(error);
    }
    finally {

    }
}
run().catch(console.dir)