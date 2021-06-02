import { Request, Response } from "express";

export default class BaseController {

  customResponse(data: any) {
    return {
      status: 200,
      data
    };
  }
}
