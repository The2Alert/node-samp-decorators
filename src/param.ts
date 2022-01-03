import {Player} from "@sa-mp/core";

export interface ParamOptions {
    type: string;
    name: string;
}

export type ParamDecorator = (target: InstanceType<typeof Player.Context>, propertyKey: string, parameterIndex: number) => void;

export function Param(nameOrOptions?: string | ParamOptions): ParamDecorator {
    return (target, propertyKey, parameterIndex) => {
        let name: string;
        let type: string;
        if(nameOrOptions === undefined || typeof nameOrOptions === "string") {
            name = nameOrOptions ?? "";
            type = Param.getType(Reflect.getMetadata("design:paramtypes", target, propertyKey)[parameterIndex]);
        } else {
            name = nameOrOptions.name;
            type = nameOrOptions.type;
        }
        const handler = (target as any)[propertyKey];
        target.contextCommands ??= {};
        target.contextCommands[propertyKey] ??= {name: "", params: [], handler};
        target.contextCommands[propertyKey].params[parameterIndex] = [type, name];
    };
}

export namespace Param {
    export function getType(anyClass: any): string {
        switch(anyClass) {
            case Boolean:
                return "b";
            case Number:
                return "n";
            default:
                return "s";
        }
    }
}

export function ParamBool(name: string = ""): ParamDecorator {
    return Param({type: "b", name});
}

export function ParamInt(name: string = ""): ParamDecorator {
    return Param({type: "i", name});
} 

export function ParamFloat(name: string = ""): ParamDecorator {
    return Param({type: "f", name});
} 

export function ParamNumber(name: string = ""): ParamDecorator {
    return Param({type: "n", name});
} 

export function ParamString(name: string = ""): ParamDecorator {
    return Param({type: "s", name});
} 

export function ParamWord(name: string = ""): ParamDecorator {
    return Param({type: "w", name});
} 