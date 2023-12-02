const fetch = require("node-fetch");

const url = "https://a.klaviyo.com/api/profiles/?page[size]=10";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    revision: "2023-10-15",
    Authorization: "Klaviyo-API-Key pk_3add90f57a50af43ea2c7ff594b731d769",
  },
};

fetch(url, options)
  .then((res) => res.json())
  .then((json) => console.log(JSON.stringify(json.links, null, 2)))
  .catch((err) => console.error("error:" + err));
