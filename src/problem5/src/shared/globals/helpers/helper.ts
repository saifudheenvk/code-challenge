

class Helper {
    static parseJson(prop: string): any {
        try {
          JSON.parse(prop);
        } catch (error) {
          return prop;
        }
        return JSON.parse(prop);
      }

      static parseDate(date: string): Date {
        return new Date(date);
      }
}

export { Helper };