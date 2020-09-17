require("../../test.setup");

const { InvalidInputError } = require("../../../src/error/InvalidInputError");
const { NotFoundError } = require("../../../src/error/NotFoundError");

const { savePost } = require("../../../src/database/repository/post.repo");

const { getPost } = require("../../../src/service/post");

describe("Get post data", () => {
  it("Validation", async () => {
    const arr = [[][""], [" "], [" ", " Hi"]];

    for (obj of arr)
      await expect(getPost(obj)).rejects.toThrow(InvalidInputError);
  });

  it("Some posts were not found", async () => {
    const req = ["Hello", "Hi"];

    await expect(getPost(req)).rejects.toThrow(NotFoundError);
  });

  it("Get post Data OK", async () => {
    const obj1 = await savePost({ author: "abdo", content: "Hello1" });
    const obj2 = await savePost({ author: "abdo", content: "Hello2" });

    const ids = [obj1._id.toString(), obj2._id.toString()];

    const res = await getPost(ids);

    expect(Array.isArray(res)).toBe(true);
    expect(res).toHaveLength(2);
    expect(res[0]).toHaveProperty("author", "abdo");
    expect(res[0]).toHaveProperty("content", "Hello1");
    expect(res[1]).toHaveProperty("content", "Hello2");
  });
});
