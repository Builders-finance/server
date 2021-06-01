import { Request, Response } from "express";
import CreateUserService from "../services/CreateUserService";
import DeleteUserService from "../services/DeleteUserService";
import ListUserService from "../services/ListUserService";
import ShowUserService from "../services/ShowUserService";
import UpdateUserService from "../services/UpdateUserService";
import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';
import BaseController from "@shared/http/BaseController";

export default class UsersController extends BaseController{

  public async index(request: Request, response: Response): Promise<Response> {
    const listUsers = container.resolve(ListUserService);

    const users = await listUsers.execute({page: request.query.page, limit: request.query.limit});

    return response.json(super.customResponse(classToClass(users)));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showUser = container.resolve(ShowUserService);

    const user = await showUser.execute({ id });

    return response.json(super.customResponse(classToClass(user)));
  }

  public async create(request: Request, response: Response): Promise<Response>  {
    const {name, email, password} = request.body;

    const createUser = container.resolve(CreateUserService);
    // const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      password
    });

    return response.json(super.customResponse(classToClass(user)));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const {name, email, password, old_password} = request.body;
    const {id} = request.params;

    const updateUser = container.resolve(UpdateUserService);

    const user = await updateUser.execute({
      id,
      name,
      email,
      password,
      old_password
    });

    return response.json(super.customResponse(classToClass(user)));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteUser = container.resolve(DeleteUserService);

    await deleteUser.execute({ id });

    return response.json([]);
  }
}
