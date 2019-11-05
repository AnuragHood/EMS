//main app one per page
var mainApp = angular.module("empApp", ['ngRoute']);
var baseUrl = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
console.log("got inside angular...");
//UserDefined Directive to Parse a file
mainApp.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            element.bind('change', function () {
                scope.$apply(function () {
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);
//RoutProvider to achieve single Page application Functionality
mainApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/addEmp', {
        templateUrl: 'addEmployee.htm',
        controller: 'AddEmployeeController'
    }).when('/employeeManagement', {
        templateUrl: 'employeeManagement.htm',
        controller: 'EmployeeManagementController'
    }).when('/uploadEmp', {
        templateUrl: 'uploadEmp.htm',
        controller: 'uploadController'
    }).when('/home', {
        templateUrl: 'home.htm',
        controller: 'homeController'
    }).otherwise({
        redirectTo: '#'
    });
}]);
//Service to get all the employees any time within the mainApp scope
mainApp.factory('getEmpService', function ($http) {
    var serviceUrl2 = "/employee/home/getEmp";
    var url2 = baseUrl + serviceUrl2;
    return {
        getEmp: function (index1, index2) {
            //return the promise directly.
            return $http({
                url: url2,
                method: "GET",
                params: {
                    index1: index1,
                    index2: index2
                }
            }).then(function (result) {
                //resolve the promise as the data
                return result.data;
            });
        }
    }
});
//Service to delete the employees by id any time within the mainApp scope
mainApp.factory('deleteService', function ($http) {
    var serviceUrl3 = "/employee/home/deleteEmp";
    return {
        getDeleteEmp: function (id, rollbackDemand, index1, index2) {
            //return the promise directly.
            return $http({
                url: baseUrl + serviceUrl3,
                method: 'POST',
                headers: {
                    'Content-Type': undefined
                },
                params: {
                    id: id,
                    rollbackDemand: rollbackDemand,
                    index1: index1,
                    index2: index2,
                }
            }).then(function (result) {
                //resolve the promise as the data
                return result.data;
            });
        }
    }
});
//Service to update  all the employees by id at any time within the mainApp scope
mainApp.factory('updateService', function ($http) {
    var serviceUrl1 = "/employee/home/updateEmp";
    var url1 = baseUrl + serviceUrl1;
    return {
        getUpdatedEmp: function (emp, index1, index2) {
            //return the promise directly.
            return $http.put(url1, emp).then(function (result) {
                //resolve the promise as the data
                return result.data;
            });
        }
    }
});
//Service to search  all the employees by id,first or last name  at any time within the mainApp scope
mainApp.factory('searchService', function ($http) {
    return {
        searchEmp: function (url, index1, index2) {
            //return the promise directly.
            return $http({
                url: url,
                method: "GET",
                params: {
                    index1: index1,
                    index2: index2
                }
            }).then(function (result) {
                //resolve the promise as the data
                return result.data;
            });
        }
    }
});
//Service to get   all employee count at any time within the mainApp scope
mainApp.factory('getRecordCountService', function ($http) {
    var serviceUrl2 = "/employee/home/getRecordCount";
    var url2 = baseUrl + serviceUrl2;
    return {
        getRecordCount: function () {
            return $http({
                url: url2,
                method: "GET",
                transformResponse: rawResponse
            }).then(function (result) {
                return result.data;
            });
        }
    }
});
console.log("got inside angular...");
//upload template operations will be performed here
//dependency injection for services we will take will go in controller signature
mainApp.controller('uploadController', function ($scope, $http) {
    console.log("inside uploadController");
    $scope.execusionResult = false;
    $scope.message = "Employees in Bulk can be uploaded.File format must need to  be csv " + "and make sure that data should be inserted in csv file. File cells should be in following order:";
    var serviceUrl = "/employee/home/upload";
    var url = baseUrl + serviceUrl;
    $scope.uploadFile = function () {
        angular.element(document.querySelector("#appBody")).addClass("spinnerShow");
        angular.element(document.querySelector("#spinnerShow")).removeClass("hide").addClass("showSpinner");
        try {
            var file = $scope.myFile;
            console.log("in upload function " + file.type);
            var fd = new FormData();
            fd.append('file', file);
        } catch (err) {
            console.log("error in uploading file :" + err);
        }
        $http.post(url, fd, {
            transformRequest: angular.identity,
            transformResponse: rawResponse,
            headers: {
                'Content-Type': undefined
            }
        }).success(function (data) {
            console.log("success" + data);
            angular.element(document.querySelector("#successMsg")).removeClass("alert alert-success").addClass("alert alert-danger");
            $scope.scriptExecusionMsg = data;
            angular.element(document.querySelector(".executionMsg")).css("color", "green");
            angular.element(document.querySelector("#appBody")).removeClass("spinnerShow");
            angular.element(document.querySelector("#spinnerShow")).removeClass("showSpinner").addClass("hide");
            $scope.execusionResult = true;
        }).error(function (data) {
            console.log("failure");
            data = JSON.parse(data);
            $scope.scriptExecusionMsg = data.message + " :Please choose a valid file to upload.";
            angular.element(document.querySelector(".executionMsg")).css("color", "red");
            $scope.execusionResult = true;
            angular.element(document.querySelector("#appBody")).removeClass("spinnerShow");
            angular.element(document.querySelector("#spinnerShow")).removeClass("showSpinner").addClass("hide");
        });
    };
    $scope.clear = function () {
        $scope.myFile = '';
        console.log('file reset done');
    }
});
//HomeController to show static Home
mainApp.controller('homeController', function ($scope) {
    angular.element(document.querySelector("#appBody")).removeClass("spinnerShow");
    angular.element(document.querySelector("#spinnerShow")).removeClass("showSpinner").addClass("hide");
});

mainApp.controller('AddEmployeeController', function ($scope, $http, $timeout, $window) {
    var emp = JSON.parse(localStorage.getItem("Employee"));
    var updateFlag = "update";
    if (emp != null || emp != undefined) {
        angular.element(document.querySelector("#appBody")).removeClass("spinnerShow");
        angular.element(document.querySelector("#spinnerShow")).removeClass("showSpinner").addClass("hide");
        console.log("method is working:" + JSON.parse(localStorage.getItem("Employee")).id);
        $scope.message = "Use below form to update an Employee";
        $scope.firstName = emp.firstName;
        $scope.lastName = emp.lastName;
        $scope.inputEmail = emp.inputEmail;
        $scope.inputPassword = emp.inputPassword;
        $scope.inputAddress = emp.inputAddress;
        $scope.inputAddress2 = emp.inputAddress2;
        $scope.inputCity = emp.inputCity;
        $scope.inputState = emp.inputState;
        $scope.inputZip = emp.inputZip;
    } else {
        updateFlag = "add";
        $scope.firstName = '';
        $scope.lastName = '';
        $scope.inputEmail = '';
        $scope.inputPassword = '';
        $scope.inputAddress = '';
        $scope.inputAddress2 = '';
        $scope.inputCity = '';
        $scope.inputState = '';
        $scope.inputZip = '';
        $scope.message = "Use below form to add Single Employee,For Bulk Employee Addition GOTO Bulk Upload option in Menu.";
    }
    $scope.msg = false;
    $scope.submit = function () {
        $scope.firstNameErrorShow = false;
        $scope.lastNameErrorShow = false;
        $scope.emailErrorShow = false;
        $scope.passWordErrorShow = false;
        $scope.addressErrorShow = false;
        $scope.cityErrorShow = false;
        $scope.zipErrorShow = false;
        $scope.stateErrorShow = false;
        // Validate form here and set the error in form
        if (angular.isUndefined($scope.firstName) == true || $scope.firstName == '') {
            $scope.firstNameError = "FirstName is required."
            $scope.firstNameErrorShow = true;
            console.log("validation error")
        }
        if (angular.isUndefined($scope.lastName) == true || $scope.lastName == '') {
            $scope.lastNameError = "LastName is required."
            $scope.lastNameErrorShow = true;
            console.log("validation error")
        }
        if (angular.isUndefined($scope.inputEmail) == true || $scope.inputEmail == '') {
            $scope.emailError = "Email is required."
            $scope.emailErrorShow = true;
            console.log("validation error" + $scope.emailErrorShow)
        }
        if (angular.isUndefined($scope.inputPassword) == true || $scope.inputPassword == '') {
            $scope.passWordError = "Password is required."
            $scope.passWordErrorShow = true;
            console.log("validation error" + $scope.passWordErrorShow)
        }
        if (angular.isUndefined($scope.inputAddress) == true || $scope.inputAddress == '') {
            $scope.addressError = "Address is required."
            $scope.addressErrorShow = true;
            console.log("validation error")
        }
        if (angular.isUndefined($scope.inputCity) == true || $scope.inputCity == '') {
            $scope.cityError = "City is required."
            $scope.cityErrorShow = true;
            console.log("validation error")
        }
        if (angular.isUndefined($scope.inputState) == true || $scope.inputState == '') {
            $scope.stateError = "State is required."
            $scope.stateErrorShow = true;
            console.log("validation error")
        }
        if (angular.isUndefined($scope.inputZip) == true || $scope.inputZip == '') {
            $scope.zipError = "Zip is required."
            $scope.zipErrorShow = true;
            console.log("validation error")
        }
        /*else if (!$scope.inputZip.match("^[1-9][0-9]{5}$")) {
                   $scope.zipError = "Zip is not matching the zip pattern."
                   $scope.zipErrorShow = true;
               }*/
        if (angular.isUndefined($scope.inputZip) == false && angular.isUndefined($scope.inputState) == false && angular.isUndefined($scope.inputCity) == false && angular.isUndefined($scope.inputAddress) == false && angular.isUndefined($scope.inputPassword) == false && angular.isUndefined($scope.inputEmail) == false && angular.isUndefined($scope.firstName) == false && angular.isUndefined($scope.lastName) == false) {
            angular.element(document.querySelector("#appBody")).addClass("spinnerShow");
            angular.element(document.querySelector("#spinnerShow")).removeClass("hide").addClass("showSpinner");
            var employee = {}
            employee["firstName"] = $scope.firstName;
            employee["lastName"] = $scope.lastName;
            employee["inputEmail"] = $scope.inputEmail;
            employee["inputPassword"] = $scope.inputPassword;
            employee["inputAddress"] = $scope.inputAddress;
            employee["inputAddress2"] = $scope.inputAddress2;
            employee["inputCity"] = $scope.inputCity;
            employee["inputState"] = $scope.inputState;
            employee["inputZip"] = $scope.inputZip;
            employee["updateFlag"] = updateFlag;
            if (updateFlag === "update") {
                employee["id"] = JSON.parse(localStorage.getItem("Employee")).id;
            }
            var emp = JSON.stringify(employee);
            var serviceUrl1 = "/employee/home/addEmp";
            var url1 = baseUrl + serviceUrl1;
            $http({
                url: url1,
                method: "POST",
                data: employee,
                transformResponse: rawResponse
            }).success(function (data) {
                console.log("success...");
                localStorage.removeItem("Employee");
                $window.scrollTo(50, 50);
                if (data == "success") {
                    angular.element(document.querySelector("#appBody")).removeClass("spinnerShow");
                    angular.element(document.querySelector(".resultMessage")).css("color", "red");
                    angular.element(document.querySelector("#spinnerShow")).removeClass("showSpinner").addClass("hide");
                    if (updateFlag == "update") {
                        $scope.message = "Employee updated successfully";
                    } else {
                        $scope.message = "Employee added successfully";
                    }
                    angular.element(document.querySelector(".text-justify")).css("color", "green");
                    $scope.callAtTimeout = function () {
                        $scope.message = "Use below form to add Single Employee,For Bulk Employee Addition GOTO Bulk Upload option in Menu.";
                        angular.element(document.querySelector(".text-justify")).css("color", "purple");
                    }
                    $timeout(function () {
                        $scope.callAtTimeout();
                    }, 5000);
                } else {
                    angular.element(document.querySelector("#appBody")).removeClass("spinnerShow");
                    angular.element(document.querySelector(".resultMessage")).css("color", "red");
                    angular.element(document.querySelector("#spinnerShow")).removeClass("showSpinner").addClass("hide");
                    $scope.message = "EmployeeAdditionError:Something went wrong...Please try again!!";
                    angular.element(document.querySelector(".text-justify")).css("color", "green");
                    $scope.callAtTimeout = function () {
                        $scope.message = "Use below form to add Single Employee,For Bulk Employee Addition GOTO Bulk Upload option in Menu.";
                        angular.element(document.querySelector(".text-justify")).css("color", "purple");
                    }
                    $timeout(function () {
                        $scope.callAtTimeout();
                    }, 5000);
                }
                $scope.firstName = undefined;
                $scope.lastName = undefined;
                $scope.inputEmail = undefined;
                $scope.inputPassword = undefined;
                $scope.inputAddress = undefined;
                $scope.inputAddress2 = undefined;
                $scope.inputCity = undefined;
                $scope.inputState = undefined;
                $scope.inputZip = undefined;
            });
        }
    }
    console.log("inside AddEmpController")
});
//EmployeeManagement.htm template operations will be performed here
//dependency injection for services we will take will go in controller signature
mainApp.controller('EmployeeManagementController', function ($scope, $http, getEmpService, updateService, searchService, deleteService, getRecordCountService) {
    angular.element(document.querySelector("#appBody")).addClass("spinnerShow");
    angular.element(document.querySelector("#spinnerShow")).removeClass("hide").addClass("showSpinner");
    angular.element(document.querySelector(".previousButton")).addClass("disabled");
    $scope.mainTable = true;
    $scope.previous = 0;
    $scope.message = "Employee list with details  available in database of EMS is given below:-";
    console.log("inside viewStudents controller");
    //get first 10 employees on template load
    getEmpService.getEmp($scope.previous, $scope.next).then(function (data) {
        if (data.length === 0) {
            angular.element(document.querySelector(".resultMessage")).css("color", "red");
            $scope.message = "Something Fishy happened on server.May be no data available to show. Please add Employee via bulk upload or Add Employee link or try again after some time..!!"
            $scope.mainTable = false;
        } else {
            $scope.myArray = data;
            $scope.mainTable = true;

            angular.element(document.querySelector(".hide")).removeClass("hide").addClass("show");
        }
        getRecords(data);
        angular.element(document.querySelector("#appBody")).removeClass("spinnerShow");
        angular.element(document.querySelector("#spinnerShow")).removeClass("showSpinner").addClass("hide");
    });
    var serviceUrl2 = "/employee/home/searchEmp/";
    var url = "";
    console.log($scope.query);
    //search Employee $scope binding
    $scope.doSearch = function () {
        angular.element(document.querySelector("#appBody")).addClass("spinnerShow");
        angular.element(document.querySelector("#spinnerShow")).removeClass("hide").addClass("showSpinner");
        url = baseUrl + serviceUrl2 + $scope.query;
        console.log("inside SearchEmployeesController" + url);
        if ($scope.query === '' || $scope.query === undefined) {
            fetchRecords();
        } else {
            searchService.searchEmp(url, $scope.previous, $scope.next).then(function (data) {
                if (data.length === 0) {
                    angular.element(document.querySelector(".resultMessage")).css("color", "red");
                    $scope.message = "No data found with given criteria. please search with some other keyword... !!";
                    $scope.mainTable = false;
                } else {
                    $scope.myArray = data;
                    $scope.mainTable = true;
                    $scope.message = "Following details found on the basis of your search Criteria:-";
                    angular.element(document.querySelector(".resultMessage")).css("color", "green");
                }
                $scope.searchTable = true;
                var serviceUrl3 = "/employee/home/getSearchRecordCount/";
                var url6 = baseUrl + serviceUrl3 + $scope.query;
                $http.get(url6, {
                    transformRequest: angular.identity,
                    headers: {
                        'Content-Type': "application/json"
                    }
                }).then(function (result) {
                    if ($scope.perPage != undefined) {
                        $scope.recordCountMsg = "Showing " + parseInt($scope.previous) + " to " + (parseInt($scope.previous) + parseInt(data.length)) + ", out of " + result.data + " records."
                    } else {
                        $scope.recordCountMsg = "Showing " + parseInt($scope.previous) + " to " + (parseInt($scope.previous) + 10) + ",out of " + result.data + " records."
                    }
                    $scope.recordCount = true;
                    angular.element(document.querySelector("#appBody")).removeClass("spinnerShow");
                    angular.element(document.querySelector("#spinnerShow")).removeClass("showSpinner").addClass("hide");
                });
            });
        }
    }
    //delete method binding with scope
    $scope.showDelete = function (obj) {
        angular.element(document.querySelector("#appBody")).addClass("spinnerShow");
        angular.element(document.querySelector("#spinnerShow")).removeClass("hide").addClass("showSpinner");
        console.log(obj.target.attributes.id.value);
        var id = parseInt(obj.target.attributes.id.value);
        if ($scope.query === '' || $scope.query === undefined) {
            deleteService.getDeleteEmp(id, '', $scope.previous, $scope.next).then(function (data) {
                if (data.length === 0) {
                    angular.element(document.querySelector(".resultMessage")).css("color", "red");
                    $scope.message = "No data available for Employee..!!";
                    $scope.mainTable = false;
                } else {
                    $scope.myArray = data;
                    $scope.maniTable = true;
                    console.log("hello delete");
                    angular.element(document.querySelector(".resultMessage")).css("color", "green");
                }
                alert("The Employee with Id " + id + " deleted Successfully!!");
                angular.element(document.querySelector("#appBody")).removeClass("spinnerShow");
                angular.element(document.querySelector("#spinnerShow")).removeClass("showSpinner").addClass("hide");
            });
        } else {
            deleteService.getDeleteEmp(id, '', $scope.previous, $scope.next).then(function (data) {
                alert("The Employee with Id " + id + " deleted Successfully!!");
                angular.element(document.querySelector("#appBody")).removeClass("spinnerShow");
                angular.element(document.querySelector("#spinnerShow")).removeClass("showSpinner").addClass("hide");
                $scope.doSearch();
            });
        }
    }
    //update Employee method
    $scope.updateEmp = function (index) {
        angular.element(document.querySelector("#appBody")).addClass("spinnerShow");
        angular.element(document.querySelector("#spinnerShow")).removeClass("hide").addClass("showSpinner");
        var employee = {}
        employee["firstName"] = $scope.myArray[index].firstName;
        employee["lastName"] = $scope.myArray[index].lastName;
        employee["inputEmail"] = $scope.myArray[index].inputEmail;
        employee["inputPassword"] = $scope.myArray[index].inputPassword;
        employee["inputAddress"] = $scope.myArray[index].inputAddress;
        employee["inputAddress2"] = $scope.myArray[index].inputAddress2;
        employee["inputCity"] = $scope.myArray[index].inputCity;
        employee["inputState"] = $scope.myArray[index].inputState;
        employee["inputZip"] = $scope.myArray[index].inputZip;
        employee["id"] = $scope.myArray[index].id;
        var emp = JSON.stringify(employee);
        console.log(emp);
        localStorage.setItem("Employee", emp);

    }
    //this method will handle Next button actions of pagination
    $scope.initializeNext = function () {
        if ($scope.perPage == undefined) {
            $scope.perPage = 10;
        }
        $scope.next = $scope.next;
        if ($scope.previous >= 0) {
            console.log("inside previous>=0" + parseInt($scope.previous));
            $scope.previous = $scope.previous + parseInt($scope.perPage);
            angular.element(document.querySelector(".previousButton")).removeClass("disabled");
        }
        console.log('inside next calling search next=' + $scope.next + 'previous= ' + parseInt($scope.previous));
        if ($scope.query === undefined || ($scope.query).length === 0) {
            console.log('inside get records pagination')
            fetchRecords();
        } else {
            console.log('inside search pagination value=' + $scope.query)
            $scope.doSearch();
        }
    }
    //this method will handle previous button actions of pagination
    $scope.initializePrevious = function () {
        $scope.next = $scope.next;
        if ($scope.previous > 0) {
            $scope.previous = $scope.previous - parseInt($scope.perPage);
        }
        if ($scope.query === undefined || ($scope.query).length === 0) {
            console.log('inside get records pagination')
            fetchRecords();
        } else {
            console.log('inside search pagination value=' + $scope.query)
            $scope.doSearch();
        }
        console.log('inside Previous calling search next=' + $scope.next + 'previous= ' + $scope.previous);
        if ($scope.perPage != undefined && $scope.previous == 0) {
            angular.element(document.querySelector(".previousButton")).addClass("disabled");
        }
    }
    //this method will handle record count pagination link
    $scope.showPopup = function () {
        $scope.next = $scope.perPage;
        $scope.previous = 0;
        if ($scope.query === undefined || ($scope.query).length === 0) {
            console.log('inside get records pagination');
            fetchRecords();
        } else {
            console.log('inside search pagination value=' + $scope.query)
            $scope.doSearch();
        }
        if ($scope.perPage != undefined && $scope.previous == 0) {
            angular.element(document.querySelector(".previousButton")).addClass("disabled");
        }
    }

    //A custom function to fetch records
    function fetchRecords() {
        getEmpService.getEmp($scope.previous, $scope.next).then(function (data) {
            if ($scope.perPage === undefined) {
                $scope.perPage = 10;
            }
            if (data.length < parseInt($scope.perPage)) {
                angular.element(document.querySelector(".nextButton")).addClass("disabled");
                angular.element(document.querySelector("#nextButton")).addClass("disabled");
                console.log(data.length)
            } else {
                angular.element(document.querySelector(".nextButton")).removeClass("disabled");
                angular.element(document.querySelector("#nextButton")).removeClass("disabled");
            }
            if (data.length === 0) {
                $scope.scriptExecusionMsg = "Some thing went wrong.May be no data in DB?  " + data;
            } else {
                $scope.myArray = data;
                $scope.mainTable = true;
                getRecords(data);
                $scope.message = "Employee list with details  available in database of EMS is given below:-";
            }
            if ($scope.previous == 0) {
                getRecords(data);
            }

        });

    }

    //this function gives record count portion of pagination part
    function getRecords(data) {
        var serviceUrl3 = "/employee/home/getRecordCount/";
        var url6 = baseUrl + serviceUrl3;
        $http.get(url6, {
            transformRequest: angular.identity,
            headers: {
                'Content-Type': "application/json"
            }
        }).then(function (result) {
            if ($scope.perPage != undefined) {
                $scope.recordCountMsg = "Showing " + parseInt($scope.previous) + " to " + (parseInt($scope.previous) + parseInt(data.length)) + ", out of " + result.data + " records."
            } else {
                $scope.recordCountMsg = "Showing " + parseInt($scope.previous) + " to " + (parseInt($scope.previous) + 10) + ",out of " + result.data + " records."
            }
            $scope.recordCount = true;
            angular.element(document.querySelector("#appBody")).removeClass("spinnerShow");
            angular.element(document.querySelector("#spinnerShow")).removeClass("showSpinner").addClass("hide");
        });
    }

});
var rawResponse = function (value) {
    return value;
};