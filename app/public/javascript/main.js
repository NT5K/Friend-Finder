
// populate questions using object from questions.js
for (i = 0; i < questions.length; i++) {
    const q = questions[i]
    $("#new-question").append(

        '<div class="card-body">' +
        '<h5 class="text-muted">' + q.questionId + '</h5>' +
            '<h3 >' + q.question + '</h3>' +
            '<p class="card-text">' +
                '<div class="form-group">' +
                    '<select class="form-control" id=' + q.questionId.replace(/\s/g, '') + '>' +
                        '<option value="0" selected>Please choose an answer</option>' +
                        '<option value="1">1 (nope)</options>' +
                        '<option value="2">2</options>' +
                        '<option value="3">3 (kinda)</options>' +
                        '<option value="4">4</options>' +
                        '<option value="5">5 (totally)</options>' +
                    '</select>' +
                '</div>' +
            '</p>' +
        '</div>' +
        '<hr>'

    );
};

$('#submitForm').on('click', function (event) {
    event.preventDefault();
    // Gather user inputs
    const userInput = {
        name: $('#persons-name').val().trim(),
        photo: $('#image-link').val().trim(),
        scores: [
            $("#Question1").val(),
            $("#Question2").val(),
            $("#Question3").val(),
            $("#Question4").val(),
            $("#Question5").val(),
            $("#Question6").val(),
            $("#Question7").val(),
            $("#Question8").val(),
            $("#Question9").val(),
            $("#Question10").val()
        ]
    };

  // validation for form
    if ($('#persons-name').val().trim() === '' || $('#image-link').val().trim() === '' || 
        $("#Question1").val() === "0" ||
        $("#Question2").val() === "0" ||
        $("#Question3").val() === "0" ||
        $("#Question4").val() === "0" ||
        $("#Question5").val() === "0" ||
        $("#Question6").val() === "0" ||
        $("#Question7").val() === "0" ||
        $("#Question8").val() === "0" ||
        $("#Question9").val() === "0" ||
        $("#Question10").val() === "0"
        ) {
            // if form is not valid, populate the alert-div
            $("#alert-div").html("<h4>Please answer all questions and fill out all required data before submitting form</h4>")

    } else {  // Grab the result from the AJAX post so that the best match's name and photo are displayed.
        const currentURL = window.location.origin;
        // AJAX request for updating friends list and populating modal
        $.post(currentURL + "/api/friends", userInput, function (data) {
        // if form is valid populate the modal
        $("#matchName").html("<h2>" + data.name + "</h2>");
        $('#matchImg').attr("src", data.photo);
        // $('#matchImg').text(data.photo);
        // Show the modal with the best match 
        $("#resultsModal").modal('toggle');
        });

        // clear form
        $('#persons-name').val('')
        $('#image-link').val('')
        $("#Question1").val("0")
        $("#Question2").val("0")
        $("#Question3").val("0")
        $("#Question4").val("0")
        $("#Question5").val("0")
        $("#Question6").val("0")
        $("#Question7").val("0")
        $("#Question8").val("0")
        $("#Question9").val("0")
        $("#Question10").val("0")
    };
});
