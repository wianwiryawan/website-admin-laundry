import express, { Request, Response, Application } from 'express';
import cors from 'cors';
import { db } from './src/database/drizzle/db';
import { users } from './src/database/drizzle/schema/data';

const app: Application = express();
app.use(cors());
app.use(express.json());

app.get('/ping', (req: Request, res: Response) => {
  res.send({ message: 'Pong!' });
});

app.get('/api', (req: Request, res: Response) => {
  res.send({ message: 'Hello from Express!' });
});

app.get('/api/users', async (req: Request, res: Response) => {
  const allUsers = await db.select().from(users);
  res.json(allUsers);
});

app.post('/add-user', async (req: Request, res: Response) => {
  const { username, status, email } = req.body;
  await db.insert(users).values({ username, status, email });
  res.send({ success: true });
});

const PORT = process.env.NODE_PORT || 3002;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

console.log(process.env.NODE_PORT);