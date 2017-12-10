const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const Nexmo = require("nexmo");
const socket = require("socket.io");

//nexmo setup
const nexmo = new Nexmo({
    apiKey: '/*your api*/',
    apiSecret: '/*your api secret*/'
}, {debug : true});



const app = express();
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);


app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));


app.get('/',(req, res)=>{
    res.render('index');
});
//catch form
app.post('/', (req,res)=>{
    // res.send(req.body);
    console.log(req.body);
    var number = req.body.number;
    var text = req.body.text;
    
    nexmo.message.sendSms(
            'Nexmo', number, text, 
            (err, resData)=>{
                 if(err){
                     console.log(err);
                 }
                 else{
                     console.log(resData);
                     const data = {
                         id : resData.messages[0]['message-id'],
                         number : resData.messages[0]['to']
                     }
                     
                     io.emit('smsStatus', data);
                 }
            }
        );
});


const server = app.listen(process.env.PORT, process.env.IP,()=>{
   console.log('App is running');
});

//socket conection
const io = socket(server);
io.on('connection', (socket)=>{
    console.log('connected');
    io.on('disconnect', ()=>{
        console.log('disconnected');
    });
});