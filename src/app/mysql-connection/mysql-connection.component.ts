import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataMigrationService } from '../services/dataMigrationService';
import { Router} from '@angular/router';


@Component({
  selector: 'app-mysql-connection',
  templateUrl: './mysql-connection.component.html',
  styleUrls: ['./mysql-connection.component.css']
})
export class MysqlConnectionComponent implements OnInit {
  mysqlConnectionForm: FormGroup;
  isConnectedToMysql:boolean;


  constructor(private fb: FormBuilder,private dataMigrationService:DataMigrationService,private router:Router) {
    this.mysqlConnectionForm = fb.group({
      idAddress: ['', Validators.required],
        name: ['', [Validators.required]],
        password: ['', [Validators.required, Validators.minLength(2)]],
        port: ['', [Validators.required]],
        db: ['', [Validators.required]],
    });

}
  ngOnInit() {
  }
 

  getFormData(formData){
    console.log(formData);
    this.dataMigrationService.getMysqlConnection(formData)
    .then((results: boolean) => {
      this.isConnectedToMysql = results;
     
      console.log("isConnectedToMysql:"+results);
      this.router.navigate(['/dashboard']);
      alert("Connected successfully with Mysql Database");
    }).catch((error) => console.error(error));
  }
}
