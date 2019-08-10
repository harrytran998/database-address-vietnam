import db from '../models'
import { forEach } from 'lodash'
import { STATUS_OK, STATUS_FORBIDDEN } from '../constant/status'
import { responseError } from '../helpers/error-handlers'

const { Province, District, Ward } = db

export const getProvinces = async (req, res) => {
  return Province.findAll()
    .then(provinces => res.status(STATUS_OK).json(forEach(provinces, province => province.toJSON())))
    .catch(err => responseError(res, STATUS_FORBIDDEN, 'model', err))
}
export const getDistricts = async (req, res) => {
  return Province.findByPk(req.params.province_id)
    .then(province => {
      if (!province) {
        throw new Error('Fuck! Dont have any province here')
      }
      return District.findAll({ where: { province_id: province.id } })
    })
    .then(districts => res.status(STATUS_OK).json(forEach(districts, district => district.toJSON())))
    .catch(err => responseError(res, STATUS_FORBIDDEN, 'model', err))
}
export const getWards = async (req, res) => {
  return District.findByPk(req.params.district_id)
    .then(district => {
      if (!district) {
        throw new Error('Fuck! Dont have any district here')
      }
      return Ward.findAll({ where: { district_id: district.id } })
    })
    .then(wards => res.status(STATUS_OK).json(forEach(wards, ward => ward.toJSON())))
    .catch(err => responseError(res, STATUS_FORBIDDEN, 'model', err))
}
