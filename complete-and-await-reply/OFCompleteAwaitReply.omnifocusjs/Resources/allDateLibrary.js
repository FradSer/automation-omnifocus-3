/*{
	"type": "library",
	"targets": ["omnifocus","omnigraffle","omnioutliner","omniplan"],
	"identifier": "com.omni-automation.all.date-library",
	"author": "Otto Automator",
	"version": "1.1",
	"description": "A library of date functions."
}*/
(() => {
	var lib = new PlugIn.Library(new Version("1.1"));
	
// returns true if provided date/time occurs today
lib.dateOccursToday = function(dateToCheck){
	var cal = Calendar.current
	var now = new Date()
	var midnightToday = cal.startOfDay(now)
	var dc = cal.dateComponentsFromDate(midnightToday)
	dc.day = dc.day + 1
	var midnightTomorrow = cal.dateFromDateComponents(dc)
	return ( dateToCheck >= midnightToday && dateToCheck < midnightTomorrow)
}
		
// returns true if provided date/time took place yesterday
lib.dateOccurredYesterday = function(dateToCheck){
	var cal = Calendar.current
	var now = new Date()
	var midnightToday = cal.startOfDay(now)
	var dc = cal.dateComponentsFromDate(midnightToday)
	dc.day = dc.day - 1
	var midnightYesterday = cal.dateFromDateComponents(dc)
	return ( dateToCheck >= midnightYesterday && dateToCheck < midnightToday)
}
		
// returns true if the provided date/time takes place tomorrow
lib.dateOccurrsTomorrow = function(dateToCheck){
	var cal = Calendar.current
	var now = new Date()
	var midnightToday = cal.startOfDay(now)
	var dc = cal.dateComponentsFromDate(midnightToday)
	dc.day = dc.day + 1
	var midnightTomorrow = cal.dateFromDateComponents(dc)
	dc = cal.dateComponentsFromDate(midnightToday)
	dc.day = dc.day + 2
	var dayAfterTomorrow = cal.dateFromDateComponents(dc)
	return (dateToCheck >= midnightTomorrow && dateToCheck < dayAfterTomorrow)
}
		
// returns true if the provided date/time takes place next week
lib.dateOccursNextWeek = function(dateToCheck){
	var fmatr = Formatter.Date.withStyle(Formatter.Date.Style.Short)
	var weekStart = fmatr.dateFromString('next week')
	var dc = new DateComponents()
	dc.day = 7
	var followingWeek = Calendar.current.dateByAddingDateComponents(weekStart, dc)
	return (dateToCheck >= weekStart && dateToCheck < followingWeek)
}
		
// returns true if the provided date/time takes place this month
lib.dateOccurrsThisMonth = function(dateToCheck){
	var cal = Calendar.current
	var currentMonthIndex = cal.dateComponentsFromDate(new Date()).month
	var targetMonthIndex = cal.dateComponentsFromDate(dateToCheck).month
	return (targetMonthIndex === currentMonthIndex)
}
		
// returns true if the provided date/time takes place next month
lib.dateOccurrsNextMonth = function(dateToCheck){
	var cal = Calendar.current
	var dc = cal.dateComponentsFromDate(new Date())
	dc.day = 1
	dc.month = dc.month + 1
	var nextMonth = cal.dateFromDateComponents(dc)
	var nextMonthIndex = cal.dateComponentsFromDate(nextMonth).month
	var targetMonthIndex = cal.dateComponentsFromDate(dateToCheck).month
	return (nextMonthIndex === targetMonthIndex)
}
		
// returns true if the provided date/time takes place on the provided target date
lib.dateOccursOnTargetDate = function(dateToCheck, targetDate){
	var cal = Calendar.current
	var targetDateStart = cal.startOfDay(targetDate)
	var dc = cal.dateComponentsFromDate(targetDateStart)
	dc.day = dc.day + 1
	var dayAfterTargetDate = cal.dateFromDateComponents(dc)
	return ( dateToCheck >= targetDateStart && dateToCheck < dayAfterTargetDate)
}
		
lib.info = function(){
	var libProps = Object.getOwnPropertyNames(lib)
	libProps.forEach((propName, index) => {
		if (index != 0){console.log(" ")}
		console.log("•", propName)
		var item = lib[propName]
		if (typeof item === "string"){
			console.log(item)
		} else if (typeof item === "function"){
			console.log(item.toString())
		} else if (typeof item === "object"){
			if(item instanceof Version){
				console.log(item.versionString)
			} else if(item instanceof PlugIn){
				console.log(item.identifier)
			}				
		}
	})
}

	return lib;
})();