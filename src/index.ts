import Monitoring from "./Monitoring";
import express from 'express';
import path from "path";

async function main() {

    const mon = new Monitoring();
    await mon.start()

    // Graceful shutdown for WebSocket cleanup
    process.on('SIGINT', async () => {
        console.log('Received SIGINT. Cleaning up...');
        mon.cleanup()
        process.exit(0);
    });

    process.on('SIGTERM', async () => {
        console.log('Received SIGTERM. Cleaning up...');
        mon.cleanup()
        process.exit(0);
    });
}


main().catch(error => console.error('Main function error:', error));

// Set up Express server
const app = express();
const PORT = process.env.PORT || 8080;

app.use('/models', express.static(path.join(__dirname, '/models/ml')));

app.get('/', (req, res) => {
    res.send('Server is running.');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});