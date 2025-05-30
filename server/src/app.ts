import createError, { HttpError } from 'http-errors';
import express, { Request, Response, NextFunction, Application } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import morganLogger from 'morgan';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname_esm = dirname(__filename);

import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';

const app: Application = express();

// view engine setup
app.set('views', path.join(__dirname_esm, '../views'));
app.set('view engine', 'pug');

app.use(morganLogger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname_esm, '../public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (_req: Request, _res: Response, next: NextFunction) {
  next(createError(404));
});

// error handler
app.use(function (
  err: HttpError,
  req: Request,
  res: Response,
  _next: NextFunction
) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
