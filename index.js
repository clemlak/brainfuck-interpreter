const program = '++++++++++[>+++++++>++++++++++>+++>++++<<<<-]>++.>+.+++++++..+++.>>++++.<++.<++++++++.--------.+++.------.--------.>+.';

const MEMORY_SIZE = 30000;
const memory = new Array(MEMORY_SIZE).fill(0);

let index = 0;
let pointer = 0;

const loops = [];

let output = '';

while (index !== program.length) {
  switch (program[index]) {
    case '+':
      if (memory[pointer] === 255) {
        memory[pointer] = 0;
      } else {
        memory[pointer] += 1;
      }
      break;
    case '-':
      if (memory[pointer] === 0) {
        memory[pointer] = 255;
      } else {
        memory[pointer] -= 1;
      }
      break;
    case '>':
      if (pointer === MEMORY_SIZE - 1) {
        pointer = 0;
      } else {
        pointer += 1;
      }
      break;
    case '<':
      if (pointer === 0) {
        pointer = MEMORY_SIZE - 1;
      } else {
        pointer -= 1;
      }
      break;
    case '[':
      if (memory[pointer] !== 0) {
        loops.push(index);
      } else {
        let count = 0;
        let stopLoop = false;

        while (!stopLoop) {
          index += 1;

          if (index === program.length) {
            stopLoop = true;
          } else if (program[index] === '[') {
            count += 1;
          } else if (program[index] === ']') {
            if (count === 0) {
              stopLoop = true;
            } else {
              count -= 1;
            }
          }
        }
      }
      break;
    case ']':
      index = loops.pop() - 1;
      break;
    case '.':
      output += String.fromCharCode(memory[pointer]);
      break;
    default:
      break;
  }

  index += 1;
}

console.log(output);
