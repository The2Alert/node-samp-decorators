import {Player} from "@sa-mp/core";

export type CommandDecorator = (target: InstanceType<typeof Player.Context>, propertyKey: string) => void;

export function Command(name: string, desc?: string): CommandDecorator {
    return (target, propertyKey) => {
        const handler = (target as any)[propertyKey];
        target.contextCommands ??= {};
        target.contextCommands[propertyKey] ??= {name: "", params: [], handler};
        target.contextCommands[propertyKey].name = name;
        if(desc !== undefined)
            target.contextCommands[propertyKey].desc = desc;
    };
}

export function Alt(...altNames: string[]): CommandDecorator {
    return (target, propertyKey) => {
        const handler = (target as any)[propertyKey];
        target.contextCommands ??= {};
        target.contextCommands[propertyKey] ??= {name: "", params: [], handler};
        target.contextCommands[propertyKey].altNames ??= [];
        for(const name of altNames)
            target.contextCommands[propertyKey].altNames?.push(name);
    };
}