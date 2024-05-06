export const addToCart = (item) => {
  return new Promise(async (resolve) => {
    const responce = await fetch("http://localhost:8080/carts", {
      method: "POST",
      headers: { "content-type": "apllication/json" },
      body: JSON.stringify(item),
    });
    const data = await responce.json();
    return resolve({ data });
  });
};

export const removeFromCart = (id) => {
  return new Promise(async (resolve) => {
    const responce = await fetch(`http://localhost:8080/carts/${id}`, {
      method: "DELETE",
      headers: { "content-type": "apllication/json" },
    });
    const data = await responce.json();
    return resolve({ data: { id: id } });
  });
};

export const getCart = (userId) => {
  return new Promise(async (resolve) => {
    const responce = await fetch(
      `http://localhost:8080/carts?userId=${userId}`,
    );
    const data = await responce.json();
    return resolve({ data });
  });
};

export const updateCart = (item) => {
  return new Promise(async (resolve) => {
    const responce = await fetch(`http://localhost:8080/carts/${item.id}`, {
      method: "PATCH",
      headers: { "content-type": "apllication/json" },
      body: JSON.stringify(item),
    });
    const data = await responce.json();
    return resolve({ data });
  });
};

export const resetCart = (id) => {
  return new Promise(async (resolve) => {
    const { data } = await getCart(id);
    console.log("id:", id, " data:", data);
    for (const key of data) {
      console.log("key:", key.id);
      removeFromCart(key.id);
    }

    return resolve({ message: "success" });
  });
};
