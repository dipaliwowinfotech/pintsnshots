import { Injectable } from '@angular/core';
function _window() : any {
  // return the global native browser window object
  return window;
}
@Injectable({
  providedIn: 'root'
})
export class PayWindowService {

  constructor() { }
  get nativeWindow() : any {
    return _window();
 }
}
