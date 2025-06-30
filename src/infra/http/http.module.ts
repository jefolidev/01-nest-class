import { CreateQuestionUseCase } from '@/domain/forum/application/use-cases/create-question'
import { Module } from '@nestjs/common'
import { AuthenticateController } from '../auth/authenticate.controller'
import { DatabaseModule } from '../database/database.module'
import { CreateAccountController } from './controllers/create-account.controller'
import { CreateQuestionController } from './controllers/create-question.controller'
import { FetchRecentQuestionsController } from './controllers/fetch-recent-questions.controller'

@Module({
  imports: [DatabaseModule],
  controllers: [
    AuthenticateController,
    FetchRecentQuestionsController,
    CreateAccountController,
    CreateQuestionController,
  ],
  providers: [CreateQuestionUseCase],
})
export class HttpModule {}
