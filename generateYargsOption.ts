import { Project, Type, PropertySignature, InterfaceDeclaration } from "ts-morph";
import yargs, { Options } from "yargs";
import { hideBin } from "yargs/helpers";
import serialize from "serialize-javascript";
import * as path from "path";

function parseArguments() {
  return yargs(hideBin(process.argv))
    .options({
      moduleName: {
        type: "string",
        requiresArg: true,
        alias: "m",
      },
      interfaceName: {
        type: "string",
        requiresArg: true,
        alias: "i",
      },
      typeName: {
        type: "string",
        requiresArg: true,
        alias: "t",
      },
      path: {
        type: "string",
        requiresArg: true,
        alias: "p",
      },
    })
    .parseSync();
}

function getInterface(moduleName: string, interfaceName: string): InterfaceDeclaration {
  const project = new Project();
  const sourceFile = project.addSourceFileAtPath("node_modules/backlog-js/dist/types/option.d.ts");
  return sourceFile.getModuleOrThrow(moduleName).getInterfaceOrThrow(interfaceName);
}

function createYargsOption(type: Type): Options {
  let yargsType: "string" | "number" | "boolean" | "array" = "string";
  const option: { [key: string]: any } = {};

  if (type.isString()) {
    yargsType = "string";
  } else if (type.isNumber()) {
    yargsType = "number";
  } else if (type.isBoolean()) {
    yargsType = "boolean";
  } else if (type.isArray()) {
    yargsType = "array";
  } else if (type.isUnion()) {
    yargsType = "string";
  } else if (type.isEnum()) {
    yargsType = "string";
  }

  option.type = yargsType;
  option.description = "";

  if ((type.isUnion() && !type.isBoolean()) || type.isEnum()) {
    option.choices = type.getUnionTypes().map((t) => t.getLiteralValue() as string);
  }

  return option;
}

function createYargsOptions(targetInterface: InterfaceDeclaration): {
  [key: string]: any;
} {
  const options: { [key: string]: any } = {};
  targetInterface.getProperties().forEach((prop: PropertySignature) => {
    const name = prop.getName();
    const type = prop.getType();
    options[name] = createYargsOption(type);
  });
  return options;
}

function generateOptionsFileContent(params: {
  moduleName: string;
  interfaceName: string;
  typeName: string;
  options: { [key: string]: any };
}): string {
  const typeName = `${params.typeName}`;
  const variableName = typeName.charAt(0).toLowerCase() + typeName.slice(1);

  return `
import { Option } from "backlog-js";
import { Options } from "yargs";

type ${typeName} = {
  [key in keyof Option.${params.moduleName}.${params.interfaceName}]: Options;
}

export const ${variableName}: ${typeName} = ${serialize(params.options, {
    space: 2,
  })};
`;
}

function writeOptionsFile(filePath: string, content: string) {
  const project = new Project();
  project.createSourceFile(filePath, content, { overwrite: true });
  project.saveSync();
}

function main() {
  const args = parseArguments();
  const targetInterface = getInterface(args.moduleName!, args.interfaceName!);
  const options = createYargsOptions(targetInterface);
  const content = generateOptionsFileContent({
    typeName: args.typeName!,
    moduleName: args.moduleName!,
    interfaceName: args.interfaceName!,
    options,
  });
  const outputPath = path.join(process.cwd(), "src", `${args.path}.ts`);
  writeOptionsFile(outputPath, content);
  console.log(`yargs options generated at: ${outputPath}`);
}

main();
