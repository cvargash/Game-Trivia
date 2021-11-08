import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userName: string = ""

  constructor() { }

  createUserName(name: string){
    this.userName = name
    console.log("Aqui cambio", this.userName)
    localStorage.setItem("userName", this.userName)
  }

  checkLoginUser():boolean{
    const name = localStorage.getItem("userName")
    if (name != null){
      this.userName = name
      return true
    }
    else{
      return false
    }
  }

  signOut(){
    this.userName = ""
    localStorage.removeItem("userName")
  }
}
