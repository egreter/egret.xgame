/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-20
*************************************************/
module xgame {
    export class Time extends xgame.Singleton {
        public deltaTime: number = 0;
        public timeScale: number = 1;
        public passedTime: number = 0;
    }
}