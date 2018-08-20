import BaseURL from './BaseURL'

const getData = async (url) => {
    try {
        const response = await fetch(`${BaseURL}/${url}`);
        const result = await response.json();
        return result;
    } catch (e) {
        console.log(e)
    }
}

export { getData };