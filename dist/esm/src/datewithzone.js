import dateutil from './dateutil';
import { DateTime } from 'luxon';
var DateWithZone = /** @class */ (function () {
    function DateWithZone(date, tzid) {
        this.date = date;
        this.tzid = tzid;
    }
    Object.defineProperty(DateWithZone.prototype, "isUTC", {
        get: function () {
            return !this.tzid || this.tzid.toUpperCase() === 'UTC';
        },
        enumerable: true,
        configurable: true
    });
    DateWithZone.prototype.toString = function () {
        var datestr = dateutil.timeToUntilString(this.date.getTime(), this.isUTC);
        if (!this.isUTC) {
            return ";TZID=" + this.tzid + ":" + datestr;
        }
        return ":" + datestr;
    };
    DateWithZone.prototype.getTime = function () {
        return this.date.getTime();
    };
    DateWithZone.prototype.rezonedDate = function () {
        if (this.isUTC) {
            return this.date;
        }
        try {
            var date = this.date;
            var local = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds(), date.valueOf() % 1000);
            var datetime = DateTime.fromJSDate(local);
            var rezoned = datetime.setZone(this.tzid, { keepLocalTime: true });
            return rezoned.toJSDate();
        }
        catch (e) {
            if (e instanceof TypeError) {
                console.error('Using TZID without Luxon available is unsupported. Returned times are in UTC, not the requested time zone');
            }
            return this.date;
        }
    };
    return DateWithZone;
}());
export { DateWithZone };
//# sourceMappingURL=datewithzone.js.map