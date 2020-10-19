module.exports = {
  apps: [
    {
      name: "workshops-on-demand",
      script: "npm",
      args: "start",
      interpreter: "none",
      env: {
        NODE_ENV: "development"
      }
    }
  ]
};
