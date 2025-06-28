import type { PaginationParams } from '@/core/repositories/pagination-params'
import type { QuestionsCommentRepository } from '@/domain/forum/application/repositories/question-comments-repository'
import type { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PrismaQuestionsCommentRepository
  implements QuestionsCommentRepository
{
  findById(id: string): Promise<QuestionComment | null> {
    throw new Error('Method not implemented.')
  }

  findManyByQuestionId(
    questionId: string,
    params: PaginationParams,
  ): Promise<QuestionComment[]> {
    throw new Error('Method not implemented.')
  }

  create(questionComment: QuestionComment): Promise<void> {
    throw new Error('Method not implemented.')
  }

  delete(quetionComment: QuestionComment): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
