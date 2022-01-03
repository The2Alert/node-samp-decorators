import {Player} from "@sa-mp/core";

export type KeyDecorator = (target: InstanceType<typeof Player.Context>, propertyKey: string) => void;

export function Key(keys: number): KeyDecorator {
    return (target, propertyKey) => {
        const handler = (target as any)[propertyKey];
        target.contextKeys ??= {};
        target.contextKeys[propertyKey] ??= {keys, handler};
    };
}