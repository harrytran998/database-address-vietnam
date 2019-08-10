import { getDistricts, getProvinces, getWards } from '../controller/address'
import express from 'express'

const router = express.Router()

// Address API DONE
router.get('/api/v1/provinces', getProvinces)
router.get('/api/v1/provinces/:province_id/districts', getDistricts)
router.get('/api/v1/provinces/:province_id/districts/:district_id/wards', getWards)

export default router
