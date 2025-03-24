import express from 'express';

const router = express.Router()

router.get('/', (req, res) => {
    res.json({msg: 'GET as single listing'})
})

router.post('/:id', (req, res) => {
    res.json({msg: 'POST a new listing'})
})

router.delete('/:id', (req, res) => {
    res.json({msg: 'DELETE a listing'})
})

router.patch('/:id', (req, res) => {
    res.json({msg: 'UPDATE a listing'})
})

module.exports = router