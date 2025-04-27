import { DatabaseModule } from '@/infra/database/modules/database..module'
import { Module } from '@nestjs/common'
import { AuthenicateController } from '../controllers/authenticate.controller'
import { CreateAccountController } from '../controllers/create-account.controller'
import { CreateQuestionController } from '../controllers/create-question.controller'
import { FetchRecentQuestionsController } from '../controllers/fetch-recent-questions.controller'

@Module({
  imports: [DatabaseModule],
  controllers: [
    AuthenicateController,
    CreateAccountController,
    CreateQuestionController,
    FetchRecentQuestionsController,
  ],
})
export class HttpModule {}
