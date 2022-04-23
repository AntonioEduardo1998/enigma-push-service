import { NestFactory } from '@nestjs/core';
import { EnigmaModule } from './enigma.module';

async function bootstrap() {
  const app = await NestFactory.create(EnigmaModule);
  await app.listen(3000);
}
bootstrap();
