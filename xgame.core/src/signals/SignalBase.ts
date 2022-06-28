/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2020-09-15
*************************************************/
module xgame {
    /**
     * The base class for all the signal classes.
     */
    export class SignalBase extends XObject {
        public head: ListenerNode;
        public tail: ListenerNode;
        private nodes: Map<Function, ListenerNode>;
        private listenerNodePool: ListenerNodePool;
        private toAddHead: ListenerNode;
        private toAddTail: ListenerNode;
        private dispatching: boolean;
        private _numListeners: number = 0;

        public constructor() {
            super();
            this.nodes = new Map<Function, ListenerNode>();
            this.listenerNodePool = new ListenerNodePool();
        }

        public get numListeners(): number {
            return this._numListeners;
        }
        public has(listener: Function): boolean {
            return this.nodes.has(listener);
        }

        public add(listener: Function, thisObject: any = null, priority: number = 0): void {
            if (this.nodes.has(listener)) {
                return;
            }
            let node: ListenerNode = this.listenerNodePool.get();
            node.listener = listener;
            node.priority = priority;
            node.thisObject = thisObject;
            this.nodes.set(listener, node);
            this.addNode(node);
        }

        public addOnce(listener: Function, thisObject: any = null, priority: number = 0): void {
            if (this.nodes.has(listener)) {
                return;
            }
            let node: ListenerNode = this.listenerNodePool.get();
            node.listener = listener;
            node.priority = priority;
            node.thisObject = thisObject;
            node.once = true;
            this.nodes.set(listener, node);
            this.addNode(node);
        }

        public remove(listener: Function): void {
            let node: ListenerNode = this.nodes.get(listener);
            if (node) {
                if (this.sortEnable) {
                    this.invalidateSort = true;
                }
                if (this.head === node) {
                    this.head = this.head.next;
                }
                if (this.tail === node) {
                    this.tail = this.tail.previous;
                }
                if (this.toAddHead === node) {
                    this.toAddHead = this.toAddHead.next;
                }
                if (this.toAddTail === node) {
                    this.toAddTail = this.toAddTail.previous;
                }
                if (node.previous) {
                    node.previous.next = node.next;
                }
                if (node.next) {
                    node.next.previous = node.previous;
                }
                this.nodes.delete(listener);
                if (this.dispatching) {
                    this.listenerNodePool.cache(node);
                } else {
                    this.listenerNodePool.dispose(node);
                }
                this._numListeners--;
            }
            if (this.numListeners == 0) {
                this.sortEnable = false;
                this.invalidateSort = false;
            }
        }

        public removeAll(): void {
            while (this.head) {
                let node: ListenerNode = this.head;
                this.head = this.head.next;
                this.nodes.delete(node.listener);
                this.listenerNodePool.dispose(node);
            }
            this.tail = null;
            this.toAddHead = null;
            this.toAddTail = null;
            this._numListeners = 0;
            this.invalidateSort = false;
            this.sortEnable = false;
        }

        protected startDispatch(): void {
            this.dispatching = true;
            if (this.sortEnable && this.invalidateSort) {
                this.sorts(this.head);
            }
        }

        protected endDispatch(): void {
            this.dispatching = false;
            if (this.toAddHead) {
                if (!this.head) {
                    this.head = this.toAddHead;
                    this.tail = this.toAddTail;
                } else {
                    this.tail.next = this.toAddHead;
                    this.toAddHead.previous = this.tail;
                    this.tail = this.toAddTail;
                }
                this.toAddHead = null;
                this.toAddTail = null;
            }
            this.listenerNodePool.releaseCache();
        }
        private sortEnable: boolean = false;
        private invalidateSort: boolean = false;
        private addNode(node: ListenerNode): void {
            if (node.priority) {
                this.sortEnable = true;
            }
            if (this.sortEnable) {
                this.invalidateSort = true;
            }
            if (this.dispatching) {
                if (!this.toAddHead) {
                    this.toAddHead = this.toAddTail = node;
                } else {
                    this.toAddTail.next = node;
                    node.previous = this.toAddTail;
                    this.toAddTail = node;
                }
            } else {
                if (!this.head) {
                    this.head = this.tail = node;
                } else {
                    this.tail.next = node;
                    node.previous = this.tail;
                    this.tail = node;
                }
            }
            this._numListeners++;
        }
        private sorts(head: ListenerNode): void {
            let p: ListenerNode;
            let q: ListenerNode;
            p = head;
            while (p) {
                for (q = p.next; q != null; q = q.next) {
                    if (p.priority < q.priority) {
                        p.switchNode(q);
                        this.nodes.set(p.listener, p);
                        this.nodes.set(q.listener, q);
                    }
                }
                p = p.next;
            }
        }
    }
}