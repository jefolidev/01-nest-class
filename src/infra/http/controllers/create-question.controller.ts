import { CreateQuestionUseCase } from '@/domain/forum/application/use-cases/create-question'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { TokenSchema } from '@/infra/auth/jwt.strategy'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation.pipe'
import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { z } from 'zod'

const createQuestionRequestBodySchema = z.object({
  title: z.string(),
  content: z.string(),
})

const bodyValidationPipe = new ZodValidationPipe(
  createQuestionRequestBodySchema,
)

type CreateQuestionRequestBodySchema = z.infer<
  typeof createQuestionRequestBodySchema
>

@Controller('/questions')
@UseGuards(AuthGuard('jwt'))
export class CreateQuestionController {
  constructor(private createQuestion: CreateQuestionUseCase) {}

  @Post()
  async handle(
    @Body(bodyValidationPipe) body: CreateQuestionRequestBodySchema,
    @CurrentUser() user: TokenSchema,
  ) {
    const { title, content } = body
    const { sub: userId } = user

    await this.createQuestion.execute({
      authorId: userId,
      title,
      content,
      attachmentsIds: [],
    })

    return body
  }
}
