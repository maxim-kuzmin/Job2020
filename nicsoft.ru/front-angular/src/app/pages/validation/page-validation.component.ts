import { Component } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  templateUrl: './page-validation.component.html',
  styleUrls: ['./page-validation.component.css']
})
export class AppPageValidationComponent {
  private formGroup: FormGroup;
  private fieldExpressionName = 'expression';

  isOk = false;
  title = 'Проверка правильности расстановки скобок в математическом выражении';

  constructor(
    extFormBuilder: FormBuilder
  ) {
    this.formGroup = extFormBuilder.group({
      [this.fieldExpressionName]: [{value: '', disabled: false}, Validators.required]
    });
  }

  get buttonSubmitDisabled(): boolean {
    return !this.formGroup.valid;
  }

  get fieldExpression(): AbstractControl {
    return this.formGroup.get(this.fieldExpressionName);
  }

  onSubmit() {
    if (!this.formGroup.valid) {
      return;
    }

    const expression = this.fieldExpression.value;

    const brackets = [];

    // Поиск закрывающей скобки по открывающей.
    const closedBracketByOpenedOneLookup = {
      '[': ']',
      '(': ')'
    };

    // Поиск наличия закрывающей скобки.
    const closedBracketAvailabilityLookup = {
      ']': true,
      ')': true
    };

    // Предыдущая скобка.
    let prevBracket: string;

    let isOk = true;

    for (let letter of expression) {
      // Текущая скобка является открывающей.
      const isCurrentBracketOpened = !!closedBracketByOpenedOneLookup[letter];

      // Текущая скобка является закрывающей.
      const isCurrentBracketClosed = !!closedBracketAvailabilityLookup[letter];

      if (!isCurrentBracketOpened && !isCurrentBracketClosed) {
        continue;
      }

      // Текущая скобка найдена.
      let isCurrentBracketFound = true;

      if (prevBracket) {// Предыдущая скобка существует
        if (isCurrentBracketClosed) {// Текущая скобка является закрывающей
          // Закрывающая скобка для предыдущей.
          const prevClosedBracket = closedBracketByOpenedOneLookup[prevBracket];

          // Предыдущая скобка является открывающей.
          const isPrevBracketOpened = !!prevClosedBracket;

          if (isPrevBracketOpened) {// Предыдущая скобка является открывающей
            isOk = letter === prevClosedBracket; // OK, если символ является закрывающей скобкой для предыдущей

            if (isOk) {
              brackets.pop();

              const lastBracketIndex = brackets.length - 1;

              if (lastBracketIndex > -1) {
                letter = brackets[lastBracketIndex];
                isCurrentBracketFound = false;
              } else {
                letter = '';
              }
            }
          }
        }
      } else {// Предыдущая скобка не существует
        if (isCurrentBracketClosed) {// Текущая скобка является закрывающей
          isOk = false; // Закрывающая скобка не может стоять первой
        }
      }

      if (!isOk) {
        break;
      }

      if (letter) {
        prevBracket = letter;

        if (isCurrentBracketFound) {
          brackets.push(letter);
        }
      }
    }

    this.isOk = isOk && brackets.length < 1;
  }
}
