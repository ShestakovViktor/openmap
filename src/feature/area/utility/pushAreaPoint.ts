import {Area} from "@feature/area/type";

export function pushAreaPoint(area: Area, point: {x: number; y: number}): {
    x: number;
    y: number;
    width: number;
    height: number;
    points: {x: number; y: number}[];
} {
    const minimum = {x: area.x - area.width / 2, y: area.y - area.height / 2};
    const maximum = {x: area.x + area.width / 2, y: area.y + area.height / 2};

    const shift = {
        x: point.x < minimum.x ? point.x - minimum.x
            : point.x > maximum.x ? point.x - maximum.x
                : 0,
        y: point.y < minimum.y ? point.y - minimum.y
            : point.y > maximum.y ? point.y - maximum.y
                : 0,
    };

    const center = {x: area.x + shift.x / 2, y: area.y + shift.y / 2};

    const points = [
        ...area.points
            .map(point => ({x: point.x - shift.x / 2, y: point.y - shift.y / 2})),
        {x: point.x - center.x, y: point.y - center.y},
    ];

    const newArea = {
        x: center.x,
        y: center.y,
        width: area.width + Math.abs(shift.x),
        height: area.height + Math.abs(shift.y),
        points,
    };

    return newArea;
}
