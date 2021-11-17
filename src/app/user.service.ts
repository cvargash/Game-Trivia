import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from './api-response.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userName: string = ""
  token: string = ""
  httpClient:HttpClient
  constructor(httpClient:HttpClient) {
    this.httpClient = httpClient
   }

  async createRegisterRequest(name: string, password:string):Promise<ApiResponse>{
    const data= await this.httpClient.post("http://localhost:4035/players/register",{name,password}).toPromise()
    const json=JSON.parse(JSON.stringify(data))
    return {status:json["status"],message:json["message"],data:json["data"]}
  }

  async createloginRequest(name: string, password:string):Promise<ApiResponse>{
    const data= await this.httpClient.post("http://localhost:4035/players/login",{name,password}).toPromise();
    const json = JSON.parse(JSON.stringify(data))
    console.log({status:json["status"],message:json["message"],data:json["data"]})
    return {status:json["status"],message:json["message"],data:json["data"]}
  }

  checkLoginUser(): boolean{
    const userName = localStorage.getItem("userName")
    const token = localStorage.getItem("token")
    if(userName != null && token != null){
      this.userName = userName
      this.token = token
            return true
    }
    return false
  }

  async createUserName(name: string, password:string):Promise<boolean>{
    const registerResponse: ApiResponse = await this.createRegisterRequest(name, password)
    if (registerResponse.status == false){
      const loginResponse = await this.createRegisterRequest(name, password)
      if(loginResponse.status == true){
        localStorage.setItem("userName",name)
        localStorage.setItem("token", loginResponse.data.token)
        return true
      }
      return false
    }
    localStorage.setItem("userName",name)
    localStorage.setItem("token", registerResponse.data.token)
    return true
  }


  signOut(){
    this.userName = ""
    localStorage.removeItem("userName")
  }
}
