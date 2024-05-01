export function createUser(user) {
  return new Promise(async (resolve) => {
    const responce = await fetch("http://localhost:8080/users", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(user),
    });
    const data = await responce.json();
    resolve({ data });
  });
}

export function checkUser(user) {
  return new Promise(async (resolve) => {
    const responce = await fetch(
      "http://localhost:8080/users?email=" + user.email,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(user),
      },
    );
    const data = await responce.json();

    if (data.length > 0) {
      if (data[0].password === user.password) {
        console.log("login success");
        resolve({ data });
      } else {
        console.log("wrong password");
      }
      console.log("data: ", { data });
    } else {
      console.log("wrong all");
    }
  });
}
