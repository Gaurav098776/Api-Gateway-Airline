const { StatusCodes } = require("http-status-codes");
const { UserService } = require("../services");
const { ErrorResponse, SuccessResponse } = require("../utils/common");


/**
 * 
 * POST : /signup
 * req-body : {email : 'a@borro.com', password: '1233'}
 * 
 *  
 */

async function signup(req, res) {
  try {
    // console.log("inside controller routes",req.body);
    const user = await UserService.create({
      email: req.body.email,
      password : req.body.password
    });
    SuccessResponse.data = user;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function signin(req,res) {
    try {
    
    const user = await UserService.signin({
      email: req.body.email,
      password : req.body.password
    });
    SuccessResponse.data = user;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function addRoleToUser(req,res) {
    try {
    
    const user = await UserService.addRoleUser({
      role: req.body.role,
      id : req.body.id
    });
    SuccessResponse.data = user;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}


module.exports = {
  signup,
  signin,
  addRoleToUser
}