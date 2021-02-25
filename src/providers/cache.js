import Redis from "ioredis";

import cacheConfig from "../configurations/cache";

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
            console.log("Redis error");
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
            console.log("Redis error");
        }
    }

    listen() {
        this.client.on("connect", () => {
            console.log("Redis client connected");
        });

        this.client.on("error", () => {
            console.log("Something went wrong on Redis");
        });
    }
}

export default new CacheConnector();
