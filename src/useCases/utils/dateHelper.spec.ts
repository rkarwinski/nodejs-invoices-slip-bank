import { expect, test } from 'vitest';
import { DateHelper } from './dateHelper';

test('generate interval dates', async () => {
    const dueDate = new Date(); 
    dueDate.setDate(dueDate.getDate() + 10); 
    
    const dateHelper = new DateHelper();
    const diffDays = await dateHelper.daysInterval(dueDate);

    expect(diffDays).toEqual(10);
});