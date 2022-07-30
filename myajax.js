$(document).ready(function () {
    // Ajax call for grades ------------
    var gradesArray;
    function getGrades() {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: "grades.json",
                method: "GET",
                dataType: "json",
                success: function (grades) {
                    gradesArray = grades;
                    resolve();
                },
                error: () => reject(),
            });
        });
    }

    // Ajax call for Splits ------------
    var splitsArray;
    function getSplits() {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: "splits.json",
                method: "GET",
                dataType: "json",
                success: function (splits) {
                    splitsArray = splits;
                    resolve();
                },
                error: () => reject(),
            });
        });
    }

    // Ajax call for courses ------------
    var coursesArray;
    function getCourses() {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: "courses.json",
                method: "GET",
                dataType: "json",
                success: function (courses) {
                    coursesArray = courses;
                    resolve();
                },
                error: () => reject(),
            });
        });
    }

    // Ajax call for students ------------
    var studentObj;
    function getStudent() {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: "student.json",
                method: "GET",
                dataType: "json",
                success: function (student) {
                    studentObj = student;
                    resolve();
                },
                error: () => reject(),
            });
        });
    }

    let gradePromise = getGrades();
    gradePromise
        .then((result) => {
            let splitPromise = getSplits();
            splitPromise
                .then((result) => {
                    let coursePromise = getCourses();
                    coursePromise
                        .then((result) => {
                            let studentPromise = getStudent();
                            studentPromise
                                .then((result) => {
                                    // showTableHeaders();
                                    showTableData(
                                        gradesArray,
                                        splitsArray,
                                        coursesArray,
                                        studentObj
                                    );

                                    showTableData2(
                                        gradesArray,
                                        splitsArray,
                                        coursesArray,
                                        studentObj
                                    );

                                    datatable5(
                                        gradesArray,
                                        splitsArray,
                                        coursesArray,
                                        studentObj
                                    );
                                })
                                .catch((err) => {});
                        })
                        .catch((err) => {});
                })
                .catch((err) => {});
        })
        .catch((err) => {});

    // Function for Grade Point ------------
    function getGP(mark, gradesArray) {
        for (let grade of gradesArray) {
            if (mark >= 0 && mark <= 100) {
                if (mark < grade.upper && mark >= grade.lower) {
                    return parseFloat(grade.gradepoint).toFixed(2);
                }
            } else {
                return "-";
            }
        }
    }

    // Function for Latter Grade---------
    function getLG(gradesArray, GPAHTML) {
        for (let grade of gradesArray) {
            console.log(
                parseFloat(GPAHTML.toFixed(2)),
                ">",
                parseFloat(grade.gradepoint)
            );
            if (
                parseFloat(GPAHTML.toFixed(2)) >= parseFloat(grade.gradepoint)
            ) {
                return grade.lettergrade;
            }
        }
    }

    // Function for Result ------------
    function getResult(LGHTML) {
        if (LGHTML == "F") {
            return "Fail";
        } else {
            return "Pass";
        }
    }

    function showTableData(gradesArray, splitsArray, coursesArray, studentObj) {
        let htmlH;
        htmlH += "<th> </th>";
        for (let i = 0; i < splitsArray.length; i++) {
            htmlH += `<th class='text-center'>${splitsArray[i].splittitle}</th>`;
        }
        htmlH += "<th>GP</th>";
        $("#split").html(htmlH);

        let html;
        let gpa = 0;
        for (let i = 0; i < coursesArray.length; i++) {
            html += `<tr><td class='fw-bold'>${coursesArray[i].coursetitle}</td>`;
            let m;
            for (let j = 0; j < splitsArray.length; j++) {
                for (let k = 0; k < studentObj?.marks?.length; k++) {
                    if (
                        coursesArray[i].coursecode ==
                            studentObj.marks[k].coursecode &&
                        splitsArray[j].splitno == studentObj.marks[k].splitno
                    ) {
                        m = studentObj.marks[k].marks;
                        if (m == null) m = "-";
                        html += `<td class='text-center'>${m}</td>`;
                        break;
                    }
                }
            }

            let gp = getGP(m, gradesArray);
            if (gp >= 0) {
                gpa += gp;
            }
            html += `<td class='text-center'>${gp}</td></tr>`;
        }
        $("#dpt").html(html);

        let GPAHTML = gpa / splitsArray.length;
        $("#GPA").html(GPAHTML?.toFixed(2));

        let LGHTML = getLG(gradesArray, GPAHTML);
        $("#LG").html(LGHTML);

        let resultHTML = getResult(LGHTML);
        $("#result").html(resultHTML);
    }

    function showTableData2(
        gradesArray,
        splitsArray,
        coursesArray,
        studentObj
    ) {
        let template = $(`<div class="table-responsive">
					<table
						class="transcript_table table table-bordered table-striped table-hover table-light">
						<thead>
							<tr>	
								<th></th>
								${splitsArray.map((a) => `<th>${a.splittitle}</th>`).join("")}
								<th>GP</th>
							</tr>
						</thead>
						<tbody></tbody>
					</table>
				</div>`).appendTo(`#result_container`);

        $.each(coursesArray, (indexInCourse, valueOfCourse) => {
            let row = $(`<tr>
					<th>${valueOfCourse.coursetitle}</th>
				</tr>`);

            $(`.transcript_table tbody`, template).append(row);

            $.each(splitsArray, (indexInSplit, valueOfSplit) => {
                let markObj = studentObj.marks.find(
                    (a) =>
                        a.coursecode == valueOfCourse.coursecode &&
                        a.splitno == valueOfSplit.splitno
                );
                let mark;

                if (markObj && markObj.marks) {
                    mark = Math.ceil(markObj.marks);
                    row.append(`<td>${mark}</td>`);
                } else {
                    row.append(`<td>-</td>`);
                }

                if (valueOfSplit.splittype == `TOTAL`) {
                    row.append(`<td>${getGP(mark, gradesArray)}</td>`);
                }
            });
        });
    }

    function datatable5(gradesArray, splitsArray, coursesArray, studentObj) {
        let template = $(`<div class="table-responsive">
		<table
			class="table table-bordered table-striped table-hover table-light"
			<thead>
				<tr>
				<th>hello</th>
				</tr>
			</thead>
			<tbody id="dpt"></tbody>
		</table>
	</div>`).appendTo(`$result_container1`);
    }
});
//
