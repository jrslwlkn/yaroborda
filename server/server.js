const express = require('express');
const cors = require('cors');
require('dotenv').config();
const helmet = require('helmet');
const bodyParser = require('body-parser');

const cloudinary = require('cloudinary').v2;

// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.API_KEY,
//   api_secret: process.env.API_SECRET,
// });

const knex = require('knex')({
  client: process.env.DB_CLIENT,
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  },
});

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(helmet());

// GET all boards name, url and topic
app.get('/', (req, res) => {
  knex
    .select('*')
    .from('board')
    .then(data => {
      if (!data[0]) {
        res.status(404).send({ error: 'No boards found...' });
      } else res.send(data);
    });
});

// GET all threads from the board - list of objects
app.get('/board/:board', (req, res) => {
  knex
    .select('*')
    .from('thread')
    .where('board', req.params.board)
    .orderBy('last_post', 'desc')
    .limit(100)
    .then(data => {
      if (!data[0]) {
        res.status(404).send({ error: 'No threads found on this board' });
      } else {
        res.send(data);
      }
    });
});

// GET the thread's posts - list of objects
app.get('/thread/:board/:thread', (req, res) => {
  knex
    .select('*')
    .from('post')
    .where({
      thread: req.params.thread,
      board: req.params.board,
    })
    .orderBy('timestamp', 'esc')
    .then(data => {
      if (!data[0]) {
        res.status(404).send({ error: 'No posts to this thread found' });
      } else res.send(data);
    });
});

// GET OP thread by id - object
app.get('/op/:board/:thread', (req, res) => {
  knex
    .select('*')
    .from('thread')
    .where('id', req.params.thread)
    .andWhere('board', req.params.board)
    .then(data => {
      if (!data[0]) {
        res.status(404).send({ error: 'Thread not found' });
      } else res.send(data[0]);
    });
});

// GET the last post for the thread - object, if no posts found -> empty object
app.get('/lastpost/:board/:thread', (req, res) => {
  knex('post')
    .where({
      thread: req.params.thread,
      board: req.params.board,
    })
    .orderBy('timestamp', 'desc')
    .limit(1)
    .then(data => {
      if (!data[0]) {
        res.send({});
      } else res.send(data[0]);
    });
});

// POST a new thread
app.post('/newthread/:board', (req, res) => {
  if (!req.body.text || !req.body.img || !req.body.title)
    res.status(400).send({ error: 'Please fill out all fields' });
  knex('thread')
    .insert([
      {
        text: req.body.text,
        img: req.body.img,
        title: req.body.title,
        board: req.params.board,
        img_height: req.body.img_height,
        img_width: req.body.img_width,
        img_byte_size: req.body.img_byte_size,
      },
    ])
    .returning('*')
    .then(data => res.send(data[0]))
    .catch(error => res.send({ error }));
});

// POST a new post
app.post('/newpost/:board/:thread', (req, res) => {
  if (!req.body.text.trim()) res.status(400).send({ error: 'Post cannot be empty' });
  knex('post')
    .insert([
      {
        text: req.body.text,
        img: req.body.img,
        sage: req.body.sage,
        thread: req.params.thread,
        board: req.params.board,
      },
    ])
    .returning('*')
    .then(data => res.send(data[0]))
    .catch(error => res.send({ error }));
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server is running on port ${port}`));
