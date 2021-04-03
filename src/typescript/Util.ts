export class Util {

    public static findMeanAngleDeg(angles: Array<number>): number {
        return 180 / Math.PI * Math.atan2(
            Util.sum(angles.map(Util.degToRad).map(Math.sin)) / angles.length,
            Util.sum(angles.map(Util.degToRad).map(Math.cos)) / angles.length
        );
    }

    public static degToRad(degree: number): number {
        return Math.PI / 180 * degree;
    }

    public static sum(nums: Array<number>): number {
        let s = 0;
        for (let i = 0; i < nums.length; i++) s += nums[i];
        return s;
    } 

    public static distance(point1: Array<number>, point2: Array<number>): number {
        let d1 = point1[0] - point2[0];
        let d2 = point1[1] - point2[1];
        return Math.sqrt(d1**2 + d2**2);
    }

}