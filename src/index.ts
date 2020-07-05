import express from 'express';
const app = express();
import fs from 'fs';
const fsp = fs.promises;
const HOST = '0.0.0.0'; 
const PORT = 8080;

app.get('/async', async (req, res) => {
    fs.readFile('data/file.csv', (err, data) => {
        if (err) throw err;

        res.send({
            statusCode: 200,
            body: { 
                resp: data.toString('utf8').slice(0,10),
                success: true
            }
        });
    });
});

app.get('/asyncprom', async (req, res) => {
    const data = await fsp.readFile('data/file.csv');

    res.send({
        statusCode: 200,
        body: { 
            resp: data.toString('utf8').slice(0,10),
            success: true
        }
    })
});

app.get('/sync', (req, res) => {
    const data = fs.readFileSync('data/file.csv');

    res.send({
        statusCode: 200,
        body: { 
            resp: data.toString('utf8').slice(0,10),
            success: true
        }
    })
});

app.listen(PORT, HOST, () => {
    console.log(
      `Server ready at http://${HOST}:${PORT}`);
});