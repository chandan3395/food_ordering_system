import 'dotenv/config';
import app from './app.js';
import connectDB from './config/db.js';
import seedDefaults from './utils/seedDefaults.js';

const PORT = Number(process.env.PORT) || 5000;

const startServer = async () => {
  try {
    await connectDB();
    await seedDefaults();

    app.listen(PORT, () => {
      console.log(`Bites server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();
