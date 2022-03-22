import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const weatherApi = createApi({
  reducerPath: "weatherApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.met.no/weatherapi/locationforecast/2.0/"
  }),
  endpoints: (builder) => ({
    getWeather: builder.query({
      query: ({ lat, lon }: { lat: number; lon: number }) =>
        `compact.json?lat=${lat}&lon=${lon}`
    })
  })
});

export const { useGetWeatherQuery } = weatherApi;
