import { PER_PAGE_ITEM_LIMIT } from "../../constant";

export function fetchAllProducts() {
  return new Promise(async (resolve) => {
    const responce = await fetch("http://localhost:8080/products");
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

  for (let key in filter) {
    filterString += key + "=" + filter[key] + "&";
  }
  // sort value
  filterString += sort.name + "=" + sort.sort + "&";

  // Paggination
  filterString += "_page=" + page + "&_limit=" + PER_PAGE_ITEM_LIMIT + "&";

  console.log(filterString);
  return new Promise(async (resolve) => {
    const responce = await fetch(
      "http://localhost:8080/products?" + filterString
    );
    const data = await responce.json();
    resolve({ data });
  });
}
