import { Component, OnInit } from '@angular/core';
import { Prices } from '../prices';
import { Availability } from '../availability';
import { AdminService } from '../admin/admin.service';

@Component({
  selector: 'hostel-hostel-detail',
  templateUrl: './hostel-detail.component.html',
  styleUrls: ['./hostel-detail.component.css']
})
export class HostelDetailComponent implements OnInit {

  prices: Prices;
  room: any[];

  availability: Availability = {
    boysStandardRooms: 12,  // 12
    boysDeluxeRooms: 15,  // 15
    boysSuperDeluxeRooms: 10, // 10
    girlsStandardRooms: 13, // 13
    girlsDeluxeRooms: 15, // 15
    girlsSuperDeluxeRooms: 11 // 11
  };

  constructor(private adminService: AdminService) 
  { 
    this.adminService.findHostelPriceDetails().subscribe(hostelPriceDetail =>(this.prices = hostelPriceDetail));
    
    this.adminService.boysSuperDeluxRooms().subscribe((total) => { this.availability.boysSuperDeluxeRooms = total.length; });
    this.adminService.boysDeluxRooms().subscribe((total) => { this.availability.boysDeluxeRooms = total.length; });
    this.adminService.boysStandardRooms().subscribe((total) => { this.availability.boysStandardRooms = total.length; });
    this.adminService.girlsSuperDeluxRooms().subscribe((total) => { this.availability.girlsSuperDeluxeRooms = total.length; });
    this.adminService.girlsDeluxRooms().subscribe((total) => { this.availability.girlsDeluxeRooms = total.length; });
    this.adminService.girlsStandardRooms().subscribe((total) => { this.availability.girlsStandardRooms = total.length; });
  }
  
  ngOnInit(): void {
  }

}
