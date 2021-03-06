import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';

const port = process.env.PORT || 3001;

async function bootstrap() {
    const appOptions = {cors: true};
    const app = await NestFactory.create(ApplicationModule, appOptions);
    app.setGlobalPrefix('api');

    const options = new DocumentBuilder()
        .setTitle('NestJS API Example App')
        .setDescription('The NestJS API Example App')
        .setVersion('1.0')
        .setBasePath('api')
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('/docs', app, document);
    await app.listen(3001);
    Logger.log(`Server running on http://localhost:${port}`, 'Bootstrap');
}

bootstrap();
