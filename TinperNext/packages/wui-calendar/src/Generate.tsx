import moment from 'moment';

export default {
    generateM: () => {
        return moment
    },
    getDisplayYear: (value: any) => {
        return value.year()
    }
}