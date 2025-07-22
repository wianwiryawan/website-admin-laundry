import express, { Request, Response, Application } from 'express';
import cors from 'cors';
import userRoutes from './src/feature/users/users.route';
import customerRoutes from './src/feature/customers/customers.route';
import laundryRoutes from './src/feature/laundry-services/laundry-services.route';
import perfumesRoutes from './src/feature/perfumes/perfumes.route';
import transactionRoutes from './src/feature/transactions/transactions.route';

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
app.use('/users-management/users', userRoutes);

// Mount the customer routes
app.use('/customers-management/customers', customerRoutes);

// Mount the laundry routes
app.use('/laundrys-service-management/laundry-service', laundryRoutes);

// Mount the perfume routes
app.use('/perfumes-management/perfumes', perfumesRoutes);

// Mount the transaction routes
app.use('/transactions-management/transactions', transactionRoutes);

const PORT = process.env.NODE_PORT || 3002;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));