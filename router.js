const express = require('express');
const router = express.Router();

router.get('/', (request, response) => {
	response.send('Sever is up and running');
})

module.exports = router;