module.exports = {
  apps: [
    // Konfigurasi Queue Worker
    {
      name: "ajp-worker",
      script: "artisan",
      args: "queue:work --sleep=3 --tries=3 --max-time=3600",
      interpreter: "php",
      instances: 1,
      autorestart: true,
    },
    // Konfigurasi Inertia SSR
    {
      name: "ajp-ssr",
      script: "artisan",
      args: "inertia:start-ssr",
      interpreter: "php",
      instances: 1,
      autorestart: true,
    }
  ],
};