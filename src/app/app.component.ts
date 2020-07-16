import { Component, OnInit } from '@angular/core';
import { AppServiceService } from '../app/app-service.service';
import { TaskDTO, Task } from 'src/app/taskModel';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EditTaskDialogComponent } from '../app/edit-task-dialog/edit-task-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'AngularTestCapita';
  public task = new TaskDTO();
  public taskData: Array<Task> = [];

  constructor(private appServiceService: AppServiceService, public matDialog: MatDialog) { }

  public ngOnInit() {
    this.loadData();
  }

  openModal(taskDetails: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "350px";
    dialogConfig.width = "400px";
    dialogConfig.data = taskDetails;
    const modalDialog = this.matDialog.open(EditTaskDialogComponent, dialogConfig);
  }

  public loadData(): void {
    this.taskData = [];
    this.appServiceService.getTaskDetails()
    .subscribe(response => 
      { 
        this.task.name = response;
        this.transposeData();
      });
  }

  transposeData(): void {
    const keys = Object.keys(this.task.name);
    keys.forEach((key: any) => {
      this.taskData.push({
        uniqueKey: key, 
        id: this.task.name[key].id,
        priority: this.task.name[key].priority,
        description: this.task.name[key].description,
        status: this.task.name[key].status
      });
    });
  }
  
  public deleteTask(testData: any): void {
    console.log(testData.uniqueKey);
    this.appServiceService.doTaskDelete(testData.uniqueKey)
    .subscribe(response => {
        if(response == null) {
          this.loadData();
        }
      });
  }
}

