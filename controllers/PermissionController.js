const { express } = require('express');
const { Op } = require("sequelize");

const { UserPermissionsTB } = require('../models/sequelize');

exports.checkPermission = (codename, role) => {
    
    let permission = codename;
    let roleId = Number(role);
    console.log(roleId)

    return UserPermissionsTB.findOne({
        where: {
            [Op.and]: [
                { permision_code: permission },
                { role_id: roleId }
            ]
        }
    }).then(action => {
         
          if(!action && action === null)
            {
                return false;
            }
          else if(permission == action.dataValues.permision_code)
            {
                return true;
            } 
            else {
                return false;
            }
      })
      .catch(e => {
          return false;
      })
}