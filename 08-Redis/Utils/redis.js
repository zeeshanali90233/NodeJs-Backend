import { createClient } from 'redis';
import dotenv from 'dotenv';
dotenv.config();

const redisClient = createClient({
	username: process.env.REDIS_USERNAME,
	password: process.env.REDIS_PASSWORD,
	socket: {
		host: process.env.REDIS_HOST,
		port: process.env.REDIS_PORT ? Number(process.env.REDIS_PORT) : undefined,
	},
});

redisClient.on('error', (err) => console.error('Redis Client Error', err));

export const connectRedis = async () => {
	if (!redisClient.isOpen) {
		await redisClient.connect();
	}
    console.log("Connected to Redis");
};

export const setCache = async (key, value, expireSeconds = 3600) => {
	await redisClient.set(key, JSON.stringify(value), {
		EX: expireSeconds,
	});
};

export const getCache = async (key) => {
	const data = await redisClient.get(key);
	return data ? JSON.parse(data) : null;
};

export default redisClient;
