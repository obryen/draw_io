import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { DiagramModule } from './modules/diagram/diagram.module';




@Module({
  imports: [
    // @ts-ignore
    DiagramModule,
  ],

  controllers: [],
  providers: [AppService],
})
export class AppModule { }
