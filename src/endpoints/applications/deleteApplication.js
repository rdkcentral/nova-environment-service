/**
 * If not stated otherwise in this file or this component's LICENSE file the
 * following copyright and licenses apply:
 *
 * Copyright 2023 Comcast Cable Communications Management, LLC
 *
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const ApplicationModel = require('../../models/Application').model
const errorResponse = require('../../helpers/errorResponse')

module.exports = async (req, res) => {
  try {
    // delete the application
    const result = await ApplicationModel.deleteOne({
      _id: req.params.id,
    })

    // return success if the application was deleted (found and deleted)
    if (result && result.deletedCount === 1) {
      return res.json({
        status: 'success',
      })
    }

    return res.status(404).json({
      status: 'error',
      message: 'Application not found',
    })
  } catch (e) {
    errorResponse.send(res, 'applicationDelete failed', e)
  }
}
