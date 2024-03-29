/**
 * ██╗   ██╗ ██████╗  ██████╗ ███╗   ██╗██╗████████╗
 * ╚██╗ ██╔╝██╔═══██╗██╔═══██╗████╗  ██║██║╚══██╔══╝
 *  ╚████╔╝ ██║   ██║██║   ██║██╔██╗ ██║██║   ██║
 *   ╚██╔╝  ██║   ██║██║   ██║██║╚██╗██║██║   ██║
 *    ██║   ╚██████╔╝╚██████╔╝██║ ╚████║██║   ██║
 *    ╚═╝    ╚═════╝  ╚═════╝ ╚═╝  ╚═══╝╚═╝   ╚═╝
 *
 * https://yoonit.dev - about@yoonit.dev
 *
 * NativeScript Yoonit Camera
 * The most advanced and modern Camera module for Android with a lot of awesome features
 *
 * Luigui Delyer, Haroldo Teruya, Victor Goulart, Gabriel Rizzo & Márcio Bruffato @ 2020-2021
 */

import "reflect-metadata";

import {
    Color,
    isAndroid
} from '@nativescript/core';

const MetadataKey = Symbol("required");

class Validator {
    static RegexColor: RegExp = /(#([\da-f]{3}){1,2}|(rgb|hsl)a\((\d{1,3}%?,\s?){3}(1|0?\.\d+)\)|(rgb|hsl)\(\d{1,3}%?(,\s?\d{1,3}%?){2}\))/ig;
    static RegexPercentage: RegExp = /(^(([0-9])?([0-9])?|0)(\.[0-9]{0,2})?.\%$)/ig;
    static RegexNumber: RegExp = /[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/ig;
    static RegexPX: RegExp = /[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)+(px)$/ig;
    static PropMap: Array<{ type: string, name: string, value: any, length: number }> = [];

    private static getErrorMessage(
        propName: String,
        option: Array<String | Number | Boolean | RegExp> | RegExp,
        value: String | Number | Boolean
    ): string {
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
            const everyTypeChild = option.every(
                (elm: String | Number | Boolean | RegExp) =>
                    elm.constructor === constructorFirstType
            );

            if (!everyTypeChild) {
                return `[YooCamera] You must pass the same type of items when use Array to validate your prop in '${propName}'`;
            }

            if (constructorFirstType === RegExp) {
                const someRegExpMatch = option.some(
                    (elm: RegExp) =>
                        elm.test(
                            value.toString()
                        )
                );

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

    public static Required(
        target: Object,
        propertyKey: string | symbol,
        parameterIndex: number
    ): void {
        let requiredParameters: number[] = Reflect.getOwnMetadata(
            MetadataKey,
            target,
            propertyKey) || [];

        requiredParameters.push(parameterIndex);

        Reflect.defineMetadata(
            MetadataKey,
            requiredParameters,
            target,
            propertyKey
        );
    }

    public static ValidateProps(
        propName: String,
        option: Array<String | Number | Boolean | RegExp> | RegExp,
    ): Function {
        return function(
            target: any,
            propertyName: string,
            descriptor: TypedPropertyDescriptor<Function>
        ) {
            let method = descriptor.value;

            descriptor.value = function() {
                let validateParameters: number[] = Reflect.getOwnMetadata(
                    MetadataKey,
                    target,
                    propertyName
                );

                if (validateParameters) {
                    for (let parameterIndex of validateParameters) {

                        const invalid: boolean =
                            parameterIndex >= arguments.length ||
                            arguments[parameterIndex] === undefined;

                        if (invalid) {
                            throw new Error("Missing argument.");
                        }

                        const errorMessage: string = Validator.getErrorMessage(
                            propName,
                            option,
                            arguments[parameterIndex]
                        );

                        if (errorMessage !== null) {
                            throw new Error(errorMessage);
                        }
                    }
                }

                return method.apply(this, arguments);
            };
        };
    }

    public static NativeMethod({ name, length }: { name: string, length: number}): Function {
        return function(
            target: any,
            propertyName: string,
            descriptor: TypedPropertyDescriptor<Function>
        ) {
            let method = descriptor.value;

            descriptor.value = function() {
                let validateParameters: number[] = Reflect.getOwnMetadata(
                    MetadataKey,
                    target,
                    propertyName
                );

                if (validateParameters) {
                    for (let parameterIndex of validateParameters) {

                        const invalid: boolean =
                            parameterIndex >= arguments.length ||
                            arguments[parameterIndex] === undefined;

                        if (invalid) {
                            throw new Error("Missing argument.");
                        }

                        Validator.PropMap.push({
                            type: 'method',
                            name,
                            value: arguments[parameterIndex],
                            length
                        });
                    }
                }

                return method.apply(this, arguments);
            };
        };
    }

    public static NativeAttribute(name: string): Function {
        return function(
            target: any,
            propertyName: string,
            descriptor: TypedPropertyDescriptor<Function>
        ) {
            let method = descriptor.value;

            descriptor.value = function() {
                let validateParameters: number[] = Reflect.getOwnMetadata(
                    MetadataKey,
                    target,
                    propertyName
                );
                if (validateParameters) {
                    for (let parameterIndex of validateParameters) {
                        const invalid: boolean =
                            parameterIndex >= arguments.length ||
                            arguments[parameterIndex] === undefined;

                        if (invalid) {
                            throw new Error("Missing argument.");
                        }

                        Validator.PropMap.push({
                            type: 'attribute',
                            name,
                            value: arguments[parameterIndex],
                            length: 0
                        });
                    }
                }

                return method.apply(this, arguments);
            };
        };
    }

    public static PercentageToNumber(
        target: any,
        propertyName: string,
        descriptor: TypedPropertyDescriptor<any>
    ) {
        let method = descriptor.value;

        descriptor.value = function() {
            let validateParameters: number[] = Reflect.getOwnMetadata(
                MetadataKey,
                target,
                propertyName
            );

            if (validateParameters) {
                for (let parameterIndex of validateParameters) {

                    const invalid: boolean =
                        parameterIndex >= arguments.length ||
                        arguments[parameterIndex] === undefined;

                    if (invalid) {
                        throw new Error("Missing argument.");
                    }

                    let percentage: string = arguments[parameterIndex];
                    percentage = percentage.replace('%', '');
                    arguments[parameterIndex] = parseInt(percentage) / 100;
                }
            }

            return method.apply(this, arguments);
        };
    }

    public static NumberToPixel(
        target: any,
        propertyName: string,
        descriptor: TypedPropertyDescriptor<any>
    ) {
        let method = descriptor.value;

        descriptor.value = function() {
            let validateParameters: number[] = Reflect.getOwnMetadata(
                MetadataKey,
                target,
                propertyName
            );

            if (validateParameters) {
                for (let parameterIndex of validateParameters) {

                    const invalid: boolean =
                        parameterIndex >= arguments.length ||
                        arguments[parameterIndex] === undefined;

                    if (invalid) {
                        throw new Error("Missing argument.");
                    }

                    let pixel: string = arguments[parameterIndex];
                    pixel = pixel.replace('px', '');
                    arguments[parameterIndex] = Number.parseInt(pixel);
                }
            }

            return method.apply(this, arguments);
        };
    }

    public static ParseToNsColor(
        target: any,
        propertyName: string,
        descriptor: TypedPropertyDescriptor<any>
    ) {
        let method = descriptor.value;

        descriptor.value = function() {
            let validateParameters: number[] = Reflect.getOwnMetadata(
                MetadataKey,
                target,
                propertyName
            );

            if (validateParameters) {
                for (let parameterIndex of validateParameters) {

                    const invalid: boolean =
                        parameterIndex >= arguments.length ||
                        arguments[parameterIndex] === undefined;

                    if (invalid) {
                        throw new Error("Missing argument.");
                    }

                    let rawColor: string = arguments[parameterIndex];
                    const nsColor: Color = new Color(rawColor);

                    if (isAndroid) {
                        arguments[parameterIndex] = [
                            nsColor.a,
                            nsColor.r,
                            nsColor.g,
                            nsColor.b
                        ];
                    } else {
                        arguments[parameterIndex] = [
                            nsColor.a / 255,
                            nsColor.r / 255,
                            nsColor.g / 255,
                            nsColor.b / 255
                        ];
                    }
                }
            }

            return method.apply(this, arguments);
        };
    }
}

export default Validator;
