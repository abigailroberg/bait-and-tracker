const router = require('express').Router();
const { generateUploadURL } = require('../s3');

router.get('/s3URL', async (req, res) => {
    const url = await generateUploadURL()
    res.send({url})
})

module.exports = router;