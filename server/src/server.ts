import http from 'http';
import Debug from 'debug';

import app from './app.js';
import { AddressInfo } from 'net';

const debug = Debug('dindinho:server');

function normalizePort(val: string): number | string | false {
  const parsedPort = parseInt(val, 10);
  if (isNaN(parsedPort)) {
    return val;
  }
  if (parsedPort >= 0) {
    return parsedPort;
  }
  return false;
}

function onError(error: NodeJS.ErrnoException): void {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
    default:
      throw error;
  }
}

const port = normalizePort(process.env.PORT || '3000');

app.set('port', port);

const server: http.Server = http.createServer(app);

function onListening(): void {
  const addr = server.address();
  let bind: string;
  if (addr === null) {
    bind = 'unknown pipe or port';
  } else if (typeof addr === 'string') {
    bind = 'pipe ' + addr;
  } else {
    bind = 'port ' + (addr as AddressInfo).port;
  }

  debug('Express server escutando em ' + bind);
  console.log(`Servidor Dindinho escutando em: ${bind}`);
}

server.listen(port);

server.on('error', onError);

server.on('listening', onListening);
