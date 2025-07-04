import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { PrismaAnswerAttachmentRepository } from './prisma/repositories/prisma-answer-attachments-repository'
import { PrismaAnswersCommentRepository } from './prisma/repositories/prisma-answer-comments-repository'
import { PrismaAnswersRepository } from './prisma/repositories/prisma-answers-repository'
import { PrismaQuestionAttachmentRepository } from './prisma/repositories/prisma-question-attachments-repository'
import { PrismaQuestionsCommentRepository } from './prisma/repositories/prisma-question-comments-repository'
import { PrismaQuestionsRepository } from './prisma/repositories/prisma-questions-repository'

@Module({
  providers: [
    PrismaService,
    {
      provide: QuestionsRepository,
      useClass: PrismaQuestionsRepository,
    },
    PrismaAnswerAttachmentRepository,
    PrismaAnswersCommentRepository,
    PrismaAnswersRepository,
    PrismaQuestionAttachmentRepository,
    PrismaQuestionsCommentRepository,
  ],
  exports: [
    PrismaService,
    QuestionsRepository,
    PrismaAnswerAttachmentRepository,
    PrismaAnswersCommentRepository,
    PrismaAnswersRepository,
    PrismaQuestionAttachmentRepository,
    PrismaQuestionsCommentRepository,
  ],
})
export class DatabaseModule {}
