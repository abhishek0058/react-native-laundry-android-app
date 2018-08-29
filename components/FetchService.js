import BaseURL from './BaseURL'

const getData = async (url) => {
    console.log(url)
    try {
        const response = await fetch(`${BaseURL}/${url}`);
        const result = await response.json();
        return result;
    } catch (e) {
        console.log(url, e)
    }
}

const postData = async (url, body) => {
    console.log(url, body);
    try {
        const response = await fetch(`${BaseURL}/${url}`, {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-Type": "application/json; charset=utf-8"
              // "Content-Type": "application/x-www-form-urlencoded",
            },
            body: JSON.stringify(body)
          });
          const result = await response.json();
          return result;
    } catch (e) {
        console.log(url, e)
    }
}

export { getData, postData };