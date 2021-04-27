const createUser = require("../lib/use_cases/CreateUser");
const User = require("../lib/domain/User");
const UserRepository = require("../lib/domain/UserRepository");
jest.mock("../lib/domain/UserRepository");

beforeEach(() => {
  UserRepository.mockClear();
});

test("Invalid email is rejected", () => {
  expect(() => {
    createUser("John", "Doe", "johndoesfakeemail", {
      userRepository: new UserRepository(),
    });
  }).toThrow("User failed email validation");
});

test("User Repository Persist is called once", () => {
  const mockedRepo = new UserRepository();
  createUser("John", "Doe", "johndoe@email.com", {
    userRepository: mockedRepo,
  });

  expect(mockedRepo.persist.mock.calls.length).toBe(1);
});
