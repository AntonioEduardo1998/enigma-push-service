import { NestFactory } from '@nestjs/core';
import { EnigmaModule } from './enigma.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(EnigmaModule);

  const config = new DocumentBuilder()
    .setTitle('Enigma API')
    .setDescription('The Enigma API')
    .setVersion('1.0')
    .addTag('enigma')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
