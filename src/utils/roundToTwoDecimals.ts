export default function roundToTwoDecimals(num: number | null): number | null {
    if(!num) return null;
    return Math.round((num + Number.EPSILON) * 100) / 100;
}