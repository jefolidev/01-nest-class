import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import type { Env } from 'src/env'

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      global: true,
      useFactory(config: ConfigService<Env, true>) {
        const PRIVATE_KEY = config.get('JWT_PRIVATE_KEY', { infer: true })
        const PUBLIC_KEY = config.get('JWT_PUBLIC_KEY', { infer: true })

        return {
          signOptions: { algorithm: 'RS256' },
          privateKey: Buffer.from(PRIVATE_KEY, 'base64'),
          publicKey: Buffer.from(PUBLIC_KEY, 'base64'),
        }
      },
    }),
  ],
})
export class AuthModule {}
