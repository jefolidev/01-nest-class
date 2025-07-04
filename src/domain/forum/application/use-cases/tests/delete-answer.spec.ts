/* eslint-disable @typescript-eslint/no-unused-vars */
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeAnswer } from '../../../../../../test/factories/make-answer'
import { makeAnswerAttachment } from '../../../../../../test/factories/make-answer-attachment'
import { InMemoryAnswerAttachmentRepository } from '../../../../../../test/repositories/in-memory-answer-attachment-repository'
import { InMemoryAnswersRepository } from '../../../../../../test/repositories/in-memory-answers-repository'
import { DeleteAnswerUseCase } from '../delete-answer'
import { NotAllowedError } from '../errors/not-allowed-error'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let inMemoryAnswerAttachmentRepository: InMemoryAnswerAttachmentRepository
let sut: DeleteAnswerUseCase // System Under Test

describe('Delete Answer', () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentRepository =
      new InMemoryAnswerAttachmentRepository()
    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentRepository,
    )
    sut = new DeleteAnswerUseCase(inMemoryAnswersRepository)
  })

  it('should be able to delete a answer', async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('answer-1'),
    )

    await inMemoryAnswersRepository.create(newAnswer)

    inMemoryAnswerAttachmentRepository.items.push(
      makeAnswerAttachment({
        answerId: newAnswer.id,
        attachmentId: new UniqueEntityID('1'),
      }),
      makeAnswerAttachment({
        answerId: newAnswer.id,
        attachmentId: new UniqueEntityID('2'),
      }),
    )

    await sut.execute({
      answerId: 'answer-1',
      authorId: 'author-1',
    })

    expect(inMemoryAnswersRepository.items).toHaveLength(0)
    expect(inMemoryAnswerAttachmentRepository.items).toHaveLength(0)
  })

  it('should not be able to delete an answer from another user', async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('answer-1'),
    )

    await inMemoryAnswersRepository.create(newAnswer)

    const result = await sut.execute({
      answerId: 'answer-1',
      authorId: 'author-2',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
