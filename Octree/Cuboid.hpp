struct Point
{
    double x,y,z;
};



struct Cuboid {
    Point center; // Center coordinates
    double w,h,d; // Weight, Height, Depth

    bool contains(Point point) {
        if (point.x >= center.x - w && point.x <= center.x + w &&
                point.y >= center.y - h && point.y <= center.y + h &&
                point.z >= center.z - d && point.z <= center.z + d)
            return true;
        return false;
    }

    bool intersects(Cuboid range) {
        if (range.center.x - range.w > center.x + w || range.center.x + range.w < center.x - w ||
                range.center.y - range.h > center.y + h || range.center.y + range.h < center.y - h ||
                range.center.z - range.d > center.z + d || range.center.z + range.d < center.z - d)
            return false;
        return true;
    }
};