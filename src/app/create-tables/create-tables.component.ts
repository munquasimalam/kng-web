import { Component, OnInit } from '@angular/core';
import { DataMigrationService } from '../services/dataMigrationService';
import { Router} from '@angular/router';



@Component({
  selector: 'app-create-tables',
  templateUrl: './create-tables.component.html',
  styleUrls: ['./create-tables.component.css']
})
export class CreateTablesComponent implements OnInit {
  isSelectedTablesCreated:boolean=false;
  tableNameList = [];
  selectedTableNameList = [];
  settings = {};
  
  constructor(private dataMigrationService:DataMigrationService,private router:Router) {}

  ngOnInit() {

    this.dataMigrationService.getTableNameList()
    .then((results: any[]) => {
     //this.tableNameList=results;
    this.formateResults(results);
  }).catch((error) => console.error(error));

      // this.selectedTableNameList = [
      //     { "id": 1, "itemName": "account_child" },
      //     { "id": 2, "itemName": "account_childhead" },
      //     { "id": 3, "itemName": "account_head" },
      //     { "id": 4, "itemName": "account_hierarchy_flow" }
      //   ];
      this.selectedTableNameList = [

      ];
      this.settings = {
          text: "Select Table Names",
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          classes: "myclass custom-class"
      };
    }

    formateResults(results){
    for (let i=0; i<results.length; i++) {
     this.tableNameList.push( { "id": i+1, "itemName": results[i].Tables_in_eclinic_kng});
    }
  }
  onItemSelect(item: any) {
      console.log(item);
      console.log(this.selectedTableNameList);
  }
  OnItemDeSelect(item: any) {
      console.log(item);
      console.log(this.selectedTableNameList);
  }
  onSelectAll(items: any) {
      console.log(items);

  }
  onDeSelectAll(items: any) {
      console.log(items);
  }

createSelectedTables() {
     // console.log(this.selectedTableNameList);
      this.dataMigrationService.createSelectedTables(this.selectedTableNameList)
         .then((result: boolean) => {
          this.isSelectedTablesCreated=result;
        console.log("isSelectedTablesCreated:"+this.isSelectedTablesCreated);
        this.router.navigate(['/dashboard']);
        alert("Selected tables are created successfully");
       }).catch((error) => console.error(error));
  }


}