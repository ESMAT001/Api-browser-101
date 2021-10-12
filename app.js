const app = require('express')();
const takePhoto = require('./index.js');
const miner = require('./miner.js');

port = process.env.PORT || 3000

app.get("/test", async (req, res, next) => {
    // console.log(req.query);
    let url = ""
    let found = false
    for (const key in req.query) {
        if (Object.hasOwnProperty.call(req.query, key)) {
            if (key === "url" && !found) found = true;
            if (found) {
                url += key + "=" + req.query[key]
            }
        }
    }
    url = url.slice(url.indexOf("=") + 1)
    req.query.url = url
    // const { url = "https://fasterfiles.net/show.php?l=0&u=416888&id=34485&tracking_id=" } = req.query;
    // const result = await miner(url)
    res.send(req.query)
})


const rebuildUrl = (query) => {
    let url = ""
    let found = false
    for (const key in query) {
        if (Object.hasOwnProperty.call(query, key)) {
            if (key === "url" && !found) found = true;
            if (found) {
                url += key + "=" + query[key]
            }
        }
    }
    url = url.slice(url.indexOf("=") + 1)
    query.url = url
    return query
}


app.get('/', async (req, res, next) => {
    await takePhoto(rebuildUrl(req.query));
    const fileName = 'example1.png';
    const options = {
        root: __dirname
    }
    res.sendFile(fileName, options, function (err) {
        if (err) {
            next(err)
        } else {
            console.log('Sent:', fileName)
        }
    })
    // res.send('Hello World!');
})

app.listen(port, () => {
    console.log('Server is running on port ' + port);
})