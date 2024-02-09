import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { router } from "../app/router/Routes";

const sleep = () => new Promise((resolve) => setTimeout(resolve, 1000));

axios.defaults.baseURL = "http://localhost:5000/api/";
axios.defaults.withCredentials=true;
const responseBody = (response: AxiosResponse) => response.data;

// Interceptor For handling Error
//#region
axios.interceptors.response.use(
  async (response) => {
    await sleep();
    return response;
  },
  (error: AxiosError) => {
    const { data, status } = error.response as AxiosResponse;
    //console.log( error.response)
    switch (status) {
      case 400:
        if (data.errors) {
          const modelStateError: string[] = [];
          for (const key in data.errors) {
            if (data.errors[key]) {
              modelStateError.push(data.errors[key]);
            }
          }
          throw modelStateError.flat();
        }
        toast.error(data.title);
        break;
      case 401:
        toast.error(data.title);
        break;
      case 500:
        // console.log(data)

        //    history({
        //     pathname:'',
        //     state:{error:data}
        //    });
        router.navigate("/server-error", { state: { error: data } });
        // toast.error(data.title);
        break;
      case 404:
        toast.error(data.title);
        break;
      default:
        break;
    }
    console.log("Caught By Interceptor");
    return Promise.reject(error.response);
  }
);
//#endregion

const request = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
};

const catalog = {
  list: () => request.get("/Product"),
  details: (id: number) => request.get(`/Product/${id}`),
};
const testError = {
  get404Error: () => request.get("buggy/not-found"),
  get400Error: () => request.get("buggy/bad-request"),
  get401Error: () => request.get("buggy/unauthorise"),
  get500Error: () => request.get("buggy/server-error"),
  getValidationError: () => request.get("buggy/validation-error"),
};

const Basket = {
  get: () => request.get("/BasketNew"),
  addItem: (productId: number, quantity = 1) =>
    request.post(`/BasketNew?productId=${productId}&quantity=${quantity}`, {}),
  removeItem: (productId: number, quantity = 1) =>
    request.delete(`/BasketNew?productId=${productId}&quantity=${quantity}`),
};

const agent = {
  catalog,
  testError,
  Basket,
};
export default agent;
