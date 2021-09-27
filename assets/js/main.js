import { validateOrder } from '/assets/js/validateOrder.js';

$(document).ready(function () {

    // ===== Toggle cassette count field =====
    $( "#removeCassetteCount" ).click(() => {

        // Toggle Button styling 
        $( "#removeCassetteCount" ).toggleClass("btn-danger btn-success");

        // Toggle dis/en abling of form field
        $( "#cassetteCountCont input" ).attr("disabled", (_, attr) => {
            return !attr;
        });

    })

    // ===== When submit is clicked begin validation =====
    $( "form" ).submit(function( event ) {

        // Extract form fields from form
        const fields = $( ":input" ).serializeArray();

        // Prevent redirect
        event.preventDefault();

        // Create order from form fields
        let orderArray = [];
        for (let i = 0; i < fields.length - 1; i+= 2) {
            let intArray = [fields[i].value, fields[i + 1].value];
            orderArray.push(intArray);
        }

        console.log(orderArray);

        // Validate the order
        let response = validateOrder(orderArray);
        console.log(response);

        // Update and display the modal
        $( "#modalTitle" ).text(response[0]);
        $( "#modalBody" ).text(response[1]);
        $( "#outputModalBtn").click();
        
      });

})

