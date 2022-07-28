$(document).ready(function () {

    


    function showSplits() {
        $.ajax({
            url: "splits.json",
            method: "GET",
            dataType: "json",
            success: function (data) {

                let html;
                const styles = ["Saab", "Volvo", "BMW"];
                html += "<th>  </th>";

                for (i = 0; i < data.length; i++) {
                    html += "<th class='text-center'>" + data[i].splittitle + "</th>";
                    //console.log(data[i].id);
                }
                html += "<th>CGPA</th>";
                $("#split").html(html);

            }
        });
    }

    showSplits();

    // function showDpt() {
    //     $.ajax({
    //         url: "courses.json",
    //         method: "GET",
    //         dataType: "json",
    //         success: function (data) {

    //             let html;

    //             for (i = 0; i < data.length; i++) {
    //                 html += "<tr>"
    //                     + "<td class='table-primary'>" + data[i].coursetitle + "</td>"
    //                     + "<td>" + "</td>"
    //                     + "<td>" + "</td>"
    //                     + "<td>" + "</td>"
    //                     + "<td>" + "</td>"
    //                     + "<td>" + "</td>"
    //                     + "<td>" + "</td>"
    //                     + "<td>" + "</td>"
    //                     + "<td>" + "</td>"
    //                     + "<td>" + "</td>"
    //                     + "<td>" + "</td>" +
    //                     "</tr>";
    //                 //console.log(data[i].id);
    //             }
    //             $("#dpt").html(html);

    //         }
    //     });
    // }

    // showDpt();

    function showDpt() {

        $.ajax({
            url: "courses.json",
            method: "GET",
            dataType: "json",
            success: function (courses) {

                $.ajax({
                    url: "splits.json",
                    method: "GET",
                    dataType: "json",
                    success: function (splits) {

                        $.ajax({
                            url: "student.json",
                            method: "GET",
                            dataType: "json",
                            success: function (student) {

                                let html;
                                for (i = 0; i < courses.length; i++) {

                                    html += `<tr><td class='fw-bold'>${courses[i].coursetitle}</td>`;

                                    for (j = 0; j < splits.length; j++) {

                                        for (k = 0; k < student.marks.length; k++) {
                                            console.log(student.marks[k].splitno);
                                            if (courses[i].coursecode == student.marks[k].coursecode && splits[j].splitno == student.marks[k].splitno) {
                                                let m = student.marks[k].marks;
                                                if (m == null) m = "-";
                                                html += `<td class='text-center'>${m}</td>`;
                                                break;
                                            }
                                        }
                                    }
                                    html += "<td class='text-center'> - </td></tr>";
                                }
                                $("#dpt").html(html);

                            }
                        })
                    }
                })
            }
        })
    }
    showDpt();



})