export default {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    clusterMode: process.env.CLUSTER_MODE,
    replicasetGroup: process.env.REPLICASET_GROUP,
};
