import { AggregateRoot } from '@/core/entities/aggregate-root'
import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import type { Optional } from '@/core/types/optional'
import dayjs from 'dayjs'
import { QuestionBestAnswerChosenEvent } from '../events/quest-best-answer-choosen-event'
import { QuestionAttachmentList } from './question-attachment-list'
import { Slug } from './value-objetcs/slug'

export interface QuestionProps {
  authorId: UniqueEntityID
  bestAnswerId?: UniqueEntityID | null
  attachments: QuestionAttachmentList
  title: string
  content: string
  slug: Slug
  createdAt: Date
  updatedAt?: Date | null
}

export class Question extends AggregateRoot<QuestionProps> {
  get authorId() {
    return this.props.authorId
  }

  get bestAnswerId() {
    return this.props.bestAnswerId
  }

  get title() {
    return this.props.title
  }

  get content() {
    return this.props.content
  }

  get slug() {
    return this.props.slug
  }

  get isNew() {
    return dayjs().diff(this.createdAt, 'days') <= 3
  }

  get createdAt() {
    return this.props.createdAt
  }

  get attachments() {
    return this.props.attachments
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  get excerpt() {
    return this.content.substring(0, 120).trimEnd().concat('...')
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  set title(title: string) {
    this.props.title = title
    this.props.slug = Slug.createFromText(title)
    this.touch()
  }

  set content(content: string) {
    this.props.content = content
    this.touch()
  }

  set bestAnswerId(bestAnswerId: UniqueEntityID | undefined | null) {
    if (bestAnswerId && bestAnswerId !== this.props.bestAnswerId) {
      this.addDomainEvent(new QuestionBestAnswerChosenEvent(this, bestAnswerId))
    }

    this.props.bestAnswerId = bestAnswerId
    this.touch()
  }

  set attachments(attachments: QuestionAttachmentList) {
    this.props.attachments = attachments
    this.touch()
  }

  static create(
    props: Optional<QuestionProps, 'createdAt' | 'slug' | 'attachments'>,
    id?: UniqueEntityID,
  ) {
    const question = new Question(
      {
        ...props,
        slug: props.slug ?? Slug.createFromText(props.title),
        attachments: props.attachments ?? new QuestionAttachmentList(),
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return question
  }
}
