import Redis from "ioredis";
import cacheConfig from "@configurations/cache";
import logger from "@utils/Logger";

class CacheConnector {
    constructor() {
        if (cacheConfig.clusterMode) {
            return this.loadCluster();
        }

        return this.loadStandalone();
    }

    loadCluster() {
        try {
            this.client = new Redis({
                sentinels: [
                    {
                        host: cacheConfig.host,
                        port: cacheConfig.port,
                    },
                ],
                name: cacheConfig.replicasetGroup,
            });

            this.listen();
            return this.client;
        } catch (e) {
            logger.error("Redis error");
        }
    }

    loadStandalone() {
        try {
            this.client = new Redis({
                host: cacheConfig.host,
                port: cacheConfig.port,
            });

            this.listen();
            return this.client;
        } catch (e) {
            logger.error("Redis error", e);
        }
    }

    listen() {
        this.client.on("connect", () => {
            logger.info("Redis client connected");
        });

        this.client.on("error", () => {
            logger.error("Something went wrong on Redis");
        });
    }
}

export default new CacheConnector();
