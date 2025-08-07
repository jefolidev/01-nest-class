import { AuthenticateStudentUseCase } from '@/domain/forum/application/use-cases/authenticate-student'
import { CreateQuestionUseCase } from '@/domain/forum/application/use-cases/create-question'
import { FetchRecentQuestionsUseCase } from '@/domain/forum/application/use-cases/fetch-recent-questions'
import { RegisterStudentUseCase } from '@/domain/forum/application/use-cases/register-student'
import { Module } from '@nestjs/common'
import { AuthenticateController } from '../auth/authenticate.controller'
import { CryptographyModule } from '../cryptographty/cryptography.module'
import { DatabaseModule } from '../database/database.module'
import { CreateAccountController } from './controllers/create-account.controller'
import { CreateQuestionController } from './controllers/create-question.controller'
import { FetchRecentQuestionsController } from './controllers/fetch-recent-questions.controller'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    AuthenticateController,
    FetchRecentQuestionsController,
    CreateAccountController,
    CreateQuestionController,
  ],
  providers: [CreateQuestionUseCase, FetchRecentQuestionsUseCase, RegisterStudentUseCase, AuthenticateStudentUseCase],
})
export class HttpModule { }
