import type { PaginationParams } from '@/core/repositories/pagination-params'
import type { Question } from '../../enterprise/entities/question'

export abstract class QuestionsRepository {
  abstract create(question: Question): Promise<void>
  abstract findById(questionId: string): Promise<Question | null>
  abstract findBySlug(slug: string): Promise<Question | null>
  abstract findManyRecent(params: PaginationParams): Promise<Question[]>
  abstract save(question: Question): Promise<void>
  abstract delete(question: Question): Promise<void>
}
