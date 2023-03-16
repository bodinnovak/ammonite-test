import { NestFactory } from '@nestjs/core';
import { SeedModule } from '../modules/seed.module';
import { SeedService } from '../services/seed.service';

(async () => {
  const app = await NestFactory.create(SeedModule);

  await app.get(SeedService).run();

  await app.close();
})();
