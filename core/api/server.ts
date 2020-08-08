import Request from "axios";
import { API_URLS } from "../constants/server_api";
import { ErrorHandler } from "../error/error_handler";
import { SOURCES } from "../constants/sources";

const API = Request.create({
  baseURL: API_URLS.newsAPIBase,
  headers: {
    "X-Api-Key": process.env.NEWS_API_KEY,
  },
});

const defaultParams = {
  country: "gb",
  language: "en",
};

type UKNewsProps = {
  page?: number;
  q?: string;
  pageSize?: number;
};

export const fetchLatestUKNews = async ({
  page,
  q,
  pageSize = 10,
}: UKNewsProps) => {
  // validate params before using
  const params = {
    page,
    q,
    pageSize,
    ...defaultParams,
  };
  try {
    const { data } = await API.get(`${API_URLS.headlines}`, {
      params: removeNullishValues(params),
    });
    if (data.status !== "ok") {
      /*
        New Error type need to be created
      */

      ErrorHandler.translate({
        code: data.code,
        message: data.message,
        name: "error",
      });
    }
    return data;
  } catch (error) {
    // use logger here
    ErrorHandler.translate(error);
  }
};

const removeNullishValues = (params: object) => {
  return Object.fromEntries(
    Object.entries(params).filter(([, value]) => !!value)
  );
};

export const fetchEverything = async ({
  page,
  q,
  pageSize = 10,
}: UKNewsProps) => {
  // validate params before using
  const params = {
    page,
    q,
    pageSize,
    language: "en",
    // this need to be fetched once a day and updated in cache
    sources: SOURCES.join(","),
  };
  try {
    const { data } = await API.get(`${API_URLS.everything}`, {
      params: removeNullishValues(params),
    });
    if (data.status !== "ok") {
      /*
        New Error type need to be created
      */

      ErrorHandler.translate({
        code: data.code,
        message: data.message,
        name: "error",
      });
    }

    return data;
  } catch (error) {
    // use logger here
    ErrorHandler.translate(error);
  }
};
