import { Injectable } from '@angular/core';
import { type NewTaskData } from './new-task/new-task.model';
import { type Task } from './task/task.model';

@Injectable({
  providedIn: 'root',
})
export default class TaskService {
  private task: Task[] = [
    {
      id: 't1',
      userId: 'u1',
      title: 'Master Angular',
      summary:
        'Learn all the basic and advanced features of Angular & how to apply them.',
      dueDate: '2025-12-31',
    },
    {
      id: 't2',
      userId: 'u3',
      title: 'Build first prototype',
      summary: 'Build a first prototype of the online shop website',
      dueDate: '2024-05-31',
    },
    {
      id: 't3',
      userId: 'u3',
      title: 'Prepare issue template',
      summary:
        'Prepare and describe an issue template which will help with project management',
      dueDate: '2024-06-15',
    },
  ];

  constructor() {
    const storedTasks = localStorage.getItem('tasks');

    if (storedTasks) {
      this.task = JSON.parse(storedTasks);
    }
  }

  getUserTasks(userId: string) {
    return this.task.filter((task) => task.userId === userId);
  }

  addTask(userId: string, taskData: NewTaskData) {
    const newTask = {
      id: Math.random().toString(),
      userId,
      ...taskData,
    };
    this.task.push(newTask);
  }

  removeTask(id: string) {
    this.task = this.task.filter((task) => task.id !== id);
    this.saveTasks();
  }

  saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.task));
  }
}
