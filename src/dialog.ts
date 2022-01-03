import {Dialog, Player} from "@sa-mp/core";

export type DialogResDecorator = (target: InstanceType<typeof Player.Context>, propertyKey: string) => void;

export function DialogRes(dialog: Dialog): DialogResDecorator {
    return (target, propertyKey) => {
        const handler = (target as any)[propertyKey];
        target.contextDialogs ??= {};
        target.contextDialogs[propertyKey] ??= {dialog, handler};
    };
}