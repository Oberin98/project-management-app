import { Request } from 'express';

/// <reference path="./user" />

declare global {
  interface AuthorizedRequest extends Request {
    user: User;
  }
}
