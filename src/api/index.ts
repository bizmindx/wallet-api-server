import { Router } from 'express';
import wallet from './routes/wallet';

export default () => {
	const app = Router();
	wallet(app);
	return app
}