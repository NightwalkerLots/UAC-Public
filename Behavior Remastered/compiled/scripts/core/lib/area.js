import { convertLocationType, offset } from "./misc.js";
export default class Area {
    static fromCenter(center, size) {
        size = typeof size === 'number' ? [size, size, size] : convertLocationType('Array', size);
        return new this(size.map(v => -v / 2), size.map(v => v / 2)).move(center);
    }
    static fromSize(start, size) {
        return new this([0, 0, 0], typeof size === 'number' ? [size, size, size] : convertLocationType('Array', size)).move(start);
    }
    constructor(from, to) {
        this.from = convertLocationType('Array', from);
        this.to = convertLocationType('Array', to);
    }
    from;
    to;
    getSize(shift = 0) {
        const [x1, y1, z1] = this.from, [x2, y2, z2] = this.to;
        return [x2 - x1 + shift, y2 - y1 + shift, z2 - z1 + shift];
    }
    getVolume(sizeShift = 0) {
        return this.getSize(sizeShift).reduce((a, b) => a * b, 1);
    }
    getCenter() {
        const [x1, y1, z1] = this.from, [x2, y2, z2] = this.to;
        return [x2 + x1 / 2, y2 + y1 / 2, z2 + z1 / 2];
    }
    move(distance) {
        const ndist = typeof distance === 'number' ? [distance, distance, distance] : convertLocationType('Array', distance);
        this.from = offset(this.from, ndist);
        this.to = offset(this.to, ndist);
        return this;
    }
    offset(distance) {
        const ndist = typeof distance === 'number' ? [distance, distance, distance] : convertLocationType('Array', distance);
        return new Area(this.from, this.to).move(ndist);
    }
    expand(size) {
        this.from = this.from.map(v => v - size);
        this.to = this.to.map(v => v + size);
        return this;
    }
    expandFor(axis, size) {
        axis = axisEnum[axis];
        this.from[axis] -= size;
        this.to[axis] += size;
        return this;
    }
    shrink(size) {
        this.from = this.from.map(v => v + size);
        this.to = this.to.map(v => v - size);
        return this;
    }
    shrinkFor(axis, size) {
        axis = axisEnum[axis];
        this.from[axis] += size;
        this.to[axis] -= size;
        return this;
    }
    fixSize() {
        const [x1, y1, z1] = this.from, [x2, y2, z2] = this.to;
        this.from = [
            x1 < x2 ? x1 : x2,
            y1 < y2 ? y1 : y2,
            z1 < z2 ? z1 : z2,
        ];
        this.to = [
            x1 > x2 ? x1 : x2,
            y1 > y2 ? y1 : y2,
            z1 > z2 ? z1 : z2,
        ];
        return this;
    }
    getClosestAxisDistance(locData) {
        const [x11, y11, z11] = this.from, [x12, y12, z12] = this.to;
        if (locData instanceof Area) {
            const [x21, y21, z21] = locData.from, [x22, y22, z22] = locData.to;
            return [
                x22 < x11 ? x22 - x11 : x21 > x12 ? x21 - x12 : 0,
                y22 < y11 ? y22 - y11 : y21 > y12 ? y21 - y12 : 0,
                z22 < z11 ? z22 - z11 : z21 > z12 ? z21 - z12 : 0,
            ];
        }
        else {
            const [x2, y2, z2] = locData = convertLocationType('Array', locData);
            return [
                x2 < x11 ? x2 - x11 : x2 > x12 ? x2 - x12 : 0,
                y2 < y11 ? y2 - y11 : y2 > y12 ? y2 - y12 : 0,
                z2 < z11 ? z2 - z11 : z2 > z12 ? z2 - z12 : 0,
            ];
        }
    }
    getClosestDistance(locData) {
        return Math.hypot(...this.getClosestAxisDistance(locData));
    }
    getClosestLocation(loc) {
        const [x1, y1, z1] = this.from, [x2, y2, z2] = this.to, [x, y, z] = loc = convertLocationType('Array', loc);
        return [
            x < x1 ? x1 : x > x2 ? x2 : x,
            y < y1 ? y1 : y > y2 ? y2 : y,
            z < z1 ? z1 : z > z2 ? z2 : z,
        ];
    }
    isInside(locData) {
        return this.getClosestAxisDistance(locData).every(v => v === 0);
    }
    *chunk(size, endShift = -1) {
        const [x1, y1, z1] = this.from, [x2, y2, z2] = this.to, [xs, ys, zs] = typeof size === 'number' ? [size, size, size] : convertLocationType('Array', size);
        for (let x = x1; x < x2; x += xs)
            for (let y = y1; y < y2; y += ys)
                for (let z = z1; z < z2; z += zs)
                    yield [
                        [x, y, z],
                        [Math.min(x + xs, x2) + endShift, Math.min(y + ys, y2) + endShift, Math.min(z + zs, z2) + endShift]
                    ];
    }
    *[Symbol.iterator]() {
        const [x1, y1, z1] = this.from, [x2, y2, z2] = this.to;
        for (let x = x1; x <= x2; x++)
            for (let y = y1; y <= y2; y++)
                for (let z = z1; z <= z2; z++)
                    yield [x, y, z];
    }
}
const axisEnum = {
    'x': 0,
    'y': 1,
    'z': 2,
    '0': 0,
    '1': 1,
    '2': 2,
};
Object.setPrototypeOf(axisEnum, null);
