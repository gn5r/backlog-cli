import { Project, Type, SyntaxKind, VariableDeclarationKind } from "ts-morph";
import { Options } from "yargs";
import serialize from "serialize-javascript";

function mapTypeToYargsOption(type: Type): Options {
  const option: Options = { description: "" };

  if (type.isArray()) {
    option.type = "array";
    const elementType = type.getArrayElementType();
    if (elementType) {
      const elementOption = mapTypeToYargsOption(elementType);

      if (elementOption.choices) {
        option.choices = elementOption.choices;
        if (elementOption.type === "number") {
          option.coerce = (v: any[]) => v.map(Number);
        } else if (elementOption.type === "string") {
          option.coerce = (v: any[]) => v.map(String);
        }
      } else {
        if (elementType.isNumber()) {
          option.coerce = (v: any[]) => v.map(Number);
        } else if (elementType.isString()) {
          option.coerce = (v: any[]) => v.map(String);
        }
      }
    }
    return option;
  }

  if (type.isUnion()) {
    const unionTypes = type.getUnionTypes();
    const nonUndefinedNullTypes = unionTypes.filter((t) => !t.isUndefined() && !t.isNull());

    if (nonUndefinedNullTypes.length === 1) {
      return mapTypeToYargsOption(nonUndefinedNullTypes[0]);
    }

    const choices: (string | number)[] = [];
    let allStringLiterals = true;
    let allNumberLiterals = true;

    for (const unionMemberType of nonUndefinedNullTypes) {
      if (unionMemberType.isStringLiteral()) {
        choices.push(unionMemberType.getLiteralValue() as string);
        allNumberLiterals = false;
      } else if (unionMemberType.isNumberLiteral()) {
        choices.push(unionMemberType.getLiteralValue() as number);
        allStringLiterals = false;
      } else {
        return { type: "string", description: "" };
      }
    }

    if (choices.length > 0) {
      option.choices = choices;
      if (allStringLiterals) {
        option.type = "string";
      } else if (allNumberLiterals) {
        option.type = "number";
      }
      return option;
    }
  }

  const symbol = type.getSymbol();
  if (symbol && symbol.getDeclarations().length > 0) {
    const declaration = symbol.getDeclarations()[0];
    if (declaration.getKind() === SyntaxKind.EnumDeclaration) {
      const enumDeclaration = declaration.asKindOrThrow(SyntaxKind.EnumDeclaration);
      const choices: (string | number)[] = [];
      let hasNumber = false;
      let hasString = false;

      enumDeclaration.getMembers().forEach((member) => {
        const value = member.getValue();
        if (typeof value === "number") {
          choices.push(value);
          hasNumber = true;
        } else if (typeof value === "string") {
          choices.push(value);
          hasString = true;
        }
      });

      if (choices.length > 0) {
        option.choices = choices;
        if (hasNumber && !hasString) {
          option.type = "number";
        } else if (hasString && !hasNumber) {
          option.type = "string";
        } else {
          option.type = "string";
        }
        return option;
      }
    }
  }

  if (type.isString()) return { type: "string", description: "" };
  if (type.isNumber()) return { type: "number", description: "" };
  if (type.isBoolean()) return { type: "boolean", description: "" };

  return { type: "string", description: "" };
}

function generateYargsOption(dtsFileName: string, nameSpace: string, interfaceName: string) {
  const project = new Project({
    tsConfigFilePath: "tsconfig.json",
    skipFileDependencyResolution: true,
  });

  const source = project.addSourceFileAtPath(
    `node_modules/backlog-js/dist/types/${dtsFileName}.d.ts`,
  );
  project.addSourceFileAtPath(`node_modules/backlog-js/dist/types/types.d.ts`);

  const iface = source.getModule(nameSpace)?.getInterface(interfaceName);
  if (!iface)
    throw new Error(`Interface ${interfaceName} not found in ${nameSpace} of ${dtsFileName}.d.ts`);

  const options: Record<string, any> = {};
  iface.getProperties().forEach((prop) => {
    const name = prop.getName();
    const option = mapTypeToYargsOption(prop.getType());

    if (!prop.hasQuestionToken()) {
      (option as any).demandOption = true;
    }

    options[name] = option;
  });

  return options;
}

function generateSourceCode(path: string, filename: string, objectName: string, options: string) {
  const project = new Project();
  const source = project.createSourceFile(`src/options/${path}/${filename}.ts`, "", {
    overwrite: true,
  });
  source.addVariableStatement({
    declarationKind: VariableDeclarationKind.Const,
    declarations: [
      {
        name: objectName,
        initializer: options,
      },
    ],
  });
  source.saveSync();
}

(() => {
  const options = generateYargsOption("option", "Issue", "GetIssuesParams");
  generateSourceCode(
    "issue",
    "getIssuesOptions",
    "getIssuesOptions",
    serialize(options, { space: 2 }),
  );
})();
