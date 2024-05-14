import { PER_PAGE_ITEM_LIMIT } from "../../constant";

export function fetchAllProducts() {
  return new Promise(async (resolve) => {
    const responce = await fetch("http://localhost:8080/products");
    const data = await responce.json();
    resolve({ data });
  });
}

export function fetchSelectedProducts(id) {
  return new Promise(async (resolve) => {
    const responce = await fetch("http://localhost:8080/products/" + id);
    const data = await responce.json();
    resolve({ data });
  });
}
//TODO
// Page = ?_page=1&_limit=10
// Filter = ?category=smartphones
// sort = ?_sort=-price

export function fetchAllFilterProducts(filter, sort, page) {
  let filterString = "";

  // Filter
  for (let f in filter) {
    if (Array.isArray(filter[f])) {
      filter[f].forEach((element) => {
        filterString += f + "=" + element + "&";
      });
    } else {
      filterString += f + "=" + filter[f] + "&";
    }
  }

  if (sort._sort) {
    filterString += "_sort=" + sort._sort + "&";
  }

  // Paggination
  filterString += "_page=" + page + "&_per_page=" + PER_PAGE_ITEM_LIMIT + "&";

  console.log(
    "filterString: ",
    "http://localhost:8080/products?" + filterString,
  );

  return new Promise(async (resolve) => {
    const responce = await fetch(
      "http://localhost:8080/products?" + filterString,
    );
    const data = await responce.json();

    resolve({ data });
  });
}

export function updateProduct(update) {
  return new Promise(async (resolve) => {
    const responce = await fetch(
      `http://localhost:8080/products/${update.id}`,
      {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(update),
      },
    );
    const data = await responce.json();
    resolve({ data });
  });
}

export function fetchAllBrands() {
  return new Promise(async (resolve) => {
    const responce = await fetch("http://localhost:8080/brands");
    const data = await responce.json();
    resolve({ data });
  });
}

export function fetchCategory() {
  return new Promise(async (resolve) => {
    const responce = await fetch("http://localhost:8080/category");
    const data = await responce.json();
    resolve({ data });
  });
}
