import { inquirerCli } from "./inquirerCli";

main(process.argv.slice(2));

function main(args: string[]): void {
  switch (args[0]) {
    case "createUser": {
      break;
    }
    default:
      inquirerCli();
      break;
  }
}
