import {Area} from "@feature/area/type";

export function popAreaPoint(area: Area): void {
    if (area.points.length == 0) {
        return;
    }
    const center = {x: area.x, y: area.y};

    const point = area.points.pop();
    if (!point) throw new Error();

    const minimum = {x: area.x - area.width / 2, y: area.y - area.height / 2};
    const maximum = {x: area.x + area.width / 2, y: area.y + area.height / 2};

    area.points.forEach((point) => {
        if (point.x < minimum.x) minimum.x = point.x;
        else if (point.x > maximum.x) maximum.x = point.x;

        if (point.y < minimum.y) minimum.y = point.y;
        else if (point.y > maximum.y) maximum.y = point.y;
    });

    area.width = maximum.x - minimum.x;
    area.height = maximum.y - minimum.y;
    area.x = (minimum.x + maximum.x) / 2;
    area.y = (minimum.y + maximum.y) / 2;

    const shift = {
        x: area.x - center.x,
        y: area.y - center.y,
    };

    area.points.forEach((point) => {
        point.x -= shift.x;
        point.y -= shift.y;
    });
}
