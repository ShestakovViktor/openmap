import assert from "assert";
import {pushAreaPoint} from "./pushAreaPoint";
import {Area} from "@feature/area/type";

describe("Invoker", () => {
    let area: Area;

    beforeEach(() => {
        area = {
            id: 2,
            entityTypeId: 1,
            x: 10,
            y: 10,
            width: 0,
            height: 0,
            points: [{x: 0, y: 0}],
            parentId: 1,
            footnoteId: null,
        };
    });

    it("Execute", () => {
        const res = pushAreaPoint(area, {x: 20, y: 20});

        assert.deepEqual(res, {
            x: 15,
            y: 15,
            width: 10,
            height: 10,
            points: [{x: -5, y: -5}, {x: 5, y: 5}],
        });
    });

    it("Execute", () => {
        const res = pushAreaPoint(area, {x: 0, y: 0});

        assert.deepEqual(res, {
            x: 5,
            y: 5,
            width: 10,
            height: 10,
            points: [{x: 5, y: 5}, {x: -5, y: -5}],
        });
    });

});