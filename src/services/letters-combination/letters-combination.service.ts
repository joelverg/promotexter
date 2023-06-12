import { Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { LettersCombination } from 'src/models/letters-combination';

@Injectable()
export class LettersCombinationService {
  getLettersCombination(number: string): Observable<string[]> {
    if (number == '') {
      return of([]);
    }
    const table = [
      '0',
      '1',
      'abc',
      'def',
      'ghi',
      'jkl',
      'mno',
      'pqrs',
      'tuv',
      'wxyz',
    ];

    const res = [];
    const que = [''];

    while (que.length > 0) {
      const str = que[0];

      que.shift();

      if (str.length == number.length) {
        res.push(str);
      } else {
        const numberKey = Number(number.charAt(str.length));

        const val = table[numberKey];

        for (let i = 0; i < val.length; i++) {
          que.push(str + val.charAt(i));
        }
      }
    }

    return of(res);
  }
}
