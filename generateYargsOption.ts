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

  yargsType = getYargsType(type);

  if (type.isArray()) {
    yargsType = getYargsType(type.getArrayElementTypeOrThrow());
  }

  option.type = yargsType;
  option.array = true;
  option.description = "";

  if ((type.isUnion() && !type.isBoolean()) || type.isEnum()) {
    option.choices = type.getUnionTypes().map((t) => t.getLiteralValue() as string);
  }

  return option;
}

function getYargsType(type: Type) {
  if (type.isString()) {
    return "string";
  } else if (type.isNumber()) {
    return "number";
  } else if (type.isBoolean()) {
    return "boolean";
  } else if (type.isArray()) {
    return "array";
  } else if (type.isUnion()) {
    return "string";
  } else if (type.isEnum()) {
    return "string";
  }
  return "string";
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

  return `export const ${variableName} = ${serialize(params.options, {
    space: 2,
  })} as const;
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
