import { PrismaClient } from '@prisma/client';
import app from './app';

const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000


const startServers = async () => {
    try {
        await prisma.$connect();
        console.log('database connected');
        app.listen(PORT, () => { console.log(`server running on port ${PORT}`) });
    } catch (err) {
        console.error('Error starting servers:', err);
    }
}
startServers();
