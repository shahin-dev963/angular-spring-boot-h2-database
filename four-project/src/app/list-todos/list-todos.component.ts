import { Component, OnInit } from '@angular/core';
import { TodoDataService } from '../service/data/todo-data.service';
import { Router } from '@angular/router';

export class Todo{
  constructor(
    public id: number,
    public description: string,
    public done: boolean,
    public targetDate: Date,
  ){}
}

@Component({
  selector: 'app-list-todos',
  templateUrl: './list-todos.component.html',
  styleUrls: ['./list-todos.component.css']
})
export class ListTodosComponent implements OnInit {

  todos : Todo[];
  message: string;

  constructor(private todoDataService:TodoDataService, private router: Router) { }

  ngOnInit(){
    this.refreshTodo();
  }

  refreshTodo(){
    this.todoDataService.retrieveAllTodos('shahin').subscribe(
      responseData =>{
        this.todos = responseData;
      }
    );
  }

  deleteTodo(id){
    this.todoDataService.deleteTodoById('shahin', id).subscribe(
      response =>{
        this.message = `Delete of tod ${id} successful`;
        this.refreshTodo();
      }
    );
  }

  updateTodo(id){
    console.log(`update ${id} `)
    this.router.navigate(['todos', id]);
  }

  addTodo(){
    this.router.navigate(['todos', -1]);
  }

}
