const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();


const {BlogPosts} = require('./models');

BlogPosts.create('Moose', 'I saw a moose', 'Clayton')
BlogPosts.create('Liar', 'Sorry I lied in my last post... I\'ve never seen a moose', 'also clayton')

router.get('/', (req, res) => {
  res.json(BlogPosts.get())
})

router.post('/', jsonParser, (req, res) => {
  const requiredFields = ['title', 'content', 'author']
  requiredFields.forEach(requirement => {
    if(!(requirement in req.body)){
      let message = `Oops you're missing the ${requirement}`
      console.log(message)
      return res.status(400).send(message)
    }
  })
  const item = BlogPosts.create(req.body.title, req.body.content, req.body.author, req.body.publishDate)
  res.status(204).json(item)
})

router.put('/:id', jsonParser, (req, res) => {
  const requiredFields = ['title', 'content', 'author', 'id']
  if(req.params.id !== req.body.id){
    const message = `Your params and body id have to match`
    console.log(message)
    return res.status(400).send(message)
  }
  requiredFields.forEach(requirement => {
    if(!(requirement in req.body)){
      const message = `Oops you're missing the ${requirement}`
      console.log(message)
      return res.status(400).send(message)
    }
  })
  BlogPosts.update(req.body)
  res.status(204).end()
})

router.delete('/:id', (req, res) => {
  console.log(`Deleted blog post ${req.params.id}`)
  BlogPosts.delete(req.params.id)
  res.status(204).end()
})

module.exports = router