export function fetchAllProducts() {
  return new Promise(async (resolve) => {
    const responce = await fetch("http://localhost:8080/products");
    const data = await responce.json();
    resolve({ data });
  });
}

export function fetchAllFilterProducts(filter) {
  let filterString = "";

  for (let key in filter) {
    filterString += key + "=" + filter[key] + "&";
  }
  console.log(filterString);
  return new Promise(async (resolve) => {
    const responce = await fetch(
      "http://localhost:8080/products?" + filterString
    );
    const data = await responce.json();
    resolve({ data });
  });
}
