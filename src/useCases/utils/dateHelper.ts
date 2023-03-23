export class DateHelper {
    
    async daysInterval(dateEnd: Date) {
        const d2 = dateEnd.getTime();
        const d1 = new Date().getTime();
        const diffInMs = d2 - d1;
        const diffInDays = diffInMs / 86400000;

        return diffInDays;
    }
}