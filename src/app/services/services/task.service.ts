import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class TaskService {

  constructor(private http:HttpClient) { }
  getTask(){
    return this.http.get("https://so1h005xk4.execute-api.ap-south-1.amazonaws.com/peopleManagement/task/groupId/1698658253245/userId/1719033950821")
  }

  saveTask(task: any) {
    return this.http.post(`https://gxppcdmn7h.execute-api.ap-south-1.amazonaws.com/peoplemgmtgw/assign-task`, task);
  }
}

