import express from 'express';
import path from 'path';
import Buffer from 'Buffer'
import Axios from 'axios';
import dotenv from 'dotenv'
dotenv.config()


const hostname = '127.0.0.1'
const port = 3000
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

const app = express()
app.use(express.static(path.join(__dirname, '../public')))
app.get('/rrd', (_req, res) => {
    Axios.get(process.env.BASE_URL + "/api/1.1.0/graphs/" + process.env.GRAPH_ID, {
        auth: {
            username: process.env.USERNAME,
            password: process.env.PASSWORD
        }
    })
    .then(response => {
        let buf = Buffer.from(response.data.data, "base64");
        res.writeHead(200, {
            'Content-disposition': 'attachment;filename=data.rrd',
            'Content-Length': buf.length
        });
        res.end(buf);
    })
    .catch(error => {
        console.log(error);
    })
})

app.listen(port, () => console.log(`Server running at http://${hostname}:${port}/`))