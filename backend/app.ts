import express, { Request, Response, Application } from 'express';
import cors from 'cors';
import authLoginRoutes from './src/api/auth/login/route';
// import authRegisterRoutes from './src/api/auth/register/route';
import userRoutes from './src/api/users/route';
import customerRoutes from './src/api/customers/route';
import laundryRoutes from './src/api/laundry-services/route';
import perfumesRoutes from './src/api/perfumes/route';
import transactionRoutes from './src/api/transactions/route';

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

// Mount the auth login routes
app.use('/api/auth/login', authLoginRoutes);

// Mount the auth register routes
// app.use('/api/auth/register', authRegisterRoutes); // unused for now, can be implemented later when needed

// Mount the users routes
app.use('/api/users', userRoutes);

// Mount the customer routes
app.use('/api/customers', customerRoutes);

// Mount the laundry routes
app.use('/api/laundry-services', laundryRoutes);

// Mount the perfume routes
app.use('/api/perfumes', perfumesRoutes);

// Mount the transaction routes
app.use('/api/transactions', transactionRoutes);

const PORT = process.env.NODE_PORT || 3002;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));