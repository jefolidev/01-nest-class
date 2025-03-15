import { Controller, Post, UseGuards } from '@nestjs/common'

import { AuthGuard } from '@nestjs/passport'
import { PrismaService } from 'src/prisma/prisma.service'

// const createQuestionBodySchema = z.object({
//   title: z.string(),
//   slug: z.string(),
//   content: z.string(),
// })

// type CreateQuestionBodySchema = z.infer<typeof createQuestionBodySchema>

@Controller('/questions')
@UseGuards(AuthGuard('jwt'))
export class CreateQuestionController {
  constructor(private prisma: PrismaService) {}

  @Post()
  // @HttpCode(201)
  // @UsePipes(new ZodValidationPipe(createQuestionBodySchema))
  async handle() {
    // @Body() body: CreateQuestionBodySchema
    return 'oie'

    // const questionData = createQuestionBodySchema.parse(body)

    // return {
    //   questionData,
    // }
  }
}
