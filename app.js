const app = require('express')();
const takePhoto = require('./index.js');
const miner = require('./miner.js');

port = process.env.PORT || 3000

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