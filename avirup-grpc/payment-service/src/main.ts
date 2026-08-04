import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app/app.module";
import Consul from "consul"; 

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = 3005;
  const consul = new Consul({
    host: "localhost",
    port: 8500,
  });

  const serviceId = "payment-unique-id-1";
  const registratinDetails = {
    name: "payment-service",
    address: "host.docker.internal",
    port: port,
    id: serviceId,
    check: {
      name: 'payment-service-health',
      http: `http://host.docker.internal:${port}/api/health`,
      interval: "10s",
      timeout: "5s",
    },
  }

  await app.listen(port, '0.0.0.0');
  await consul.agent.service.register(registratinDetails);
  process.on("SIGINT", async () => {
    await consul.agent.service.deregister(serviceId);
    process.exit();
  });

  console.log(`Payment Service is Running on port ${port} and registered in Consul`)
} 

bootstrap();