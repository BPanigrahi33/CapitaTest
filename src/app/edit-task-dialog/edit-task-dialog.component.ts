import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Task } from 'src/app/taskModel';
import { FormControl, FormGroup } from '@angular/forms';
import { AppServiceService } from '../app-service.service';

@Component({
  selector: 'app-edit-task-dialog',
  templateUrl: './edit-task-dialog.component.html',
  styleUrls: ['./edit-task-dialog.component.css']
})
export class EditTaskDialogComponent implements OnInit {

  public taskList: Array<Task> = [];
  public taskEditForm: FormGroup = new FormGroup({
    id: new FormControl(),
    priority: new FormControl(),
    description: new FormControl(),
    status: new FormControl(),
    uniqueKey: new FormControl(),
  });

  constructor(private appServiceService: AppServiceService, public dialogRef: MatDialogRef<EditTaskDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) { 
      this.taskList = data;
      if(this.taskList != null) {
        this.taskEditForm.reset(this.taskList);
      }
    }

  ngOnInit() {
  }

  updateTask() {
    if(this.taskEditForm.valid) {
      this.appServiceService.doTaskUpdate(this.taskEditForm.get("uniqueKey").value, this.taskEditForm.value)
    .subscribe(response => {
        if(response != undefined) {
          location.reload();
          this.closeModal();
        }
      });
    }
  }

  public addTask(): void {
    if(this.taskEditForm.valid) {
      this.appServiceService.doTaskInsert(this.taskEditForm.value)
    .subscribe(response => {
        if(response != undefined) {
          location.reload();
          this.closeModal();
        }
      });
    }
  }

  closeModal() {
    this.dialogRef.close();
  }

}
