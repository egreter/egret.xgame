/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-06-28
*************************************************/
module ro {
    export let IUserData = Symbol.for("IUserData");
    export interface IUserData {
        platUsername: string;
        platNickname?: string;
    }
    export class UserData extends xgame.XObject implements IUserData {
        public platUsername: string;
        public platNickname: string;
        public constructor() {
            super();
        }

    }
}