const app = require('express')();
const takePhoto = require('./index.js');
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

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})