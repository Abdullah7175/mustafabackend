module.exports = {
  apps: [
    {
      name: "mustafa-backend",
      cwd: "/var/www/mustafatravel/backend",
      script: "server.js",
      interpreter: "node",
      instances: 1,
      exec_mode: "fork",
      watch: false,
      ignore_watch: [".git", "node_modules", "logs", "*.log"],
      env: {
        NODE_ENV: "production",
        PORT: 7000,
        HOST: "0.0.0.0"
      },
      error_file: "/var/www/mustafatravel/backend/logs/backend-error.log",
      out_file: "/var/www/mustafatravel/backend/logs/backend-out.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss Z",
      merge_logs: true,
      autorestart: true,
      max_restarts: 10,
      min_uptime: "10s",
      max_memory_restart: "1G"
    }
  ]
};

