<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
         pageEncoding="ISO-8859-1" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<c:set var="contextPath" value="${pageContext.request.contextPath}"/>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
    <script
            src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.14/angular.min.js"></script>
    <script
            src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.14/angular-route.min.js"></script>

    <%--<!-- Bootstrap core CSS -->
        <link href="${pageContext.request.contextPath}/resources/css/bootstrap.min.css" rel="stylesheet">--%>
    <%-- google icons--%>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet">
    <!-- Custom styles for this template -->
    <link
            href="${pageContext.request.contextPath}/resources/css/simple-sidebar.css"
            rel="stylesheet">
    <title>EMS</title>
    <link rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css"
          integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS"
          crossorigin="anonymous">
    <link href="${contextPath}/resources/css/common.css" rel="stylesheet">
    <style>
        input[type=search], input[type=password], input[type=text] {
            border: 2px solid steelblue;
            border-radius: 4px;
            background-color: #ADD8E6;
            color: black;
            font-weight: 300;
        }

        .bg-info, .list-group-item-action, .list-group-item, i {
            color: white !important;
        }

        label {
            color: cornsilk;
        }

        img {
            width: 75px;
            height: 66px;
        }

        .btn-circle {
            width: 30px;
            height: 30px;
            padding: 6px 0px;
            border-radius: 15px;
            text-align: center;
            font-size: 12px;
            line-height: 1.42857;
        }

        .red-tooltip + .tooltip > .tooltip-inner {
            background-color: red;
        }

        .red-tooltip + .tooltip > .tooltip-arrow {
            border-bottom-color: #f00;
        }

        .text-justify {
            color: purple;
        }

        .validationError {
            color: rgb(159, 58, 56) !important;
            border: 2px solid rgb(159, 58, 56);
        ! important;
            font-family: cursive;
            font-size: 1.1em;
            font-weight: 300;
        }

        .blink_me {
            animation: blinker 1s linear infinite;
        }

        .spinnerShow {
            opacity: .7;
            z-index: 2;
            pointer-events: none;
            background: silver;
        }

        .showSpinner {
            display: block;
            position: absolute;
            top: 50%;
            left: 37%;
        }

        .hide {
            display: none !important;
        }

        .show {
            display: block !important;
        }

        .showRecords {
            color: #17a2b8;
            min-width: 309px;
            white-space: nowrap;
            float: left;
            height: 41px;
            mx-width: 500px
        }

        .homeEmp {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            min-height: 100vh;
            justify-content: center;
            align-items: center;
            text-align: center;
            background: #ffd1dc !important;
            color: black !important;
            max-width: 74em;
        }

        .homeEmp:hover {
            transform: scale(1.01);
        }
        label {
	color:black;
}


    </style>
</head>
<body ng-app="empApp" id="appBody" ng-init="previous=0;next=10">

<div class="d-flex" id="wrapper">

    <!-- Sidebar -->
    <div class="bg-dark border-right" id="sidebar-wrapper">
        <div class="sidebar-heading " style="color: white">
            <i data-toggle="tooltip"
               data-placement="top"
               title="Welcome to EMS"
               class="material-icons red-tooltip mainIcon">
                group_add </i> &nbsp;&nbsp;&nbsp;<span class="mailIcon">EMS</span>
        </div>
        <div class="list-group list-group-flush">
            <a href="#addEmp"
               class="list-group-item list-group-item-action bg-dark">Add
                Employee</a> <a class="list-group-item list-group-item-action bg-dark"
                                href="#employeeManagement">Employee Management</a> <a href="#"
                                                                                      class="list-group-item list-group-item-action bg-dark">Grievance
            ChatBot</a> <a class="list-group-item list-group-item-action bg-dark"
                           href="#uploadEmp">Bulk Upload</a>
        </div>
    </div>
    <!-- /#sidebar-wrapper -->

    <!-- Page Content -->
    <div id="page-content-wrapper">

        <nav
                class="navbar navbar-expand-lg navbar-info bg-dark border-bottom">

            <button id="menu-toggle" class="btn btn-info">
                <i data-toggle="tooltip" data-placement="top" title="Toggle Menu"
                   class=" material-icons red-tooltip"> menu </i>
            </button>
            <button class="navbar-toggler" type="button" data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ml-auto mt-2 mt-lg-0">
                    <li class="nav-item active">
                        <c:if test="${pageContext.request.userPrincipal.name != null}">
                            <a class="nav-link" href="#" style="color:white">

                                <i data-toggle="tooltip"
                                   data-placement="top"
                                   title="Welcome ${pageContext.request.userPrincipal.name}"
                                   class="material-icons menuItems red-tooltip">
                                    tag_faces</i>&nbsp; Welcome &nbsp;${pageContext.request.userPrincipal.name}</a>
                        </c:if>
                    </li>
                    <li class="nav-item active"><a class="nav-link"
                                                   href="/employee/home/show#/home"><i data-toggle="tooltip"
                                                                                       data-placement="top"
                                                                                       title="Go to Home"
                                                                                       class="material-icons menuItems red-tooltip">
                        home </i> <span
                            class="sr-only">(current)</span></a></li>
                    <li class="nav-item active">
                        <a class="nav-link" href="${contextPath}/logout" style="color:white"><i
                                data-toggle="tooltip"
                                data-placement="top"
                                title="Logout from EMS"
                                class="material-icons menuItems red-tooltip">
                            directions_run</i></a>
                    </li>
                </ul>
            </div>
        </nav>

        <div class="container-fluid">

            <div class="container">
                <div id="spinnerShow" class="hide">
                    <div class="spinner-grow text-primary" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                    <div class="spinner-grow text-secondary" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                    <div class="spinner-grow text-success" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                    <div class="spinner-grow text-danger" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                    <div class="spinner-grow text-warning" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                    <div class="spinner-grow text-info" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                    <div class="spinner-grow text-light" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                    <div class="spinner-grow text-dark" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>

                <div ng-view></div>
                <script type="text/ng-template" id="employeeManagement.htm">
                    <div class="alert alert-warning" role="alert">
                        <b class="text-justify resultMessage">{{message}}</b>
                        <a href="#" ng-click="revertDelete()" ng-show="revertDeleteMessage" class="blink_me"><i
                                class="material-icons">
                            settings_backup_restore
                        </i>Revert Last Delete operation</a>
                    </div>
                    <div class="row">
                        <div class="col-sm" ng-show="mainTable">
                            <div class="alert alert-dark showRecords" role="alert" ng-show="recordCount"
                                 ng-model="recordCountMsg"
                            >
                                <b>{{recordCountMsg}}</b>
                            </div>
                        </div>
                        <div class="col-sm">

                        </div>

                        <div class="col-sm">
                            <input class="form-control mr-sm-2" type="search"
                                   placeholder="Search by id,FirstName or LastName"
                                   aria-label="Search" ng-model="query" ng-model-options="{ debounce: 200 }"
                                   ng-change="doSearch()">{{query}}</input>
                        </div>
                        <nav aria-label="Page navigation example" style="float:right" ng-show="mainTable">
                            <ul class="pagination justify-content-end">
                                <li class="page-item  previousButton">
                                    <a class="page-link" tabindex="-1" ng-model="previous"
                                       ng-click="initializePrevious()">Previous</a>
                                </li>
                                <li class="page-item  nextButton">
                                    <a class="page-link" tabindex="-1" ng-model="next"
                                       ng-click="initializeNext()">Next</a>
                                </li>
                            </ul>
                        </nav>
                        &nbsp;
                        <select style="width:50px;height: 35px;color:#17a2b8" ng-model="perPage" ng-change="showPopup()"
                                ng-show="mainTable">
                            <option disabled selected value>select</option>
                            <option>10</option>
                            <option>20</option>
                            <option>50</option>
                            <option>100</option>
                        </select>
                        <div class="table-responsive" ng-show="mainTable">
                            <table class="table table-sm table-striped table-bordered table-hover table-secondary"
                                   border="5"
                                   style="font-size: 0.79em;">

                                <tr>
                                    <th ng-repeat="(key, val) in myArray[0]" ng-show="$index != 10"
                                        style="color:maroon;font-size:1em;background-color: blanchedalmond">{{ key |
                                        uppercase}}
                                    </th>
                                    <th style="color:maroon;font-size:1em;background-color: blanchedalmond">DELETE</th>

                                </tr>
                                <tr ng-repeat="employee in myArray ">
                                    <td>
                                        {{ employee.firstName }}
                                    </td>
                                    <td>

                                        <a href="/employee/home/show#/addEmp" data-toggle="tooltip" data-placement="top"
                                           title="Update Employee" ng-click="updateEmp($index)"><u>{{ employee.id }}</u></a>
                                    </td>
                                    <td>
                                        {{ employee.inputAddress }}
                                    </td>
                                    <td>
                                        {{ employee.inputAddress2 }}
                                    </td>
                                    <td>
                                        {{ employee.inputCity }}
                                    </td>
                                    <td>
                                        {{ employee.inputEmail }}
                                    </td>
                                    <td>
                                        {{ employee.inputPassword }}
                                    </td>
                                    <td>
                                        {{ employee.inputState }}
                                    </td>
                                    <td>
                                        {{ employee.inputZip }}
                                    </td>
                                    <td>
                                        {{ employee.lastName }}
                                    </td>
                                    <td>

                                        <i data-toggle="tooltip" data-placement="top" title="Delete Employee"
                                           class="red-tooltip material-icons btn-circle btn btn-danger btn-sm"
                                           ng-click="showDelete($event)"
                                           id={{employee.id}}>
                                            delete
                                        </i>
                                    </td>


                                </tr>
                            </table>
                        </div>
                    </div>

                </script>
                <script type="text/ng-template" id="addEmployee.htm">
                    <div>

                        <div class="alert alert-warning" role="alert">
                            <b class="text-justify resultMessage">{{message}}</b>
                        </div>
                        <form name="form">
                            <div class="form-row">
                                <div class="form-group col-sm-6">
                                    <label for="firstName">FirstName</label>
                                    <input type="search" class="form-control form-control-sm" ng-model="firstName"
                                           placeholder="First Name" name="firstName" required>
                                    <span ng-model="firstNameError" class="validationError"
                                          ng-show="firstNameErrorShow">{{firstNameError}} </span>
                                </div>
                                <div class="form-group col-sm-6">
                                    <label for="lastName">LastName</label>
                                    <input type="search" class="form-control form-control-sm" ng-model="lastName"
                                           placeholder="Last Name" name="lastName">
                                    <span ng-model="lastNameError" class="validationError" ng-show="lastNameErrorShow">{{lastNameError}} </span>
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-group col-sm-6">
                                    <label for="inputEmail">Email</label>
                                    <input type="search" class="form-control form-control-sm" ng-model="inputEmail"
                                           placeholder="Email">
                                    <span ng-model="emailError" class="validationError" ng-show="emailErrorShow">{{emailError}} </span>
                                </div>
                                <div class="form-group col-sm-6">
                                    <label for="inputPassword4">Password</label>
                                    <input type="password" class="form-control form-control-sm" ng-model="inputPassword"
                                           placeholder="Password">
                                    <span ng-model="passWordError" class="validationError" ng-show="passWordErrorShow">{{passWordError}} </span>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="inputAddress">Address</label>
                                <input type="search" class="form-control form-control-sm" ng-model="inputAddress"
                                       placeholder="1234 Main St">
                                <span ng-model="addressError" class="validationError" ng-show="addressErrorShow">{{addressError}} </span>
                            </div>
                            <div class="form-group">
                                <label for="inputAddress2">Address 2</label>
                                <input type="search" class="form-control form-control-sm" ng-model="inputAddress2"
                                       placeholder="Apartment, studio, or floor">
                            </div>
                            <div class="form-row">
                                <div class="form-group col-md-6">
                                    <label for="inputCity">City</label>
                                    <input type="search" placeholder="Your City" class="form-control form-control-sm" ng-model="inputCity">
                                    <span ng-model="cityError" class="validationError" ng-show="cityErrorShow">{{cityError}} </span>
                                </div>
                                <div class="form-group col-md-4">
                                    <label for="inputState">State</label>
                                    <input type="search"  placeholder="Your State" class="form-control form-control-sm" ng-model="inputState">
                                    <span ng-model="stateError" class="validationError" ng-show="stateErrorShow">{{stateError}} </span>
                                </div>
                                <div class="form-group col-md-2">
                                    <label for="inputZip">Zip</label>
                                    <input type="search"  placeholder="Your zip code" class="form-control form-control-sm" ng-model="inputZip">
                                    <span ng-model="zipError" class="validationError" ng-show="zipErrorShow">{{zipError}} </span>
                                </div>
                            </div>

                        </form>
                        <center>
                            <button type="button" class="btn btn-success btn-sm" ng-click="submit()">Save</button>
                            <button type="reset" class="btn btn-danger btn-sm">Clear</button>
                        </center>
                    </div>


                </script>

                <script type="text/ng-template" id="uploadEmp.htm">
                    <div class="alert alert-warning" role="alert">
                        <b class="text-justify">{{message}}</b>
                    </div>
                    <div class="alert alert-info" role="alert">
                        <ul class="list-inline">
                            <li class="list-inline-item">id</li>
                            <li class="list-inline-item">first_name</li>
                            <li class="list-inline-item">input_address</li>
                            <li class="list-inline-item">input_address2</li>
                            <li class="list-inline-item">input_city</li>
                            <li class="list-inline-item">input_email</li>
                            <li class="list-inline-item">input_password</li>
                            <li class="list-inline-item">input_state</li>
                            <li class="list-inline-item">input_zip</li>
                            <li class="list-inline-item">last_name</li>
                        </ul>
                    </div>
                    <div class="row">
                        <div class="col-sm">
                        </div>
                        <div class="col-lg">
                            <form>
                                <div class="form-group row">
                                    <label for="fileUpload" class="col-sm-2 col-form-label">File:</label>
                                    <div class="col-sm-10">
                                        <input type="file" file-model="myFile" class="form-control"
                                               aria-label="upload Sql-file"
                                               aria-describedby="button-addon2">
                                    </div>
                                </div>
                                <br/>
                                <center>

                                    <button type="button" class="btn btn-outline-success" type="button"
                                            id="button-addon2"
                                            ng-click="uploadFile()">Upload
                                    </button> &nbsp;&nbsp;
                                    <button type="reset" ng-click="clear()" class="btn btn-outline-danger">Cancel
                                    </button>

                                </center>
                            </form>
                        </div>
                        <div class="col-sm">
                        </div>
                    </div>
                    <br/>
                    <div class="alert alert-warning " role="alert" ng-model="scriptExecusionMsg"
                         ng-show="execusionResult">
                        <b class="text-justify executionMsg">{{scriptExecusionMsg}}</b>
                    </div>
                </script>
                <script type="text/ng-template" id="home.htm">
                    <div class="card text-white  mb-3 homeEmp blink_me">
                        <div class="card-header bg-info">EMPLOYEE MANAGEMENT SYSTEM</div>
                        <div class="card-body">
                            <h5 class="card-title">Welcome</h5>
                            <p class="card-text">Spring boot and Angularjs application.<Br/>Bulk Upload Employee,Add
                                Single Employee,Update Existing Employee,Delete Employee,Search and perform pagination
                                conveniently.</p>
                        </div>
                    </div>
                </script>
            </div>

        </div>
    </div>
    <!-- /#page-content-wrapper -->

</div>

<!-- Bootstrap core JavaScript -->
<%--<script src="${pageContext.request.contextPath}/resources/js/jquery.min.js"></script>
<script src="${pageContext.request.contextPath}/resources/js/bootstrap.bundle.min.js"></script>--%>
<script
        src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script
        src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.bundle.min.js"></script>

<!-- Menu Toggle Script -->
<script>
    $("#menu-toggle").click(function (e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
    });
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    })
</script>

<script type="text/javascript"
        src="${pageContext.request.contextPath}/resources/js/singlePageApp.js"></script>
</body>
</html>