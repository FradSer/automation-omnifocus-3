(*
	Topic.applescript
	By Frad Lee of [Hello from FradSer](http://fradser.me).
	See README for details.
*)

-- PROPS
property isNotify : false

property scriptSuiteName : "Frad's Scripts"

-- MAIN
set newTopic to missing value
tell application "OmniFocus"
	tell front document
		tell content of document window 1
			set anProject to value of (first descendant tree where class of its value is project)
			set projectNote to note of anProject
			set projectTitle to name of anProject
			if projectNote does not contain "$topic" then
				set topicName to do shell script "echo '" & projectTitle & "'|sed 's/\\[//' | sed 's/\\]//'"
				set note of anProject to projectNote & return & "------------------------" & return & "$topic: " & topicName
			else
				set allTask to value of (every descendant tree where class of its value is task)
				repeat with anTask in allTask
					if name of anTask contains "$topic" then
						set newTopic to do shell script "echo '" & projectNote & "' | sed -n '/$topic: /p' | sed 's/$topic: //g'"
						set taskTitle to name of anTask
						set name of anTask to do shell script "echo '" & taskTitle & "' | sed 's/$topic/#" & newTopic & " /g'"
						if (newTopic is not missing value) and (isNotify) then
							my notify("Changed topic.", newTopic)
						end if
					end if
				end repeat
			end if
		end tell
	end tell
end tell

-- NOTIFY

on notify(theTitle, theDescription)
	display notification theDescription with title scriptSuiteName subtitle theTitle
end notify