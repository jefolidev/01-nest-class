import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation.pipe'
import { PrismaService } from '@/infra/prisma/prisma.service'
import {
  Body,
  ConflictException,
  Controller,
  Post,
  UsePipes,
} from '@nestjs/common'
import { hash } from 'bcryptjs'
import { z } from 'zod'

const createAccountRequestBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
})

type CreateAccountControllerRequest = z.infer<
  typeof createAccountRequestBodySchema
>

@Controller('/accounts')
export class CreateAccountController {
  constructor(private prisma: PrismaService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createAccountRequestBodySchema))
  async handle(@Body() body: CreateAccountControllerRequest) {
    const { name, email, password } = body

    const userWithSameEmail = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (userWithSameEmail)
      throw new ConflictException('User with same e-mail already exists.')

    const hashedPassword = await hash(password, 8)

    await this.prisma.user.create({
      data: { name, email, password: hashedPassword },
    })
  }
}
