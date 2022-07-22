function showSplits() {
    $.ajax({
        url: "splits.json",
        method: "GET",
        dataType: "json",
        success: function (data) {

            let msg;
            const styles = ["Saab", "Volvo", "BMW"];
            msg += "<th>  </th>";

            for (i = 0; i < data.length; i++) {
                msg += "<th>" + data[i].splittitle + "</th>";
                //console.log(data[i].id);
            }
            msg += "<th>CGPA</th>";
            $("#split").html(msg);

        }
    });
}

showSplits();

function showDpt() {
    $.ajax({
        url: "courses.json",
        method: "GET",
        dataType: "json",
        success: function (data) {

            let msg;

            for (i = 0; i < data.length; i++) {
                msg += "<tr>"
                    + "<td class='table-primary'>" + data[i].coursetitle + "</td>"
                    + "<td>" + "</td>"
                    + "<td>" + "</td>"
                    + "<td>" + "</td>"
                    + "<td>" + "</td>"
                    + "<td>" + "</td>"
                    + "<td>" + "</td>"
                    + "<td>" + "</td>"
                    + "<td>" + "</td>"
                    + "<td>" + "</td>"
                    + "<td>" + "</td>" +
                    "</tr>";
                //console.log(data[i].id);
            }
            $("#dpt").html(msg);

        }
    });
}

showDpt();


