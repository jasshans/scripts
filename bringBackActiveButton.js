// File content for: inject-active-button.js
(function() {

    // --- Customizable Part ---
    // *** EDIT THIS SELECTOR BEFORE HOSTING THE FILE ***
    // This MUST be the CSS selector for the parent table row (<tr>)
    const targetSelector = 'REPLACE_WITH_CSS_SELECTOR_FOR_PARENT_TR';
    // --- End of Customizable Part ---

    const injectedTdId = 'injected-active-button-td'; // ID to prevent multiple injections

    // Check if already injected
    if (document.getElementById(injectedTdId)) {
        console.log('Button TD already seems to be injected (ID found: ' + injectedTdId + ').');
        // Optional: alert('Button already added.');
        return; // Stop if already present
    }

    // Find the target parent <tr>
    const parentTr = document.querySelector(targetSelector);

    if (!parentTr) {
        console.error('Inject Script Error: Could not find target parent element using selector: "' + targetSelector + '". Please check the selector in the hosted script file.');
        alert('Inject Script Error: Could not find target element (selector: "' + targetSelector + '"). Check the script selector.');
        return; // Stop if target not found
    }

    // Define the HTML for the new TD
    const newTdHtmlContent = `
        <input type="hidden" name="_active">
        <input type="checkbox" name="active" data-bind="disable: SE.hotelSaleEdit.viewModel().activateSaleDisabled,checked: SE.hotelSaleEdit.viewModel().templateSale.active" id="active">
        <br>
        <a data-bind="click: SE.hotelSaleEdit.populateValue('active')" onclick="return confirm('This will apply to all of the following territories [UK - GBP, IE - EUR, NL - EUR, BE - EUR, TB-BE_NL - EUR, TB-NL - EUR, SE - SEK, DE - EUR, CH - CHF, IT - EUR], are you sure?')">Apply to all territories</a>
        `;

    // Create and configure the new TD element
    const newTd = document.createElement('td');
    newTd.id = injectedTdId;
    newTd.innerHTML = newTdHtmlContent;

    // Append the new TD to the target TR
    parentTr.appendChild(newTd);

    console.log('Successfully injected the button TD via external script into:', parentTr);

})();
