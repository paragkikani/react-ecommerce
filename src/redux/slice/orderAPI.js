export function placeOrder(order) {
  return new Promise(async (resolve) => {
    const responce = await fetch("http://localhost:8080/orders", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(order),
    });
    const data = await responce.json();
    resolve({ data });
  });
}
