import { CACHE_MANAGER } from '@nestjs/cache-manager';
import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisService {
  private logger = new Logger(RedisService.name);
  private readonly KEY_PREFIX = 'NESTJS::GLOBAL';
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  /**
   * Store data in Redis cache
   * @param key - The cache key
   * @param value - The data to store
   * @param ttl - Time-to-live (TTL) in seconds (default: 3600s)
   */
  async createOrUpdate<T>(
    key: string,
    value: T,
    ttl: number = 3600,
  ): Promise<void> {
    try {
      await this.cacheManager.set(this.KEY_PREFIX + key, value, ttl);
      this.logger.log(`✅ Cache set: [${key}]`);
    } catch (error) {
      this.logger.error(`❌ Failed to set cache [${key}]:`, error);
      throw new InternalServerErrorException('Error setting cache');
    }
  }

  /**
   * Retrieve data from Redis cache
   * @param key - The cache key
   * @returns The cached value or undefined if not found
   */
  async get<T>(key: string): Promise<T | undefined> {
    try {
      const value = await this.cacheManager.get<T>(this.KEY_PREFIX + key);
      if (value) {
        this.logger.log(`🔍 Cache hit for key [${key}]`);
      } else {
        this.logger.warn(`⚠️ Cache miss for key [${key}]`);
      }
      return value;
    } catch (error) {
      this.logger.error(`❌ Error fetching cache key [${key}]:`, error);
      throw new InternalServerErrorException('Failed to get cache');
    }
  }
  /**
   * Get all cache keys matching a pattern (only works with Redis)
   * @param pattern - Key pattern to search (e.g., "user:*")
   * @returns Array of matching keys
   */
  async findKeys(pattern: string): Promise<string[]> {
    try {
      const redisClient = (this.cacheManager as any).store.getClient(); // Get Redis client
      const keys = await redisClient.keys(this.KEY_PREFIX + pattern);
      return keys.map((key: any) => key.replace(this.KEY_PREFIX, ''));
    } catch (error) {
      this.logger.error(
        `❌ Error finding cache keys with pattern [${pattern}]:`,
        error,
      );
      return [];
    }
  }

  /**
   * Delete all cache keys matching a pattern
   * @param pattern - Key pattern to delete
   */
  async deleteByPattern(pattern: string): Promise<void> {
    try {
      const keys = await this.findKeys(pattern);
      await this.deleteMany(keys);
      this.logger.log(`🗑️ Deleted keys matching pattern: [${pattern}]`);
    } catch (error) {
      this.logger.error(
        `❌ Error deleting keys by pattern [${pattern}]:`,
        error,
      );
      throw new InternalServerErrorException('Error deleting keys by pattern');
    }
  }
  /**
   * Check if a cache key exists
   * @param key - The cache key
   * @returns Boolean indicating whether the key exists
   */
  async exists(key: string): Promise<boolean> {
    try {
      const value = await this.cacheManager.get(this.KEY_PREFIX + key);
      return value !== undefined;
    } catch (error) {
      this.logger.error(
        `❌ Error checking existence of cache [${key}]:`,
        error,
      );
      return false;
    }
  }

  /**
   * Delete multiple cache keys
   * @param keys - Array of cache keys to delete
   */
  async deleteMany(keys: string[]): Promise<void> {
    try {
      await Promise.all(
        keys.map((key) => this.cacheManager.del(this.KEY_PREFIX + key)),
      );
      this.logger.log(`🗑️ Deleted multiple cache keys: ${keys.join(', ')}`);
    } catch (error) {
      this.logger.error(`❌ Error deleting multiple cache keys:`, error);
      throw new InternalServerErrorException(
        'Error deleting multiple cache keys',
      );
    }
  }

  /**
   * Delete a specific cache entry
   * @param key - The cache key to delete
   */
  async delete(key: string): Promise<void> {
    try {
      await this.cacheManager.del(this.KEY_PREFIX + key);
      this.logger.log(`🗑️ Cache deleted for key: [${key}]`);
    } catch (error) {
      this.logger.error(`❌ Error deleting cache key [${key}]:`, error);
      throw new InternalServerErrorException('Failed to delete cache');
    }
  }

  /**
   * Clear all cached data (Use with caution)
   */
  async reset(): Promise<void> {
    try {
      await this.cacheManager.reset();
      this.logger.warn('⚠️ All cache cleared.');
    } catch (error) {
      this.logger.error(`❌ Error resetting cache:`, error);
      throw new InternalServerErrorException('Failed to reset cache');
    }
  }
}
