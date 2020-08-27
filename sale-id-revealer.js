function createSaleIdDiv(saleId) {

    //Create link
	var protocol = window.location.protocol;
	var url = window.location.hostname;
	var a = document.createElement('a');

    if (url.indexOf('localhost') >= 0) {
        a.href = 'http://' + url + ':9090/cms/hotelSale/editorialEdit/' + saleId;
    } else if (url.indexOf('staging') >= 0 || url.indexOf('uat') >= 0) {
        a.href = protocol + '//' + url + '/cms/hotelSale/editorialEdit/' + saleId;
    } else {
        a.href = 'https://cms.secretescapes.com/hotelSale/editorialEdit/' + saleId;
    }

    //Info displayed
	a.appendChild(document.createTextNode('Territory ID'));
	a.appendChild(document.createElement('br'));
	a.appendChild(document.createTextNode(saleId));

    //Styling
	var saleIdDiv = document.createElement('div');
	saleIdDiv.id = 'se-sale-id-revealer';
	saleIdDiv.style.backgroundColor = "#FFFFFF";
	saleIdDiv.style.fontFamily = "'Open Sans', Sans-serif";
	saleIdDiv.style.fontSize = "18px";
	saleIdDiv.style.float = "right";
	saleIdDiv.style.textAlign = "center";
	saleIdDiv.style.position = "fixed";
	saleIdDiv.style.left = "30px";
	saleIdDiv.style.top = "30px";
	saleIdDiv.style.padding = "15px";
	saleIdDiv.style.borderRadius = "4px";
	saleIdDiv.style.zIndex = "1000";
	saleIdDiv.style.border = "1px solid rgb(176, 176, 176)";
	saleIdDiv.appendChild(a);
	document.body.insertBefore(saleIdDiv, document.body.childNodes[0]);
}

// This is needed for Chrome, at least, because it does not give direct access
// to a website's JavaScript variables.
function updateDivByScriptInjection() {
	var getSaleIdFunction = '(function() {' + createSaleIdDiv + ' createSaleIdDiv(window.SE.saleId); })();';

	var script = document.createElement('script');
	script.textContent = getSaleIdFunction;
	(document.head||document.documentElement).appendChild(script);
	script.parentNode.removeChild(script);
}

function addSaleIdToPage() {
	if(typeof SE != 'undefined') {
		createSaleIdDiv(SE.saleId);
	}
	else {
		updateDivByScriptInjection();
	}
}

addSaleIdToPage();
