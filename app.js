/**
 * Created by Shainkey on 16-10-2019.
 */
const express = require('express');
const fetch = require("node-fetch");
const parser = require('xml2json');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');


const app = express();
app.use(cors())
app.use(bodyParser.json({ extended: true }));
app.use('/', express.static(path.join(__dirname, '../public')));

app.get('/newsFeed',(req, res)=>{

    fetch('http://feeds.bbci.co.uk/news/rss.xml')
    .then(function(result) {
        return result.text()
    })  
    .then(function(data) {
    let { rss } = JSON.parse(parser.toJson(data))
    let { channel } = rss;
    let { item } = channel;
    res.status(200).send(item)
    })
    .catch(function(err) {
      return res.status(404).send('data not found !')
    });
})

app.post('/getNewsFeed',(req,res)=>{
    let { address } = req.body;
    fetch(address)
    .then(function(result) {
       return result.text()
    })  
   .then(function(data) {
   let {rss} = JSON.parse(parser.toJson(data))
   let {channel} = rss;
   res.status(200).send(channel.item)
   })
   .catch(function(err) {
   return res.status(404).send("not found")
   });
})

    app.get('/*', (req, res) => {
      res.sendFile(path.join(__dirname, './public/build/index.html'));
    });

app.listen(8000, () => console.log(`Stack listening on port 8000`));
