import { handler } from './build/handler.js';
import express from 'express';

const app = express();

// Set headers for all responses, including static files
app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
  next();
});

// Serve static files and SvelteKit app
app.use(handler);

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
