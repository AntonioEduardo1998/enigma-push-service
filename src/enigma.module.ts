import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnigmaController } from './enigma.controller';
import { Historic } from './Entities/Historic';
import { Phone } from './Entities/Phone';
import { EnigmaService } from './services/enigma.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      entities: [Phone, Historic],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Phone, Historic]),
  ],
  controllers: [EnigmaController],
  providers: [EnigmaService],
})
export class EnigmaModule {}
