import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Device } from '../models/device.model';

@Injectable({
  providedIn: 'root'
})
export class DevicesService {

  baseUrl = 'https://localhost:7236/api/devices';
  constructor(private http: HttpClient) { }

  //get all devices
  getAllDevices(): Observable<Device[]>{
    return this.http.get<Device[]>(this.baseUrl);
  }

  addDevice(device: Device): Observable<Device>{
    device.iddev = '00000000-0000-0000-0000-000000000000';
    return this.http.post<Device>(this.baseUrl, device);
  }

  deleteDevice(iddev: string): Observable<Device>{
    return this.http.delete<Device>(this.baseUrl + '/' + iddev);
  }

  updateDevice(device: Device): Observable<Device>{
    return this.http.put<Device>(this.baseUrl + '/' + device.iddev, device);
  }
}
