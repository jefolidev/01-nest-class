import { Body, Controller, Post, UseGuards, UsePipes } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe'
import { z } from 'zod'

const createQuestionRequestBodySchema = z.object({
  title: z.string(),
})

type CreateQuestionRequestBodySchema = z.infer<
  typeof createQuestionRequestBodySchema
>

@Controller('/questions')
@UseGuards(AuthGuard('jwt'))
export class CreateQuestionController {
  constructor() {}

  @Post()
  @UsePipes(new ZodValidationPipe(createQuestionRequestBodySchema))
  async handle(@Body() body: CreateQuestionRequestBodySchema) {
    return 'ok'
  }
}
