import { Module } from '@nestjs/common';
import { EnigmaController } from './enigma.controller';
import { EnigmaRepository } from './repositories/enigma.repository';
import { EnigmaService } from './services/enigma.service';

@Module({
  imports: [],
  controllers: [EnigmaController],
  providers: [
    EnigmaService,
    EnigmaRepository
  ],
})
export class EnigmaModule { }
