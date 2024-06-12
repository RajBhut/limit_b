import express from 'express';
import cors from 'cors';
import router1 from './router.js';

const app = express();

cors({origin: 'http://localhost:3000'});
app.use(cors());
app.get('/', (req, res) => {
  res.send('Hello ');
});
app.use('/api', router1);
app.listen(3000, () => {    
  
    console.log('Server is running at http://localhost:3000');
   
    });