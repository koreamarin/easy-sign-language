import { Application } from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

module.exports = function (app: Application) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:8082",
      changeOrigin: true,
    })
  );
};
