function createAccountIdDiv(accountId) {

    //Create link
	var protocol = window.location.protocol;
	var url = window.location.pathname;
	var a = document.createElement('a');

    if (url.indexOf('localhost') >= 0) {
        a.href = 'http://' + url + ':9090//mari/#/hotel/' + accountId;
    } else if (url.indexOf('staging') >= 0 || url.indexOf('uat') >= 0) {
        a.href = protocol + '//' + url + '/mari/#/hotel/' + accountId;
    } else {
        a.href = 'https://mari.secretescapes.com/#/hotel/' + accountId;
    }

    //Info displayed
	a.appendChild(document.createTextNode('- ID -'));
	a.appendChild(document.createElement('br'));
	a.appendChild(document.createTextNode(accountId));

    //Styling
	var accountIdDiv = document.createElement('div');
	accountIdDiv.id = 'se-sale-id-revealer';
	accountIdDiv.style.backgroundColor = "#FFFFFF";
	accountIdDiv.style.fontFamily = "'Open Sans', Sans-serif";
	accountIdDiv.style.fontSize = "18px";
	accountIdDiv.style.float = "left";
	accountIdDiv.style.textAlign = "center";
	accountIdDiv.style.position = "fixed";
	accountIdDiv.style.left = "30px";
	accountIdDiv.style.top = "30px";
	accountIdDiv.style.padding = "15px";
	accountIdDiv.style.borderRadius = "4px";
	accountIdDiv.style.zIndex = "1000";
	accountIdDiv.style.border = "1px solid rgb(176, 176, 176)";
	accountIdDiv.appendChild(a);
	document.body.insertBefore(accountIdDiv, document.body.childNodes[0]);
}

// This is needed for Chrome, at least, because it does not give direct access
// to a website's JavaScript variables.
function updateDivByScriptInjection() {
	var getAccountIdFunction = '(function() {' + createAccountIdDiv + ' createAccountIdDiv(window.SE.accountId); })();';

	var script = document.createElement('script');
	script.textContent = getAccountIdFunction;
	(document.head||document.documentElement).appendChild(script);
	script.parentNode.removeChild(script);
}

function addAccountIdToPage() {
	if(typeof SE != 'undefined') {
		createAccountIdDiv(SE.accountId);
	}
	else {
		updateDivByScriptInjection();
	}
}

addAccountIdToPage();
