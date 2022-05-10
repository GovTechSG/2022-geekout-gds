import supertest from "supertest";
import server from "../src/App";

const supertestRequest = supertest(server);

// Basic check that it has the 3 properties
function isTodo(obj: object) {
  const id = obj.hasOwnProperty("id");
  const desc = obj.hasOwnProperty("description");
  const done = obj.hasOwnProperty("done");
  return id && desc && done;
}

describe("POST /todos", () => {
  it("should return Todo when input is OK", async () => {
    const res = await supertestRequest
      .post("/api/todos")
      .send({ description: "test POST api" })
      .set("Accept", "application/json");
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(isTodo(res.body)).toBe(true);
  });

  it("should return error when input is invalid", async () => {
    const res = await supertestRequest
      .post("/api/todos")
      .send({ garbage: "test POST api" })
      .set("Accept", "application/json");
    expect(res.status).toEqual(400);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body["message"]).toEqual(
      expect.stringContaining("Input task required")
    );
  });
});

describe("GET /todos", () => {
  it("should return all tasks when no id is specified", async () => {
    // Seed a task
    await supertestRequest
      .post("/api/todos")
      .send({ description: "test GET api" })
      .set("Accept", "application/json");

    const res = await supertestRequest.get("/api/todos");
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining("json"));
  });
});

const checkpointOne =
  parseInt(process.env.CHECKPOINT!) > 0 ? describe : describe.skip;
checkpointOne("GET /todos/{id}", () => {
  it("should return just one Todo when a valid id is OK", async () => {
    const postRes = await supertestRequest
      .post("/api/todos")
      .send({ description: "test single GET api" })
      .set("Accept", "application/json");
    const idToGet = postRes.body["id"];

    const res = await supertestRequest.get(`/api/todos/${idToGet}`);
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(isTodo(res.body)).toBe(true);
  });

  it("should return failure when id does not exist", async () => {
    const idToGet = "this isn't even a UUID";

    const res = await supertestRequest.get(`/api/todos/${idToGet}`);
    expect(res.status).toEqual(400);
    expect(res.body["message"]).toEqual(
      expect.stringContaining("UUID does not exist")
    );
  });
});

const checkpointTwo =
  parseInt(process.env.CHECKPOINT!) > 1 ? describe : describe.skip;
  checkpointTwo("DELETE /todos{id}", () => {
  it("should return success when id is OK", async () => {
    const postRes = await supertestRequest
      .post("/api/todos")
      .send({ description: "test api" })
      .set("Accept", "application/json");
    const idToDelete = postRes.body["id"];

    const res = await supertestRequest
      .delete(`/api/todos/${idToDelete}`)
      .set("Accept", "application/json");
    expect(res.status).toEqual(200);
  });

  it("should return failure when id does not exist", async () => {
    const idToDelete = "this isn't even a UUID";

    const res = await supertestRequest
      .delete(`/api/todos/${idToDelete}`)
      .set("Accept", "application/json");
    expect(res.status).toEqual(400);
    expect(res.body["message"]).toEqual(
      expect.stringContaining("UUID does not exist")
    );
  });

  // const extra = parseInt(process.env.CHECKPOINT!) > 2 ? it : it.skip;
  // extra("should return failure when todo is protected", async () => {
  //   const postRes = await supertestRequest
  //     .post("/api/todos")
  //     .send({ description: "Improve backend" })
  //     .set("Accept", "application/json");
  //   const idToDelete = postRes.body["id"];

  //   const res = await supertestRequest
  //     .delete(`/api/todos/${idToDelete}`)
  //     .set("Accept", "application/json");
  //   expect(res.status).toEqual(405);
  //   expect(res.body["message"]).toEqual(
  //     expect.stringContaining("This todo cannot be deleted")
  //   );
  // });
});

const checkpointThree =
  parseInt(process.env.CHECKPOINT!) > 2 ? describe : describe.skip;
  checkpointThree("PUT /todos/{id}", () => {
  it("should return success when id is OK", async () => {
    const postRes = await supertestRequest
      .post("/api/todos")
      .send({ description: "test api" })
      .set("Accept", "application/json");
    const todoToUpdate = postRes.body;
    todoToUpdate.done = true;

    const res = await supertestRequest
      .put(`/api/todos/${todoToUpdate.id}`)
      .send(todoToUpdate)
      .set("Accept", "application/json");
    expect(res.status).toEqual(200);
  });

  it("should return failure when id does not exist", async () => {
    const idToUpdate = "this isn't even a UUID";
    const fakeTodo = {
      id: idToUpdate,
      description: "test PUT api",
      done: false,
    };

    const res = await supertestRequest
      .put(`/api/todos/${idToUpdate}`)
      .send(fakeTodo)
      .set("Accept", "application/json");
    expect(res.status).toEqual(400);
    expect(res.body["message"]).toEqual(
      expect.stringContaining("UUID does not exist")
    );
  });

  // const extra = parseInt(process.env.CHECKPOINT!) > 2 ? it : it.skip;
  // extra(
  //   "should return failure when id in path does not match id in body",
  //   async () => {
  //     const postRes = await supertestRequest
  //       .post("/api/todos")
  //       .send({ description: "test api" })
  //       .set("Accept", "application/json");
  //     const todoToUpdate = postRes.body;
  //     const idToUpdate = postRes.body["id"];
  //     todoToUpdate["id"] = "I am hacker lols xD";
  //     todoToUpdate["done"] = true;

  //     const res = await supertestRequest
  //       .put(`/api/todos/${idToUpdate}`)
  //       .send(todoToUpdate)
  //       .set("Accept", "application/json");
  //     expect(res.status).toEqual(409);
  //     expect(res.body["message"]).toEqual(
  //       expect.stringContaining("UUID in path and body do not match")
  //     );
  //   }
  // );
});

// const checkpointTwo =
//   parseInt(process.env.CHECKPOINT!) > 1 ? describe : describe.skip;
// checkpointTwo("POST /todos/random", () => {
//   it("should return a random Todo", async () => {
//     const res = await supertestRequest
//       .post("/api/todos/random")
//       .set("Accept", "application/json");
//     expect(res.status).toEqual(200);
//     expect(res.type).toEqual(expect.stringContaining("json"));
//     expect(isTodo(res.body)).toBe(true);
//     console.log(res.body);
//   });
// });

// Stop server after all tests are completed
afterAll(async () => {
  await server.close();
});