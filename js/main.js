var app = new Vue({
    el: '#app',
    data: {
        maghrib: '21:00',
        fajr: '04:00',
        thirdParts: [],
        halfParts: [],
    },
    methods: {
        calculate() {
            let maghribMinutes = this.maghribHours * 60 + this.maghribMinutes;
            let fajrMinutes = this.fajrHours * 60 + this.fajrMinutes + 60 * 24;

            let diff = fajrMinutes - maghribMinutes;

            let halfMinutes = maghribMinutes + diff / 2;

            this.halfParts = [
                this.maghrib,
                this.minutesToHours(halfMinutes) + ":" + this.minutesToMinutes(halfMinutes),
                this.fajr
            ];

            let firstHalfEnd = maghribMinutes + diff / 3;
            let secondHalfEnd = maghribMinutes + diff / 3 * 2;

            this.thirdParts = [
                this.maghrib,
                this.minutesToHours(firstHalfEnd) + ":" + this.minutesToMinutes(firstHalfEnd),
                this.minutesToHours(secondHalfEnd) + ":" + this.minutesToMinutes(secondHalfEnd),
                this.fajr
            ];
        },
        limitHoursByTwentyFour(hours) {
            return hours >= 24 ? hours - 24 : hours;
        },
        minutesToHours(minutes) {
            let hours = Math.ceil(minutes / 60);
            return this.limitHoursByTwentyFour(hours);
        },
        minutesToMinutes(minutes) {
            return Math.round(minutes % 60);
        }
    },
    computed: {
        maghribHours() {
            return parseInt(this.maghrib.split(':')[0]);
        },
        maghribMinutes() {
            return parseInt(this.maghrib.split(':')[1]);
        },
        fajrHours() {
            return parseInt(this.fajr.split(':')[0]);
        },
        fajrMinutes() {
            return parseInt(this.fajr.split(':')[1]);
        },
    },
    mounted() {
        this.calculate();
    },
});
