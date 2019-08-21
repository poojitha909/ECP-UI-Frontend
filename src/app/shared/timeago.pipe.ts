import { Pipe } from '@angular/core';

@Pipe({
    name: 'timeago'
})
export class TimeAgoPipe {
  transform(val, args) {
    
    console.log(val);
    let d = new Date(val);
		let now = new Date();
		let seconds = Math.round(Math.abs((now.getTime() - d.getTime())/1000));
		
    let minutes = Math.round(Math.abs(seconds / 60));
		let hours = Math.round(Math.abs(minutes / 60));
		let days = Math.round(Math.abs(hours / 24));
		let months = Math.round(Math.abs(days/30.416));
		let years = Math.round(Math.abs(days/365));
		if (Number.isNaN(seconds)){
			return '';
		} else if (seconds <= 45) {
			return 'few seconds ago';
		} else if (seconds <= 90) {
			return '1 minute ago';
		} else if (minutes <= 45) {
			return minutes + ' minutes ago';
		} else if (minutes <= 90) {
			return '1 hour ago';
		} else if (hours <= 22) {
			return hours + ' hours ago';
		} else if (hours <= 36) {
			return '1 day ago';
		} else if (days <= 25) {
			return days + ' days ago';
		} else if (days <= 45) {
			return '1 month ago';
		} else if (days <= 345) {
			return months + ' months ago';
		} else{
      return ( d.getDate() < 10 ? "0" + d.getDate() : d.getDate() ) + "-" + ( d.getMonth() < 10 ? "0" + d.getMonth() : d.getMonth() ) + "-" + d.getFullYear();
    }
  }
}