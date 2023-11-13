const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3010;

app.use(express.static('static'));

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()
// use `prisma` in your application to read and write data in your DB



app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

const users = express.Router();
app.use('/users', users);

users.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/user.html'));
});

users.get('/createContact/:name', async(req, res) => {
  const user = await prisma.monsite_test.create({

    data: {
  
      id: 1,
  
      email: req.params.name + "@gmail.com",
  
      name: req.params.name,
  
    },
  
  })
})

users.get('/createContact/:name', async(req, res) => {
  const userByName = await prisma.monsite_test.findFirst({

    where: {
  
      name: {
  
        startsWith: 'Ada'
  
      }
  
    },
  
  })
})



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
