import * as endpoints from "./Endpoints";
import { getQueryParams } from "../utils";

/**
 * This function composes and returns a fetch promise
 *
 * @returns {Promise}
 * @param {object, object} param0
 */
const API = ({ config, params }) => {
  let _config = config || {},
    header = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      ..._config
    };

  return fetch(
    `${endpoints.api.baseURL}${endpoints.api.products}${getQueryParams(
      params
    )}`,
    header
  ).then(response => response.json());
};

export default API;
