import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataMigrationService } from '../services/dataMigrationService';
import { Router} from '@angular/router';

@Component({
  selector: 'app-hana-connection',
  templateUrl: './hana-connection.component.html',
  styleUrls: ['./hana-connection.component.css']
})
export class HanaConnectionComponent implements OnInit {
  hanaConnectionForm: FormGroup;
  isConnectedToHana:boolean;


  constructor(private fb: FormBuilder,private dataMigrationService:DataMigrationService,private router:Router) {
    this.hanaConnectionForm = fb.group({
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
    this.dataMigrationService.getHanaConnection(formData)
    .then((results: boolean) => {
      this.isConnectedToHana = results;
     
      console.log("isConnectedToHana:"+results);
      this.router.navigate(['/dashboard']);
      alert("Connected successfully with SAP Hana Database");
    }).catch((error) => console.error(error));
  }


}
