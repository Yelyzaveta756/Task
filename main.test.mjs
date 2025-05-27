const {createSquare} = require('./main.js');
// import {createSquare} from "./main.mjs";

test("Test square type", () => {
    const square = createSquare(1, 1, 4);
    expect(square.type).toBe("Square");
})

test("Coordinates", () => {
    const square = createSquare(1, 1, 4);
    expect(square.topRight).toStrictEqual({ x: 1, y: 1});
})

test("Test square area", () => {
    const square = createSquare(1, 1, 4);
    expect(square.getArea()).toBe(16);
})

test("Test square perimeter", () => {
    const square = createSquare(1, 1, 3);
    expect(square.getPerimeter()).toBe(12);
})

test("Print Result", () => {
    const square = createSquare(1, 1, 3);
    expect(square.toString()).toBe("Square | Perimeter: 12 Area: 9");
})

