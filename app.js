import express from 'express'
const app = express();
import fs from 'fs'
import path from 'path'

import takePhoto from './index.js';

import miner from './miner.js';


const port = process.env.PORT || 3000

const rebuildUrl = (query) => {
    let url = ""
    let found = false
    for (const key in query) {
        if (Object.hasOwnProperty.call(query, key)) {
            if (key === "url" && !found) found = true;
            if (found) {
                url += key + "=" + query[key]+"&"
            }
        }
    }
    if (url)
        url = url.slice(url.indexOf("=") + 1).slice(0,-1)

    query.url = url
    return query
}

app.get("/test", async (req, res, next) => {
    const { url = "https://fasterfiles.net/show.php?l=0&u=416888&id=34485&tracking_id=" } = rebuildUrl(req.query);
    console.log(url)
    const result = await miner(url)
    res.send({result})
})





app.get('/', async (req, res, next) => {
    const query = rebuildUrl(req.query)
    let {url, fromcache, save} = query

    if(fromcache === 'false') {
        fromcache = false
    } else {
        fromcache = true;
    }
    if(save === 'false') {
        save = false
    } else {
        save = true
    }


    const filename = `${url.replace(/\//g, '__')}.png`

    const files = fs.readdirSync('./images');

    if(fromcache && files.includes(filename)) {
        res.sendFile(path.resolve(`./images/${filename}`));
        return;
    }

    const image = await takePhoto(query);

    if(save) {
        fs.writeFileSync(`./images/${filename}`, image)
    }

    res.end(image)
    
    // const options = {
    //     root: __dirname
    // }
    // res.sendFile(fileName, options, function (err) {
    //     if (err) {
    //         next(err)
    //     } else {
    //         console.log('Sent:', fileName)
    //     }
    // })
    // res.send('Hello World!');
})

app.listen(port, () => {
    console.log('Server is running on port ' + port);
})