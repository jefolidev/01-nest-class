import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation.pipe'
import {
  Body,
  Controller,
  Post,
  UnauthorizedException,
  UsePipes,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { compare } from 'bcryptjs'
import { z } from 'zod'

const authenticateRequestBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

type AuhtenticateRequestBodySchema = z.infer<
  typeof authenticateRequestBodySchema
>

@Controller('/sessions')
export class AuthenticateController {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  @Post()
  @UsePipes(new ZodValidationPipe(authenticateRequestBodySchema))
  async handle(@Body() body: AuhtenticateRequestBodySchema) {
    const { email, password } = body

    const user = await this.prisma.user.findUnique({
      where: { email },
    })

    if (!user) throw new UnauthorizedException("User credentials don't match.")

    const isPasswordValid = await compare(password, user.password)

    if (!isPasswordValid)
      throw new UnauthorizedException("User credentials don't match.")

    const accessToken = this.jwt.sign({ sub: user.id })

    return { access_token: accessToken }
  }
}
