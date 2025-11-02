import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Enable CORS
  app.enableCors({
    origin: ['http://localhost:3001', 'http://localhost:5173'],
    credentials: true,
  });

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // API prefix
  const apiPrefix = configService.get('API_PREFIX') || 'api/v1';
  app.setGlobalPrefix(apiPrefix);

  // Swagger documentation
  const config = new DocumentBuilder()
    .setTitle('Enterprise IT Optimization Platform API')
    .setDescription(
      'AI-powered analytics solution for IT resource optimization, cost reduction, and workflow efficiency',
    )
    .setVersion('1.0')
    .addTag('Authentication', 'User authentication and authorization')
    .addTag('Licenses', 'Software license optimization and management')
    .addTag('Workflows', 'Workflow automation efficiency analysis')
    .addTag('Hardware', 'Hardware utilization tracking')
    .addTag('Storage', 'Storage capacity and optimization')
    .addTag('Overlap', 'Feature overlap detection across solutions')
    .addTag('Cloud Analysis', 'Cloud vs On-Premise cost analysis')
    .addTag('Analytics', 'AI-powered analytics and recommendations')
    .addTag('Reports', 'Executive reports and dashboards')
    .addTag('Integrations', 'External system integrations')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = configService.get('PORT') || 3000;
  await app.listen(port);

  console.log(`
  ╔══════════════════════════════════════════════════════════════╗
  ║                                                              ║
  ║   🚀 Enterprise IT Optimization Platform API                ║
  ║                                                              ║
  ║   📡 Server running on: http://localhost:${port}                ║
  ║   📚 API Documentation: http://localhost:${port}/api/docs       ║
  ║   🔧 Environment: ${configService.get('NODE_ENV')}                          ║
  ║                                                              ║
  ╚══════════════════════════════════════════════════════════════╝
  `);
}

bootstrap();
