/* eslint-disable no-undef */
import Redis from "ioredis-mock";

jest.mock("ioredis", () => {
    if (typeof Redis === "object") {
        return {
            Command: { _transformer: { argument: {}, reply: {} } },
        };
    }
    return function (...args) {
        return new Redis(args);
    };
});
