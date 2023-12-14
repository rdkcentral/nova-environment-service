const axios = require('axios')

/*
  The remote app catalogue providers are set with environment variables with
  the following format:
  APP_DATA_PROVIDER_<PROVIDER_NAME>
*/

// parse env variables to get all data providers
const dataProviders = Object.keys(process.env)
  .filter((key) => key.startsWith('APP_DATA_PROVIDER_'))
  .reduce((acc, key) => {
    const name = key.replace('APP_DATA_PROVIDER_', '')
    const url = process.env[key]
    return {
      ...acc,
      [name]: url,
    }
  }, {})

// if there is no provider defined, throw an error
if (Object.keys(dataProviders).length === 0) {
  throw new Error('No app data provider defined')
}

// get list of applications from all providers
const getApplications = async (format = 'default') => {
  const results = await Promise.allSettled(
    Object.keys(dataProviders).map(async (provider) => {
      try {
        const url = dataProviders[provider] + '/applications?format=' + format
        console.log('Requesting:', url)

        const response = await axios.get(url)
        const apps = response.data.data

        return apps.map((app) => ({
          ...app,
          _provider: provider,
        }))
      } catch (error) {
        console.error(
          'Error with provider while getting list of apps',
          provider,
          error
        )
        return [] // Returning an empty array as a fallback
      }
    })
  )

  // Filter out the fulfilled promises and extract their values
  const fulfilledResults = results
    .filter((result) => result.status === 'fulfilled')
    .map((result) => result.value)

  return fulfilledResults.flat()
}

// get specific application from a given provider name and app identifier
const getApplication = async (
  appIdentifier,
  format = 'default',
  providerName
) => {
  const dataBaseUrl = getProviderBaseUrl(providerName)
  const url = `${dataBaseUrl}/applications/${appIdentifier}?format=${format}`
  console.log('Requesting:', url)
  const response = await axios.get(url)
  return response.data.data
}

// get specific version of an application from a given provider name and app identifier and version
const getApplicationVersion = async (
  versionIdentifier,
  appIdentifier,
  format = 'default',
  providerName
) => {
  const dataBaseUrl = getProviderBaseUrl(providerName)
  const url = `${dataBaseUrl}/applications/${appIdentifier}/versions/${versionIdentifier}?format=${format}`
  console.log('Requesting:', url)
  const response = await axios.get(url)
  return response.data.data
}

const getProviderBaseUrl = (providerName) => {
  console.log(providerName)
  if (providerName) {
    if (!Object.keys(dataProviders).includes(providerName)) {
      throw new Error(
        `The data provider ${providerName} is not defined. Please check your environment variables.`
      )
    }
  } else {
    if (Object.keys(dataProviders).length === 1) {
      providerName = Object.keys(dataProviders)[0]
    } else {
      throw new Error(
        'There are multiple data providers, please specify one for GET /:appIdentifier/versions/:versionIdentifier'
      )
    }
  }

  return dataProviders[providerName]
}

module.exports = {
  getApplications,
  getApplication,
  getApplicationVersion,
}
