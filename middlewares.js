import colors from 'colors';

export function requestTIme(req, res, next) {
  req.requestTime = Date.now();
  next();
}

export function logger(req, res, next) {
  console.log(colors.bgGreen.black(`Req.time ${req.requestTime}`));
  next();
}
