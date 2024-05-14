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

export function updateUser(update) {
  return new Promise(async (resolve) => {
    const responce = await fetch(`http://localhost:8080/users/${update.id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(update),
    });
    console.log("apiUpdaye:", update);
    const data = await responce.json();
    resolve({ data });
  });
}

export function checkUser(user) {
  return new Promise(async (resolve, rejected) => {
    const responce = await fetch(
      "http://localhost:8080/users?email=" + user.email,
    );
    const data = await responce.json();
    if (data.length > 0) {
      if (data[0].password === user.password) {
        resolve({ data });
      } else {
        rejected({ message: "wrong password" });
      }
    } else {
      rejected({ message: "something Wrong!!" });
    }
  });
}
export function logout(userId) {
  return new Promise(async (resolve) => {
    resolve({ data: "success" });
  });
}
