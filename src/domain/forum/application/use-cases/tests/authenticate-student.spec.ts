import { FakeEncrypter } from 'test/cryptography/fake-encrypter'
import { FakeHash } from 'test/cryptography/fake-hash'
import { makeStudent } from 'test/factories/make-student'
import { InMemoryStudentsRepository } from 'test/repositories/in-memory-students-repository'
import { AuthenticateStudentUseCase } from '../authenticate-student'

let inMemoryStudentsRepository: InMemoryStudentsRepository
let fakeHasher: FakeHash
let fakeEncrypter: FakeEncrypter

let sut: AuthenticateStudentUseCase // System Under Test

describe('Register Student', () => {
  beforeEach(() => {
    inMemoryStudentsRepository =
      new InMemoryStudentsRepository()
    fakeHasher = new FakeHash()
    fakeEncrypter = new FakeEncrypter()

    sut = new AuthenticateStudentUseCase(inMemoryStudentsRepository, fakeHasher, fakeEncrypter)
  })

  it('should be able to authenticate a student', async () => {
    const student = makeStudent({
      email: 'johndoe@email.com',
      password: await fakeHasher.hash('123456'),
    })

    inMemoryStudentsRepository.items.push(student)

    const result = await sut.execute({
      email: 'johndoe@email.com',
      password: '123456',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      accessToken: expect.any(String)
    })
  })
})
