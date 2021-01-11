import "reflect-metadata";
const metadataKey = Symbol("required");
class Validator {
    static getErrorMessage(propName, option, value) {
        if (!option ||
            value === undefined ||
            value === null) {
            return '[YooCamera] You must pass two values to be compared';
        }
        if (!Array.isArray(option) &&
            !(option instanceof RegExp)) {
            return '[YooCamera] You must pass an Array or RegExp to validate your Prop';
        }
        if (Array.isArray(option) &&
            option.length) {
            const [firstType] = option;
            const constructorFirstType = firstType.constructor;
            const everyTypeChild = option.every((elm) => elm.constructor === constructorFirstType);
            if (!everyTypeChild) {
                return `[YooCamera] You must pass the same type of items when use Array to validate your prop in '${propName}'`;
            }
            if (constructorFirstType === RegExp) {
                const someRegExpMatch = option.some((elm) => elm.test(value.toString()));
                if (!someRegExpMatch) {
                    return `[YooCamera] Your value '${value}' not match with any possible type to '${propName}'`;
                }
                return '[YooCamera] Generic array error.';
            }
            if (!option.includes(value)) {
                return `[YooCamera] You can only pass '${option.join(', ')}' to '${propName}'`;
            }
        }
        return null;
    }
    static Required(target, propertyKey, parameterIndex) {
        let requiredParameters = Reflect.getOwnMetadata(metadataKey, target, propertyKey) || [];
        requiredParameters.push(parameterIndex);
        Reflect.defineMetadata(metadataKey, requiredParameters, target, propertyKey);
    }
    static ValidateProps(propName, option) {
        return function (target, propertyName, descriptor) {
            let method = descriptor.value;
            descriptor.value = function () {
                let validateParameters = Reflect.getOwnMetadata(metadataKey, target, propertyName);
                if (validateParameters) {
                    for (let parameterIndex of validateParameters) {
                        const invalid = parameterIndex >= arguments.length ||
                            arguments[parameterIndex] === undefined;
                        if (invalid) {
                            throw new Error("Missing argument.");
                        }
                        const errorMessage = Validator.getErrorMessage(propName, option, arguments[parameterIndex]);
                        if (errorMessage !== null) {
                            throw new Error(errorMessage);
                        }
                        if (Validator.PropMap !== null) {
                            Validator.PropMap.push({
                                name: propertyName,
                                value: arguments[parameterIndex]
                            });
                        }
                    }
                }
                return method.apply(this, arguments);
            };
        };
    }
    static PercentageToNumber(target, propertyName, descriptor) {
        let method = descriptor.value;
        descriptor.value = function () {
            let validateParameters = Reflect.getOwnMetadata(metadataKey, target, propertyName);
            if (validateParameters) {
                for (let parameterIndex of validateParameters) {
                    const invalid = parameterIndex >= arguments.length ||
                        arguments[parameterIndex] === undefined;
                    if (invalid) {
                        throw new Error("Missing argument.");
                    }
                    let percentage = arguments[parameterIndex];
                    percentage = percentage.replace('%', '');
                    arguments[parameterIndex] = parseInt(percentage) / 100;
                }
            }
            return method.apply(this, arguments);
        };
    }
    static NumberToPixel(target, propertyName, descriptor) {
        let method = descriptor.value;
        descriptor.value = function () {
            let validateParameters = Reflect.getOwnMetadata(metadataKey, target, propertyName);
            if (validateParameters) {
                for (let parameterIndex of validateParameters) {
                    const invalid = parameterIndex >= arguments.length ||
                        arguments[parameterIndex] === undefined;
                    if (invalid) {
                        throw new Error("Missing argument.");
                    }
                    let pixel = arguments[parameterIndex];
                    pixel = pixel.replace('px', '');
                    arguments[parameterIndex] = Number.parseInt(pixel);
                }
            }
            return method.apply(this, arguments);
        };
    }
}
Validator.RegexColor = /(#([\da-f]{3}){1,2}|(rgb|hsl)a\((\d{1,3}%?,\s?){3}(1|0?\.\d+)\)|(rgb|hsl)\(\d{1,3}%?(,\s?\d{1,3}%?){2}\))/ig;
Validator.RegexPercentage = /(^(([0-9])?([0-9])?|0)(\.[0-9]{0,2})?.\%$)/ig;
Validator.RegexNumber = /[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/ig;
Validator.RegexPX = /[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)+(px)$/ig;
Validator.PropMap = [];
export default Validator;
//# sourceMappingURL=Validator.js.map