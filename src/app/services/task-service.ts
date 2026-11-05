import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { taskInterface } from '../interfaces/task-interface';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class TaskService {
    //Inject (add) the HttpClient that was provided in the application configuration file into TaskService class.
    //Injection process (addition of HttpClient property to the Service class) can be carried out by passing the HttpClient as an argument to the class constructor (works only when @Injectable() decorator is used),
    // or as an argument to inject() function (works only when @Service() decorator is used).
    constructor(private http: HttpClient) {};

    //Set the API base URL
    private apiBaseUrl = 'http://localhost:4000/api/task';

    //Define request methods
    //Omit keyword omits the specified property.
    postTask(task: Omit<taskInterface, "id">) {
        return this.http.post<taskInterface>(`${this.apiBaseUrl}/create`, task);
    };

    getTasks()  {
        return this.http.get<taskInterface[]>(`${this.apiBaseUrl}/all-tasks`);
    };

    deleteTask(taskId:number) {
        return this.http.delete<taskInterface>(`${this.apiBaseUrl}/delete-single-task/:${taskId}`);
    };

    updateTask(taskId:number, task: Omit<taskInterface, "id">) {
        return this.http.put<taskInterface>(`${this.apiBaseUrl}/update-single-task/:${taskId}`, task);
    };

    //We can now import this service in any of the components , access (use) the data and methods defined here-in.

}
