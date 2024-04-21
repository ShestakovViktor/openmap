export function getCentroid(
    vectors: {x: number; y: number}[]
): {x: number; y: number} {
    const centroid = {x: 0, y: 0};

    for (const vector of vectors) {
        centroid.x += vector.x;
        centroid.y += vector.y;
    }

    centroid.x = centroid.x / vectors.length;
    centroid.y = centroid.y / vectors.length;

    return centroid;
}