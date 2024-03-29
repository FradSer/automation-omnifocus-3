;(() => {
  let action = new PlugIn.Action(function (selection) {
    // Waiting tag
    waitingTagName = 'Waiting'

    // Location tag
    locationTagName = 'Location'
    homeTagName = 'at Home'
    homeName = '家'
    companyTagName = 'at Company'
    companyName = '公司'

    shipActionName = '快递到'

    // Current time
    today = new Date()
    date =
      today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
    time =
      today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
    dateTime = date + ' ' + time

    // Prefix of name
    prefixOfOriginTask = '买'
    prefixOfTargetTask = 'Reply on: '

    let duplicatedTasks = new Array()
    selection.tasks.forEach(function (task) {
      originTaskName = task.name

      insertionLocation = task.after
      if (insertionLocation === null) {
        insertionLocation = inbox.ending
      }
      dupTasks = duplicateTasks([task], insertionLocation)

      // Process name

      dupTasks.forEach(function (targetTask) {
        targetTaskName = targetTask.name

        if (targetTaskName.startsWith(prefixOfOriginTask)) {
          targetTaskObject = targetTaskName.replace(prefixOfOriginTask, '')

          inputForm = new Form()

          popupMenu = new Form.Field.Option(
            'menuItem',
            'Location',
            [1, 2],
            [homeName, companyName],
            1
          )

          inputForm.addField(popupMenu)

          formPrompt = 'Where will ' + targetTaskObject + ' ship?'
          buttonTitle = 'OK'

          formPromise = inputForm.show(formPrompt, buttonTitle)

          formPromise.then(function (formObject) {
            menuItem = formObject.values['menuItem']
            switch (menuItem) {
              case 1:
                updateTask(task, targetTask, homeName, homeTagName)
                break
              case 2:
                updateTask(task, targetTask, companyName, companyTagName)
                break
            }
          })

          formPromise.catch(function (err) {
            console.log('form cancelled', err.message)
          })
        } else if (!targetTaskName.startsWith(prefixOfTargetTask)) {
          targetTask.addTag(tagNamed(waitingTagName))
          targetTask.clearTags()
          targetTask.name = prefixOfTargetTask + originTaskName
        } else {
          targetTask.clearTags()
          targetTask.addTag(tagNamed(waitingTagName))
        }

        // Process note
        targetNote = task.note + '\n\nReply at: ' + dateTime + '\n------'
        targetTask.note = targetNote

        targetTask.addTag(tagNamed(waitingTagName))
        if (targetTask.hasChildren) {
          targetTask.flattenedChildren.forEach(function (task) {
            deleteObject(task)
          })
        }

        duplicatedTasks.push(targetTask.id.primaryKey)
      })

      task.markComplete()
    })

    idStr = duplicatedTasks.join(',')
    URL.fromString('omnifocus:///task/' + idStr).open()
  })

  action.validate = function (selection) {
    return selection.tasks.length >= 1
  }

  function updateTask(task, targetTask, locationName, locationTag) {
    originTaskName = task.name
    targetName =
      originTaskName.replace(prefixOfOriginTask, '') +
      shipActionName +
      locationName

    targetTask.clearTags()
    targetTask.addTag(tagNamed(waitingTagName))
    targetTask.addTag(tagNamed(locationTagName).tagNamed(locationTag))
    targetTask.name = targetName
  }

  return action
})()
