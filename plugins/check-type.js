import { typeCheck } from 'type-check';

export default function (context, inject) {
  inject('checkType', typeCheck);
}
