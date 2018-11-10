import { Principal } from 'common/model/principal.model';
import { Request } from 'express';

export interface IRequest extends Request {
  user: Principal;
}
