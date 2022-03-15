import { Component } from '@angular/core';
import { Device } from './models/device.model';
import { DevicesService } from './service/devices.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'devices';
  devices: Device[] = [];
  device: Device= {
    iddev: '',
    name: '',
    manufacturer: '',
    type: '',
    os: '',
    osver: '',
    processor: '',
    ram: '0'
  }
  saveStatusOK='';
  saveStatusError='';


  constructor(private devicesService: DevicesService){

  }

  ngOnInit(): void {
    this.getAllDevices();
  }

  getAllDevices() {
    this.devicesService.getAllDevices()
    .subscribe(
      response => {
        this.devices=response;
      }
    );
  }
  onSubmit () {
    if (this.device.iddev === '') {
      if (this.checkExist(this.device)) {
        this.saveStatusError='Device already exists';
        this.saveStatusOK='';
      } else {
        if (this.checkEmpty(this.device)){
          this.saveStatusError='Device must have all fields filled';
          this.saveStatusOK='';
        }else {
          this.devicesService.addDevice(this.device)
          .subscribe(
            response => {
              this.getAllDevices();
              this.saveStatusOK='Device saved successfully';
              this.saveStatusError='';
              this.device= 
              {
                  iddev: '',
                  name: '',
                  manufacturer: '',
                  type: '',
                  os: '',
                  osver: '',
                  processor: '',
                  ram: '0'
              }
            }
          );
        }
      }
    } else {
      this.updateDevice(this.device);
    }
    
  }

  deleteDevice(iddev: string) {
    this.devicesService.deleteDevice(iddev)
    .subscribe(
      response => {
        this.getAllDevices();
      }
    )

  }

  populateForm(device: Device){
    this.device = device;
  }

  cloneDevice(device: Device){
    this.device = device;
    this.device.iddev= '';
    this.getAllDevices();
    
  }

  updateDevice(device: Device) {
    this.devicesService.updateDevice(device)
    .subscribe(
      response => {
        this.getAllDevices();
        this.device= 
        {
            iddev: '',
            name: '',
            manufacturer: '',
            type: '',
            os: '',
            osver: '',
            processor: '',
            ram: '0'
        }
      }
    );
  }

  checkExist(device: Device){
      const result = this.devices.filter(f=>
      f.name === device.name &&
      f.manufacturer === device.manufacturer &&
      f.type === device.type &&
      f.os === device.os &&
      f.osver === device.osver &&
      f.processor === device.processor &&
      f.ram === device.ram
      );
      if (result.length>0){
      console.log("Duplicate");
      return true;
      }
      return false;
    }

    checkEmpty(device: Device){
      if( device.name === '' ||
      device.manufacturer === '' ||
      device.type === '' ||
      device.os === '' ||
      device.osver === '' ||
      device.processor === '' ||
      device.ram === '0'){
        return true;
      } else 
      return false;
    }
}
