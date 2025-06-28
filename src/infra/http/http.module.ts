import { Module } from '@nestjs/common'
import { AuthenticateController } from '../auth/authenticate.controller'
import { PrismaService } from '../prisma/prisma.service'
import { CreateAccountController } from './controllers/create-account.controller'
import { CreateQuestionController } from './controllers/create-question.controller'
import { FetchRecentQuestionsController } from './controllers/fetch-recent-questions.controller'

@Module({
  controllers: [
    AuthenticateController,
    FetchRecentQuestionsController,
    CreateAccountController,
    CreateQuestionController,
  ],
  providers: [PrismaService],
})
export class HttpModule {}
