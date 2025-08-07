import { Either, left, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { Encrypter } from '../cryptography/encrypter'
import { HashCompare } from '../cryptography/hash-compare'
import { StudentsRepository } from '../repositories/students-repository'
import { WrongCredentialsError } from './errors/wrong-credentials-error'

interface RegisterStudentUseCaseRequest {
  email: string
  password: string
}
type RegisterStudentUseCaseResponse = Either<
  WrongCredentialsError,
  {
    accessToken: string
  }
>

@Injectable()
export class RegisterStudentUseCase {
  constructor(private studentsRepository: StudentsRepository, private hashGenerator: HashCompare, private encrypter: Encrypter) { }

  async execute({
    email, password
  }: RegisterStudentUseCaseRequest): Promise<RegisterStudentUseCaseResponse> {
    const student = await this.studentsRepository.findByEmail(email)

    if (!student)
      return left(new WrongCredentialsError())

    const isPasswordValid = await this.hashGenerator.compare(password, student.password)

    if (!isPasswordValid)
      return left(new WrongCredentialsError())

    const accessToken = await this.encrypter.encrypt({ sub: student.id.toString() })

    return right({
      accessToken
    })
  }


}

