import * as express from 'express';
import * as socket from "socket.io";
import * as cors from "cors";

const app = express();

app.use(cors({ origin: "*" }));

// @ts-ignore
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', "false");
    next();
});

// @ts-ignore
app.get('/' , (req: express.Request, res: express.Response) => {
   res.send('hello world');
});

const server = app.listen(3001);

const io = socket(server);
io.on('connection', (socket) => {
    socket.on('SEND_MESSAGE', (data) => {
        io.emit('RECEIVE_MESSAGE', data);
    })
})
