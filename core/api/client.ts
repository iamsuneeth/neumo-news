import Request from "axios";
import { API_URLS } from "../constants/client_api";

const API = Request.create({
  baseURL: API_URLS.baseURL,
});

export const Fetcher = (url: string) => API.get(url).then(({ data }) => data);
