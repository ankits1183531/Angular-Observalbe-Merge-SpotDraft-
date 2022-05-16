import { Component } from '@angular/core';
import { combineLatest, forkJoin, merge, Observable, of } from 'rxjs';
import { delay, map, reduce } from 'rxjs/operators';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'Angular';
  mergedObs: Observable<StudentUpdated[]>;

  constructor() {
    this.mergedObs = combineLatest(
      [this.getListOfStudent(), this.getCourses()],
      (students: Student[], course: Course[]) =>
        students.map((s) => {
          console.log(course.length, s.courseCount);
          return {
            ...s,
            show: s.courseCount < course.length ? true : false,
          };
        })
    );
  }

  // Argument of type string and number can be accepted and returned
  getElement(arr: dataType[]): dataType {
    return 0;
  }

  getListOfStudent(): Observable<Student[]> {
    let list: Student[] = [
      {
        id: 0,
        name: 'ABC',
        courseCount: 1,
      },
      {
        id: 1,
        name: 'EFD',
        courseCount: 2,
      },
    ];
    return of(list);
  }

  getCourses(): Observable<Course[]> {
    const courses = [
      {
        id: 12,
        name: 'Course 1',
      },
      {
        id: 13,
        name: 'Course 3',
      },
    ];
    return of(courses).pipe(delay(3000));
  }
}

type dataType = string | number;

interface Student {
  id: number;
  name: string;
  courseCount: number;
}

interface StudentUpdated extends Student {
  show: boolean;
}

interface Course {
  id: number;
  name: string;
}
