import { getStatusCode } from "http-status-codes";

export function pageNotFoundError(req, res) {
  res.status(getStatusCode());
  res.render('error', {
    code: getStatusCode()
  });
}