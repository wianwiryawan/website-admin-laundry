import express, { Request, Response, Application } from 'express';
import cors from 'cors';
import { db } from './src/database/drizzle/db';
import { perfumes, transactions } from './src/database/drizzle/schema/data';
import userRoutes from './src/feature/users/users.route';
import customerRoutes from './src/feature/customers/customers.route';
import laundryRoutes from './src/feature/laundry-services/laundry-services.route';
import perfumesRoutes from './src/feature/perfumes/perfumes.route';

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

// Mount the customer routes
app.use('/customer-management/customers', customerRoutes);

// Mount the laundry routes
app.use('/laundry-service-management/laundry-service', laundryRoutes);

// Mount the perfume routes
app.use('/perfumes-management/perfumes', perfumesRoutes);

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