import express, { Request, Response, Application } from 'express';
import cors from 'cors';
import { db } from './src/database/drizzle/db';
import { customers, perfumes, transactions } from './src/database/drizzle/schema/data';
import userRoutes from './src/feature/users/users.routes';

const app: Application = express();

app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true,
}));
app.use(express.json());

app.get('/ping', (req: Request, res: Response) => {
  res.send({ message: 'Pong!' });
});

app.get('/api', (req: Request, res: Response) => {
  res.send({ message: 'Hello from Express!' });
});

// Mount the users routes
app.use('/user-management/users', userRoutes);

app.get('/customer-management/customers', async (req: Request, res: Response) => {
  const allCustomers = await db.select().from(customers);
  res.json(allCustomers);
});

app.get('/customer-management/customers/:id', async (req: Request, res: Response) => {
  const allCustomers = await db.select().from(customers);
  res.json(allCustomers);
});

app.get('/perfumes-management/perfumes', async (req: Request, res: Response) => {
  const allPerfumes = await db.select().from(perfumes);
  res.json(allPerfumes);
});

app.get('/perfumes-management/perfumes/:id', async (req: Request, res: Response) => {
  const allPerfumes = await db.select().from(perfumes);
  res.json(allPerfumes);
});

app.get('/transactions-management/transactions', async (req: Request, res: Response) => {
  const allTransactions = await db.select().from(transactions);
  res.json(allTransactions);
});

app.get('/transactions-management/transactions/:id', async (req: Request, res: Response) => {
  const allTransactions = await db.select().from(transactions);
  res.json(allTransactions);
});

const PORT = process.env.NODE_PORT || 3002;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));