// server/src/app.ts
import createError, { HttpError } from 'http-errors';
import express, { Request, Response, NextFunction, Application } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import morganLogger from 'morgan';
import session, { SessionOptions } from 'express-session';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';
import authRouter from './routes/auth.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname_esm = dirname(__filename);

const app: Application = express();

// View engine setup
app.set('views', path.join(__dirname_esm, '../views'));
app.set('view engine', 'pug');

// Middlewares
app.use(morganLogger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const sessionOptions: SessionOptions = {
  secret: process.env.SESSION_SECRET || 'fallbackSuperSecretTemporarioParaDev',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24,
  },
};
const sessionMiddleware = session(sessionOptions);
app.use(sessionMiddleware);

app.use(express.static(path.join(__dirname_esm, '../public')));

// Montar as rotas
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/auth', authRouter);

// Catch 404 and forward to error handler
app.use((_req: Request, _res: Response, next: NextFunction) => {
  next(createError(404));
});

// Error handler
app.use((err: HttpError, req: Request, res: Response, _next: NextFunction) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

export default app;
