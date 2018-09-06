import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
const API_URL = 'http://localhost:3000/v1';

@Injectable()
export class DataMigrationService {
  public headers: any;
  private errorMsg: string = "Network Error: Please check your network connection";

      constructor(private http: Http) {
  }
 
getMysqlConnection(conParameters:any): Promise<boolean>  {
  console.log(conParameters);
 
 let headers = new Headers({ 'Content-Type': 'application/json' });
 let options = new RequestOptions({ headers: headers });
 let promise = new Promise<boolean>((resolve, reject) => {
   this.http.post(API_URL + '/mysqlconnection', conParameters, options).toPromise()
     .then(
       res => { // Success
         let body = res.json();
           resolve(true)
       },
   ).catch(() => {
     reject(false);
   })
 });
 return promise;
}

getHanaConnection(conParameters:any): Promise<boolean>  {
  console.log(conParameters);
 
 let headers = new Headers({ 'Content-Type': 'application/json' });
 let options = new RequestOptions({ headers: headers });
 let promise = new Promise<boolean>((resolve, reject) => {
   this.http.post(API_URL + '/hanaconnection', conParameters, options).toPromise()
     .then(
       res => { // Success
         let body = res.json();
           resolve(true)
       },
   ).catch(() => {
     reject(false);
   })
 });
 return promise;
}

getTableNameList() {
  let promise = new Promise((resolve, reject) => {
    let apiURL = API_URL + '/tablenamelist'
    this.http.get(apiURL).subscribe((res)=>{
      resolve(res.json())
    },(err)=>{
      reject(err)
    });   
  });
  return promise;
}


createSelectedTables(selectedTableNameList) {
  console.log(selectedTableNameList);
  let headers = new Headers({ 'Content-Type': 'application/json' });
  let options = new RequestOptions({ headers: headers });
  let promise = new Promise<boolean>((resolve, reject) => {
    this.http.post(API_URL + '/createselectedtables', selectedTableNameList, options).toPromise()
      .then(
        res => { // Success
          let body = res.json();
            resolve(true)
        },
    ).catch(() => {
      reject(false);
    })
  });
  return promise;
 

}

insertDataInSelectedTables(selectedTableNameList) {
//   let promise = new Promise((resolve, reject) => {
//     let apiURL = API_URL + '/insertdatainselectedtables?selectedtables='+selectedTableNameList
//     this.http.get(apiURL).subscribe((res)=>{
//       resolve(res.json())
//     },(err)=>{
//       reject(err)
//     });   
//   });
//   return promise;
// }

console.log(selectedTableNameList);
let headers = new Headers({ 'Content-Type': 'application/json' });
let options = new RequestOptions({ headers: headers });
let promise = new Promise<boolean>((resolve, reject) => {
  this.http.post(API_URL + '/insertdatainselectedtables', selectedTableNameList, options).toPromise()
    .then(
      res => { // Success
        let body = res.json();
          resolve(true)
      },
  ).catch(() => {
    reject(false);
  })
});
return promise;

}
}