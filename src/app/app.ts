import { NgClass, NgStyle, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
//Import TaskService from its file.
import { TaskService } from './services/task-service';
//Import FormsModule from node_modules directory.
//FormsModule attribute directive synchronizes the input of a component template to the class property
//so that the value of the property updates automatically as the value of the input changes. 
import { FormsModule } from '@angular/forms';
import { taskInterface } from './interfaces/task-interface';

@Component({
  imports: [RouterOutlet, TitleCasePipe, UpperCasePipe, NgClass, NgStyle, FormsModule],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})

export class App implements OnInit {
  //Inject (add) the imported TaskService into App component class.
  constructor(private taskService: TaskService) {}

  appTitle:string = "advance toDo app";
  appDescription:string = "advance version with filter and strong data in local-storage ";
  taskInputPlaceholder:string = "Add a new task";
  tagsInputPlaceholder:string = "enter coma separated tags";
  addTaskButtonText:string = "add task";
  deleteTaskButtonText:string = "x";
  taskInputValue:string = "";
  dueDateInputValue:Date = new Date();
  tagsInputValue:string = "";
  //fetchedTasks:taskInterface[] = []; 
  //Create signal variable.
  fetchedTasks = signal<taskInterface[]>([]); 

  //Table header row
  indexColumn:string = "index";
  taskNameColumn:string = "task name";
  dueDateColumn:string = "due date";
  tagsColumn:string = "tags";

  //Define methods that access (use) data and methods that were created in the TaskService.
  //In Angular, data are stored in the form of Observable, 
  //and we MUST subscribe to the Observable before data can be access.
  //Display fetched data.
  fetchAndDisplayTasks() {
    this.taskService.getTasks().subscribe({
      next: (fetchedTasks)=> {
        //this.fetchedTasks = fetchedTasks; //We can alternatively use signal to set data in fetchedTasks property.
        //Set data on the signal variable.
        this.fetchedTasks.set(fetchedTasks); 
        console.log(fetchedTasks);
      },
      error: (err)=> {
        console.log(err);
      },
      complete: ()=> {
        console.log("Completed");
      }
    });
  };

  //Create and display task.
  createAndDisplayTask() {
    this.taskService.postTask({
      taskName: this.taskInputValue,
      dueDate: this.dueDateInputValue.toISOString(),
      tags: this.tagsInputValue.split(",")
    });

    this.fetchAndDisplayTasks();
  };
  
  //Display fetched tasks when this component is initialized.
  ngOnInit(): void {
    this.fetchAndDisplayTasks();
  };

  //Delete the specified task and re-initialize the component.
  deleteSpecifiedTask(taskId:number) {
    this.taskService.deleteTask(taskId);
    this.ngOnInit();
    //this.fetchAndDisplayTasks();
  };

  //Update the specified task and re-initialize the component.
  updateSpecifiedTask(taskId:number) {
    this.taskService.updateTask(taskId, {
      taskName: this.taskInputValue,
      dueDate: new Date(this.dueDateInputValue).toISOString(),
      tags: this.tagsInputValue.split(",")
    });
    this.ngOnInit();
  };

  //Tag background color logic
  tagBackgroundColorLogic(tag:string): any {
    if(tag === "Health") {
      return {'background-color': 'yellow', 'color': 'black' };
    };
    if(tag === "Fitness") {
      return {'background-color': 'blue', 'color': 'white' };
    };
    if(tag === "Default") {
      return {'background-color': 'green', 'color': 'white' };
    };
  };

};
