import { Request, Response } from "express";
import UpdateUserAvatarService from "../services/UpdateUserAvatarService";
import { container } from 'tsyringe';
import BaseController from "@shared/http/BaseController";

export default class UserAvatarController extends BaseController {


  public async update(request: Request, response: Response): Promise<Response> {
    const updateAvatar = container.resolve(UpdateUserAvatarService);

    const user = updateAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });

    return response.json(super.customResponse(user));
  }

}
