;(() => {
  // USER-EDITABLE DEFAULTS
  var authorName = 'Frad LEE'
  var descriptionString =
    'Mark the currently selected task as complete and add a new task to await the reply.'
  var companyURL = 'https://frad.me'

  const action = new PlugIn.Action(function (selection) {
    let versNum = this.plugIn.version.versionString
    let pluginName = this.plugIn.displayName
    let pluginID = this.plugIn.identifier
    let pluginLibraries = this.plugIn.libraries
    if (pluginLibraries.length != 0) {
      let libraryNames = []
      pluginLibraries.forEach(function (aLibrary) {
        let libraryName = aLibrary.name
        let libraryVersion = aLibrary.version.versionString
        let displayString = libraryName + ' v' + libraryVersion
        libraryNames.push(displayString)
      })
      var libraryNamesString = 'LIBRARIES:'
      libraryNamesString += '\n' + libraryNames.join('\n')
    } else {
      var libraryNamesString = 'This plugin has no libraries.'
    }
    let yearString = new Date().getFullYear().toString()
    let alertTitle = pluginName + ' v.' + versNum
    let alertMessage = `©${yearString} ${authorName}`
    alertMessage += '\n' + pluginID
    alertMessage += '\n' + companyURL
    alertMessage += '\n\n' + descriptionString
    alertMessage += '\n\n' + libraryNamesString
    new Alert(alertTitle, alertMessage).show()
  })

  // routine determines if menu item is enabled
  action.validate = function (selection) {
    return true
  }

  return action
})()
