$(document).ready(function () {
  // Ajax call for grades ------------
  var gradesArray;
  function getGrades() {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: "/grades.json",
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
        url: "/splits.json",
        async: false,
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
        url: "/courses.json",
        async: false,
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
        url: "/student.json",
        async: false,
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
                  showTableData();
                })
                .catch((err) => {});
            })
            .catch((err) => {});
        })
        .catch((err) => {});
    })
    .catch((err) => {});

  console.log("grades", gradesArray);
  console.log("splits", splitsArray);
  console.log("courses", coursesArray);
  console.log("student", studentObj);

  // function getGP(mark, grade) {
  //   if (mark >= 0 && mark <= 100) {
  //     if (mark < grade.upper && mark >= grade.lower) {
  //       return parseFloat(grade.gradepoint);
  //     }
  //   } else {
  //     return "-";
  //   }
  // }

  function showTableData() {
    let htmlH;
    htmlH += "<th>  </th>";
    for (i = 0; i < splitsArray.length; i++) {
      htmlH += `<th class='text-center'>${splitsArray[i].splittitle}</th>`;
      //console.log(data[i].id);
    }
    htmlH += "<th>GP</th>";
    $("#split").html(htmlH);

    let html;
    for (i = 0; i < coursesArray.length; i++) {
      html += `<tr><td class='fw-bold'>${coursesArray[i].coursetitle}</td>`;
      let m;
      for (j = 0; j < splitsArray.length; j++) {
        for (k = 0; k < studentObj.marks.length; k++) {
          // console.log(student.marks[k].splitno);
          if (
            coursesArray[i].coursecode == studentObj.marks[k].coursecode &&
            splitsArray[j].splitno == studentObj.marks[k].splitno
          ) {
            m = studentObj.marks[k].marks;
            if (m == null) m = "-";
            html += `<td class='text-center'>${m}</td>`;
            break;
          }
        }
      }
      let gp;
      for (let grade of gradesArray) {
        gp = getGP(m, grade);
        console.log(gp);
        if (mark >= 0 && mark <= 100) {
          if (mark < grade.upper && mark >= grade.lower) {
            gp = parseFloat(grade.gradepoint);
          }
        } else {
          gp = "-";
        }
      }
      html += `<td class='text-center'>${gp}</td></tr>`;
    }
    $("#dpt").html(html);
  }
});
