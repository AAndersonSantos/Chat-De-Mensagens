//Instância única do Redis
import Redis from 'ioredis';
const redis = new Redis();

export default redis;