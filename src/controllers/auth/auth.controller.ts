
import { Request, Response} from "express";
import {getRepository} from "typeorm";
import { Account } from "../../entity/Users";
import db from "../../utils/db";
import {
  comparePassword,
  generatorToken,
  hashPassword,
} from "../../utils/helpers";


