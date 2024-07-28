$(document).ready(function() {
    $('#loadMarks').click(function() {
        $.ajax({
            url: 'marks.json',  // The URL of the JSON file
            type: 'GET',        // The HTTP method
            dataType: 'json',   // The type of data expected from the server
            beforeSend: function() {
                // Before sending the request, show a loading message
                $('#marksContainer').html('<p>Loading marks...</p>');
            },
            success: function(data) {
                // Clear the container and create table headers
                $('#marksContainer').html(`
                    <table>
                        <thead>
                            <tr>
                                <th>Sr. No.</th>
                                <th>Name</th>
                                <th>Marks</th>
                            </tr>
                        </thead>
                        <tbody id="marksTableBody"></tbody>
                    </table>
                `);

                // Loop through the JSON data and display it
                let marksTableBody = $('#marksTableBody');
                data.students.forEach(function(student, index) {
                    marksTableBody.append(
                        `<tr>
                            <td>${index + 1}</td>
                            <td>${student.name}</td>
                            <td>${student.marks}</td>
                        </tr>`
                    );
                });
            },
            error: function(xhr, status, error) {
                // Handle any errors that occurred during the request
                $('#marksContainer').html('<p>An error occurred while loading the marks.</p>');
                console.error(error);
            },
            complete: function() {
                // Code to run regardless of success or failure
                console.log('Marks request complete');
            }
        });
    });
});
