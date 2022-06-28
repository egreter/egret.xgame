/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-19
*************************************************/
/// <reference path="../core/XObject.ts" />

module xgame {
	export class MathVector extends XObject {
		public x: number;
		public y: number;

		public constructor(x: number = 0, y: number = 0) {
			super();
			this.x = x;
			this.y = y;
		}

		public copy(): MathVector {
			return new MathVector(this.x, this.y);
		}

		public copyFrom(vector: MathVector): void {
			this.x = vector.x;
			this.y = vector.y;
		}

		public copyFromPoint(point: Point): void {
			this.x = point.x;
			this.y = point.y;
		}

		public setTo(x: number = 0, y: number = 0): void {
			this.x = x;
			this.y = y;
		}

		public rotate(angle: number): void {
			let a: number = angle;
			let ca: number = Math.cos(a);
			let sa: number = Math.sin(a);
			let tx: number = this.x;
			let ty: number = this.y;

			this.x = tx * ca - ty * sa;
			this.y = tx * sa + ty * ca;
		}

		public scaleEquals(value: number): void {
			this.x *= value;
			this.y *= value;
		}

		public scale(value: number, result: MathVector = null): MathVector {
			if (result) {
				result.x = this.x * value;
				result.y = this.y * value;

				return result;
			}

			return new MathVector(this.x * value, this.y * value);
		}

		public normalize(): void {
			let l: number = length;
			this.x /= l;
			this.y /= l;
		}

		public plusEquals(vector: MathVector): void {
			this.x += vector.x;
			this.y += vector.y;
		}

		public plus(vector: MathVector, result: MathVector = null): MathVector {
			if (result) {
				result.x = this.x + vector.x;
				result.y = this.y + vector.y;

				return result;
			}

			return new MathVector(this.x + vector.x, this.y + vector.y);
		}

		public minusEquals(vector: MathVector): void {
			this.x -= vector.x;
			this.y -= vector.y;
		}

		public minus(vector: MathVector, result: MathVector = null): MathVector {
			if (result) {
				result.x = this.x - vector.x;
				result.y = this.y - vector.y;
				return result;
			}

			return new MathVector(this.x - vector.x, this.y - vector.y);
		}

		public dot(vector: MathVector): number {
			return (this.x * vector.x) + (this.y * vector.y);
		}

		public get angle(): number {
			return Math.atan2(this.y, this.x);
		}

		public set angle(value: number) {
			let l: number = length;
			let tx: number = l * Math.cos(value);
			let ty: number = l * Math.sin(value);
			this.x = tx;
			this.y = ty;
		}

		public get length(): number {
			return Math.sqrt((this.x * this.x) + (this.y * this.y));
		}

		public set length(value: number) {
			this.scaleEquals(value / length);
		}

		public get normal(): MathVector {
			return new MathVector(-this.y, this.x);
		}

		public toString(): string {
			return "[" + this.x + ", " + this.y + "]";
		}
	}
}
