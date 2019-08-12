import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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
    app.enableCors({
        origin: [
            'http://localhost:4200', // angular
            'http://localhost:3000', // react
            'http://localhost:8080', // react-native
        ],
    });
    await app.listen(3001);
}

bootstrap();
