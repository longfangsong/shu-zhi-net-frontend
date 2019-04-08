const dateRegex = /((\d{4})|([+-]?\d{6}))-(\d{2})-(\d{2})T\d{2}:\d{2}:\d{2}(\.\d{3})?Z/;

export function normalizeDateTimeInObject(object: any): any {
    if (object === null || object === undefined) {
        return object;
    } else if (typeof object === 'string') {
        if (dateRegex.test(object)) {
            return new Date(object);
        } else {
            return object;
        }
    } else if (typeof object === 'object') {
        if (object instanceof Array) {
            return object.map(normalizeDateTimeInObject);
        } else if (object instanceof Date) {
            return new Date(object);
        } else if (object instanceof Object) {
            // tslint:disable-next-line
            let result = {};
            for (const attr in object) {
                if (object.hasOwnProperty(attr)) {
                    (result as any)[attr] = normalizeDateTimeInObject(object[attr]);
                }
            }
            return result;
        }
    } else {
        return object;
    }
    throw new Error(`Cannot normalize ${object}!`);
}
