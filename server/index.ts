import express from 'express';
import cors from 'cors';
import keyRoutes from './routes/keyRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use('/api', keyRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});