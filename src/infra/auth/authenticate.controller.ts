import { AuthenticateStudentUseCase } from '@/domain/forum/application/use-cases/authenticate-student'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation.pipe'
import {
  Body,
  Controller,
  Post,
  UsePipes
} from '@nestjs/common'
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
    private authenticateStudent: AuthenticateStudentUseCase,
  ) { }

  @Post()
  @UsePipes(new ZodValidationPipe(authenticateRequestBodySchema))
  async handle(@Body() body: AuhtenticateRequestBodySchema) {
    const { email, password } = body

    const result = await this.authenticateStudent.execute({
      email, password
    })

    if (result.isLeft()) {
      throw new Error()
    }

    const { accessToken } = result.value

    return { access_token: accessToken }
  }
}
