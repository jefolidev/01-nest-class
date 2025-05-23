import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './auth/modules/auth.module'
import { envSchema } from './env'
import { HttpModule } from './http/modules/http.module'

@Module({
  imports: [
    AuthModule,

    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),

    HttpModule,
  ],
})
export class AppModule {}
