import MockAdapter from "axios-mock-adapter";
import faker from "faker";

const token = {
  ADMIN: faker.datatype.uuid(),
  TEACHER: faker.datatype.uuid(),
  STUDENT: faker.datatype.uuid(),
};

export const enableMockApi = (axiosInstance) => {
  const mockApi = new MockAdapter(axiosInstance, { delayResponse: 1000 });

  mockApi
    .onPost("/login", {
      email: "admin@gmail.com",
      password: "12345678",
    })
    .reply(200, { token: token.ADMIN });

  mockApi
    .onPost("/login", {
      email: "teacher@gmail.com",
      password: "12345678",
    })
    .reply(200, { token: token.TEACHER });

  mockApi
    .onPost("/login", {
      email: "student@gmail.com",
      password: "12345678",
    })
    .reply(200, { token: token.STUDENT });

  mockApi.onPost("/login").reply(401, { message: "invalid credential" });
};

export const enableMockApiAuthenticated = (axiosInstance) => {
  const mockAuthApi = new MockAdapter(axiosInstance, { delayResponse: 1000 });

  mockAuthApi.onGet("/me").reply(200, {
    email: faker.internet.email(),
    name: faker.name.firstName() + faker.name.lastName(),
    phone: faker.phone.phoneNumber(),
  });
};
