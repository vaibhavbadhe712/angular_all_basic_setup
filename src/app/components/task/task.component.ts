import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TaskService } from '../../services/services/task.service';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [DatePipe,FormsModule,NgbModule],
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  tasks: any[] = [];  // Changed type to array to hold list of tasks
  loading: boolean = true;  // For showing loading status
  @ViewChild('myModal') model: ElementRef | undefined;

  taskObj: Task = new Task();
  taskList: Task[] = [];

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.getTasks();
  }
  openModel() {
    const model = document.getElementById("myModal");
    if (model != null) {
      model.style.display = 'block' 
    }
  }

  closeModel() {
    this.taskObj = new Task();
    if (this.model != null) {
      this.model.nativeElement.style.display = 'none';
    }
  }

  getTasks() {
    this.taskService.getTask().subscribe({
      next: (response: any) => {
        this.tasks = response.data.items;  // Access the tasks list
        this.loading = false;  
        console.log(this.tasks);
        // Hide loading status
      },
      error: (error) => {
        console.error(error);
        this.loading = false;  // Hide loading status even if there's an error
      }
    });
  }

  saveTask() {
    this.taskService.saveTask(this.taskObj).subscribe({
      next: (response) => {
        console.log('Task saved successfully', response);
        this.closeModel();  // Close modal on success
        this.getTasks();  // Optionally refresh the task list
      },
      error: (error) => {
        console.error('Error saving task', error);
      }
    });
  }



}

export class Task {
 
  name:string;
  assignedTo:string;
  prority:string;
  status:string;
  due:string;


  constructor() {
    this.name = '';
    this.assignedTo = '';
    this.prority = '';
    this.status = '';
    this.due = '';
  }
}
