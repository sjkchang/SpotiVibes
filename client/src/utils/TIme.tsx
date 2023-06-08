export function parseMsToTime(milliseconds: number): string {
    //Get remainder from hours and convert to minutes
    var minutes = milliseconds / (1000 * 60);
    var absoluteMinutes = Math.floor(minutes);
    var m = absoluteMinutes;

    //Get remainder from minutes and convert to seconds
    var seconds = (minutes - absoluteMinutes) * 60;
    var absoluteSeconds = Math.floor(seconds);
    var s = absoluteSeconds > 9 ? absoluteSeconds : "0" + absoluteSeconds;

    return m + ":" + s;
}
