document.getElementById('issueInputForm').addEventListener('submit',saveIssue);

function saveIssue(e){
    var issueDesc = document.getElementById('issueDescInput').value;
    var issueSeverity = document.getElementById('issueSeverityInput').value;
    var issueAssignedTo = document.getElementById('issueAssignedToInput').value;
    var issuedId = chance.guid();
    var issueStatus = 'open';

    var issue = {
        id : issuedId,
        description : issueDesc,
        severity : issueSeverity,
        assignedTo : issueAssignedTo,
        status : issueStatus
    }

    if(localStorage.getItem('issues') == null) {
        var issues = [];
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
    }
    else {
        var issues = JSON.parse(localStorage.getItem('issues'));
        issues.push(issue);
        localStorage.setItem('issues',JSON.stringify(issues));
    }
    document.getElementById('issueInputForm').reset();

    fetchIssues();

    e.preventDefault();
	
}



function fetchIssues(){
    var issues = JSON.parse(localStorage.getItem('issues'));
    var issuesList = document.getElementById('issuesList');
    issuesList.innerHTML = '';
	// you need to check if the list of issues is null (or the localStorage)
	if(issues != null && issues.length > 0){

		for(var i = 0; i < issues.length; i++) {
			var id = issues[i].id;
			var desc = issues[i].description;
			var severity = issues[i].severity;
			var assignedTo = issues[i].assignedTo;
			var status = issues[i].status;

			issuesList.innerHTML += '<div class="well">'+
									'<h6>Issue ID: ' + id + '</h6>'+
									'<p><span class="label label-info">' + status + '</span></p>' +
									'<h3>' + desc + '</h3>'+
									'<p><span class="glyphicon glyphicon-time"></span>' + severity + '</p>' +
									'<p><span class="glyphicon glyphicon-user"></span>' + assignedTo + '</p>' +
									'<a href="#" onclick="setStatusClosed(\''+id+'\')" class="btn btn-warning">Close</a>' +
									'<a href="#" onclick="deleteIssue(\''+id+'\')" class="btn btn-danger">Delete</a>' +
									'</div>';
		}
	}
	else{
		// you might want to display something friendly to the user to say that there are no issues.
		// like maybe: 	issuesList.innerHTML += '<div class="well">There are no issues</div>';
		console.log("There are no issues");
	}
}