import { useState } from "react";

export default function useFetch() {
  var [data, setData] = useState([]);
  function extractDataFromApi(url, payload, method, Header) {
    fetch(url, {  
        method: method,
        headers:Header,
        body:JSON.stringify(payload),
    })
      .then((result) => result.json())
      .then((item) => setData(item));
  }
  return { data, extractDataFromApi };
}
