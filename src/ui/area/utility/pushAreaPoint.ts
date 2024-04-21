import {Area} from "@type";

export function pushAreaPoint(
    area: Area,
    point: {x: number; y: number}
): void {
    if (area.points.length == 0) {
        area.x = point.x;
        area.y = point.y;
        area.width = 0;
        area.height = 0;
        area.points.push({x: 0, y: 0});
        return;
    }

    const center = {x: area.x, y: area.y};

    const minimum = {x: area.x - area.width / 2, y: area.y - area.height / 2};
    const maximum = {x: area.x + area.width / 2, y: area.y + area.height / 2};

    if (point.x < minimum.x) minimum.x = point.x;
    else if (point.x > maximum.x) maximum.x = point.x;

    if (point.y < minimum.y) minimum.y = point.y;
    else if (point.y > maximum.y) maximum.y = point.y;

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

    area.points.push({
        x: point.x - area.x,
        y: point.y - area.y,
    });
}
