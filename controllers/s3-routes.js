const router = require('express').Router();
const generateUploadURL = require('../s3');

router.get('/', async (req, res) => {
    const url = await generateUploadURL()
    console.log(url);
    res.send({url})
})

module.exports = router;