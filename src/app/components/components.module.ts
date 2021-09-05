import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralStatsComponent } from './general-stats/general-stats.component';
import { MatIconModule } from '@angular/material/icon';
import { RangePillsComponent } from './range-pills/range-pills.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@NgModule({
	declarations: [
		GeneralStatsComponent,
		RangePillsComponent
	],
	imports: [
		CommonModule,
		MatIconModule,
		MatDatepickerModule,
		MatButtonModule,
		MatFormFieldModule,
		MatSelectModule,
		FormsModule,
		MatInputModule
	],
	exports: [
		GeneralStatsComponent,
		RangePillsComponent
	]
})
export class ComponentsModule { }