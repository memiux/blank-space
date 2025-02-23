#include <libpq-fe.h>
#include <stdio.h>
#include <stdlib.h>

int main() {
  PGPing ping;

  ping = PQping("host=localhost");

  switch (ping) {
  case PQPING_OK:
    printf("server is accepting connections\n");
    break;
  case PQPING_REJECT:
    printf("server is alive but rejecting connections\n");
    break;
  case PQPING_NO_RESPONSE:
    printf("could not establish connection\n");
    break;
  case PQPING_NO_ATTEMPT:
    printf("connection not attempted (bad params)\n");
    break;
  default:
    printf("unknown\n");
  }

  return 0;
}
