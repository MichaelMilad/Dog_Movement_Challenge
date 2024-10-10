enum DIRECTION {
  N = 'N',
  E = 'E',
  S = 'S',
  W = 'W',
}

enum VALID_INPUTS {
  G = 'G',
  L = 'L',
  R = 'R',
}

enum TURN_DIRECTION {
  L = 'L',
  R = 'R',
}

interface IDOG {
  x: number;
  y: number;
  direction: DIRECTION;
}

function moveDog(dog: IDOG, movements: number = 1) {
  switch (dog.direction) {
    case DIRECTION.N:
      dog.y += movements;
      break;
    case DIRECTION.E:
      dog.x += movements;
      break;
    case DIRECTION.S:
      dog.y -= movements;
      break;
    case DIRECTION.W:
      dog.x -= movements;
      break;
    default:
      throw new Error(`Invalid direction`);
  }
}

function turnDog(dog: IDOG, turnDirection: TURN_DIRECTION) {
  switch (dog.direction) {
    case DIRECTION.N:
      return turnDirection === TURN_DIRECTION.L ? DIRECTION.W : DIRECTION.E;
    case DIRECTION.W:
      return turnDirection === TURN_DIRECTION.L ? DIRECTION.S : DIRECTION.N;
    case DIRECTION.S:
      return turnDirection === TURN_DIRECTION.L ? DIRECTION.E : DIRECTION.W;
    case DIRECTION.E:
      return turnDirection === TURN_DIRECTION.L ? DIRECTION.N : DIRECTION.S;
    default:
      throw new Error(`Invalid direction`);
  }
}

function main(input: string) {
  const dog: IDOG = {
    x: 0,
    y: 0,
    direction: DIRECTION.N,
  };

  for (let i = 0; i < 4; i++) {
    for (const char of input) {
      if (!Object.values(VALID_INPUTS).includes(char as VALID_INPUTS)) {
        throw new Error(`Invalid input: ${char}`);
      }

      if (Object.values(TURN_DIRECTION).includes(char as TURN_DIRECTION)) {
        const newDirection = turnDog(dog, char as TURN_DIRECTION);
        dog.direction = newDirection;
      }

      if (char === 'G') {
        moveDog(dog, 1);
      }
    }
  }

  return dog.x === 0 && dog.y === 0;
}

const input = 'RGR';
const result = main(input);

console.log(result);
