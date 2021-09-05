import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { StravaService } from '../../strava/strava.service';

@Component({
	selector: 'app-range-pills',
	templateUrl: './range-pills.component.html',
	styleUrls: ['./range-pills.component.scss']
})
export class RangePillsComponent  {

	@Output() eventEmitter = new EventEmitter<any[]>();
	
	yearList = [];
	monthList = [];
	selectedYear: number;
	selectedMonth = 12;
	disabledSelectYear = false;
	disabledSelectMonth = true;
	activedRange = 'year';
	activedType = 'all';
	allActivities = [];
	filterActivities = [];

	constructor(public stravaService: StravaService) {
		this.stravaService.getAthleteData.subscribe(data => {
			if (data) {
				this.setDropDownYear();
				this.setDropDownMonth();
			}
		});
		
		this.stravaService.getAthleteAllActivities.subscribe( (resp: any) => {
			this.allActivities = resp;
			this.getDataByRangeAndType(this.activedRange, this.activedType);
		});
	}

	setDropDownYear(): void {
		let now = new Date();
		let createdYear = new Date(this.stravaService.user.created_at).getFullYear();
	
		for(let i = now.getFullYear() - createdYear; i >= 0; i--) {
			this.yearList.push(createdYear + i);
		}

		this.selectedYear = now.getFullYear();
		this.selectedMonth = now.getMonth() + 1;
	}

	setDropDownMonth(): void {
		let now = new Date();
		let createdAt = new Date(this.stravaService.user.created_at);
		
		let minMonth: number;
		let maxMonth: number;
	
		this.monthList = [];
	
		if (createdAt.getFullYear() == this.selectedYear) {
			minMonth = createdAt.getMonth() + 1;
			maxMonth = 12;
	
			if (this.selectedYear == now.getFullYear()) {
				maxMonth = now.getMonth() + 1;
			}
	
		} else if (createdAt.getFullYear() < this.selectedYear 
				&& (now.getFullYear() - this.selectedYear) > 0 ) {
			minMonth = 1;
			maxMonth = 12;
	
		} else if (createdAt.getFullYear() < this.selectedYear 
				&& (now.getFullYear() - this.selectedYear) == 0 ) {
			minMonth = 1;  
			maxMonth = now.getMonth() + 1;
		}

		// this.selectedMonth = maxMonth;

		for(let i = minMonth; i <= maxMonth ; i++) {
			let monthName;

			switch(i) {
				case 1:
					monthName = 'Enero';
					break;
				case 2:
					monthName = 'Febrero';
					break;
				case 3:
					monthName = 'Marzo';
					break;
				case 4:
					monthName = 'Abril';
					break;
				case 5:
					monthName = 'Mayo';
					break;
				case 6:
					monthName = 'Junio'
					break;
				case 7:
					monthName = 'Julio';
					break;
				case 8:
					monthName = 'Agosto';
					break;
				case 9:
					monthName = 'Septiembre';
					break;
				case 10:
					monthName = 'Octubre';
					break;
				case 11:
					monthName = 'Noviembre';
					break;
				case 12:
					monthName = 'Diciembre';
					break;
			}
	
			this.monthList.push({
				index: i, 
				name: monthName
			});
		
		}
	
	}

	getDataByRangeAndType(range: string, type: string): void {
		console.log({range});
		console.log({type});

	    this.activedRange = range == 'default' ? this.activedRange : range;
	    this.activedType = type == 'default' ? this.activedType : type;
	    
	    this.disabledSelectYear = true;
		this.disabledSelectMonth = true;
	
	    switch(this.activedRange) {
	        case 'all':
	            this.filterActivities = this.allActivities;
	            break;
	
	        case 'year':
				this.disabledSelectYear = false;

	            this.filterActivities = this.allActivities.filter(activity => 
	                new Date(activity.start_date).getFullYear() == this.selectedYear
	            );
	            break;
	        
	        case 'month':
	            this.disabledSelectYear = false;
				this.disabledSelectMonth = false;

	            this.filterActivities = this.allActivities.filter(activity => 
	                new Date(activity.start_date).getFullYear() == this.selectedYear 
						&& ( new Date(activity.start_date).getMonth() + 1 ) == this.selectedMonth 
	            );
	            break;
	        
	        case 'week':
	            break;
	    }
	
	    if (this.activedType.toLowerCase() != 'all') {
	        this.filterActivities = this.filterActivities.filter( activity => 
	            activity.type.toLowerCase() == this.activedType.toLowerCase()
	        );
	    }

		this.eventEmitter.emit(this.filterActivities);

	}

	onChange(event): void {
		console.log(this.selectedYear);
		console.log(this.selectedMonth);
		this.setDropDownMonth();
		this.getDataByRangeAndType(this.activedRange, this.activedType);
	}



	



}