const app = require('express')();
const takePhoto = require('./index.js');

port = process.env.PORT || 3000


app.get('/', async (req, res, next) => {
    await takePhoto(req.query);
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