const rearrange = (a, b) => {
    if (a.every((v, i) => b[i] > v))
        return [a, b];
    if (a.every((v, i) => b[i] < v))
        return [b, a];
    const arr = [[0, 0, 0], [0, 0, 0]];
    for (let i = 0; i < 3; i++) {
        const av = a[i], bv = b[i];
        const reverse = bv > av;
        arr[reverse ? 0 : 1][i] = av;
        arr[reverse ? 1 : 0][i] = bv;
    }
    return arr;
};
const axisEnum = {
    x: 0,
    y: 1,
    z: 2
};
export default class area {
    static bindLocation = (location, centerSize) => {
        location = posifyDecimal(location);
        centerSize = posifyDecimal(centerSize);
        const start = location.map((v, i) => v - centerSize[i]);
        const end = location.map((v, i) => v + centerSize[i]);
        return new area(start, end);
    };
    [Symbol.iterator] = (() => {
        const t = this;
        return function* () {
            const [[xmin, ymin, zmin], [xmax, ymax, zmax]] = rearrange(t.start, t.end);
            for (let x = xmin; x <= xmax; x++)
                for (let y = ymin; y <= ymax; y++)
                    for (let z = zmin; z <= zmax; z++)
                        yield [~~x, ~~y, ~~z];
        };
    })();
    start;
    end;
    expand = (size = 1) => {
        this.start = this.start.map(v => v - size);
        this.end = this.end.map(v => v + size);
        return this;
    };
    expandAxis = (axis, size = 1) => {
        axis = typeof axis == 'string' ? axisEnum[axis] : axis;
        this.start[axis] - size;
        this.end[axis] + size;
        return this;
    };
    shrink = (size = 1) => {
        this.start = this.start.map(v => v + size);
        this.end = this.end.map(v => v - size);
        return this;
    };
    shrinkAxis = (axis, size = 1) => {
        axis = typeof axis == 'string' ? axisEnum[axis] : axis;
        this.start[axis] + size;
        this.end[axis] - size;
        return this;
    };
    fix = () => {
        [this.start, this.end] = rearrange(this.start, this.end);
        return this;
    };
    getCenterSize = () => this.start.map((v, i) => (this.end[i] - v) / 2);
    getCenterLocation = () => this.start.map((v, i) => (this.end[i] + v) / 2);
    getSize = () => this.start.map((v, i) => this.end[i] - v);
    getAreas = (size) => {
        size = posifyDecimal(size);
        const { abs, min } = Math;
        const [xa, ya, za] = (typeof size == 'number' ? [size, size, size] : size).map(abs);
        const [[xmin, ymin, zmin], [xmax, ymax, zmax]] = rearrange(this.start, this.end);
        return (function* () {
            for (let x = xmin; x <= xmax; x += xa) {
                for (let y = ymin; y <= ymax; y += ya) {
                    for (let z = zmin; z <= zmax; z += za) {
                        const xcmax = min(x + xa - 1, xmax), ycmax = min(y + ya - 1, ymax), zcmax = min(z + za - 1, zmax);
                        yield [
                            [~~x, ~~y, ~~z],
                            [~~xcmax, ~~ycmax, ~~zcmax]
                        ];
                    }
                }
            }
        })();
    };
    getDistanceWithLocation = (location) => {
        location = posifyDecimal(location);
        const [min, max] = rearrange(this.start, this.end);
        return Array.from(Array(3), (v, i) => location[i] < min[i] ? min[i] - location[i] : location[i] > max[i] ? location[i] - max[i] : 0);
    };
    getDistanceWithArea = (area) => {
        const [min0, max0] = rearrange(this.start, this.end);
        const [min1, max1] = rearrange(area.start, area.end);
        const [min, max] = [[min0, min1], [max0, max1]];
        return Array.from(Array(3), (v, i) => {
            const [a, b, c, d] = [
                min[0][i] - min[1][i],
                min[0][i] - max[1][i],
                min[1][i] - max[0][i],
                max[1][i] - max[0][i]
            ];
            return (a >= 0 && b <= 0) || (c <= 0 && d >= 0) ? 0
                : (a >= 0 && b >= 0) ? Math.min(a, b) : Math.min(c, d);
        });
    };
    constructor(start, end) {
        start = posifyDecimal(start);
        end = posifyDecimal(end);
        this.start = start;
        this.end = end;
    }
}
const { floor } = Math;
export const posify = (v) => Array.isArray(v) ? v : [floor(v.x), floor(v.y), floor(v.z)];
export const posifyDecimal = (v) => Array.isArray(v) ? v : [v.x, v.y, v.z];
export const posConvert = (v) => posify(v).map(v => `§a${v}§r`).join(', ');