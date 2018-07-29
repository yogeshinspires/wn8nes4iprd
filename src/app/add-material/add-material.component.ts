import { Component, OnInit } from '@angular/core';

// Import the DataService
import { DataService } from '../data.service';

//import add-material class
import { AddMaterial } from '../add-material';

@Component({
  selector: 'app-add-material',
  templateUrl: './add-material.component.html',
  styleUrls: ['./add-material.component.css']
})
export class AddMaterialComponent implements OnInit {
  categoriesList: any = [];
  trainingList: any = [];
  category: string = null;
  training: string = null;
  materialList: any = [new AddMaterial(null, null, null, null,"Document")];

  constructor(private _dataService: DataService) { }

  ngOnInit() {
    this._dataService.getCategories("drop")
      .subscribe(res => {
        if (res.status !== 501) {
          this.categoriesList = res.data;
        }
        else
          alert(res.message);
      });
  }

  addMaterial()
  {
    for(var i=0; i<this.materialList.length; i++)
    {
      this.materialList[i].tid = this.training;
    }
    
    this._dataService.addMaterial(this.materialList)
      .subscribe(res => {
        if (res.status !== 501) {
          this.training = null;
          this.category = null;
          this.materialList = [new AddMaterial(null, null, null, null,"Document")];
          alert("Training material added successfully.");
        }
        else
          alert(res.message);
      });
  }

  onCategoryChange() {
    this._dataService.getTraining(this.category)
      .subscribe(res => {
        if (res.status !== 501) {
          this.trainingList = res.data;
        }
        else
          alert(res.message);
      });
  }

  addRow() {
    this.materialList.push(new AddMaterial(null, null, null, null,"Document"));
  }

  deleteRow(index) {
    if (this.materialList.length != 1) {
      this.materialList.splice(index, 1);
    }
    else {
      alert("Atleast one row required.");
    }
  }

}
